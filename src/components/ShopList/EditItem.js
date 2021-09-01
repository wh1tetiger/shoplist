import { useRef } from "react";
import styles from "./EditItem.module.css";
import Button from "../UI/Button";
import ParameterInput from "../UI/ParameterInput";
import React from "react";

const EditItem = (props) => {
  const nameEditRef = useRef();
  const amountEditRef = useRef();
  const lengthInputRef = useRef();
  const diameterInputRef = useRef();
  const breadthInputRef = useRef();
  const heightInputRef = useRef();
  const colorInputRef = useRef();
  const volumeInputRef = useRef();
  const sizeInputRef = useRef();

  let editedParameters = {};

  const paramSelector = (itemKey) => {
    switch (itemKey) {
      case "length":
        editedParameters[itemKey] = [lengthInputRef, "number"];
        return lengthInputRef;
      case "breadth":
        editedParameters[itemKey] = [breadthInputRef, "number"];
        return breadthInputRef;
      case "height":
        editedParameters[itemKey] = [heightInputRef, "number"];
        return heightInputRef;
      case "diameter":
        editedParameters[itemKey] = [diameterInputRef, "number"];
        return diameterInputRef;
      case "size":
        editedParameters[itemKey] = [sizeInputRef, "number"];
        return sizeInputRef;
      case "volume":
        editedParameters[itemKey] = [volumeInputRef, "number"];
        return volumeInputRef;
      case "color":
        editedParameters[itemKey] = [colorInputRef, "color"];
        return colorInputRef;
      default:
    }
  };

  const typeSelector = (item) => {
    const type = typeof item;
    if (type === "string") {
      if (item.charAt(0) === "#") {
        return "color";
      }
    }
    return type;
  };

  // const paramNameTranslator = (itemKey) => {
  //   switch (itemKey) {
  //     case "length":
  //       return "Länge:";
  //     case "breadth":
  //       return "Breite:";
  //     case "height":
  //       return "Höhe:";
  //     case "diameter":
  //       return "Dm.:";
  //     case "color":
  //       return "Farbe:";
  //     default:
  //   }
  // };

  const editItemHandler = (event) => {
    event.preventDefault();

    const editedName = nameEditRef.current.value;
    const editedAmount = amountEditRef.current.value;

    let parametersToSend = {};

    for (const parameter in editedParameters) {
      if (editedParameters[parameter][1] === "number") {
        parametersToSend[parameter] =
          editedParameters[parameter][0].current.valueAsNumber;
      } else {
        parametersToSend[parameter] =
          editedParameters[parameter][0].current.value;
      }
    }
    props.onEditItem(editedName, parametersToSend, editedAmount);
  };

  return (
    <li className={styles.item}>
      <form onSubmit={editItemHandler} className={styles["edit_item"]}>
        <ParameterInput
          htmlFor="name-edit"
          id="name-edit"
          type="text"
          ref={nameEditRef}
          defaultValue={props.nameValue}
          labelName="Item:"
        />

        <div className={styles["parameters-block"]}>
          {props.parameters &&
            props.parameters.map((item) => (
              <ParameterInput
                key={item[0]}
                htmlFor="name-edit"
                labelName={`${item[0]}:`}
                defaultValue={item[1]}
                type={typeSelector(item[1])}
                ref={paramSelector(item[0])}
                min="0"
                step="0.01"
              />
            ))}
        </div>

        <ParameterInput
          htmlFor="name-edit"
          labelName="Amount:"
          id="amount-edit"
          type="number"
          ref={amountEditRef}
          defaultValue={props.amountValue}
          min="1"
          step="1"
        />

        <Button className={styles["btn--ok"]} type="submit">
          Ok
        </Button>
      </form>
    </li>
  );
};

export default EditItem;
