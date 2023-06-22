import { createContext, useContext } from 'react';

export const ToastContext = createContext({
  toastList: [],
  deleteToast: () => { },
});

export const useToastContext = () => {
  return useContext(ToastContext);
}

export default { ToastContext, useToastContext }