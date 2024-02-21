import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cities from "./components/Cities";
import Read from "./components/Read";
import Add from "./components/Add";
import Update from "./components/Update";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Cities />} />
                    <Route path="/read/:cityName" element={<Read />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/update/:cityName" element={<Update />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;