import React from "react";
import { NavLink } from "react-router-dom";

const NavigationPanel = () => {
  const navlinkStyler = ({ isActive }) => ({
    color: isActive ? "white" : "grey",
    fontWeight: isActive ? 800 : 500,
  });
  return (
    <section className="flex flex-col w-[10%] relative py-4  text-white bg-stone-800 min-h-[100vh] gap-4">
      {["/", "Departments", "Products"].map((tag) => (
        <NavLink
          className="w-[100%]  px-4 py-2 cursor-pointer hover:bg-stone-700"
          to={tag === "/" ? "/" : `/${tag.toLowerCase()}`}
          style={navlinkStyler}
        >
          {tag === "/" ? "Dashboard" : tag}
        </NavLink>
      ))}
    </section>
  );
};

export default NavigationPanel;
