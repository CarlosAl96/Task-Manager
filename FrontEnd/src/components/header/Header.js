import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import "./Header.css";


const Header = () => {
  const { user, isLogged } = useSelector((state) => state.users);

  let userAux;

  if (isLogged) {
    userAux = user;
  }

  if (!isLogged && localStorage.getItem("userLS")) {
    userAux = JSON.parse(localStorage.getItem("userLS"));
  }

  return (
    <div className="header">
      <Link className="h2" to="/">
        <h2>Task Manager</h2>
      </Link>

      {userAux ? (
        <div className="item">
          <h3>{userAux.user.name}</h3>
          <Link className="button" to="/create">
            Create Task
          </Link>
          <Link className="button" to="/logout">
            Logout
          </Link>
        </div>
      ) : (
        <div className="item">
          <Link className="button" to="/register">
            Register
          </Link>
          <Link className="button" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
