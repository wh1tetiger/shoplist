import React from "react";
import styles from "./ParameterInput.module.css";

const ParameterInput = React.forwardRef((props, ref) => {
  return (
    <div className={`${styles["input-block"]} ${props.className}`}>
      <label htmlFor={props.id}>{props.labelName}</label>
      <input
        onChange={props.onChange}
        id={props.id}
        type={props.type}
        ref={ref}
        defaultValue={props.defaultValue}
        required={props.required}
        placeholder={props.placeholder}
        min={props.min}
        step={props.step}
      />
    </div>
  );
});

export default ParameterInput;
