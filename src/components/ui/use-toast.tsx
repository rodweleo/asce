import { useState } from 'react';

type ToastOptions = {
  message: string;
  type: 'success' | 'error' | 'info';
};

const useToast = () => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = (options: ToastOptions) => {
    setToast(options);
    setTimeout(() => setToast(null), 3000); // Automatically dismiss toast after 3 seconds
  };

  return { toast, showToast };
};

export { useToast };