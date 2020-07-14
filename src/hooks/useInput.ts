import { useState } from "react";

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: any) => setValue(e.target.value);
  console.log(value);
  return { value, setValue, onChange };
};

export default useInput;
