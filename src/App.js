import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserRoutes from './Routes/UserRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>            
    <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={<UserRoutes/>} />
        <Route path={'/admin/*'}  element={<AdminRoutes/>} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
