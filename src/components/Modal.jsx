function Modal({ open, onClose, children }) {
  // Do not render modal if not open
  if (!open) return null;
  return (
    // Modal overlay and container
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        // Close modal when clicking outside the content
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 p-6 min-w-[320px] max-w-sm w-full relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 20 20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l8 8M6 14L14 6"
            />
          </svg>
        </button>
        {/* Modal content */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
