import "./Footer.css";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "../../assets/images/Logo.png";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

const Footer = () => {
  return (
    <Box className="footer">
      <Stack className="footer-stack">
        <img src={Logo} alt="logo" className="footer-logo" />
        <Link to="/about-us" className="footer-nav">
          <Typography id="footer-text">
            Made with <FavoriteTwoToneIcon /> by Nikola, Sasho and Yana
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
