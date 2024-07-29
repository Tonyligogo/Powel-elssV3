import UserTable from "@/components/custom/UserTable";
import { staffColumn } from "@/columns";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { server } from "@/server";
import axios from "axios";
import toast from "react-hot-toast";

function Staff() {
  const [rows, setRows] = useState([])
  const fetchStaffRecords = async () => {
    const {data} = await axios.get(`${server}/api/staff/get-all-staff-data`)
    return data
  }
  const {data:records, isPending, isError, isSuccess} = useQuery({ queryKey: ['staffRecords'], queryFn: fetchStaffRecords })

  useEffect(() => {
    if (isSuccess) {
      const rows = records?.staff_data.map((obj) => {
        return {
         ...obj,
          id: obj._id,
        };
      });
      setRows(rows);
    }
  }, [records, isSuccess]);

  if(!isPending && isError) {
    toast.error('Something went wrong. Please try again',{id:'error'})
  } 
  return (
    <div>
        <UserTable rows={rows} columns={staffColumn} />
    </div>
  );
}

export default Staff;
