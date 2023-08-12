import React from "react";
import NavigationPanel from "./NavigationPanel";
import { useInventory } from "../context/inventoryContext";

const Homes = () => {
  const {
    state: { data },
  } = useInventory();
  const stockData = data.reduce(
    (acc, { stock, delivered }) => ({
      totalStock: acc.totalStock + stock,
      delivered: acc.delivered + delivered,
      lowStock: stock <= 10 ? acc.lowStock + 1 : acc.lowStock,
    }),
    {
      totalStock: 0,
      delivered: 0,
      lowStock: 0,
    }
  );
  return (
    <div className="w-screen flex relative">
      <NavigationPanel />
      <section className="flex gap-6 p-6 ">
        <span className="p-4 h-20  shadow-md rounded-md bg-stone-200  flex flex-col items-center">
          <h3 className="font-bold text-green-600">{stockData?.totalStock}</h3>
          <p>Total Stock</p>
        </span>
        <span className="p-4 h-20  shadow-md rounded-md bg-stone-200 flex flex-col items-center ">
          <h3 className=" font-bold text-yellow-600">{stockData?.delivered}</h3>
          <p>Total Delivered</p>
        </span>
        <span className="p-4 h-20 shadow-md rounded-md  bg-stone-200 flex flex-col items-center ">
          <h3 className="text-red-600 font-bold">{stockData?.lowStock}</h3>
          <p>Low Stock Items</p>
        </span>
      </section>
    </div>
  );
};

export default Homes;
