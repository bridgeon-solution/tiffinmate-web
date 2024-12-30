import { Button } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled(Button)`
  &.MuiButton-contained {
    background-color: #e6852c;
  }
    
     &.MuiButton-outlined {
    border-color: #e6852c;
    color: #e6852c;
  }
    &:hover {
    background-color: #e6852c;
    border-color: #e6852c;
    color: #fff;
  }
`;
export default StyledButton;

export const StyledEditButton = styled(Button)`
  &.MuiButton-contained {
    background-color: #f98e2b;
    border: none;
    border-radius: 5px;
    color: #fff;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    text-transform: none;
  }

  &:hover {
    background-color: #e6852c;
  }
`;

export const StyledMenuButton = styled(Button)`
  && {
    background-color: #f98e2b;
    color: #fff;
    font-weight: 500;
    padding: 10px 25px;
    text-transform: none;
    border-radius: 15px 0 15px 0;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    margin-top: 32px;
    &:hover {
      background-color: #f57c00;
    }
  }
`;
