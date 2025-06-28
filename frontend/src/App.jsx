import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyReservations from "./pages/MyReservations"
function App() {
  return (
    <div className="w-full ">
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/my-reservations" element={<MyReservations />}></Route>
      </Routes>

      <Footer />



    </div>
  )
}

export default App
