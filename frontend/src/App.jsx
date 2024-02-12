import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { SendMoney } from "./Pages/SendMoney";
import { Dashboard } from "./Pages/Dashboard";


function App() {

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
