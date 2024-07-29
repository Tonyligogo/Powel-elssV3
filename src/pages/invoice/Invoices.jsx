import { allInvoicesColumn } from "@/columns";
import DataTable from "@/components/custom/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { recentInvoicesRows } from "@/rows";
import { ChevronRight, House } from "lucide-react";
import { Link } from "react-router-dom";

function getInitials(fullName) {
  const words = fullName.split(' ');
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  return `${words[0][0].toUpperCase()}${words[words.length - 1][0].toUpperCase()}`;
}
const avatarColumn = {
  field: "name",
  headerName: 'Customer info',
  width: 200,
  renderCell: (params) => {
    const initials = getInitials(params.row.name)
    return (
      <div className="h-full flex gap-2 items-center">
        <Avatar className="size-8">
          <AvatarFallback className="bg-black text-white">{initials}</AvatarFallback>
        </Avatar>
        <span className="flex flex-col">
          <span className=" leading-none ">{params.row.name}</span>
          <span className=" leading-none text-xs text-gray-500">{params.row.email}</span>
        </span>
      </div>
    );
  }
}
const columns = [avatarColumn,...allInvoicesColumn]

function Invoices() {
  return (
    <div>
      <div className="p-4 rounded-lg bg-white mb-5 flex justify-between">
        <h1>All Invoices</h1>
        <span className="text-gray-500 inline-flex items-center">
        <Link to='/'><House size={16} color="#d74221"/></Link>
          <ChevronRight size={16}/>
          Invoice 
          <ChevronRight size={16}/>
           List
          </span>
      </div>
      <DataTable rows={recentInvoicesRows} columns={columns}/>
    </div>
  )
}

export default Invoices