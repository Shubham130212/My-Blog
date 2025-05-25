import React, { useId,useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// function Input(
//   { label, type = "text", className = "", ...props },
//   ref
// ) {
//     const id=useId()
//   return (
//     <div className="w-full">
//         {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
//         <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black  outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} ref={ref} {...props} id={id}></input>
//     </div>
//   )
// }

function Input(
  { label, type = "text", className = "", error, ...props },
  ref
) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  // Determine input type based on showPassword state for password fields
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full relative">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border ${
            error ? "border-red-500" : "border-gray-200"
          } w-full pr-10 ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default React.forwardRef(Input)
