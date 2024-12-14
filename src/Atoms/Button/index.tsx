import { Button } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled(Button)`
    
    &.MuiButton-contained{
    background-color:#e6852c}
    

`
export default StyledButton;

export const StyledEditButton = styled(Button)`
&.MuiButton-contained{
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