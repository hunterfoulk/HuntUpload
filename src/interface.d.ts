interface Dropdown {
  dropdown: boolean;
}

interface editProfileModal {
  editProfileModal: boolean;
}

interface CloseEditProfileFunc {
  CloseEditProfileFunc: () => void;
}

interface OpenEditProfileFunc {
  OpenEditProfileFunc: () => void;
}

type SetDropDown = Dispatch<Dropdown>;

type setEditProfileModal = Dispatch<setEditProfileModal>;
