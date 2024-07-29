import ServiceEntryForm from "@/components/custom/Services/ServiceEntryForm"
import { ChevronRight, House } from "lucide-react"
import { Link } from "react-router-dom"

function ServicesEntry() {
  return (
    <div>
        <div className="p-4 rounded-lg bg-white mb-5 flex justify-between">
        <h1>Record service</h1>
        <span className="text-gray-500 inline-flex items-center">
        <Link to='/'><House size={16} color="#d74221"/></Link>
          <ChevronRight size={16}/>
          Service entry 
          <ChevronRight size={16}/>
           List
          </span>
      </div>
      <div className="bg-white">
        <ServiceEntryForm/>
      </div>
    </div>
  )
}

export default ServicesEntry