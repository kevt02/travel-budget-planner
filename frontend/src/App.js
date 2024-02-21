import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount";
import CreateAccountDetail from "./components/CreateAccountDetail";



function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CreateAccount />} />
                    <Route path="/:user" element={<CreateAccountDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;