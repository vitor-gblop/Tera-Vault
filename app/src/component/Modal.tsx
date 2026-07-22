import type { ReactNode } from "react";

interface props {
  onConfirm: () => void;
  setShowModal?: (b: boolean) => void;
  confirmationText: string;
  children: ReactNode;
}

function Modal({onConfirm, setShowModal, confirmationText, children}: props) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-emerald-950/40 backdrop-blur-sm">
      <div className="bg-vault-card w-full max-w-sm p-8 rounded-2xl shadow-xl space-y-6">
        {children}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-yellow-500 dark:bg-red-600 text-white font-bold rounded-xl hover:bg-yellow-600 dark:hover:bg-red-700 transition-colors"
          >
            {confirmationText || "Confirm"}
          </button>

          {setShowModal ? (
            <button
              onClick={() => setShowModal!(false)}
              className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
