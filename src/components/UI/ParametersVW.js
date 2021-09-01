import React, { Fragment } from "react";
import ParameterInput from "./ParameterInput";
import styles from "./ParameterInput.module.css";

const ParametersVW = React.forwardRef((props, ref) => {
  const { ref1 } = ref;
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
    </Fragment>
  );
});

export default ParametersVW;
