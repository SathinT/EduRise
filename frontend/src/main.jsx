import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import About from './pages/web/About.jsx';
import ContactPage from "./pages/web/ContactPage.jsx";
import DonateNowPage from "./pages/web/DonateNowPage.jsx";
import DonationPage from "./pages/web/DonationPage.jsx";
import DonationDetailsPage from "./components/Donate/DonationPage/DonationDetail.jsx";

import Login from "./pages/admin/auth/Login.jsx";
import {Register} from "./pages/admin/auth/Register.jsx";
import {DocumentSubmissionPage} from "./pages/admin/auth/DocumentSubmission.jsx";

import { AdminInterface } from "./pages/admin/interface/AdminInterface.jsx";
import {StudentInterface} from "./pages/student/StudentInterface.jsx";
import {DonorInterface} from "./pages/donor/DonorInterface.jsx";

import PrivateRoute from "../src/common/PrivateRoute.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/donate" element={<DonateNowPage />} />
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/donationDetails" element={<DonationDetailsPage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/documentSubmission" element={<DocumentSubmissionPage />} />

                <Route path="/adminDashboard" element={
                    <PrivateRoute allowedRoles={["admin"]}>
                        <AdminInterface />
                    </PrivateRoute>
                } />
                <Route path="/studentDashboard" element={
                    <PrivateRoute allowedRoles={["student"]}>
                        <StudentInterface />
                    </PrivateRoute>
                } />
                <Route path="/donorDashboard" element={
                    <PrivateRoute allowedRoles={["donor"]}>
                        <DonorInterface />
                    </PrivateRoute>
                } />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
