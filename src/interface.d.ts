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

interface handleLikeVideo {
  handleLikeVideo: () => void;
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

type SetDropDown = Dispatch<Dropdown>;

type setEditProfileModal = Dispatch<setEditProfileModal>;

type setUploadModal = Dispatch<setUploadModal>;

type setVideoContent = Dispatch<setVideoContent>;

type setAllVideos = Dispatch<setAllVideos>;

type setVideo = Dispatch<setVideo>;

type setIsLiked = Dispatch<setIsLiked>;
