import React, { Fragment, useState } from "react";
import Button from "../UI/Button";
import OkIcon from "../UI/OkIcon";
import EditIcon from "../UI/EditIcon";
import RepeatIcon from "../UI/RepeatIcon";
import DeleteIcon from "../UI/DeleteIcon";
import styles from "./ShopItem.module.css";
import EditItem from "./EditItem";

const ShopItem = (props) => {
  let parameters = [];
  if (props.parameters !== undefined) {
    parameters = Object.entries(props.parameters);
  }

  const [itemNotBeenEdited, setItemNotBeenEdited] = useState(true);

  const clickHandler = () => {
    if (props.type === "ACTIVE") {
      editItemHandler();
    }
  };

  const editItemHandler = () => {
    setItemNotBeenEdited(false);
  };

  const saveEditedItemHandler = (newName, newParameters, newAmount) => {
    props.onEditHandler(props.id, newName, newParameters, newAmount);
    setItemNotBeenEdited(true);
  };

  const showParameterHandler = (item) => {
    if (item[0] === "color") {
      return (
        <Fragment key={item[0]}>
          <span> color: </span>
          <span
            style={{
              backgroundColor: item[1],
              borderColor: "#C9C9C9",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </Fragment>
      );
    }
    return <span key={item[0]}>{`${item[0]}: ${item[1]}`}</span>;
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

  let type_style = "";
  if (props.type === "ACTIVE") {
    type_style = styles.active_list;
  }
  if (props.type === "COMPLETE") {
    type_style = styles.complete_list;
  }

  //

  if (itemNotBeenEdited) {
    return (
      <li className={`${styles.item} ${type_style}`} onClick={clickHandler}>
        <div className={styles["left-block"]}>
          <div className={styles["item-header"]}>
            <h4>{props.title}</h4>

            <div className={styles.amount}>x {props.amount}</div>
            {props.type === "ACTIVE" && (
              <div className={styles["btn-container"]}>
                <Button
                  className={styles["btn--secondary"]}
                  onClick={editItemHandler}
                >
                  <EditIcon size="14" />
                </Button>

                <Button
                  className={styles["btn--secondary--red"]}
                  onClick={props.onRemoveHandler}
                >
                  <DeleteIcon size="14" />
                </Button>
              </div>
            )}
          </div>
          <div>{parameters.map((item) => showParameterHandler(item))}</div>
        </div>

        {props.type === "ACTIVE" && (
          <Button
            className={styles["btn--main"]}
            onClick={props.onCompleteHandler}
          >
            <OkIcon />
          </Button>
        )}
        {props.type === "COMPLETE" && (
          <Button
            className={styles["btn--reuse"]}
            onClick={props.onReuseHandler}
          >
            <RepeatIcon size="24" />
          </Button>
        )}
      </li>
    );
  } else {
    return (
      <EditItem
        nameValue={props.title}
        amountValue={props.amount}
        parameters={parameters}
        onEditItem={saveEditedItemHandler}
      />
    );
  }
};

export default ShopItem;
