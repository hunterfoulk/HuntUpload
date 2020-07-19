interface Dropdown {
  dropdown: boolean;
}

interface editProfileModal {
  editProfileModal: boolean;
}

interface uploadModal {
  uploadModal: boolean;
}

interface videoContent {
  videoContent: {};
}

interface allVideos {
  allVideos: [];
}

interface Comment {
  name: string;
  pic: string;
  comment: string;
}

interface Video {
  video: any;
}

interface CloseEditProfileFunc {
  CloseEditProfileFunc: () => void;
}

interface handleVideoRequest {
  handleVideoRequest: () => void;
}

interface OpenEditProfileFunc {
  OpenEditProfileFunc: () => void;
}

interface OpenUploadModal {
  OpenUploadModal: () => void;
}

interface GetAllVideos {
  GetAllVideos: () => void;
}

type SetDropDown = Dispatch<Dropdown>;

type setEditProfileModal = Dispatch<setEditProfileModal>;

type setUploadModal = Dispatch<setUploadModal>;

type setVideoContent = Dispatch<setVideoContent>;

type setAllVideos = Dispatch<setAllVideos>;

type setVideo = Dispatch<setVideo>;
