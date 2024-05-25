import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./Pages/User/Login/UserLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={<UserLogin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
