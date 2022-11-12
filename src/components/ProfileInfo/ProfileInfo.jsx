import "./ProfileInfo.css";
import { useContext } from "react";
import AppContext from "../../providers/AppContext";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../config/firebase-config";
import { updateUserProfilePicture } from "../../services/users.service";
import { toast } from "react-toastify";

const ProfileInfo = ({ enterEditMode }) => {
  const { user, userData, setContext } = useContext(AppContext);
  const username = userData.username;

  const uploadPicture = (e) => {
    e.preventDefault();

    const file = e.target[0]?.files?.[0];

    if (!file) return alert("Please select a file!");

    const image = storageRef(storage, `images/${username}/avatar`);

    uploadBytes(image, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref).then((url) => {
          return updateUserProfilePicture(username, url).then(() => {
            setContext({
              user,
              userData: {
                ...userData,
                avatarUrl: url,
              },
            });
            toast.success(`Profile picture successfully updated!`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          });
        });
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="profile-card">
      {userData.avatarUrl ? (
        <div className="avatar">
          <img src={userData.avatarUrl} alt="profile" className="profile-img" />
        </div>
      ) : null}
      <form onSubmit={uploadPicture}>
        <input type="file" name="file"></input>
        <button type="submit">Submit</button>
      </form>
      <div className="profile-text">
        <h3>
          Full Name: {userData.firstName} {userData.lastName}{" "}
        </h3>
        <h3>Username: @{username}</h3>
        <h3>Email: {userData.email}</h3>
        <h3>Phone Number: {userData.phoneNumber}</h3>
        <h3>Gender: {userData.gender}</h3>
      </div>
      <div>
        <button className="edit-btn" onClick={enterEditMode}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
