import { FaSync } from "react-icons/fa";

interface TopbarProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export const Topbar = ({ onRefresh, refreshing }: TopbarProps) => {
  return (
    <header className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src="https://calzadobrisco.com.mx/cdn/shop/files/logo-calzado-brisco-industrial_300x.png"
          alt="Calzado Brisco"
          className="h-10"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        <h1 className="text-2xl font-bold tracking-wide">CALZADO INDUSTRIAL BRISCO</h1>
      </div>
      <button
        onClick={onRefresh}
        disabled={refreshing}
        className="flex items-center gap-2 px-3 py-2 bg-white text-orange-500 rounded hover:bg-stone-100 disabled:opacity-50"
      >
        <FaSync className={refreshing ? "animate-spin" : ""} />
        Actualizar Gráficos
      </button>
    </header>
  );
};