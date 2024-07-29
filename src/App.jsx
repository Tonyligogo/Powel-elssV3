import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/custom/Layout";
import Expense from "./pages/Expense";
import Deduction from "./pages/Deduction";
import Allowance from "./pages/Allowance";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import Staff from "./pages/staff/Staff";
import Invoices from "./pages/invoice/Invoices";
import Customers from "./pages/customers/Customers";
import PagenotFound from "./pages/PagenotFound";
import Products from "./pages/products/Products";
import EditProfile from "./pages/EditProfile";
import Quotation from "./pages/quotation/Quotation";
import Services from "./pages/services/Services";
import Edit from "./pages/invoice/Edit";
import Details from "./pages/invoice/Details";
import Create from "./pages/invoice/Create";
import ServicesEntry from "./pages/services/ServicesEntry";
import Login from "./pages/Login";
import AddUser from "./pages/AddUser";
import AddProduct from "./pages/products/AddProduct";
import AddStaff from "./pages/staff/AddStaff";
import AddCustomer from "./pages/customers/AddCustomer";
import CreateQuotation from "./pages/quotation/CreateQuotation";
import EditQuotation from "./pages/quotation/EditQuotation";
import QuotationsList from "./pages/quotation/QuotationsList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/add-user",
          element: <AddUser />,
        },
        {
          path: "/expense",
          element: <Expense />,
        },
        {
          path: "/deduction",
          element: <Deduction />,
        },
        {
          path: "/allowance",
          element: <Allowance />,
        },
        {
          path: "/staff",
          element: <Staff />,
        },
        {
          path: "/add-staff",
          element: <AddStaff />,
        },
        {
          path: "/invoices",
          element: <Invoices />,
        },
        {
          path: "/createInvoice",
          element: <Create />,
        },
        {
          path: "/editInvoice",
          element: <Edit />,
        },
        {
          path: "/invoiceDetails",
          element: <Details />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/add-customer",
          element: <AddCustomer />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/service-entry",
          element: <ServicesEntry />,
        },
        {
          path: "/quotation-details",
          element: <Quotation />,
        },
        {
          path: "/create-quotation",
          element: <CreateQuotation />,
        },
        {
          path: "/edit-quotation",
          element: <EditQuotation />,
        },
        {
          path: "/all-quotations",
          element: <QuotationsList />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/add-item",
          element: <AddProduct />,
        },
        {
          path: "/edit-profile",
          element: <EditProfile />,
        },
        {
          path: "/*",
          element: <PagenotFound />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    }
  ]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right'/>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
