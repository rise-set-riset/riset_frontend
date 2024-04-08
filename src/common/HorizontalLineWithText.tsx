import styled from "styled-components";

const HorizontalLineWithText = styled.div`
  display: flex;
  align-items: center;
  color: #c4c4c4;
  font-size: 14px;
  height: 20px;

  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: calc(50% - 20px);
    height: 1px;
    background-color: #c4c4c4;
  }

  &:before {
    left: 0;
    width: 40%;
    top: 50%;
    margin-right: 10px;
  }

  &:after {
    right: 0;
    width: 40%;
    top: 50%;
    margin-left: 10px;
  }
`;

export default HorizontalLineWithText;