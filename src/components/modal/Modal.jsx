/* eslint-disable react/prop-types */

import HorizontalLine from "../ui/HorizontalLine";

/* eslint-disable react/no-unknown-property */
const Backdrop = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 left-0 h-screen w-screen bg-black/30 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

const Modal = ({ handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[25rem]  bg-white m-auto p-5"
      >
        <h3>Create Task</h3>
        <HorizontalLine />
        <form>
          <div className="flex flex-col">
            <label htmlFor="title" className=" text-gray-800 mb-1">
              Task Name
            </label>
            <input
              id="title"
              type="text"
              className="focus:outline-none h-8 border border-gray-300 rounded-md caret-pink-500 mb-3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className=" text-gray-800 mb-1">
              Description
            </label>
            <textarea
              id="description"
              type="text"
              cols={8}
              className="focus:outline-none h-8 border border-gray-300 rounded-md caret-pink-500 mb-3"
            />
          </div>
          <div>
            <label htmlFor="priority " className=" text-gray-800 mb-1">
              Priority
            </label>
            <select name="priority" id="priority"></select>
          </div>
        </form>
      </div>
    </Backdrop>
  );
};

export default Modal;
