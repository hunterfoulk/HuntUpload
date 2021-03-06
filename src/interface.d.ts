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

interface isLiked {
  isliked: boolean;
}

interface CloseEditProfileFunc {
  CloseEditProfileFunc: () => void;
}

interface handleSubscribe {
  handleSubscribe: () => void;
}

interface handleLikeVideo {
  handleLikeVideo: () => void;
}

interface isSubscribed {
  isSubscribed: () => void;
}

interface handleDislike {
  handleDislike: () => void;
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

interface videoIsLiked {
  videoIsLiked: () => void;
}
interface handleSubmit {
  handleSubmit: () => void;
}

type SetDropDown = Dispatch<Dropdown>;

type setEditProfileModal = Dispatch<setEditProfileModal>;

type setUploadModal = Dispatch<setUploadModal>;

type setVideoContent = Dispatch<setVideoContent>;

type setAllVideos = Dispatch<setAllVideos>;

type setVideo = Dispatch<setVideo>;

type setIsLiked = Dispatch<setIsLiked>;

type setIsSubbed = Dispatch<setIsSubbed>;

type setSearchedVideos = Dispatch<setSearchedVideos>;

type setSearchterm = Dispatch<setSearchterm>;
