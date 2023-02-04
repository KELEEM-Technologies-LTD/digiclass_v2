import React, { useState } from "react";

function PasswordInput({ icon, className, error, placeholder, ...props }) {
  const [show, setShow] = useState(false);
  const ring = error ? `ring-1 ring-secondary` : "";
  return (
    <div className={`${className}`}>
      <input
        data-testid="input"
        className={`focus:outline-none px-4 font-serif  bg-primary-100   w-full ${ring} `}
        type={show ? "text" : "password"}
        placeholder={placeholder}
      />

      <span
        onClick={() => setShow(!show)}
        className="flex justify-center items-center px-4"
      >
        {show ? (
          <i className="fa fa-eye text-sm"></i>
        ) : (
          <i className="fa fa-eye-slash text-sm"></i>
        )}
      </span>
    </div>
  );
}

export default PasswordInput;
