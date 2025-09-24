import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// Update the import path to match the actual file name and casing
import PoolService from "./Pool-service"; // <-- Update this path if the file is named differently, e.g. 'WasteManagementContent.tsx' or 'wasteManagementContent.tsx'

export default function Poolservice() {
  return (
    <div>
      <Navbar />
      <PoolService />
      <Footer />
    </div>
  );
} 