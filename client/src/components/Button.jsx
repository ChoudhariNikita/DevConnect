import React from "react";

export default function Button({
  children,
  type = "button",
  variant = "primary",       // 'primary', 'outline-primary', etc.
  size = "md",               // 'sm', 'md', 'lg'
  rounded = "pill",          // 'pill', 'rounded', or 'none'
  className = "",
  ...props
}) {
  const sizeClass = size === "md" ? "" : `btn-${size}`;
  const roundedClass =
    rounded === "pill"
      ? "rounded-pill"
      : rounded === "rounded"
      ? "rounded"
      : "";

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass} ${roundedClass} fw-semibold shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
