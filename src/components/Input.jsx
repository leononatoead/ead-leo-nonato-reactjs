import { useState } from "react";

import { Box } from "@chakra-ui/react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";

export default function Input({
  theme,
  id,
  type,
  watch,
  register,
  placeholder,
  label,
  error,
  defaultValue,
}) {
  const value = watch(id);

  const [cpfRegex, setCpfRegex] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const handleCPF = (value) => {
    const cpfValue = value.replace(/\D/g, "");

    if (cpfValue.length <= 3) {
      setCpfRegex(cpfValue);
    } else if (cpfValue.length <= 6) {
      setCpfRegex(cpfValue.slice(0, 3) + "." + cpfValue.slice(3));
    } else if (cpfValue.length <= 9) {
      setCpfRegex(
        cpfValue.slice(0, 3) +
          "." +
          cpfValue.slice(3, 6) +
          "." +
          cpfValue.slice(6),
      );
    } else {
      setCpfRegex(
        cpfValue.slice(0, 3) +
          "." +
          cpfValue.slice(3, 6) +
          "." +
          cpfValue.slice(6, 9) +
          "-" +
          cpfValue.slice(9, 11),
      );
    }
  };

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <Box
      className={`flex w-full flex-col gap-[9px] ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <label htmlFor={id} className="text-base leading-5">
        {label}
      </label>
      <Box
        className={`relative w-full overflow-hidden rounded-[4px] after:absolute after:bottom-0 after:left-1/2 after:h-[2px]  after:-translate-x-1/2 after:bg-cian after:content-[''] ${
          value ? "after:w-full" : "after:w-0"
        } animation hover:after:w-full ${
          error && "after:w-full after:bg-red-500"
        } ${theme === "light" ? "shadow-sm shadow-gray-900/50" : ""} ${
          type === "code" && "bg-gray-950"
        }`}
      >
        {type === "code" ? (
          <textarea
            {...register(id)}
            placeholder={placeholder}
            id={id}
            className={`w-full rounded-[4px] px-3 py-[5px] text-base leading-5 text-white outline-none ${
              theme === "dark" ? "bg-white" : "bg-gray-950"
            } resize-none placeholder:text-white/80`}
            rows={id === "comment" ? 3 : 10}
            autoComplete="false"
            defaultValue={defaultValue}
          ></textarea>
        ) : type === "textarea" ? (
          <textarea
            {...register(id)}
            placeholder={placeholder}
            id={id}
            className={`w-full rounded-[4px]  px-3 py-[5px] text-base leading-5 outline-none ${
              theme === "light" ? "bg-white" : "bg-white/5"
            } resize-none placeholder:text-gray-900`}
            rows={id === "comment" ? 3 : 10}
            autoComplete="false"
            defaultValue={defaultValue}
          ></textarea>
        ) : type === "number" ? (
          <input
            id={id}
            type="number"
            placeholder={placeholder}
            {...register(id, { valueAsNumber: true })}
            autoComplete="false"
            defaultValue={defaultValue}
            step={"any"}
            min={0}
            className={`w-full rounded-[4px]  px-3 py-[5px] text-base leading-5 outline-none ${
              theme === "light" ? "bg-white" : "bg-white/5"
            } placeholder:text-gray-900`}
          />
        ) : type === "email" ? (
          <input
            id={id}
            type="email"
            placeholder={placeholder}
            {...register(id)}
            autoComplete="false"
            defaultValue={defaultValue}
            className={`w-full rounded-[4px]  px-3 py-[5px] text-base leading-5 outline-none ${
              theme === "light" ? "bg-white" : "bg-white/5"
            } placeholder:text-gray-900`}
          />
        ) : type === "cpf" ? (
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            {...register(id)}
            autoComplete="false"
            className={`w-full rounded-[4px]  px-3 py-[5px] text-base leading-5 outline-none ${
              theme === "light" ? "bg-white" : "bg-white/5"
            } placeholder:text-gray-900`}
            value={cpfRegex}
            onChange={(e) => handleCPF(e.target.value)}
          />
        ) : (
          <input
            type={viewPassword ? "text" : type}
            {...register(id)}
            placeholder={placeholder}
            id={id}
            className={`w-full rounded-[4px]  px-3 py-[5px] text-base leading-5 outline-none ${
              theme === "light" ? "bg-white" : "bg-white/5"
            } placeholder:text-gray-900`}
            autoComplete="false"
            defaultValue={defaultValue}
          />
        )}

        {error && (
          <Box
            className={`absolute ${
              type === "password" ? "right-9" : "right-1"
            } top-1 text-red-500`}
          >
            <AiOutlineWarning size={20} className="text-red-500" />
          </Box>
        )}

        {type === "password" && (
          <button
            type="button"
            className={`absolute right-1 top-1 flex h-[22px] w-[26px] items-center justify-center rounded-[3px]
              
                 ${theme === "light" ? "bg-gray-150" : "bg-white/5"}
              `}
            onClick={toggleViewPassword}
          >
            {viewPassword ? (
              <AiOutlineEye
                className={` ${
                  theme === "light" ? "text-black/60" : "text-white/80"
                }`}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={` ${
                  theme === "light" ? "text-black/60" : "text-white/80"
                }`}
              />
            )}
          </button>
        )}
      </Box>
      <span className="-mt-1 text-small text-red-500">{error && error}</span>
    </Box>
  );
}
