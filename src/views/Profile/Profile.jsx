import "./Profile.css";
import { useState } from "react";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";

const Profile = () => {
  const [editProfileMode, setEditProfileMode] = useState(false);

  const editModeOnClick = (event) => {
    event.preventDefault();
    setEditProfileMode(true);
  };

  const cancelEditModeOnClick = (event) => {
    event.preventDefault();
    setEditProfileMode(false);
  };

  return (
    <div className="profile">
      {editProfileMode ? (
        <ProfileEdit cancelEditMode={cancelEditModeOnClick} />
      ) : (
        <ProfileInfo enterEditMode={editModeOnClick} />
      )}
    </div>
  );
};

export default Profile;
