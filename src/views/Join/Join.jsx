import "./Join.css";
import { useForm } from "react-hook-form";
import { createUser, getUserByUsername } from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import { toast } from "react-toastify";

const Join = ({ close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    getUserByUsername(data.username)
      .then((snapshot) => {
        if (snapshot.exists()) {
          return toast.error("Username is in use!", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 3000,
          })
        }

        return registerUser(data.email, data.password).then(
          (userCredential) => {
            createUser(
              data.firstName,
              data.lastName,
              data.username,
              userCredential.user.uid,
              data.email,
              data.gender,
              data.password,
              data.phoneNumber
            ).then(() => {
              close();
              toast.success("Welcome!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            });
          }
        );
      })
      .catch((err) => {
        if (err.message.includes("email-already-in-use")) {
          toast.error("Email is in use!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        };
      });
  };

  return (
    <div className="join-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="First Name*"
            {...register("firstName", { required: "First name is required!" })}
          />
          <div className="error">
            <p>{errors.firstName?.message}</p>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Last Name*"
            {...register("lastName", { required: "Last Name is required!" })}
          />
          <div className="error">
            <p>{errors.lastName?.message}</p>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Username*"
            {...register("username", {
              required: true,
              minLength: 2,
              maxLength: 20,
            })}
          />
          <div className="error">
            {errors.username?.type === "required" && <p>Username is required!</p>}
            {errors.username?.type === "minLength" && (
              <p>The username must be between 2 and 20 symbols</p>
            )}
            {errors.username?.type === "maxLength" && (
              <p>The username must be between 2 and 20 symbols</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            placeholder="Email*"
            {...register("email", { required: "Email Address is required!" })}
          />
          <div className="error">
            <p>{errors.email?.message}</p>  
          </div>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password*"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 12,
            })}
          />
          <div className="error">
            {errors.password?.type === "required" && <p>Password is required!</p>}
            {errors.password?.type === "minLength" && (
              <p>The password must be between 8 and 12 symbols!</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p>The password must be between 8 and 12 symbols!</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="number"
            placeholder="Phone Number*"
            {...register("phoneNumber", {
              required: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          <div className="error">
            {errors.phoneNumber?.type === "required" && (
              <p>Phone number is required!</p>
            )}
            {errors.phoneNumber?.type === "minLength" && (
              <p>The phone number must be 10 digits!</p>
            )}
            {errors.phoneNumber?.type === "maxLength" && (
              <p>The phone number must be 10 digits!</p>
            )}
          </div>
        </div>

        <div>
          <select {...register("gender")}>
            <option>Sex...</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Join;
