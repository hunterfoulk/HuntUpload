interface Dropdown {
  dropdown: boolean;
}

interface editProfileModal {
  editProfileModal: boolean;
}

interface uploadModal {
  uploadModal: boolean;
}

interface CloseEditProfileFunc {
  CloseEditProfileFunc: () => void;
}

interface OpenEditProfileFunc {
  OpenEditProfileFunc: () => void;
}

interface OpenUploadModal {
  OpenUploadModal: () => void;
}

type SetDropDown = Dispatch<Dropdown>;

type setEditProfileModal = Dispatch<setEditProfileModal>;

type setUploadModal = Dispatch<setUploadModal>;
