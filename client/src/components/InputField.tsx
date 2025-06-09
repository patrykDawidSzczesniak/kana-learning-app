type InputTypes = "password" | "email" | "text";

interface InputProps {
  type?: InputTypes;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage: string;
  className?: string;
}

function InputField({
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = false,
  errorMessage,
  className = "",
}: InputProps) {
  return (
    <div className="flex flex-col h-auto w-full">
      <>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`p-3 rounded-lg  text-black shadow border-none outline-none
          ${error ? "outline-red-500 border-red" : ""}
          ${className}`}
        />
      </>
      <div className="h-2 mt-2">
        {error && <label className="text-red-500 h-4">{errorMessage}</label>}
      </div>
    </div>
  );
}

export default InputField;
