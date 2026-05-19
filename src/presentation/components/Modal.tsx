import { FaTimes } from "react-icons/fa";
import { type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-stone-800">{title}</h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="text-stone-500 hover:text-stone-700 p-2"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
