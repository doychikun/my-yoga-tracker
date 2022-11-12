import "./HeroHeader.css";
import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../providers/AppContext";
import PrimaryButton1 from "../PrimaryButton1/PrimaryButton1";
import PrimaryButton2 from "../PrimaryButton2/PrimaryButton2";
import trio1 from "../../assets/images/trio-1.png";
import trio2 from "../../assets/images/trio-2.png";
import trio3 from "../../assets/images/trio-3.png";

const HeroHeader = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <Box
        className="hero-header"
        sx={{
          mt: { lg: "200px", xs: "70px" },
          ml: { sm: "50px" },
        }}
      >
        <Typography
          id="hero-header-main-text"
          sx={{ fontSize: { lg: "56px", xs: "40px" } }}
        >
          Inhale the future, <br />
          exhale the past
        </Typography>
        <Typography id="intro-text" mb={3}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Typography>
        {!user ? (
          <PrimaryButton2 text="Join us now" on={() => navigate("/join")} />
        ) : (
          <PrimaryButton2
            text="Set Yogi Goals"
            on={() => navigate("/yogi-goals")}
          />
        )}
        <PrimaryButton1
          text="Explore Practices"
          on={() => navigate("/yogi-practices")}
        />
        <Typography
          id="big-text"
          sx={{
            display: { lg: "block", xs: "none" },
          }}
        >
          Become a true Yogi
        </Typography>
      </Box>

      <div className="images-wrapper">
        <div className="card-frontpage">
          <div className="card-img-top">
            <img src={trio1} alt="User Card" />
          </div>
          <div className="title">Set your goals</div>
          <div className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
            laudantium, repudiandae soluta dicta explicabo ipsam vel officia rem
            saepe tempora quaerat accusantium doloribus eos eaque minus in atque
            cumque mollitia?
          </div>
        </div>
        <div className="card-frontpage">
          <div className="card-img-top">
            <img src={trio2} alt="User Card" />
          </div>
          <div className="title">Track your progress</div>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div className="card-frontpage">
          <div className="card-img-top">
            <img src={trio3} alt="User Card" />
          </div>
          <div className="title">Become mindful</div>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
