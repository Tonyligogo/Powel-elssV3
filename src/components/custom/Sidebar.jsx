import { Link, NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Box,
  FileSymlink,
  Folders,
  LayoutDashboard,
  Users,
  UsersRound,
} from "lucide-react";

function Sidebar() {
  const styles = {
    fontWeight: "bold",
    padding: "12px",
    backgroundColor: "#ffece6",
    color: "#d74221",
  };
  return (
    <div className="flex flex-col gap-2">
      <NavLink
        style={({ isActive }) => {
          return isActive ? styles : {};
        }}
        className="link"
        to="/"
      >
        <LayoutDashboard size={18}/> Dashboard
      </NavLink>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-3 rounded-md hover:bg-[#ffece6] hover:text-primary transition">
            <span className="flex gap-2 items-center">
            <UsersRound size={18}/> Staff
            </span>
          </AccordionTrigger>
          <AccordionContent className="ml-5">
            <ul className="flex flex-col">
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/add-staff">Add Staff</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/staff">All Staff</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-3 rounded-md hover:bg-[#ffece6] hover:text-primary transition">
            <span className="flex gap-2 items-center">
              <Folders size={18}/> Forms
            </span>
          </AccordionTrigger>
          <AccordionContent className="ml-5">
            <ul className="flex flex-col">
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/allowance">Allowance</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/deduction">Deduction</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/expense">Expense</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-3 rounded-md hover:bg-[#ffece6] hover:text-primary transition">
            <span className="flex gap-2 items-center">
            <Box size={18}/> Products
            </span>
          </AccordionTrigger>
          <AccordionContent className="ml-5">
            <ul className="flex flex-col">
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/add-item">Add Item</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/products">All Items</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-3 rounded-md hover:bg-[#ffece6] hover:text-primary transition">
            <span className="flex gap-2 items-center">
            <Box size={18}/> Services
            </span>
          </AccordionTrigger>
          <AccordionContent className="ml-5">
            <ul className="flex flex-col">
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/services">Services</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/service-entry">Record service</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-3 rounded-md hover:bg-[#ffece6] hover:text-primary transition">
            <span className="flex gap-2 items-center">
            <Users size={18}/> Customers
            </span>
          </AccordionTrigger>
          <AccordionContent className="ml-5">
            <ul className="flex flex-col">
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/add-customer">Add customer</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/customers">Our customers</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-3 rounded-md hover:bg-[#ffece6] hover:text-primary transition">
            <span className="flex gap-2 items-center">
            <FileSymlink size={18}/> Invoice
            </span>
          </AccordionTrigger>
          <AccordionContent className="ml-5">
            <ul className="flex flex-col">
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/createInvoice">Create</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/editInvoice">Edit</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/invoiceDetails">Details</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/invoices">List</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-3 rounded-md hover:bg-[#ffece6] hover:text-primary transition">
            <span className="flex gap-2 items-center">
            <FileSymlink size={18}/> Quotation
            </span>
          </AccordionTrigger>
          <AccordionContent className="ml-5">
            <ul className="flex flex-col">
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/create-quotation">Create</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/edit-quotation">Edit</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/quotation-details">Details</Link>
              </li>
              <li className="p-3 list-disc  list-inside border-l-[1.5px] border-[#ffece6] hover:text-primary transition">
                <Link to="/all-quotations">List</Link>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Sidebar;
