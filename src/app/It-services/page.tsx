import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// Update the import path to match the actual file name and casing
import WasteManagementContent from "./It-services"; // <-- Update this path if the file is named differently, e.g. 'WasteManagementContent.tsx' or 'wasteManagementContent.tsx'

export default function Itservices() {
  return (
    <div>
      <Navbar />
      <WasteManagementContent />
      <Footer />
    </div>
  );
}