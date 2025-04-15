import React from "react";

interface ErrorProps {
  message: string | null;
}

export const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-danger">{message}</p>
    </div>
  );
};
