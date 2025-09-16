import { Link } from "react-router-dom"

function Navbar(){
    function handlemenu(){
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.getElementById("menu");

    menuBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    })
  }
    return(
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-blue-600">Data Ecosystem Solutions</h1>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><a href="#home" className="hover:text-blue-500">Home</a></li>
        <li><a href="#about" className="hover:text-blue-500">About Us</a></li>
        <li><Link to={"/login"} className="hover:text-blue-500">Login</Link></li>
        <li><Link to={"/signup"} className="hover:text-blue-500">Signup</Link></li>
      </ul>

      {/* Mobile Button */}
      <div className="md:hidden">
        <button onClick={handlemenu} id="menu-btn" className="text-gray-700 focus:outline-none text-2xl">&#9776;</button>
      </div>
      </div>

      {/* Mobile Menu */}
      <div id="menu" className="hidden md:hidden bg-white border-t">
        <ul className="flex flex-col space-y-4 py-4 px-6 text-gray-700 font-medium">
        <li><a href="#home" className="hover:text-blue-500">Home</a></li>
        <li><a href="#about" className="hover:text-blue-500">About Us</a></li>
        <li><Link to={"/login"} className="hover:text-blue-500">Login</Link></li>
        <li><Link to={"/signup"} className="hover:text-blue-500">Signup</Link></li>
        </ul>
      </div>
      </nav>
    </div>)
}

export default Navbar