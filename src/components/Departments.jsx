import React from "react";
import { useInventory } from "../context/inventoryContext";
import NavigationPanel from "./NavigationPanel";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const {
    state: { data },
    dispatch,
  } = useInventory();
  const deps = [...new Set([...data.map((item) => item.department)])];
  const navigate = useNavigate();
  return (
    <div className="w-screen flex relative">
      <NavigationPanel />
      <section className="flex gap-4 p-8">
        {deps.map((dep) => (
          <span
            onClick={() => {
              dispatch({ type: "setFilter", payload: dep });
              navigate("/products");
            }}
            className="p-4 cursor-pointer h-16 shadow-md rounded-md bg-stone-200  "
          >
            {dep}
          </span>
        ))}
      </section>
    </div>
  );
};

export default Departments;
