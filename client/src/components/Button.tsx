type ButtonType = "submit" | "button";

interface ButtonProps {
  type: ButtonType;
  label: string;
  onClick?: () => void;
}

function Button({ type, label, onClick = () => null }: ButtonProps) {
  return (
    <button
      className="w-full p-3 bg-blue-500 text-white font-semibold border-none rounded-md"
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
