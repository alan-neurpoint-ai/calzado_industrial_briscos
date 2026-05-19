import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const COLORS = ["#f97316", "#fb923c", "#fdba74", "#fed7aa", "#ffedd5"];

const mockBarData = [
  { name: "Ene", ventas: 4000, pedidos: 24 },
  { name: "Feb", ventas: 3000, pedidos: 13 },
  { name: "Mar", ventas: 2000, pedidos: 98 },
  { name: "Abr", ventas: 2780, pedidos: 39 },
  { name: "May", ventas: 1890, pedidos: 48 },
  { name: "Jun", ventas: 2390, pedidos: 38 },
];

const mockPieData = [
  { name: "Botas Seguridad", value: 35 },
  { name: "Zapatos Indus", value: 28 },
  { name: "Sandalias", value: 20 },
  { name: "Otros", value: 17 },
];

const mockStockData = [
  { name: "Ene", inventario: 4000 },
  { name: "Feb", inventario: 3000 },
  { name: "Mar", inventario: 2000 },
  { name: "Abr", inventario: 2780 },
  { name: "May", inventario: 1890 },
  { name: "Jun", inventario: 2390 },
  { name: "Jul", inventario: 3490 },
];

const mockTableData = Array.from({ length: 45 }, (_, i) => ({
  id: i + 1,
  producto: `Producto ${i + 1}`,
  categoria: ["Botas", "Zapatos", "Sandalia", "Botines"][i % 4],
  stock: Math.floor(Math.random() * 100),
  precio: Math.floor(Math.random() * 500) + 50,
  estado: ["Activo", "Pendiente", "Agotado"][i % 3],
}));

const ITEMS_PER_PAGE = 10;

export const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockTableData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = mockTableData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const goToPrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <h1 className="text-2xl font-bold tracking-wide">
            CALZADO INDUSTRIAL BRISCO
          </h1>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <svg
            className="text-orange-500 w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="text-stone-500 text-sm">Ventas Totales</p>
            <p className="text-2xl font-bold text-stone-800">$24,500</p>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <FaArrowUp /> +12%
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="text-stone-500 text-sm">Pedidos</p>
            <p className="text-2xl font-bold text-stone-800">156</p>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <FaArrowUp /> +8%
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="text-stone-500 text-sm">Clientes</p>
            <p className="text-2xl font-bold text-stone-800">89</p>
            <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
              <FaArrowDown /> -3%
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="text-stone-500 text-sm">Productos</p>
            <p className="text-2xl font-bold text-stone-800">234</p>
            <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
              <FaArrowUp /> +5%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-stone-700 mb-4">
              Ventas Mensuales
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-stone-700 mb-4">Por Categoría</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={mockPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {mockPieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-stone-700 mb-4">
              Inventario (Bolsa)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockStockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="inventario"
                  stroke="#f97316"
                  fill="#fed7aa"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-stone-700 mb-4">
              Pedidos vs Ventas
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pedidos" fill="#78716c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-stone-200">
            <h3 className="font-semibold text-stone-700">
              Inventario de Productos
            </h3>
          </div>
          <div className="overflow-x-auto h-120">
            <table className="w-full">
              <thead className="bg-orange-500 text-white sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-left">Categoría</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-stone-100 hover:bg-stone-50"
                  >
                    <td className="px-4 py-2 text-stone-700">{item.id}</td>
                    <td className="px-4 py-2 text-stone-700">
                      {item.producto}
                    </td>
                    <td className="px-4 py-2 text-stone-700">
                      {item.categoria}
                    </td>
                    <td className="px-4 py-2 text-stone-700">{item.stock}</td>
                    <td className="px-4 py-2 text-stone-700">${item.precio}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.estado === "Activo"
                            ? "bg-green-100 text-green-700"
                            : item.estado === "Pendiente"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-stone-200 flex justify-between items-center">
            <span className="text-stone-600 text-sm">
              Mostrando {startIndex + 1}-
              {Math.min(startIndex + ITEMS_PER_PAGE, mockTableData.length)} de{" "}
              {mockTableData.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                <FaChevronLeft />
              </button>
              <span className="px-3 py-1 text-stone-700">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-stone-300 disabled:cursor-not-allowed"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-stone-800 text-white py-4 text-center">
        <p className="text-sm">Realizado por el equipo de neuropoint.ai</p>
      </footer>
    </div>
  );
};
