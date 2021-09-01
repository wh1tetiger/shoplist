import React from "react";
import { Fragment } from "react";
import ParameterInput from "./ParameterInput";
import styles from "./ParameterInput.module.css";

const ParametersLBH = React.forwardRef((props, ref) => {
  const { ref1, ref2, ref3 } = ref;

  return (
    <Fragment>
      <ParameterInput
        className={styles["num-input"]}
        id="length"
        labelName="Length:"
        type="number"
        ref={ref1}
        defaultValue="1"
        min="0"
        step="0.01"
      />
      <ParameterInput
        className={styles["num-input"]}
        id="breadth"
        labelName="Breadth:"
        type="number"
        ref={ref2}
        defaultValue="1"
        min="0"
        step="0.01"
      />
      <ParameterInput
        className={styles["num-input"]}
        id="height"
        labelName="Height:"
        type="number"
        ref={ref3}
        defaultValue="1"
        min="0"
        step="0.01"
      />
    </Fragment>
  );
});

export default ParametersLBH;
