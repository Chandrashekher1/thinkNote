// import Dashboard from "./pages/dashboard";
import {BrowserRouter , Routes, Route} from "react-router-dom"
import { Signup } from "./pages/Signup";
import { SignIn } from "./pages/signin";
import Dashboard from "./pages/dashboard";

function App(){
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>

        </Routes> 
    </BrowserRouter>
  )
}

export default App