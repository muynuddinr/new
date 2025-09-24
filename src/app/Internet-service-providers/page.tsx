import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import InternetService from "./Internet-service-providers";

export default function Home() {
    return (
        <div>
            <Navbar />
            <InternetService />
            <Footer />
        </div>
    );
} 