import BarChart from "@/components/custom/BarChart";
import MakeSale from "@/components/custom/MakeSale";
import RecentInvoices from "@/components/custom/RecentInvoices";
import RecentSales from "@/components/custom/RecentSales";
import ServiceEntry from "@/components/custom/Services/ServiceEntry";
import Widget from "@/components/custom/Widget";

function Dashboard() {
  return (
    <div className="grid grid-cols-4 grid-rows-17 gap-2 w-full">
      <div className="grid col-span-4 row-span-1 gap-2">
        <div className="grid col-start-1 col-end-2"><Widget/></div>
        <div className="grid col-start-2 col-end-3"><Widget/></div>
        <div className="grid col-start-3 col-end-4"><Widget/></div>
        <div className="grid col-start-4 col-end-5"><Widget/></div>
      </div>
      <div className="col-span-4 row-span-4 grid grid-cols-3 gap-2">
        <div className="col-span-2">
        <BarChart/>
        </div>
        <div>
          <RecentSales/>
        </div>
      </div>
      <div className="col-span-4 row-span-4 bg-white rounded-lg p-4">
        <MakeSale/>
      </div>
      <div className="col-span-4 row-span-4 bg-white rounded-lg p-4">
        <RecentInvoices/>
      </div>
      <div className="col-span-4 row-span-4 p-4 bg-white rounded-lg">
        <ServiceEntry/>
      </div>
    </div>
  );
}

export default Dashboard;
