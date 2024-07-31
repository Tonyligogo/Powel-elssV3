import { allQuotationsColumn } from "@/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "@/server";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DataTable from "@/components/custom/DataTable";
function QuotationsList() {
  const [rows, setRows] = useState([])
  const fetchQuotations = async () => {
    const {data} = await axios.get(`${server}/api/quotation/all-quotations`)
    return data
  }
  const {data:quotations, isPending, isError, isSuccess} = useQuery({ queryKey: ['quotations'], queryFn: fetchQuotations })

  useEffect(() => {
    if (isSuccess) {
      const rows = quotations?.quotations.map((obj) => {
        return {
         ...obj,
          id: obj._id,
        };
      });
      setRows(rows);
    }
  }, [quotations, isSuccess]);

  if(!isPending && isError) {
    toast.error('Something went wrong. Please try again',{id:'error'})
  } 

  return (
    <div>
        <DataTable rows={rows} columns={allQuotationsColumn}/>
    </div>
  );
}

export default QuotationsList;