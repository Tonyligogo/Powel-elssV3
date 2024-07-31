/* eslint-disable react/prop-types */
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { server } from "@/server"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import toast from "react-hot-toast"
  
function DeleteDialog({open, close, deleteId}) {
    const queryClient = useQueryClient()

    const { mutateAsync:deleteQuot, isPending} = useMutation({
        mutationFn: async (id) => {
          await axios.delete(`${server}/api/quotation/delete-quotation/${id}`)
        },
        onError: () => {
            toast.error('An error occurred while deleting quotation. Please try again',{id:'deletionError'})
          },
        onSuccess: () => {
            toast.success('Quotation deleted successfully.',{id:'success'})
            queryClient.invalidateQueries({ queryKey: ['quotations'] })
          },
      })

  return (
    <AlertDialog open={open} onOpenChange={close}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this quotation.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={()=>deleteQuot(deleteId)}>{isPending ? <Loader2 className="animate-spin"/> : 'Continue' }</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default DeleteDialog