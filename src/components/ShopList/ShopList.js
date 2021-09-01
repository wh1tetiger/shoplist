import ShopItem from "./ShopItem";
import Button from "../UI/Button";
import styles from "./ShopList.module.css";

const ShopList = (props) => {
  const onListChange = (id) => {
    props.onListChange(id);
  };

  const onRemoveItem = (id) => {
    props.onRemoveItem(id);
  };

  const itemsList = props.items.map((item) => (
    <ShopItem
      key={item.id}
      id={item.id}
      title={item.title}
      parameters={item.parameters}
      amount={item.amount}
      type={props.type}
      onCompleteHandler={onListChange.bind(null, item.id)}
      onRemoveHandler={onRemoveItem.bind(null, item.id)}
      onReuseHandler={onListChange.bind(null, item.id)}
      onEditHandler={props.onEditItem}
      newItem={props.newItem}
    />
  ));

  return (
    <section className={styles.items}>
      {props.type === "COMPLETE" && (
        <div className={styles["completed-header"]}>
          <h3>Done:</h3>

          <Button onClick={props.onRemoveAll} className={styles["btn--remove"]}>
            Clear list
          </Button>
        </div>
      )}
      <ul>{itemsList}</ul>
    </section>
  );
};

export default ShopList;
