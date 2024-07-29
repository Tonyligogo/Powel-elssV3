
function InvoiceHeader() {
  return (
    <div>
        <div className="flex justify-between gap-4">
            <div className="flex flex-col">
                <span>Off Naivasha Moi South Lake road</span>
                <span>Naivasha, Kenya 20117 KE</span>
                <span>+254 722171416</span>
                <span>admin@powel-elss.com</span>
                <span>PIN A002401254C</span>
            </div>
            <div className="bg-primary h-fit text-white p-1">
                <span className="text-2xl font-semibold">Powel-elss<sup className="text-sm">(K)</sup></span>
                <hr />
                <small>Electrical Sales, Installation & Industrial Services</small>
            </div>
        </div>
    </div>
  )
}

export default InvoiceHeader