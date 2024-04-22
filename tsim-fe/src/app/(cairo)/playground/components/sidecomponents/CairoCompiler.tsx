import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const CairoCompiler = () => {
    return(
        <div className="flex flex-col p-4 gap-8">
            <h2 className="text-lg">Cairo Compiler</h2>
            <form>
                <div className="grid w-full items-center gap-4">
                <Label htmlFor="cairo-version">Cairo Version</Label>
                <Select>
                    <SelectTrigger id="cairo-version">
                        <SelectValue placeholder="Select a cairo version"></SelectValue>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="2.6.0">v 2.6.0</SelectItem>
                        <SelectItem value="2.6.1">v 2.6.1</SelectItem>
                        <SelectItem value="2.6.2">v 2.6.2</SelectItem>
                        <SelectItem value="2.6.3">v 2.6.3</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </form>
        </div>
    )
}