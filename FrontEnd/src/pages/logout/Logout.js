import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setInit } from "../../store/slices/users";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(setInit());
    navigate("/login");
  });

  return <></>;
};

export default Logout;
