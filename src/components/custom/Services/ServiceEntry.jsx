import { services } from "@/rows"
import DataTable from "../DataTable"
import { servicesColumn } from "@/columns"
import ServiceEntryForm from "./ServiceEntryForm"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function ServiceEntry() {
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  
  return (
    <div>
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-primary font-bold text-xl mb-2">{!serviceFormOpen ? "Today's Services":'Record Service'} </h1>
          <Button onClick={()=>setServiceFormOpen(prev=>!prev)} className='text-primary border-primary bg-transparent hover:bg-primary hover:text-white cursor-pointer transition' variant="outline">
            {!serviceFormOpen ? '+ Record Service' :'Close'}
          </Button>
        </div>
          <div className={!serviceFormOpen ? 'block' :'hidden'}>
            <DataTable rows={services} columns={servicesColumn}/>
          </div>
          {serviceFormOpen && 
            <div className={`${serviceFormOpen ? 'block' :'hidden'} bg-white rounded-lg`}>
              <ServiceEntryForm/>
            </div>
          }
    </div>
  )
}

export default ServiceEntry