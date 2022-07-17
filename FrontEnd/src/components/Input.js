import styled from "styled-components";
import { useField } from "formik";

const Control = styled.div`
  margin-bottom: 20px;
`;
const Label = styled.label`
  color: white;
  display: block;
  margin-bottom: 5px;
`;
const MyInput = styled.input`
  outline: none;
  padding: 8px;
  color: white;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 5px;
  background-color: rgba(0, 0, 0, 0.773);
`;

const ErrorMessage = styled.div`
  color: gray;
  font-size: 10px;
`;
const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Control>
      <Label>{label}</Label>
      <MyInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </Control>
  );
};

export default Input;
