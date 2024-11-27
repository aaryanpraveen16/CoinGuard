import React from "react";
interface ButtonProps {
  backgroundColor: string;
  style?: React.CSSProperties;
  className?: string;
  // children:JSX.Element
  buttonText: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  disabled?: boolean;
}
const sizeStyles: { [key: string]: React.CSSProperties } = {
  small: { padding: "5px 10px", fontSize: "12px" },
  medium: { padding: "10px 20px", fontSize: "16px",width:"250px" },
  large: { padding: "15px 30px", fontSize: "20px" },
};
function Button({
  buttonText,
  backgroundColor = "#007BFF", // Default color
  size = "medium",
  onClick,
  disabled = false,
  style,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        fontWeight:"600",
        padding: "15px",
        borderRadius: "10px",
        backgroundColor: disabled ? "#d3d3d3" : backgroundColor,
        color: disabled ? "#808080" : "#fff",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        ...sizeStyles[size],
        ...style, // Merge additional styles
      }}
    >
      {buttonText}
    </button>
  );
}

export default Button;
