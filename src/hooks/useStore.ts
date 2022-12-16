import { useContext } from "react";
import { StoreContext } from "..";

const useStore = () => {
  return useContext(StoreContext);
}

export default useStore;