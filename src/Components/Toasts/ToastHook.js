import { useState } from "react";

let _toastIndex = 0;

const useToasts = () => {
  const [toastList, setToastList] = useState([]);

  const showError = (message) => {
    const errToast = {
      id: _toastIndex,
      message: message,
      type: "error",
    };

    setToastList([...toastList, errToast]);
    _toastIndex++;
  };

  const showSuccess = (message) => {
    const successToast = {
      id: _toastIndex,
      message: message,
      type: "success",
    };

    setToastList([...toastList, successToast]);
    _toastIndex++;
  };

  const deleteToast = (id) => {
    setToastList([...toastList.filter((item) => item.id !== id)]);
  };

  return { showError, showSuccess, deleteToast, toastList };
};

export default useToasts;
