import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import _routes from "./config/routes";
import "./index.css";
import AddKeyForm from "./pages/keys/AddKeyPage";
import DetailKeyPage from "./pages/keys/DetailKeyPage";
import SecretKeys from "./pages/keys/Keys";
import Login from "./pages/login/Login";
import Settings from "./pages/Settings";
import { Toaster } from "react-hot-toast";
// importar Users de "./pages/Users";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to={_routes.login} replace />} />
        <Route path={_routes.login} element={<Login />} />
        <Route path={_routes.keys} element={<SecretKeys />} />
        <Route path={_routes.key_add} element={<AddKeyForm />} />
        <Route path={`${_routes.key_details}:id`} element={<DetailKeyPage />} />
        {/* <Route path={_routes.users} element={<Users />} /> */}
        <Route path={_routes.settings} element={<Settings />} />
        <Route path={_routes.nf} element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
