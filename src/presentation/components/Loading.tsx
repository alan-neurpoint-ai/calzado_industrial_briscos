import { FaSpinner } from "react-icons/fa";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export const Loading = ({ message = "Cargando...", size = "md" }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-4">
      <FaSpinner className={`animate-spin text-orange-500 ${sizeClasses[size]}`} />
      {message && <p className="text-stone-500 text-sm">{message}</p>}
    </div>
  );
};

export const LoadingPage = ({ message = "Cargando..." }: { message?: string }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <Loading message={message} size="lg" />
    </div>
  );
};