import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "fixed bottom-4 left-1/2 text-primary-content -translate-x-1/2 p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out z-50 flex items-center gap-2";
  const variantClasses = type === 'success' 
    ? "bg-success" 
    : "bg-error";

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {type === 'success' ? (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-4 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
} 