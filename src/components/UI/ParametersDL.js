import React, { Fragment } from "react";
import ParameterInput from "./ParameterInput";
import styles from "./ParameterInput.module.css";

const ParametersDL = React.forwardRef((props, ref) => {
  const { ref1, ref2 } = ref;
  return (
    <Fragment>
      <ParameterInput
        className={styles["num-input"]}
        id="diameter"
        labelName="Diameter:"
        type="number"
        ref={ref1}
        defaultValue="1"
        min="0"
        step="0.01"
      />
      <ParameterInput
        className={styles["num-input"]}
        id="length"
        labelName="Length:"
        type="number"
        ref={ref2}
        defaultValue="1"
        min="0"
        step="0.01"
      />
    </Fragment>
  );
});

export default ParametersDL;
