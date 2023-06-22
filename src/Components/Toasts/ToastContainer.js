import { useEffect } from 'react';

function Toast({ index, classType, toast, onDelete }) {
  return (
    <div
      key={index}
      className={`toast show align-items-center ${classType} border-0`}
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className='d-flex'>
        <div className='toast-body'>{toast.message}</div>
        <button
          type='button'
          className='btn-close btn-close-white me-2 m-auto'
          data-bs-dismiss='toast'
          aria-label='Close'
          role='button'
          onClick={() => onDelete(toast.id)}
        ></button>
      </div>
    </div>
  );
}

export default function ToastContainer({ toasts, deleteToast }) {
  let autoDelete = true;
  let autoDeleteTime = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toasts.length) {
        deleteToast(toasts[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [toasts]);

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      className='position-relative'
    >
      <div
        className='toast-container position-fixed top-0 start-50 translate-middle-x p-3 mt-4'
        id='toastPlacement'
      >
        {toasts.map((toast, index) => {
          const classType =
            toast.type === 'success'
              ? 'text-bg-success'
              : 'error'
                ? 'text-bg-danger'
                : 'text-bg-info';
          return (
            <Toast
              key={index}
              index={index}
              classType={classType}
              toast={toast}
              onDelete={deleteToast}
            />
          );
        })}
      </div>
    </div>
  );
}