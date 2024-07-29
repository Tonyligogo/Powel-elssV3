const data = [
    {id:1,name:'Joy Nyaieka', email:'nyaieka@gmail.com', amount:'550'},
    {id:2,name:'Tony Smith', email:'smith@gmail.com', amount:'1200'},
    {id:3,name:'Emma Watson', email:'watson@gmail.com', amount:'700'},
    {id:4,name:'Sarah Johnson', email:'johnson@gmail.com', amount:'600'},
    {id:5,name:'Mia Olsen', email:'olsen@gmail.com', amount:'800'},
]
function RecentSales() {
  return (
    <div className="bg-white rounded-lg p-4">
        <h1>Recent Sales</h1>
        <small className="text-gray-500">You&apos;ve made 32 sales this week.</small>
        <hr className="my-2"/>
        <div>
            <ul className="flex flex-col gap-3">
                {data.map((item)=>(
                    <li key={item.id} className="flex justify-between items-center">
                    <p className="flex flex-col">
                        <span>{item.name}</span>
                        <small className="text-gray-500">{item.email}</small>
                    </p>
                    <span>Ksh.{item.amount}</span>
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default RecentSales