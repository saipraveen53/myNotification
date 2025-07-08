import React from "react";

const TomatoLandingpage = () => {
  return (
    <div style={{ marginBottom: "40px" }} className="tomatoLandingPage">
      <div
        style={{
          marginTop: "91px",
          display: "flex",
          justifyContent: "center",
        }}
        className="tomatocontainer"
      >
        <div
          style={{
            height: "518px",
            width: "1226px",
            display: "flex",
            position: "relative",
          }}
          className="imgcomtainer"
        >
          <div
            className="wrapper"
            style={{ position: "absolute", top: "0px" }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            className="part1 w-75 "
          >
            <h2
              style={{
                color: "white",
                fontWeight: "bold",
                marginTop: "230px",
                zIndex: "1",
                marginLeft: "40px",
              }}
            >
              Order your favorite food here
            </h2>
            <h5
              style={{
                color: "white",
                fontWeight: "bold",
                zIndex: "1",
                marginLeft: "40px",
              }}
            >
              Order your favorite food here Choose from a deverse menu featuring
              a delectable array of dishes crafted with the food
            </h5>
            <span
              style={{
                marginLeft: "40px",
                color: "gray",
                zIndex: "1",
                fontSize: "25px",
                backgroundColor: "white",
                width: "150px",
                padding: "10px",
                borderRadius: "35px",
                marginTop: "15px",
              }}
            >
              View Menu
            </span>
          </div>
          <div className="part2 w-25"></div>
        </div>
      </div>
      <div style={{}} className="mobileapp"></div>
    </div>
  );
};

export default TomatoLandingpage;
