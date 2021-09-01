import React, { Fragment } from "react";
import ParameterInput from "./ParameterInput";
import styles from "./ParameterInput.module.css";

const ParametersVC = React.forwardRef((props, ref) => {
  const { ref1, ref2 } = ref;
  return (
    <Fragment>
      <ParameterInput
        className={styles["num-input"]}
        id="volume"
        labelName="Volume:"
        type="number"
        ref={ref1}
        defaultValue="1"
        min="0"
        step="0.01"
      />
      <ParameterInput
        className={styles["num-input"]}
        id="color"
        labelName="Color:"
        type="color"
        ref={ref2}
        min="0"
        defaultValue="#000000"
        step="0.01"
      />
    </Fragment>
  );
});

export default ParametersVC;
