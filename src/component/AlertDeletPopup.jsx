
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function AlertDeletPopup({ onClose, open, OnConfirm }) {
  return (
    <div open={open} className="max-w-[400px] max-h-[300px] mx-auto p-4 bg-gray-800">
      <div className="w-full ">
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14  text-red-500" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <button onClick={OnConfirm} className="bg-red-700 py-2 px-4 text-white rounded-md shadow-sm">
              {"Yes, I'm sure"}
            </button>
            <button onClick={onClose} className="bg-white py-2 px-4 rounded-md shadow-lg">
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

