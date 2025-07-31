// import Dashboard from "./pages/dashboard";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import { Home } from "./pages/Home";
import LoginPage from "./pages/login";
import { Footer } from "./components/ui/Footer";
import UserDashboard from "./pages/userDashboard";

function App(){
  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/brain/:shareLink" element={<UserDashboard/>}/>
        </Routes> 
        <Footer />
      </BrowserRouter>
  )
}

export default App