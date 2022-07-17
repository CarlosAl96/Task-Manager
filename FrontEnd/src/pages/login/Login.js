import Input from "../../components/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "../../components/Container";
import Section from "../../components/Section";
import Button from "../../components/Button";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../../store/slices/users";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.users);

  useEffect(() => {
    if (isLogged || localStorage.getItem("userLS")) {
      navigate("/profile");
    }
  }, [isLogged]);

  const handleSubmit = ({ email, password }) => {
    const data = {
      email: email,
      password: password,
    };
    dispatch(login(data));
  };

  return (
    <>
      <Header></Header>
      <Container>
        <Section>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Please use a valid email")
                .required("Required"),
              password: Yup.string().required("Required"),
            })}
          >
            <Form>
              <Input type="text" name="email" label="Email" />
              <Input type="password" name="password" label="Password" />
              <div className="cont-btn">
                <Button type="submit">Login</Button>
              </div>
            </Form>
          </Formik>
        </Section>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Login;
