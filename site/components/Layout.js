
import Footer from "./Footer";
import Navbar from "./Navbar";

export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";


const Layout = ({children}) => {
    return (
        <div className="min-h-screen">
            <Navbar></Navbar>
            <div className="p-6 flex flex-col items-center min-h-screen justify-center bg-path animate-ltr-linear-infinite">
                {children}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Layout;
