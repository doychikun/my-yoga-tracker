import "./Logo.css";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/images/Logo.png";

const Logo = () => {
  return (
    <>
      <Link to="/home" className="logo">
        <img src={LogoImage} className="logo-img" alt="Logo" />
      </Link>
    </>
  );
};

export default Logo;
