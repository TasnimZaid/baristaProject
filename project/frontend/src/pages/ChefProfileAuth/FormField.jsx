import React from "react";

const FormField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  options,
  multiple,
}) => {
  const inputClasses = `w-full p-2 border rounded ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${inputClasses} h-24`}
          ></textarea>
        );
      case "file":
        return (
          <input
            type="file"
            id={name}
            name={name}
            onChange={onChange}
            className={inputClasses}
            multiple={multiple}
          />
        );
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-lg font-semibold mb-2">
        {label}
      </label>
      {renderInput()}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
