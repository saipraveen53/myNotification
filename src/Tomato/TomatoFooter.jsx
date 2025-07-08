import React from "react";

const TomatoFooter = () => {
  return (
    <div
      style={{ backgroundColor: "#2e3440", color: "white" }}
      className="tomatoFooter"
    >
      <div
        style={{
          height: "550px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="footerContainer"
      >
        <div
          style={{
            height: "102px",
            width: "1107px",
            display: "flex",
          }}
          className="footer"
        >
          <div style={{ paddingLeft: "30px" }} className="part11 w-50">
            <h1
              style={{ fontWeight: "bold", fontSize: "35px", color: "#FE840E" }}
            >
              Tomato.
            </h1>
            <h5 style={{ fontSize: "20px" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi,
              unde aut temporibus, doloribus, repellat nemo quia voluptas cumque
              enim assumenda molestias obcaecati eius quas consequatur quaerat?
              Maiores enim odio repellendus.
            </h5>
            <span style={{ marginRight: "10px", fontSize: "25px" }}>
              <i class="fa-brands fa-facebook"></i>
            </span>
            <span style={{ marginRight: "10px", fontSize: "25px" }}>
              <i class="fa-brands fa-twitter"></i>
            </span>
            <span style={{ marginRight: "10px", fontSize: "25px" }}>
              <i class="fa-brands fa-linkedin"></i>
            </span>
          </div>
          <div
            style={{ marginLeft: "15px", paddingLeft: "50px" }}
            className="part12 w-25 "
          >
            <h1
              style={{ fontWeight: "bold", fontSize: "28px", color: "#FE840E" }}
            >
              COMPANY
            </h1>
            <h6>Home</h6>
            <h6>About Us</h6>
            <h6>Delivery</h6>
            <h6>Privacy Policy</h6>
          </div>
          <div className="part13 w-25">
            <h1
              style={{ fontWeight: "bold", fontSize: "28px", color: "#FE840E" }}
            >
              GET IN TOUCH
            </h1>
            <h6>+1-212-256-7890</h6>
            <h6>contact@tomato.com</h6>
          </div>
        </div>
      </div>
      <hr />
      <div
        style={{ textAlign: "center", paddingBottom: "20px" }}
        className="ultrafooter"
      >
        <h4 style={{ fontSize: "20px" }}>
          Copyright2024 &copy; Tomato.com-All Rights Reserved{" "}
        </h4>
      </div>
    </div>
  );
};

export default TomatoFooter;
