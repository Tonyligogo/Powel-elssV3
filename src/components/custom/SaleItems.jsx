/* eslint-disable react/prop-types */
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

function SaleItems({onTableUpdate, type}) {
  const [items, setItems] = useState([]);
  const [addItem, setAddItem] = useState(false);
  const [inputValues, setInputValues] = useState({
    itemDescription: "",
    quantity: "",
    price: "",
    unit: "",
  });
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
      itemDescription: "",
      quantity: "",
      price: "",
      unit: "",
    });
    setAddItem(false);
  };
  const handleCancel = () => {
    setInputValues({
      itemDescription: "",
      quantity: "",
      price: "",
      unit: "",
    });
    setAddItem(false);
  };
  const handleRemoveItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
    onTableUpdate(newItems);
  };

  return (
    <div>
      {items.length > 0 && (
        <table className="table-auto w-full border border-slate-400">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left border px-1">{type === 'Service' ? 'Service' : 'Item'}</th>
              {type === 'Item' ? <th className="text-left border px-1">Quantity</th> : null}
              <th className="text-left border px-1">{type === 'Service' ? 'Cost' : 'Unit price'}</th>
              {type === 'Item' ? <th className="text-left border px-1">Total</th> : null}
              <th className="text-left border px-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border px-2">{item.itemDescription}</td>
                {type === 'Item' ? <td className="border px-2">{item.quantity}</td> : null}
                <td className="border px-2">{item.price}</td>
                <td className="border px-2">{item.amount}</td>
                <td className="border px-2">
                  <Trash2
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleRemoveItem(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {type ? (
        <>
          {items.length <= 0 || addItem ? (
            <div>
              <form onSubmit={handleAddItem}>
                <div
                  className={`grid grid-cols-1 gap-4 py-4 ${
                    type === 'Service'
                      ? "md:grid-cols-2"
                      : "md:grid-cols-3"
                  }`}
                >
                  <div>
                    <Label>{type === 'Service' ? 'Service' : 'Item'} Description</Label>
                    <Input
                      name="itemDescription"
                      value={inputValues.itemDescription}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {type !== 'Service' ? 
                  <div>
                    <Label>Item quantity</Label>
                    <Input
                      type="number"
                      name="quantity"
                      value={inputValues.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  : null
                  }
                  <div>
                    <Label>{type === 'Service' ? 'Cost of Service' : 'Item Amount'}</Label>
                    <Input
                      type="number"
                      name="price"
                      value={inputValues.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end mt-4">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                type="button"
                onClick={() => setAddItem(true)}
                className="text-primary hover:bg-primary hover:text-white cursor-pointer transition mt-4 "
              >
                +Add {type === 'Service' ? 'Service' : 'Item'}
              </Button>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}

export default SaleItems;
