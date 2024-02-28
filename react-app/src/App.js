
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Signup from './components/Signup';
import Preferences from './components/Preferences';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Preferences" element={<Preferences />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
