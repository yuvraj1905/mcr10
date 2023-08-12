import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { inventoryData } from "../data";

const inventoryContext = createContext();

const InventoryContextComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    data: localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : [],
    filter: "",
    sortBy: "",
    includeLowStockItem: false,
  });
  useEffect(() => {
    if (state?.data?.length < 1) {
      dispatch({ type: "dataSetter" });
      localStorage.setItem("data", JSON.stringify(inventoryData));
    } else {
      localStorage.setItem("data", JSON.stringify(state?.data));
    }
  }, [state?.data]);

  let finalData = [];
  const dataToRender = (() => {
    const { data, filter, sortBy, includeLowStockItem } = state;

    if (filter !== "") {
      finalData = data.filter(({ department }) => department === filter);
    } else finalData = [...data];

    if (includeLowStockItem) {
      finalData = finalData.filter(({ stock }) => stock <= 10);
    }

    if (sortBy) {
      if (sortBy === "Name") {
        finalData = [...finalData].sort((a, b) =>
          a?.name?.toLowerCase().localeCompare(b?.name?.toLowerCase())
        );
      } else if (sortBy === "Price") {
        finalData = [...finalData].sort((a, b) => a.price - b.price);
      } else {
        finalData = [...finalData].sort((a, b) => a.stock - b.stock);
      }
    }
  })();

  return (
    <inventoryContext.Provider value={{ state, dispatch, finalData }}>
      {children}
    </inventoryContext.Provider>
  );
};

const useInventory = () => useContext(inventoryContext);

export { InventoryContextComponent, useInventory };
