import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

function ServiceEntryForm() {
  return (
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
        <div className="flex justify-end">
            <Button type='submit'>Save</Button>
        </div>
    </div>
  )
}

export default ServiceEntryForm
