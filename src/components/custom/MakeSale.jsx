import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { server } from "@/server";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SaleItems from "./SaleItems";

function MakeSale() {
  const [type, setType] = useState("Service");
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    data: allProducts,
    isSuccess: productsSuccess,
    isPending: productsPending,
    isError: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${server}/api/item/get-all-items`
      );
      return data;
    },
  });
  useEffect(() =>{
    if(productsSuccess){
      setProducts(allProducts)
    }
  },[productsSuccess,allProducts])

  if(!productsPending && productsError) {
    toast.error('Failed to fetch products. Please try again',{id:'error'})
  }

  const handleTypeChange = (value) => {
    const type = value;
    setType(type);
  };
  const handleItemChange = (value) => {
    const itemId = value;
    const item = allProducts?.items.find(
      (product) => product._id === itemId
    );
    setSelectedItem(item);
  };
  return (
    <div>
      <h1 className="text-primary font-semibold mb-4">Make Sale</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Sales Date</Label>
          <Input type="date" required />
        </div>
        <div>
          <Label>Select type of sale</Label>
          <Select onValueChange={handleTypeChange} value={type}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type of sale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Service">Service</SelectItem>
              <SelectItem value="Item">Item Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <hr className="my-4"/>
      {type === 'Service' ? 
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Client</Label>
          <Input required />
        </div>
        <div>
          <Label>Location</Label>
          <Input required />
        </div>
      </div>
      : null}
      {type === 'Item' ? 
      <div>
        <Label>Select Product here:</Label>
        <Select onValueChange={handleItemChange} value={selectedItem?._id}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {products?.items?.map((product,index) => (
              <SelectItem key={index} value={product?._id}>{product?.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> : null}
      <hr className="my-4"/>
      <SaleItems type={type}/>
    </div>
  );
}

export default MakeSale;
