type ButtonType = "submit" | "button";

interface ButtonProps {
  type: ButtonType;
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="w-full p-3 bg-blue-500 text-white font-semibold border-none rounded-md"
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
