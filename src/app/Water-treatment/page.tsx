import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
// Update the import path to match the actual file name and casing
import WaterTreatmentContent from './Water-treatment' // <-- Update this path if the file is named differently, e.g. 'WaterTreatmentContent.tsx' or 'waterTreatmentContent.tsx'

export default function WaterTreatment() {
  return (
    <div>
      <Navbar />
      <WaterTreatmentContent />
      <Footer />
    </div>
  )
}