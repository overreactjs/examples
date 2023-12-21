import "./Button.css";

type ButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ disabled, onClick }) => {
  const className = `button ${!disabled && 'button-enabled'}`;
  return (
    <div>
      <button className={className} onTouchStart={onClick} onMouseDown={onClick}>
        <span className="button-shadow" />
        <span className="button-edge" />
        <span className="button-front" />
      </button>
    </div>
  );
};