import InvoiceHeader from "@/components/custom/InvoiceHeader"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import ReactToPrint from "react-to-print"

const rows = [
  {desc:'Lab oven repairs and maintenance', qty: 1, rate:500,amount:500},
  {desc:'Heating system repairs and maintenance', qty: 1, rate:3000,amount:3000},
  {desc:'Exhaust system repairs and maintenance', qty: 1, rate:1250,amount:1250},
  {desc:'Cooling system repairs and maintenance', qty: 1, rate:100,amount:100},
]
function Details() {
  const [buttonVisible, setButtonVisible] = useState(true)
  const componentRef = useRef()

  return (
    <div className="bg-white p-2">
    <div ref={componentRef} className="rounded-lg m-2 pb-5">
      <InvoiceHeader/>
      <h1 className="text-primary my-4">INVOICE</h1>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex flex-col">
          <span>BILL TO</span>
          <span>Mr.Anthony Ligogo</span>
          <span>Elsamere Field study Centre</span>
          <span>Off Moi South Lake Rd</span>
          <span>20117 Naivasha, Kenya</span>
        </div>
        <div className="flex flex-col">
          <span><span className="w-[100px] text-right inline-block">INVOICE NO.</span> <span className="text-gray-700">1005</span></span>
          <span><span className="w-[100px] text-right inline-block">DATE</span> <span className="text-gray-700">08-06-2024</span></span>
          <span><span className="w-[100px] text-right inline-block">DUE DATE</span> <span className="text-gray-700">08-07-2024</span></span>
          <span><span className="w-[100px] text-right inline-block">TERMS</span> <span className="text-gray-700">Net 30</span></span>
        </div>
      </div>
      <hr className="border-primary"/>
      <table className="w-full mt-10 mb-3">
        <thead className="bg-[#ffece6] text-primary">
          <tr>
            <th className="text-left p-2">DESCRIPTION</th>
            <th className="text-right p-2">QTY</th>
            <th className="text-right p-2">RATE</th>
            <th className="text-right p-2">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index)=>(
            <tr key={index}>
              <td className="p-1 px-2">{row.desc}</td>
              <td className="p-1 px-2 text-right">{row.qty}</td>
              <td className="p-1 px-2 text-right">{row.rate}</td>
              <td className="p-1 px-2 text-right">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="grid grid-cols-2 my-3">
        <div className="col-start-2">
          <div>
            <span className="flex justify-between gap-4 px-2"> <span>DISCOUNT 20%</span> <span>-517.24</span> </span>
            <span className="flex justify-between gap-4 px-2"> <span>INCLUDES TAX</span> <span>331.04</span> </span>
            <span className="flex justify-between gap-4 px-2"> <span>TOTAL</span> <span>2400.00</span> </span>
            <span className="flex justify-between gap-4 px-2"> <span>PAYMENY</span> <span>2400.00</span> </span>
            <span className="flex justify-between gap-4 px-2"> <span>BALANCE DUE</span> <span className="font-bold">Ksh 0.00</span> </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-10">
      <span>TAX SUMMARY</span>
      <table className="w-full mb-3">
        <thead className="bg-[#ffece6] text-primary">
          <tr>
            <th className="text-right p-2">RATE</th>
            <th className="text-right p-2">TAX</th>
            <th className="text-right p-2">NET</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1 px-2 text-right">VAT @ 16%</td>
            <td className="p-1 px-2 text-right">165.52</td>
            <td className="p-1 px-2 text-right">1034.48</td>
          </tr>
          <tr>
            <td className="p-1 px-2 text-right">VAT @ 16%</td>
            <td className="p-1 px-2 text-right">165.52</td>
            <td className="p-1 px-2 text-right">1034.48</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div className="flex justify-end">
    {buttonVisible && <ReactToPrint
              trigger={() => <Button>Print Invoice</Button>}
              content={() => componentRef.current}
              onBeforeGetContent={() => setButtonVisible(false)}
              onAfterPrint={() => setButtonVisible(true)}
            />}
    </div>
    </div>
  )
}

export default Details