import React from "react";
import { FormGroup as ReFormGroup, Input } from "reactstrap";
import styled from "styled-components";

const StyledFormBox = styled(ReFormGroup)`
  &&& {
    .react-select__control,
    .react-single-select__control {
      ${({ error }) => (error ? "border-color: #dc3545 !important;" : "")}
    }
  }
`;

function FormBox({
  propsFormBox = {},
  propsInput = {},
  error = "",
  variant = "Input",
  label = "",
}) {
  return (
    <StyledFormBox error={error} {...propsFormBox} className="form-box">
      {variant === "Input" && <Input invalid={!!error} {...propsInput} />}
      {variant === "InputLabel" && (
        <>
          <label>{label}</label>
          <Input invalid={!!error} {...propsInput} />
        </>
      )}
    </StyledFormBox>
  );
}

export default FormBox;
