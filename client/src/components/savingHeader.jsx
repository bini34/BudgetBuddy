import * as React from "react";
import { Button } from "@/components/ui/button";
import { DrawerDialogDemo } from "@/components/ui/drawer-dialog-demo";

export default function SavingHeader(){
    return <header>
        <h1>Savings</h1>
        <Button>Add Savings</Button>
        <DrawerDialogDemo />
    </header>
}