const TomatoNavbar = () => {
  return (
    <div
      style={{
        height: "81px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "150px",
        position: "fixed",
        width: "100vw",
        top: "0px",
        left: "0px",
        backgroundColor: "white",
        zIndex: "2",
      }}
      className="tomatoNavbar"
    >
      <div className="logo">
        <h1 style={{ fontWeight: "bold", fontSize: "35px", color: "#FE840E" }}>
          Tomato.
        </h1>
      </div>
      <div style={{ display: "flex", gap: "50px" }} className="options">
        <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>Home</h4>
        <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>Menu</h4>
        <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>Contact</h4>
      </div>
      <div style={{ display: "flex", gap: "30px" }} className="icons">
        <input type="text" placeholder="Search..." />
        <span>
          <i class="fa-solid fa-cart-shopping"></i>
        </span>
        <span>
          <i class="fa-regular fa-user"></i>
        </span>
      </div>
    </div>
  );
};

export default TomatoNavbar;
