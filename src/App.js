import React, { useCallback, useState, useEffect } from "react";
import ShopList from "./components/ShopList/ShopList";
import AddItem from "./components/ShopList/AddItem";
import Button from "./components/UI/Button";
import Logo from "./logo.svg";
import styles from "./App.module.css";
import Modal from "./components/UI/Modal";

const DUMMY_ACTIVE_ITEMS = [
  {
    id: "t1",
    title: "Screws",
    parameters: { diameter: 3, length: 6.5 },
    amount: 100,
  },
  {
    id: "t2",
    title: "Nuts",
    parameters: { size: 6 },
    amount: 200,
  },
  {
    id: "t3",
    title: "Paint",
    parameters: { volume: 0.5, color: "#FF00EA" },
    amount: 6,
  },
  { id: "t4", title: "Screwdriver", amount: 1 },
];
const DUMMY_COMPLETE_ITEMS2 = [
  {
    id: "c1",
    title: "Lack",
    parameters: { volume: 1, color: "#000000" },
    amount: 1,
  },
  {
    id: "c2",
    title: "Fundamentbeton",
    parameters: { volume: 25 },
    amount: 4,
  },
  {
    id: "c3",
    title: "Dielen",
    parameters: { length: 200, breadth: 14, height: 2.4 },
    amount: 10,
  },
  {
    id: "c4",
    title: "Wetterschutzfarbe",
    parameters: { volume: 1, color: "#180255" },
    amount: 2,
  },
];

let idcounter = 0;

function App() {
  const [activeItems, setActiveItems] = useState(DUMMY_ACTIVE_ITEMS);
  const [completeItems, setCompleteItems] = useState(DUMMY_COMPLETE_ITEMS2);
  const [addItemactive, setAddItemActive] = useState(false);
  const [completedIsEmpty, setCompletedIsEmpty] = useState(false);
  const [items, setItems] = useState({});

  const fetchItemsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-http-d2b5e-default-rtdb.europe-west1.firebasedatabase.app/items.json"
      );
      if (!response.ok) {
        throw new Error("Database is not responding!");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchItemsHandler();
  }, [fetchItemsHandler]);

  const addItemHandler = (name, parameters, amount) => {
    setActiveItems((activeItemsList) => {
      return [
        { id: idcounter, title: name, amount: amount, parameters: parameters },
        ...activeItemsList,
      ];
    });
    idcounter += 1;
    setAddItemActive(false);
  };

  const onCancelHandler = () => {
    setAddItemActive(false);
  };

  const editItemHandler = (id, name, parameters, amount) => {
    const currentActiveList = [...activeItems];

    const editedItemIndex = currentActiveList.findIndex(
      (item) => item.id === id
    );
    currentActiveList[editedItemIndex] = {
      id: id,
      title: name,
      amount: amount,
      parameters: parameters,
    };

    setActiveItems((activeItemsList) => {
      return [...currentActiveList];
    });
  };

  const moveToCompleteItemsHandler = (id) => {
    const selectedItem = activeItems.find((item) => item.id === id);
    const updatedItemsList = activeItems.filter((item) => item.id !== id);
    setActiveItems((activeItemsList) => {
      return [...updatedItemsList];
    });
    setCompleteItems((completedItemsList) => {
      return [selectedItem, ...completedItemsList];
    });
    setCompletedIsEmpty(false);
  };

  const removeItemHandler = (id) => {
    const updatedItemsList = activeItems.filter((item) => item.id !== id);
    setActiveItems((activeItemsList) => {
      return [...updatedItemsList];
    });
  };
  const removeAllItemsHandler = () => {
    setCompleteItems([]);
    setCompletedIsEmpty(true);
  };

  const openAddIemHandler = () => {
    setAddItemActive(true);
  };

  const restoreItemHandler = (id) => {
    const selectedItem = completeItems.find((item) => item.id === id);
    const updatedItemsList = completeItems.filter((item) => item.id !== id);
    setCompleteItems((completedItemsList) => {
      return [...updatedItemsList];
    });
    setActiveItems((activeItemsList) => {
      return [selectedItem, ...activeItemsList];
    });
  };

  return (
    <main>
      <header>
        <div className={styles.header}>
          <h1>
            <img className={styles.logo} src={Logo} alt="" />
            DIY ShopList
          </h1>
          <Button
            onClick={openAddIemHandler}
            className={styles["btn--plus"]}
            type="button"
          >
            Add item
          </Button>
        </div>

        {addItemactive && (
          <Modal>
            <AddItem
              onAddItem={addItemHandler}
              onCancel={onCancelHandler}
              items={items}
            />
          </Modal>
        )}
      </header>

      <ShopList
        type="ACTIVE"
        items={activeItems}
        onListChange={moveToCompleteItemsHandler}
        onRemoveItem={removeItemHandler}
        onEditItem={editItemHandler}
      />
      {!completedIsEmpty && (
        <ShopList
          type="COMPLETE"
          items={completeItems}
          onRemoveItem={removeItemHandler}
          onListChange={restoreItemHandler}
          onRemoveAll={removeAllItemsHandler}
        />
      )}
      <footer>
        <div className={styles.footer}>
          <span>
            &copy; 2021
            <a href="https://wh1tetiger.github.io/">WH1TETIGER.GITHUB.IO</a>
          </span>
        </div>
      </footer>
    </main>
  );
}

export default App;
