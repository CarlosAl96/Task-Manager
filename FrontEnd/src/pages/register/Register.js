import Input from "../../components/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useEffect } from "react";
import Section from "../../components/Section";
import Button from "../../components/Button";
import { register } from "../../store/slices/users";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, isRegister, resp } = useSelector((state) => state.users);

  useEffect(() => {
    if (isLogged || localStorage.getItem("userLS")) {
      navigate("/profile");
    }

    if (isRegister) {
      console.log(resp);
      navigate("/login");
    }
  });

  const handleSubmit = ({ name, email, password }) => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(register(data));
  };

  return (
    <>
      <Header></Header>
      <Container>
        <Section>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              email: Yup.string()
                .email("Please use a valid email")
                .required("Required"),
              password: Yup.string().required("Required").min(8),
            })}
          >
            <Form>
              <Input type="text" name="name" label="Name" />
              <Input type="text" name="email" label="Email" />
              <Input type="password" name="password" label="Password" />
              <div className="cont-btn">
                <Button type="submit">Register</Button>
              </div>
            </Form>
          </Formik>
        </Section>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Register;
