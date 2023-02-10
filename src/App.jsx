import { Routes, Route, Navigate } from "react-router-dom";

import MainNavbar from "./components/MainNavbar";
import HomePage from "./components/HomePage";
import SimulatorPage from "./components/SimulatorPage";

function App() {
    return (
        <>
            <MainNavbar></MainNavbar>
            <Routes>
                <Route path="/" element={<Navigate to="/mpm-simulator" />} />
                <Route path="/mpm-simulator" element={<HomePage />} />
                <Route
                    path="/mpm-simulator/simulator"
                    element={<SimulatorPage />}
                />
            </Routes>
        </>
    );
}

export default App;
