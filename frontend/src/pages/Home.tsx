import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Home</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginTop: "2rem",
          gap: "2rem",
        }}
      >
        <Link
          to="/"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          Base
        </Link>
        <Link
          to="/page-two"
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          Page Two
        </Link>
        <Link
          to="/page-three"
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          Page Three
        </Link>
      </div>
    </div>
  );
};

export default Home;
