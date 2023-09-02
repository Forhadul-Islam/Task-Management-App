/* eslint-disable react/prop-types */

export const Backdrop = ({ children, onclick }) => {
  return (
    <div
      onClick={onclick}
      className="fixed top-0 left-0 h-screen w-screen bg-zinc-500/60  flex items-center justify-center"
    >
      {children}
    </div>
  );
};

const Modal = ({ handleClose, children }) => {
  return (
    <Backdrop onclick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[25rem] ring-1 ring-zinc-100  bg-white m-auto p-5 rounded-md shadow-md"
      >
        {children}
      </div>
    </Backdrop>
  );
};

export default Modal;
