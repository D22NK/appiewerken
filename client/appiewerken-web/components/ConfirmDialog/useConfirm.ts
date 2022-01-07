import { useContext } from "react";
import ConfirmContext from "./context";
import { HIDE_CONFIRM, SHOW_CONFIRM } from "./reducer";

let resolveCallback: any;

function useConfirm() {
  const [confirmState, dispatch] = useContext(ConfirmContext);
  const onConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };
  const onCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };
  const confirm = (title: any, text: any) => {
    dispatch({
      type: SHOW_CONFIRM,
      payload: {
        text,
        title,
      },
    });
    return new Promise((res, rej) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    dispatch({
      type: HIDE_CONFIRM,
    });
  };

  return { confirm, onConfirm, onCancel, confirmState };
}
export default useConfirm;
