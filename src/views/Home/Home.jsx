import "./Home.css";
import { Box } from "@mui/material";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import Landing from "../../assets/images/landing-1.png";

const Home = () => {
  return (
    <>
      <style>
        {`
      body {
        background: #F9FAF4 url(${Landing}) top right no-repeat;
      }
    `}
      </style>
      <Box className="Home">
        <HeroHeader />
      </Box>
    </>
  );
};

export default Home;
