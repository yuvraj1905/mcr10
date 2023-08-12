import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInventory } from "../context/inventoryContext";

const DetailPage = () => {
  const { state } = useInventory();
  const { p_id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const obj = state?.data?.find((item) => item.id == p_id);
    obj && setData({ ...obj });
  }, [state?.data]);

  const {
    id,
    name,
    description,
    department,
    sku,
    imageUrl,
    price,
    stock,
    supplier,
    delivered,
  } = data;
  return (
    <div className="flex min-w-[100vw] p-6 gap-10 min-h-[100vh] items-start">
      <button
        className="bg-stone-300 p-2 rounded-md hover:bg-stone-200"
        onClick={() => navigate("/products")}
      >
        Go back
      </button>
      <section className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">{name}</h1>
        <img src={imageUrl} className="h-[30%] w-[30%]" alt="" />
        <h3>Price: {price}</h3>
        <p>Stock :{stock}</p>
        <p>Department :{department}</p>
        <p>SKU :{sku}</p>
        <p>Delivered :{delivered}</p>
        <p>Descriptiom :{description}</p>
      </section>
    </div>
  );
};

export default DetailPage;
