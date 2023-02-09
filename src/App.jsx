import { Routes, Route } from "react-router-dom";

import MainNavbar from "./components/MainNavbar";
import HomePage from "./components/HomePage";
import SimulatorPage from "./components/SimulatorPage";

function App() {
    return (
        <>
            <MainNavbar></MainNavbar>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/simulator" element={<SimulatorPage />} />
            </Routes>
        </>
    );
}

export default App;
