interface AngleProps {
  className?: string;
}

export function Angle({ className }: AngleProps) {
  return (
    <div className={`absolute ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path d="M15 1H1V15" stroke="#ffffff" />
      </svg>
    </div>
  );
}
