import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../index"
const Layout = () => {
  return (
    <div className="w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-29">
        <Navbar/>
        <div className="flex-1">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout