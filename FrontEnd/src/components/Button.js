import styled from "styled-components";

const Button = styled.button`
    margin-right: 10px;
    height: 2rem;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 1rem;
    font-weight: 12px;
    border-radius: 10px;
    background-color: white;
    color: black;
    border: solid 2px white;
    cursor: pointer;
    transition: color 0.5s;
    transition: background-color 0.5s, border 0.5s;
    text-decoration: none;
  &:hover{
    color: rgb(94, 3, 136);
    background-color: black;
    transition: color 0.5s;
    transition: background-color 0.5s, border 0.5s;
    border: solid 2px black;
  }
`;

export default Button;
