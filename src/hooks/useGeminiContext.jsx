import { useContext } from "react";
import { GeminiContext } from "../context/GeminiContext";

const useGeminiContext = () => {
  const context = useContext(GeminiContext);

  if(!context) {
    throw Error('useGeminiContext must be used inside GeminiContextProvider');
  }

  return context
};

export default useGeminiContext;
