import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";

export default function OrderInput({
  size,
  error,
  register,
  watch,
  defaultValue,
}) {
  const [value, setValue] = useState(defaultValue || "");

  const handleInputChange = (event) => {
    let numericValue = parseInt(event.target.value, 10);
    if (!isNaN(numericValue) && numericValue <= 999) {
      setValue(numericValue);
    }
  };

  return (
    <Box className={`flex flex-col gap-[9px]`}>
      <label htmlFor={"order"} className="text-base leading-5">
        Ordem
      </label>
      <Box
        className={`relative ${size} overflow-hidden rounded-[4px] after:absolute after:bottom-0 after:left-1/2 after:h-[2px]  after:-translate-x-1/2 after:bg-cian after:content-[''] ${
          watch("order") ? "after:w-full" : "after:w-0"
        } animation hover:after:w-full ${
          error && "after:w-full after:bg-red-500"
        } shadow-sm shadow-gray-900/50 `}
      >
        <input
          id={"order"}
          type="number"
          placeholder={"0"}
          {...register("order", { valueAsNumber: true })}
          className={`w-full rounded-[4px] bg-white px-3 py-[5px] text-base leading-5 outline-none placeholder:text-gray-900`}
          autoComplete="false"
          min={0}
          max={999}
          step={1}
          value={value}
          onChange={handleInputChange}
        />
        {error && (
          <Box className={`absolute right-1 top-1 text-red-500`}>
            <AiOutlineWarning size={20} className="text-red-500" />
          </Box>
        )}
      </Box>
      <span className="-mt-1 text-small text-red-500">
        {error && "A ordem precisa ser um número."}
      </span>
    </Box>
  );
}
