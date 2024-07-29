import { invoiceColumns } from "@/columns";
import DataTable from "./DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { recentInvoicesRows } from "@/rows";


function RecentInvoices() {
    function getInitials(fullName) {
        const words = fullName.split(' ');
        if (words.length === 1) {
          return words[0][0].toUpperCase();
        }
        return `${words[0][0].toUpperCase()}${words[words.length - 1][0].toUpperCase()}`;
      }
      const avatarColumn = {
        field: "name",
        headerName: 'Name',
        width: 250,
        renderCell: (params) => {
          const initials = getInitials(params.row.name)
          return (
            <div className="h-full flex gap-2 items-center">
            <Avatar className="size-8">
            <AvatarFallback className="bg-black text-white">{initials}</AvatarFallback>
            </Avatar>
            <span>{params.row.name}</span>
            </div>
          );
        }
      }
    const columns = [avatarColumn,...invoiceColumns] 
      
  return (
    <div>
        <h1 className="mb-2">Recent Invoices</h1>
        <DataTable rows={recentInvoicesRows} columns={columns}/>
    </div>
  )
}

export default RecentInvoices