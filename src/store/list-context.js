import React from "react";

const ListContext = React.createContext({
  activeItems: [],
  completeItems: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  editItem: (id) => {},
  moveToCompleted: (id) => {},
});

export default ListContext;
