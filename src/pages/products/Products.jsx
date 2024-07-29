import { productColumn } from "@/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { server } from "@/server";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DataTable from "@/components/custom/DataTable";
function Products() {
  const [rows, setRows] = useState([])
  const fetchProducts = async () => {
    const {data} = await axios.get(`${server}/api/item/get-all-items`)
    return data
  }
  const {data:products, isPending, isError, isSuccess} = useQuery({ queryKey: ['products'], queryFn: fetchProducts })

  useEffect(() => {
    if (isSuccess) {
      const rows = products?.items.map((obj) => {
        return {
         ...obj,
          id: obj._id,
        };
      });
      setRows(rows);
    }
  }, [products, isSuccess]);

  if(!isPending && isError) {
    toast.error('Something went wrong. Please try again',{id:'error'})
  } 

  return (
    <div>
        <DataTable rows={rows} columns={productColumn} />
    </div>
  );
}

export default Products;
