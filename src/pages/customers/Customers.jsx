import UserTable from "@/components/custom/UserTable";
import { customerColumn } from "../../columns";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { server } from "@/server";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function Customers() {
  const [rows, setRows] = useState([])
  const fetchCustomers = async () => {
    const {data} = await axios.get(`${server}/api/customer/get-all-customers`)
    return data
  }
  const {data:customers, isPending, isError, isSuccess} = useQuery({ queryKey: ['cutomerRecords'], queryFn: fetchCustomers })

  useEffect(() => {
    if (isSuccess) {
      const rows = customers?.customers.map((obj) => {
        return {
         ...obj,
          id: obj._id,
        };
      });
      setRows(rows);
    }
  }, [customers, isSuccess]);

  if(!isPending && isError) {
    toast.error('Something went wrong. Please try again',{id:'error'})
  } 

  return (
      <div>
        <UserTable rows={rows} columns={customerColumn} />
      </div>
  );
}

export default Customers;
