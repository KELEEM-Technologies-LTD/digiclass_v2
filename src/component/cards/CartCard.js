import React from "react";

function CartCard({ item, manageCart }) {
  const { image, title } = item;
  return (
    <div
      style={{ border: "1px solid #E2E8F0" }}
      className="flex justify-between rounded-5 my-4 flex-grow md:max-h-32 bg-white md:p-3 items-center"
    >
      <div className="flex">
        <img src={image} width={100} alt="cartitem" />
        <div className="flex flex-col justify-between ml-6">
          <div>
            <p className="text-2xl font-bold text-black">{title}</p>
            <p>By Sebastian Livingstone, Software Engineer</p>
          </div>
          <div className="flex">
            <p className="font-bold text-secondary-600">GHS 12.99</p>
            <p className=" line-through ml-6">GHS 12.99</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button onClick={() => manageCart("REMOVE_FROM_CART", item)}>
          <p className="underline text-accent">remove</p>
        </button>
        <p className="underline text-secondary-600">Save for later</p>
      </div>
    </div>
  );
}

export default CartCard;
