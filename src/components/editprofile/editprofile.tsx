import React, { useState } from "react";
import "./editprofile.scss";
import { useStateValue } from "../../state";
import Banner from "../../images/bannertest.jpg";
import useInput from "../../hooks/useInput";
// import { updateUser } from "../../utils/index";
import { userInfo } from "os";
import axios from "axios";

interface Props {}

const Editprofile: React.FC<Props> = ({}) => {
  const [{ auth }, dispatch] = useStateValue();
  const [pic, setPic] = useState("");
  const name = useInput(auth.user.name);
  //   const [name, setName] = useState(auth.user.name);
  const about = useInput(auth.user.about);
  const [banner, setBanner] = useState<any>(null);

  const handleEditProfileBanner = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setBanner(file);
    }
  };

  //   console.log("banner", banner);

  const handleEditProfilePic = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setPic(file);
      console.log("new pic", file);
    }
  };

  const HandleEditProfileSubmit = async (e: any) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("banner", banner);
    formData.append("pic", pic);
    formData.append("name", name.value);
    formData.append("about", about.value);

    let headers = {
      "Content-Type": "multipart/form-data",
    };

    await axios
      .post(
        "http://localhost:9000/.netlify/functions/server/youtube/update",
        formData,
        {
          headers: headers,
          withCredentials: true,
        }
      )
      .then((res) => {
        const user = res.data.payload;
        console.log("response", res);
        console.log("user", user);
        console.log("new datac sent to database");
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "update",
          auth: {
            user: user,
          },
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  return (
    <>
      <div className="edit-profile-main">
        <div className="edit-profile-header">
          <span>Edit Profile</span>
          <button
            type="submit"
            onClick={(e: any) => HandleEditProfileSubmit(e)}
          >
            Save
          </button>
        </div>
        <div className="edit-profile-banner">
          <label htmlFor="banner-upload">
            <img src={banner ? banner : auth.user.banner} alt="banner" />
          </label>

          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={handleEditProfileBanner}
            style={{ display: "none" }}
          />
        </div>
        <div className="edit-profile-pic">
          <label htmlFor="pic-upload">
            <img src={auth.user.img} />
          </label>
          <input
            id="pic-upload"
            type="file"
            accept="image/*"
            onChange={handleEditProfilePic}
            style={{ display: "none" }}
          />
        </div>
        <div className="edit-inputs-container">
          <span>Edit Name</span>
          <input value={name.value} onChange={name.onChange} type="text" />
          <span>Edit About</span>
          <textarea value={about.value} onChange={about.onChange} />
        </div>
      </div>
    </>
  );
};

export default Editprofile;
