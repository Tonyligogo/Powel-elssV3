import { Button } from "@/components/ui/button"

function PagenotFound() {
  return (
    <div>
    <h1 className="text-4xl font-bold text-center">404</h1>
    <h2 className="text-2xl text-center">Page not found!</h2>
    <p className="text-lg text-center">The page you are looking for does not exist.</p>
    <div className="mt-3 text-center">
    <Button onClick={()=>window.history.back()}>Back</Button>
    </div>
    </div>
  )
}

export default PagenotFound