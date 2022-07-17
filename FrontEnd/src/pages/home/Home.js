import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import "./Home.css";

const Home = () => {

  const { isLogged } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged || localStorage.getItem("userLS")) {
      navigate("/profile");
    }
  }, [isLogged]);
  return (
    <>
      <Header></Header>
      <div className="bigcontainer">
        <div className="container">
          <p>
            Welcome to Task Manager, manage your tasks easily and quickly, so
            you will have full control of your daily activities!
          </p>
          <Link className="button btn" to="/register">Register</Link>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Home;
