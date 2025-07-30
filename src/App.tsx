// import Dashboard from "./pages/dashboard";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import SignUpPage from "./pages/Signup";
import Dashboard from "./pages/dashboard";
import { Home } from "./pages/Home";
import LoginPage from "./pages/login";

function App(){
  return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes> 
      </BrowserRouter>
  )
}

export default App