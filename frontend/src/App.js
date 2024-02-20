import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn"; 




function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LogIn />} />
       

        </Routes>
      </BrowserRouter>
    </div> 
    );
}
export default App;