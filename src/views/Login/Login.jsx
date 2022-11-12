import "./Login.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AppContext from "../../providers/AppContext";
import { loginUser } from "../../services/auth.service";
import { getUserData } from "../../services/users.service";
import { toast } from "react-toastify";

const Login = ({ close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setContext } = useContext(AppContext);

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((userCredential) => {
        return getUserData(userCredential.user.uid).then((snapshot) => {
          if (snapshot.exists()) {
            setContext({
              user: userCredential.user,
              userData: snapshot.val()[Object.keys(snapshot.val())[0]],
            });
            close();
            toast.success("Welcome back!", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        });
      })
      .catch((err) => {
        if (err.message.includes("invalid-email")) {
          toast.error("Please enter a valid email address!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else if (err.message.includes("user-not-found")) {
          toast.error("User not found!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          toast.error("Invalid Password", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email*"
            {...register("email", { required: "Email Address is required!" })}
          />
        </div>
        <div className="error">
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password*"
            {...register("password", { required: "Password is required!" })}
          />
        </div>
        <div className="error">
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
