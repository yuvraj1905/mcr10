import React, { useState } from "react";
import { useInventory } from "../context/inventoryContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const Products = () => {
  const {
    state: { includeLowStockItem, data, filter, sortBy },
    dispatch,
    finalData,
  } = useInventory();

  const [newAddDept, setNewAddDept] = useState("Kitchen");
  const [newAddInput, setNewAddInput] = useState("");
  const [newAddInputDesc, setNewAddInputDesc] = useState("");
  const [newAddPrice, setNewAddPrice] = useState(0);
  const [newAddStock, setNewAddStock] = useState(0);
  const [newAddSKU, setNewAddSKU] = useState("");
  const [newAddSupplier, setNewAddSupplier] = useState("");
  const [newAddImgUrl, setNewAddImgUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const cancelHandler = () => {
    setNewAddDept("");
    setNewAddInput("");
    setNewAddInputDesc("");
    setNewAddPrice(0);
    setNewAddStock(0);
    setNewAddSKU("");
    setNewAddImgUrl("");
    setShowModal(false);
  };
  const addNewStockHandler = () => {
    if (
      newAddInput &&
      newAddInputDesc &&
      newAddPrice &&
      newAddStock &&
      newAddSKU &&
      newAddSupplier &&
      newAddImgUrl
    ) {
      dispatch({
        type: "newObjAdder",
        payload: {
          id: uuid(),
          department: newAddDept,
          name: newAddInput,
          description: newAddInputDesc,
          price: newAddPrice,
          stock: newAddStock,
          sku: newAddSKU,
          supplier: newAddSupplier,
          delivered: 0,
          imageUrl: newAddImgUrl,
        },
      });
      cancelHandler();
    } else alert("Please CORRECTLY fill all fields");
  };
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${
          showModal ? "blurBg" : "blurBgNone"
        } px-8 my-2  relative box-border `}
      >
        <button
          className="bg-stone-300 p-2 rounded-md hover:bg-stone-200"
          onClick={() => navigate("/departments")}
        >
          Go back
        </button>
        <section className="flex py-2 justify-between items-center">
          <h2 className="font-bold">Products</h2>
          <select
            value={filter}
            onChange={(e) =>
              dispatch({ type: "setFilter", payload: e.target.value })
            }
          >
            <option value="All">All Departments</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Clothing">Clothing</option>
            <option value="Toys">Toys</option>
          </select>

          <span className="flex items-center gap-1">
            <input
              type="checkbox"
              id="cb"
              checked={includeLowStockItem}
              onChange={() =>
                dispatch({
                  type: "includeLowStockItemSetter",
                  payload: !includeLowStockItem,
                })
              }
            />
            <label htmlFor="cb">Low Stock items</label>
          </span>
          <select
            value={sortBy}
            onChange={(e) =>
              dispatch({ type: "sortBySetter", payload: e.target.value })
            }
          >
            <option value="" disabled>
              Sort BY:
            </option>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
            <option value="Stock">Stock</option>
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="bg-stone-300 hover:bg-stone-200 p-2 px-4 font-bold rounded-md"
          >
            New
          </button>
        </section>

        <table className="w-[100%] relative">
          <thead className="relative">
            <tr>
              <th className="bg-stone-200 p-2  border border-black w-[20%] text-black ">
                Image
              </th>
              <th className="bg-stone-200 w-[10%] p-2 border-black border text-black ">
                Name
              </th>
              <th className="bg-stone-200 w-[30%] p-2 border-black border text-black ">
                Description
              </th>
              <th className="bg-stone-200 p-2 border-black border w-[10%] text-black ">
                Price
              </th>
              <th className="bg-stone-200 p-2 border-black border w-[10%] text-black ">
                STock
              </th>
              <th className="bg-stone-200 p-2 border-black border w-[20%] text-black ">
                Supplier
              </th>
            </tr>
          </thead>
          <tbody>
            <TableComponent data={finalData} />
          </tbody>
        </table>
      </div>
      <section
        style={{ display: !showModal ? "none" : "" }}
        className="modal w-[40%] relative p-4 bg-stone-200 flex flex-col gap-4"
      >
        <h2 className="font-bold">Add new product</h2>
        <span className="flex flex-col w-[100%]">
          <p>Department</p>
          <select
            onChange={(e) => setNewAddDept(e.target.value)}
            className="w-[100%]"
          >
            <option value="" disabled>
              Select Department
            </option>
            <option value="Kitchen">Kitchen</option>
            <option value="Clothing">Clothing</option>
            <option value="Toys">Toys</option>
          </select>
        </span>
        <span className="flex flex-col w-[100%]">
          <p>Name :</p>
          <input
            className="w-[100%]"
            type="text"
            value={newAddInput}
            onChange={(e) => setNewAddInput(e.target.value)}
          />
        </span>
        <span className="flex flex-col w-[100%]">
          <p>Supplied by :</p>
          <input
            className="w-[100%]"
            type="text"
            value={newAddSupplier}
            onChange={(e) => setNewAddSupplier(e.target.value)}
          />
        </span>
        <span className="flex flex-col w-[100%]">
          <p>Description :</p>
          <input
            className="w-[100%]"
            type="text"
            value={newAddInputDesc}
            onChange={(e) => setNewAddInputDesc(e.target.value)}
          />
        </span>
        <span className="flex flex-col w-[100%]">
          <p>Price :</p>
          <input
            className="w-[100%]"
            type="number"
            value={newAddPrice}
            onChange={(e) => setNewAddPrice(e.target.value)}
          />
        </span>
        <span className="flex flex-col w-[100%]">
          <p>Stock :</p>
          <input
            className="w-[100%]"
            type="number"
            value={newAddStock}
            onChange={(e) => setNewAddStock(e.target.value)}
          />
        </span>
        <span className="flex flex-col w-[100%]">
          <p>SKU :</p>
          <input
            className="w-[100%]"
            type="input"
            value={newAddSKU}
            onChange={(e) => setNewAddSKU(e.target.value)}
          />
        </span>
        <span className="flex flex-col w-[100%]">
          <p>Delivered :</p>
          <input className="w-[100%]" type="number" value={0} />
        </span>
        <span className="flex flex-col w-[100%]">
          <p>Image url :</p>
          <input
            className="w-[100%]"
            type="text"
            value={newAddImgUrl}
            onChange={(e) => setNewAddImgUrl(e.target.value)}
          />
        </span>

        <span className="flex w-[100%] justify-evenly">
          <button
            onClick={addNewStockHandler}
            className="p-2 px-4 rounded-md flex bg-stone-500 text-white"
          >
            ADD
          </button>
          <button
            onClick={cancelHandler}
            className="p-2 px-4 rounded-md flex bg-stone-500 text-white"
          >
            Cancel
          </button>
        </span>
      </section>
    </>
  );
};

export default Products;

export const TableComponent = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      {data.map((singleRow) => {
        const { id, name, description, imageUrl, price, stock, supplier } =
          singleRow;
        return (
          <tr key={id} className="max-h-[160px] border-2 border-t-0 relative">
            <th className="max-h-[100%] relative">
              <img
                onClick={() => navigate(`/details/${id}`)}
                className="h-[100%] w-[100%] p-2 cursor-pointer object-cover"
                src={imageUrl}
                alt=""
              />
            </th>
            <th
              className="border border-r-dotted cursor-pointer underline"
              onClick={() => navigate(`/details/${id}`)}
            >
              {name}
            </th>
            <th className="border border-r-dotted ">{description}</th>
            <th className="border border-r-dotted ">$ {price}</th>
            <th className="border border-r-dotted ">{stock}</th>
            <th className="border border-r-dotted ">{supplier}</th>
          </tr>
        );
      })}
    </>
  );
};
