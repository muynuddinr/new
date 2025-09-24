import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Construction from "./Construction";

export default function ConstructionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Construction />
      </main>
      <Footer />
    </div>
  );
}