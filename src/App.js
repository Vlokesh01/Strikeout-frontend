import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from "./components/login"
import  Todos  from "./components/todos"
import  Signup  from "./components/signup"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"  element={<Login />}/> 
        <Route path="/signup"  element={<Signup />}/> 
        <Route path="/todos" element={<Todos/>} />
      </Routes>
    </BrowserRouter>
  )
}