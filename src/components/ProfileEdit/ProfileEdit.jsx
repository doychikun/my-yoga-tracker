import "./ProfileEdit.css";
import AppContext from "../../providers/AppContext";
import { getAuth, updateEmail } from "firebase/auth";
import { useContext, useState } from "react";
import { updateUserData } from "../../services/users.service";
import { toast } from "react-toastify";

const ProfileEdit = ({ cancelEditMode }) => {
  const { user, userData, setContext } = useContext(AppContext);
  const username = userData.username;

  const [userProfileForm, setUserProfileForm] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  });

  const auth = getAuth();

  const updateForm = (prop, e) => {
    setUserProfileForm({
      ...userProfileForm,
      [prop]: e.target.value,
    });
  };

  const updateUserProfile = (e) => {
    e.preventDefault();

    updateEmail(auth.currentUser, userProfileForm.email)
      .then(() => {
        console.log("authentication email updated");

        return updateUserData(username, {
          firstName: userProfileForm.firstName,
          lastName: userProfileForm.lastName,
          email: userProfileForm.email,
          phoneNumber: userProfileForm.phoneNumber,
        })
          .then(() => {
            cancelEditMode(e);

            setContext({
              user: { ...user },
              userData: {
                ...userData,
                firstName: userProfileForm.firstName,
                lastName: userProfileForm.lastName,
                email: userProfileForm.email,
                phoneNumber: userProfileForm.phoneNumber,
              },
            });
            toast.success(`Profile successfully updated!`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          })
          .catch((error) => {
            console.log(error.message);
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          });
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message.includes("invalid-email")) {
          toast.error("Please use a valid email!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          toast.error("Failed to edit your profile!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <div className="edit-form">
      <form>
        <div>
          <label className="edit-text">First name:</label>
          <input
            type="text"
            value={userProfileForm.firstName}
            onChange={(e) => updateForm("firstName", e)}
          />
        </div>

        <div>
          <label className="edit-text">Last name:</label>
          <input
            type="text"
            value={userProfileForm.lastName}
            onChange={(e) => updateForm("lastName", e)}
          />
        </div>

        <div>
          <label className="edit-text">Email:</label>
          <input
            type="email"
            value={userProfileForm.email}
            onChange={(e) => updateForm("email", e)}
          />
        </div>

        <div>
          <label className="edit-text">Phone number:</label>
          <input
            type="tel"
            value={userProfileForm.phoneNumber}
            onChange={(e) => updateForm("phoneNumber", e)}
          />
        </div>

        <div>
          <button type="submit" onClick={updateUserProfile}>
            Save Changes
          </button>
        </div>
        <div>
          <button type="reset" onClick={cancelEditMode}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
