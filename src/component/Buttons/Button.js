import React from "react";

const sizeClassnames = {
  big: "py-4 px-8 text-sm",
  small: "px-2 py-1 text-sm",
  tiny: "px-1 text-sm",
};

const colorClassnames = {
  primary:
    "text-button bg-accent transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover",
  secondary:
    "text-button bg-secondary-900 hover:bg-secondary-700 disabled:text-primary-300",
  "secondary-800":
    "text-button bg-primary-800 hover:bg-primary-600 disabled:text-primary-300",
  "primary-300":
    "text-button bg-primary-700 hover:bg-primary-600 disabled:text-primary-300",
  transparent: "text-button bg-transparent",
  "accent-secondary":
    "text-button bg-secondary hover:bg-secondary-washed-out disabled:text-secondary-washed-out",
    TransparentOutline: "text-button bg-transparent",

};

function Button({
  children,
  size = "big",
  color = "primary",
  disabled,
  loading,
  icon,
  className = "",
  transition,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`py-3 rounded-2 shadow-xl flex outline-none focus:ring-4 focus:ring-${color} ${
        sizeClassnames[size]
      } ${transition ? `transition duration-200 ease-in-out` : ``} ${
        colorClassnames[color]
      } font-bold flex items-center justify-center ${className}`}
      data-testid="button"
      {...props}
    >
      <span className={loading ? "opacity-0" : `flex items-center`}>
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
      {loading ? (
        <span className={`absolute`}>
          {/* <Spinner size={size === "small" ? "2" : "4"} /> */}
        </span>
      ) : null}
    </button>
  );
}

export default Button;
