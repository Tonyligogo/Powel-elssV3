import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";

function QuotationItems({onTableUpdate, onQuotationTypeChange, label}) {
  const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState(false);
  // const [selectedData, setSelectedData] = useState('')
  const [itemType, setItemType] = useState('');
    
  const [inputValues, setInputValues] = useState({
    itemDescription: "",
    quantity: "",
    price: "",
    unit:""
  });

  // function handleSelect(e){
  //   setSelectedData(e.target.value);
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleAddItem = () => {
    const amount = inputValues.quantity * inputValues.price;
    setItems([...items, { ...inputValues, amount }]);
    onTableUpdate([...items, { ...inputValues, amount }]);
    setInputValues({
      itemName: '',
      quantity: '',
      price: '',
      unit: ''
    });
    setAddItem(false);
  };
  const handleCancel = () => {
    setInputValues({
      itemName: '',
      quantity: '',
      price: '',
      unit: ''
    });
    setAddItem(false);
  };
  const handleRemoveItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
    onTableUpdate(newItems);
  };

  const handleTypeChange = (value) => {
    const selectedType = value;
    setItemType(selectedType);
    onQuotationTypeChange(selectedType)

    setItems([]);
    onTableUpdate([]);
    // if (selectedType === 'Service') {
    // }

    setInputValues({
      itemName: '',
      quantity: '',
      price: '',
      unit: ''
    });
  };

  // const handleSaveTableData = (e) => {
  //   e.preventDefault();
  //   onTableUpdate(items);
  // }

  return (
    <div>
            <div className="mb-4">
              <Label htmlFor="select">
                Select {label ? 'invoice':'quotation'} type
              </Label>
              <Select id="select" name="option" onValueChange={handleTypeChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Service'>Service</SelectItem>
                  <SelectItem value='Supply'>Supply</SelectItem>
                  <SelectItem value='Service and Supply'>Service and Supply</SelectItem>
                </SelectContent>
              </Select>
            </div>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Unit price</th>
              <th>Total</th>
              {itemType !== 'Service' && <th>Unit</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.amount}</td>
                {itemType !== 'Service' && <td>{item.unit}</td>}
                <td>
                <Trash2 size={16} className='cursor-pointer' onClick={() => handleRemoveItem(index)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {itemType ?

      <>{items.length <= 0 || addItem ? <div>
        <form onSubmit={handleAddItem}>
        <div className={`grid grid-cols-1 gap-4 py-4 ${itemType.includes('Supply') ? 'md:grid-cols-4':'md:grid-cols-3'}`}>
            <div>
              <Label>Item Name</Label>
              <Input
              name="itemName"
              value={inputValues.itemName}
              onChange={handleChange}
              required 
              />
            </div>
            <div>
            <Label>Item Quantity</Label>
              <Input
              type="number"
              name="quantity"
              value={inputValues.quantity}
              onChange={handleChange}
              required 
              />
            </div>
            <div>
            <Label>Item Amount</Label>
              <Input
              type="number"
              name="price"
              value={inputValues.price}
              onChange={handleChange}
              required 
              />
            </div>
            <div>
            {(itemType === 'Supply' || itemType === 'Service and Supply') && (
              <>
              <Label>Unit</Label>
              <Input
              name="unit"
              value={inputValues.unit}
              onChange={handleChange}
              required={itemType === 'Supply'} 
              />
              </>
            )}
            </div>
        </div>
        <div className="flex gap-4 justify-end mt-4">
            <Button type="button" onClick={handleCancel} variant="outline">Cancel</Button>
            <Button type="submit">Add</Button>
        </div>
        </form>
      </div>
      :
      <>
      <p onClick={()=>setAddItem(true)} className="addItem">+Add Item</p>
      </>
      }</>
      :null
      }
    </div>
  );
}

export default QuotationItems;
