import { Routes, Route } from "react-router";
import { DashboardPage } from "./presentation/pages/DashboardPage";
import { LeadDetailPage } from "./presentation/pages/LeadDetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/lead/:id" element={<LeadDetailPage />} />
    </Routes>
  );
}
