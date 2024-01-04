import { X } from "@phosphor-icons/react";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  children,
  fullScreen = false,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center h-screen">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>
        <div
          className={`relative inline-block bg-white overflow-hidden my-auto transform transition-all shadow-xl ${
            fullScreen && "h-full w-full"
          }`}
        >
          <div data-testid="close-modal" className="ms-auto absolute top-4 right-4 h-6 w-6 rounded-full bg-white flex items-center justify-center z-20 shadow cursor-pointer">
            <X onClick={onClose} size={18} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
