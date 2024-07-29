import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserTable from "@/components/custom/UserTable";
import { servicesColumn } from "@/columns";
function Services() {
    const rows =[]
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mb-4 text-primary hover:bg-primary hover:text-white transition"
          >
            + Record service
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>New service</DialogTitle>
            <DialogDescription>
              Record a new service here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="border p-4 pb-6 rounded-lg">
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Client name</Label>
                <Input name='clientName' placeholder='Tony Ligogo'/>
            </div>
            <div>
                <Label>Requested by</Label>
                <Input name='requestedBy' placeholder='Thomas Odhiambo'/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Employee</Label>
                <Input name='employee' placeholder='Peter Okoth'/>
            </div>
            <div>
                <Label>Work location</Label>
                <Input name='location' placeholder='Zimmerman'/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Work duration</Label>
                <Input name='duration' placeholder='2 hours'/>
            </div>
            <div>
                <Label>Cost</Label>
                <Input name='cost' placeholder='Ksh 400'/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Scope</Label>
                <Input name='scope' placeholder='Roysambu'/>
            </div>
            <div>
                <Label>Scope description</Label>
                <Textarea name='scopeDesc'/>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
                <Label>Date</Label>
                <Input name='date' placeholder='07-20-24'/>
            </div>
            <div>
                <Label>Invoice code</Label>
                <Input name='code' placeholder='S-01-20-24'/>
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
      <div>
        <UserTable rows={rows} columns={servicesColumn} />
      </div>
    </div>
  )
}

export default Services