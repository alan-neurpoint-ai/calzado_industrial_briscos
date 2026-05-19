import { FaShoePrints } from "react-icons/fa";

export const Topbar = () => {
  return (
    <header className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <FaShoePrints className="text-3xl" />
        <h1 className="text-2xl font-bold tracking-wide">CALZADO INDUSTRIAL BRISCO</h1>
      </div>
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
        <FaShoePrints className="text-orange-500 text-xl" />
      </div>
    </header>
  );
};