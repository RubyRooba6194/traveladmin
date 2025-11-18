import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { Login } from "../pages/auth/Login";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Destinations } from "../pages/destinations/Destinations";
import { NewDestination } from "../pages/destinations/NewDestination";
import { EditDestination } from "../pages/destinations/EditDestination";
import { Gallery } from "../pages/gallery/Gallery";
import { Contacts } from "../pages/contacts/Contacts";
import { Notifications } from "../pages/notifications/Notifications";
import { AdminManagement } from "../pages/admin/AdminManagement";
import { Settings } from "../pages/settings/Settings";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="destinations/new" element={<NewDestination />} />
          <Route path="destinations/edit/:id" element={<EditDestination />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="admin" element={<AdminManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
