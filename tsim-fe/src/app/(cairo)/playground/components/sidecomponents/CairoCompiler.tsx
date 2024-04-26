"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCairoContext } from '@/lib/store/cairo'


export const CairoCompiler = () => {
   const {cairo_version, updateCairoVersion} = useCairoContext();
    return(
        <div className="flex flex-col p-4 gap-8 max-w-full">
            <h2 className="text-lg">Cairo Compiler</h2>
            <p>We are using a compiler version of {cairo_version} </p>
            <form>
                <div className="grid w-full items-center gap-4">
                <Label htmlFor="cairo-version">Cairo Version</Label>
                <Select 
                    onValueChange={(e) => updateCairoVersion(e as any)}
                >
                    <SelectTrigger id="cairo-version">
                        <SelectValue placeholder="2.6.3" ></SelectValue>
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