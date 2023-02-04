import React from "react";
function DropDownComponent({
  label,
  className,
  items,
  handleChange,
  value,
  placeholder,
  ...props
}) {
  return (
    <div>
      <p className="my-3">{label}</p>
      <select
        className={`${className} h-full px-3 rounded-5 border-primary-300 border text-black`}
        // value={value}
        required
        placeholder={label}
        onChange={handleChange}
        {...props}
      >
        <option value="">---Select {label}---</option>
        {items.map((item,index) => (
          <option value={item} key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default DropDownComponent;
