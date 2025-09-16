import Navbar from "./Navbar"

function Home(){
    return(
    <div>
      <Navbar></Navbar>
        <section id="home" className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 pt-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Data Ecosystem Solutions</h2>
          <p className="text-lg md:text-xl max-w-xl">Manage your activities, track progress, and explore more features with this simple dashboard template.</p>
        </section>
    </div>)
}

export default Home