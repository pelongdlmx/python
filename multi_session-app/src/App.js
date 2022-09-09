import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
