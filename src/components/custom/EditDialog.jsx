import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuotationItems from "@/pages/quotation/QuotationItems";
import { useState } from "react";
function EditDialog({ open, rowToEdit, close }) {
    console.log(rowToEdit, "rowToEdit")
  return (
    <Dialog open={open} onOpenChange={()=>close()}>
      <DialogContent className="sm:max-w-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Quotation</DialogTitle>
          <DialogDescription>
            Disclaimer: You cannot edit the client&apos;s information. If you need to, create a new quotation.
          </DialogDescription>
        </DialogHeader>
        <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <div>
          <Label htmlFor="qtnNo">Quotation no.</Label>
          <Input id="qtnNo" readOnly defaultValue={rowToEdit?.quotation_no} />
        </div>
      </div>
      <hr className="my-4"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <div>
          <Label htmlFor="name">Client Name</Label>
          <Input id="name" readOnly defaultValue={rowToEdit?.client_name} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" readOnly defaultValue={rowToEdit?.client_email} />
        </div>
        <div>
          <Label htmlFor="number">Client Contact Number</Label>
          <Input id="number" readOnly defaultValue={rowToEdit?.client_contact_number} />
        </div>
        <div>
          <Label htmlFor="address">Client Address</Label>
          <Input id="address" readOnly defaultValue={rowToEdit?.client_address} />
        </div>
      </div>
      <hr className="my-4"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <div>
          <Label htmlFor="date">Quotation Date</Label>
          <Input id="date" type="date" defaultValue={rowToEdit.quotation_date} />
        </div>
        <div>
          <Label htmlFor="dueDate">Quotation Due Date</Label>
          <Input id="dueDate" type="date" defaultValue={rowToEdit.quotation_due_date} />
        </div>
        <div>
          <Label htmlFor="terms">Terms</Label>
          <Input id="terms" defaultValue={rowToEdit.terms}/>
        </div>
      </div>
      </div>
        <DialogFooter>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditDialog;
