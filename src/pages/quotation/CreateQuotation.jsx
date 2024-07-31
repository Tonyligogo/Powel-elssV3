import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useReducer, useState } from "react";
import { Button } from "@/components/ui/button";
import QuotationItems from "../quotation/QuotationItems";
import axios from "axios";
import { server } from "@/server";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const initialState = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientAddress: "",
  qtnDate: "",
  qtnDueDate: "",
  terms: "",
  status:""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "clientName":
      return {
        ...state,
        clientName: action.payload,
      };
    case "clientEmail":
      return {
        ...state,
        clientEmail: action.payload,
      };
    case "clientPhone":
      return {
        ...state,
        clientPhone: action.payload,
      };
    case "clientAddress":
      return {
        ...state,
        clientAddress: action.payload,
      };
    case "qtnDate":
      return {
        ...state,
        qtnDate: action.payload,
      };
    case "qtnDueDate":
      return {
        ...state,
        qtnDueDate: action.payload,
      };
    case "terms":
      return {
        ...state,
        terms: action.payload,
      };
    case "status":
      return {
        ...state,
        status: action.payload,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return { state };
  }
};

function CreateQuotation() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [counter, setCounter] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tableContent, setTableContent] = useState([]);
  const [qtnType, setQtnType] = useState("");

  const {
    data: customers,
    isSuccess: customerSuccess,
  } = useQuery({
    queryKey: ["cutomerRecords"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${server}/api/customer/get-all-customers`
      );
      return data;
    },
  });
  const fetchCount = async () => {
    const { data: count } = await axios.get(`${server}/api/quotation/get-count`);
    setCounter(count?.count);
    return count;
  };
  useEffect(() => {
    fetchCount();
  }, []);

  const Actions = {
    clientName: "clientName",
    clientEmail: "clientEmail",
    clientPhone: "clientPhone",
    clientAddress: "clientAddress",
    qtnDate: "qtnDate",
    qtnDueDate: "qtnDueDate",
    terms: "terms",
    status:"status"
  };

  const handleTableUpdate = (newTableContent) => {
    setTableContent(newTableContent);
  };

  const handleQuotation_type = (type) => {
    setQtnType(type);
  };

  const handleClientChange = (value) => {
    const customerId = value;
    const customer = customers?.customers.find(
      (customer) => customer._id === customerId
    );
    setSelectedClient(customer);
  };

  const totalAmount = tableContent.reduce((sum, item) => sum + item.amount, 0);
  const tax = totalAmount ? totalAmount * 0.1 : 0;
  const discount = totalAmount ? totalAmount * 0.05 : 0;
  const getAmountPayable = () => {
    return totalAmount + tax - discount;
  };

  function generateQuotationCode(num) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const quotationCode = `Qtn-${num}-${currentMonth}-${currentYear}`;
    return quotationCode;
  }
  const { mutateAsync:createQuotation, isError:createError, isPending:createPending, isSuccess:createSuccess } = useMutation({
    mutationFn: async (data) => {
      await axios.post(`${server}/api/quotation/new-quotation`, data)
    },
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const quotationCodeResult = generateQuotationCode(counter);
      const data = {
        quotation_no: quotationCodeResult,
        client_name: !selectedClient ? state.clientName : selectedClient?.name,
        client_email: !selectedClient ? state.clientEmail : selectedClient?.email,
        client_contact_number: !selectedClient ? state.clientPhone : selectedClient?.phone,
        client_address: !selectedClient
          ? state.clientAddress
          : selectedClient?.address,
          quotation_date: state.qtnDate,
          quotation_due_date: state.qtnDueDate,
        terms: state.terms,
        // status: state.status,
        quotation_details: tableContent,
        quotation_type: qtnType,
        count: counter,
        subTotal: totalAmount.toFixed(2),
        tax: tax.toFixed(2),
        discount: discount.toFixed(2),
        amountPayable: getAmountPayable().toFixed(2),
      };
      console.log(data)
      createQuotation(data)
  }
  useEffect(()=>{
    if(createSuccess) {
      dispatch({ type: 'RESET_FORM' });
      setSelectedClient(null);
      setTableContent([]);
      setQtnType('');
      toast.success('Quotation created successfully',{id:'success'})
      fetchCount();
    }
  },[createSuccess])

  if(!createPending && createError) {
    toast.error('Something went wrong. Please try again',{id:'error'})
  }
  return (
    <div className="p-4 bg-white rounded-lg min-h-full">
      <h1 className="text-primary font-bold text-2xl">Create Quotation</h1>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4 py-4">
        <div>
          <Label htmlFor="qtnNo">Quotation no.</Label>
          <Input id="qtnNo" readOnly defaultValue={counter !== '' ? generateQuotationCode(counter)
            :''} />
        </div>
        <div>
          <Label htmlFor="clientList">Select client</Label>
          <Select id="clientList" onValueChange={handleClientChange} value={selectedClient?._id}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              {customerSuccess && 
              customers.customers.length > 0 && 
              customers.customers.map((customer) => (
                <SelectItem key={customer._id} value={customer._id}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <hr className="my-4" />
      <div>
        {!selectedClient ? 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          <div>
            <Label htmlFor="name">Client Name</Label>
            <Input 
            id="name" 
            value={state.clientName}
            onChange={(e) =>
              dispatch({
                type: Actions.clientName,
                payload: e.target.value,
              })
            }
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={state.clientEmail}
            onChange={(e) =>
              dispatch({
                type: Actions.clientEmail,
                payload: e.target.value,
              })
            }
            />
          </div>
          <div>
            <Label htmlFor="number">Number</Label>
            <Input id="number" value={state.clientPhone}
            onChange={(e) =>
              dispatch({
                type: Actions.clientPhone,
                payload: e.target.value,
              })
            } 
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address"
            value={state.clientAddress}
            onChange={(e) =>
              dispatch({
                type: Actions.clientAddress,
                payload: e.target.value,
              })
            }
            />
          </div>
        </div>
        :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
          <div>
            <Label htmlFor="name">Client Name</Label>
            <Input id="name" readOnly placeholder={selectedClient.name} className="placeholder:text-black"/>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" readOnly placeholder={selectedClient.email} className="placeholder:text-black"/>
          </div>
          <div>
            <Label htmlFor="number">Number</Label>
            <Input id="number" readOnly placeholder={selectedClient.phone} className="placeholder:text-black"/>
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" readOnly placeholder={selectedClient.address} className="placeholder:text-black"/>
          </div>
        </div>
        }
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        <div>
          <Label htmlFor="date">Quotation Date</Label>
          <Input id="date" type="date" 
          value={state.qtnDate}
          onChange={(e) =>
            dispatch({ type: Actions.qtnDate, payload: e.target.value })
          }
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Quotation Due Date</Label>
          <Input id="dueDate" type="date" 
          value={state.qtnDueDate}
          onChange={(e) =>
            dispatch({ type: Actions.qtnDueDate, payload: e.target.value })
          }
          />
        </div>
        <div>
          <Label htmlFor="terms">Terms</Label>
          <Input id="terms" 
          value={state.terms}
          onChange={(e) =>
            dispatch({ type: Actions.terms, payload: e.target.value })
          }
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select id="status" value={state.status} onValueChange={(value)=>dispatch({ type: Actions.status, payload: value })}>
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <hr className="my-4" />
      <div>
        <QuotationItems
          onTableUpdate={handleTableUpdate}
          onQuotationTypeChange={handleQuotation_type}
          label="quotation"
        />
      </div>
      <div className=" bg-[#ffece6] my-4 p-6 rounded-lg text-left sm:text-right flex flex-col gap-2">
        <p>
          Subtotal:{" "}
          <span className="inline-block md:w-[150px]">
            Ksh {totalAmount ? totalAmount.toFixed(2) : 0}
          </span>
        </p>
        <p>
          Tax(10%):{" "}
          <span className="inline-block md:w-[150px]">
            Ksh {tax ? tax.toFixed(2) : 0}
          </span>
        </p>
        <p>
          Discount(5%):{" "}
          <span className="inline-block md:w-[150px]">
            Ksh {discount ? discount.toFixed(2) : 0}
          </span>
        </p>
        <p>
          Total:{" "}
          <span className="inline-block md:w-[150px]">
            Ksh {getAmountPayable().toFixed(2)}
          </span>
        </p>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}

export default CreateQuotation;
