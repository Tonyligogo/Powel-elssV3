import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuotationItems from "./QuotationItems";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function Quotation() {
  const [tableContent, setTableContent] = useState([]);
  const [qtnType, setQtnType] = useState("");
  console.log(qtnType)

  const totalAmount = tableContent.reduce((sum, item) => sum + item.amount, 0);
  const tax = totalAmount ? totalAmount * 0.1 : 0;
  const discount = totalAmount ? totalAmount * 0.05 : 0;
  const getAmountPayable = () => {
    return totalAmount + tax - discount;
  };

  const handleTableUpdate = (newTableContent) => {
    setTableContent(newTableContent);
  };
  const handleQuotation_type = (type) => {
    setQtnType(type);
  };
  return (
    <div className="p-4 bg-white rounded-lg min-h-full">
      <h1 className="text-primary font-bold text-2xl">Create Quotation</h1>
      <hr className="my-4"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <div>
          <Label htmlFor="qtnNo">Quotation no.</Label>
          <Input id="qtnNo" defaultValue="Qtn-01-07-24" />
        </div>
        <div>
          <Label htmlFor="clientList">Select client</Label>
          <Select id="clientList">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="123">Peter</SelectItem>
              <SelectItem value="456">Thomas</SelectItem>
              <SelectItem value="789">Ligogo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <hr className="my-4"/>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
        <div>
          <Label htmlFor="name">Client Name</Label>
          <Input id="name" defaultValue="Ligogo" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="ligogo@gmail.com" />
        </div>
        <div>
          <Label htmlFor="number">Client Contact Number</Label>
          <Input id="number" defaultValue="0700001111" />
        </div>
        <div>
          <Label htmlFor="address">Client Address</Label>
          <Input id="address" defaultValue="177,Nairobi" />
        </div>
      </div>
      <hr className="my-4"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <div>
          <Label htmlFor="date">Quotation Date</Label>
          <Input id="date" type="date" />
        </div>
        <div>
          <Label htmlFor="dueDate">Quotation Due Date</Label>
          <Input id="dueDate" type="date" />
        </div>
        <div>
          <Label htmlFor="terms">Terms</Label>
          <Input id="terms" defaultValue="Terms" />
        </div>
      </div>
      <hr className="my-4"/>
      <div>
        <QuotationItems
          onTableUpdate={handleTableUpdate}
          onQuotationTypeChange={handleQuotation_type}
        />
      </div>
      <div className=" bg-[#ffece6] my-4 p-6 rounded-lg text-right flex flex-col gap-2">
        <p>
          Subtotal:{" "}
          <span className="inline-block w-[150px]">
            Ksh {totalAmount ? totalAmount.toFixed(2) : 0}
          </span>
        </p>
        <p>
          Tax(10%):{" "}
          <span className="inline-block w-[150px]">
            Ksh {tax ? tax.toFixed(2) : 0}
          </span>
        </p>
        <p>
          Discount(5%):{" "}
          <span className="inline-block w-[150px]">
            Ksh {discount ? discount.toFixed(2) : 0}
          </span>
        </p>
        <p>
          Total:{" "}
          <span className="inline-block w-[150px]">
            Ksh {getAmountPayable().toFixed(2)}
          </span>
        </p>
      </div>
      <div className="flex justify-end">
        <Button>Save</Button>
      </div>
    </div>
  );
}

export default Quotation;
