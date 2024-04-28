import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCairoContext } from "@/lib/store/cairo";
import { Label } from "@radix-ui/react-label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Address } from "cluster";
import React from "react";

export const DebugBar = () => {
    return(
        <div className="p-4 ">
            <h2 className="font-bold">Debug Transaction</h2>
            <form>
                <div className="grid w-full items-center gap-8 p-4">
                    <div className="flex flex-col space-y-4">
                        <Label htmlFor="transaction_hash">Transaction Hash</Label>
                        <Input id="transaction_hash" placeholder="" />
                        <Button>Start Debugging</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}