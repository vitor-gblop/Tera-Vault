import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  icon?: ReactNode;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

function ActionBtn({ to, icon, label, variant = "primary", className = "" }: Props) {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  
  return (
    <Link
      to={to}
      className={`${baseClass} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label && <span>{label}</span>}
    </Link>
  );
}

export default ActionBtn;
