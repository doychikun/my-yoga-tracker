import "./PrimaryButton2.css";
import React from "react";
import { Button } from "@mui/material";

const PrimaryButton2 = (props) => {
  return (
    <Button
      variant="outlined"
      color="success"
      onClick={props.on}
      sx={{
        color: "#272727",
        borderColor: "#F8C55C",
        padding: "10px 30px",
        marginRight: "30px",
        borderRadius: 8,
        fontSize: 14,
        "&:hover": {
          borderColor: "#F8C55C",
          backgroundColor: "#F9FAF4",
          color: "#9494B6",
        },
      }}
    >
      {props.text}
    </Button>
  );
};

export default PrimaryButton2;
