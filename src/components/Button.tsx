import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="submit"
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-[13px] font-semibold text-[15px] transition-all duration-200 ${
        pressed
          ? 'scale-[0.98] bg-[rgb(34,86,230)]'
          : 'bg-[var(--color-blue)] hover:bg-[rgb(52,116,255)] active:bg-[rgb(34,86,230)]'
      } text-white`}
    >
      {label}
    </button>
  );
}
