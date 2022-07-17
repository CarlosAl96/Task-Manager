import { useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { listTasksINC, listTasksCOM } from "../../store/slices/users";
import Button from "../../components/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, listTasksI, isLogged, listTasksC, resp } = useSelector(
    (state) => state.users
  );

  const [change1, setChange1] = useState(true);
  const [change2, setChange2] = useState(true);

  let userAux;

  if (isLogged) {
    userAux = user;
  }

  if (!isLogged && localStorage.getItem("userLS")) {
    userAux = JSON.parse(localStorage.getItem("userLS"));
  }

  useEffect(() => {
    if (change1) {
      dispatch(listTasksINC(userAux.accesToken));
      setChange1(false);
    }
  }, [listTasksI]);

  useEffect(() => {
    if (change2) {
      dispatch(listTasksCOM(userAux.accesToken));
      setChange2(false);
    }
  }, [listTasksC]);

  return (
    <>
      <Header></Header>
      <div className="cont">
        <div className="tasks">
          <h3>Lista de tareas por hacer</h3>

          {listTasksI.data &&
            listTasksI.data.map((task) => {
              return (
                <div className={"task " + task.priority} key={task.id}>
                  <div id={task.id}>
                    <h6>{task.name}</h6>
                    <p>{task.description}</p>
                    <div>
                      <Button>Delete</Button>
                      <Button>Edit</Button>
                      <Button>Completed</Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="tasks">
          <h3>Lista de tareas completadas</h3>

          {listTasksC.data &&
            listTasksC.data.map((task) => {
              return (
                <div className="task" key={task.id}>
                  <div id={task.id}>
                    <h6>{task.name}</h6>
                    <p>{task.description}</p>
                    <p>{task.date}</p>
                    <div>
                      <Button>Delete</Button>
                      <Button>Edit</Button>
                      <Button>Completed</Button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
