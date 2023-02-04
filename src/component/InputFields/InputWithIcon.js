import React from "react";

function InputWithIcon({
  icon,
  icon1,
  className,
  type,
  error,
  placeholder,
  disabled,
  ...props
}) {
  const ring = error ? `ring-1 ring-secondary` : "";
  return (
    <div className={` ${className} ${disabled ? "bg-primary-200" : ""} `}>
      {icon1 ? (
        <span className="flex justify-center items-center px-4">
          <img src={icon1} alt="e0m" />
        </span>
      ) : null}
      <input
        data-testid="input"
        className={`focus:outline-none font-serif border-primary-300 px-4 bg-primary-100  ${
          disabled ? "bg-primary-200" : ""
        }   w-full ${ring} `}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {icon ? (
        <span className="flex justify-center items-center px-4">
          <i className={icon}></i>
        </span>
      ) : null}
    </div>
  );
}

export default InputWithIcon;
