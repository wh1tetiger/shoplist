import { useEffect, useRef, useState } from "react";
import styles from "./AddItem.module.css";
import Button from "../UI/Button";
import ParametersDL from "../UI/ParametersDL";
import ParametersLBH from "../UI/ParameterLBH";
import ParametersS from "../UI/ParametersS";
import ParametersVW from "../UI/ParametersVW";
import ParametersVC from "../UI/ParametersVC";
import AddIcon from "../UI/AddIcon";
import CancelIcon from "../UI/CancelIcon";
import ParameterInput from "../UI/ParameterInput";

const AddItem = (props) => {
  const [nameFound, setNameFound] = useState("");

  const nameInputRef = useRef();
  const amountInputRef = useRef();
  const lengthInputRef = useRef();
  const diameterInputRef = useRef();
  const breadthInputRef = useRef();
  const heightInputRef = useRef();
  const volumeInputRef = useRef();
  const sizeInputRef = useRef();
  const colorInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const inputType = {
    DL: <ParametersDL ref={{ ref1: diameterInputRef, ref2: lengthInputRef }} />,
    LBH: (
      <ParametersLBH
        ref={{
          ref1: lengthInputRef,
          ref2: breadthInputRef,
          ref3: heightInputRef,
        }}
      />
    ),
    VW: (
      <ParametersVW
        ref={{
          ref1: volumeInputRef,
        }}
      />
    ),
    S: (
      <ParametersS
        ref={{
          ref1: sizeInputRef,
        }}
      />
    ),
    VC: (
      <ParametersVC
        ref={{
          ref1: volumeInputRef,
          ref2: colorInputRef,
        }}
      />
    ),
  };

  const items = props.items;

  let parameterTypes = {
    DL: inputType.DL,
    LBH: inputType.LBH,
    VW: inputType.VW,
    S: inputType.S,
    VC: inputType.VC,
  };

  const checkInputHandler = (event) => {
    const curentInput = event.target.value.toLowerCase();
    if (curentInput in items) {
      setNameFound(curentInput);
    } else {
      setNameFound("");
    }
  };

  const addItemHandler = (event) => {
    event.preventDefault();

    const inputName = nameInputRef.current.value;
    nameInputRef.current.value = "";
    const inputAmount = amountInputRef.current.value;
    amountInputRef.current.value = "";
    let inputParameters = {};
    if (nameFound) {
      switch (items[nameFound]) {
        case "DL":
          inputParameters = {
            diameter: diameterInputRef.current.valueAsNumber,
            length: lengthInputRef.current.valueAsNumber,
          };
          diameterInputRef.current.value = "";
          lengthInputRef.current.value = "";
          break;
        case "LBH":
          inputParameters = {
            length: lengthInputRef.current.valueAsNumber,
            breadth: breadthInputRef.current.valueAsNumber,
            height: heightInputRef.current.valueAsNumber,
          };
          lengthInputRef.current.value = "";
          breadthInputRef.current.value = "";
          heightInputRef.current.value = "";
          break;
        case "S":
          inputParameters = {
            size: sizeInputRef.current.valueAsNumber,
          };
          sizeInputRef.current.value = "";

          break;
        case "VW":
          inputParameters = {
            volume: volumeInputRef.current.valueAsNumber,
          };
          volumeInputRef.current.value = "";

          break;
        case "VC":
          inputParameters = {
            volume: volumeInputRef.current.valueAsNumber,
            color: colorInputRef.current.value,
          };
          volumeInputRef.current.value = "";
          colorInputRef.current.value = "#000000";
          break;
        default:
      }
    }

    props.onAddItem(inputName, inputParameters, inputAmount);
  };

  return (
    <form onSubmit={addItemHandler} className={styles["add-item"]}>
      <ParameterInput
        className={styles["add-name"]}
        onChange={checkInputHandler}
        id="name"
        labelName="Item:"
        type="text"
        ref={nameInputRef}
        required
        placeholder="Try this: plate, cement, screws, paint, etc."
      />

      {nameFound && parameterTypes[items[nameFound]]}
      <ParameterInput
        className={styles["add-amount"]}
        id="amount"
        labelName="Amount:"
        type="number"
        ref={amountInputRef}
        required
        defaultValue="1"
        min="1"
        step="1"
      />

      <div className={styles["button-block"]}>
        <Button
          id="cancel"
          onClick={props.onCancel}
          className={styles["btn--cancel"]}
          type="button"
        >
          <CancelIcon size="20" />
        </Button>
        <Button id="add" className={styles["btn--add"]} type="submit">
          <AddIcon size="20" />
        </Button>
      </div>
    </form>
  );
};

export default AddItem;
