"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from 'lucide-react';

export function NewGoalForm() {

  const [goalName, setGoalName] = React.useState("");
  const [targetAmount, setTargetAmount] = React.useState("");
  const [currentSavings, setCurrentSavings] = React.useState("");
  const [deadline, setDeadline] = React.useState("");
  const [priorityLevel, setPriorityLevel] = React.useState("Medium");
  const [category, setCategory] = React.useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ><CirclePlus/> Add New Goal</Button>
      </DialogTrigger>
      <DialogContent className="w-auto flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="goalName" className="text-right">
              Goal Name
            </Label>
            <Input
              id="goalName"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="col-span-3"
              placeholder="Enter the name of your goal"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="targetAmount" className="text-right">
              Target Amount
            </Label>
            <Input
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="col-span-3"
              placeholder="Set the total amount you want to save"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentSavings" className="text-right">
              Current Savings
            </Label>
            <Input
              id="currentSavings"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="col-span-3"
              placeholder="(Optional) Input how much you’ve already saved"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deadline" className="text-right">
              Deadline
            </Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="col-span-3"
              placeholder="Specify the date to achieve the goal"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priorityLevel" className="text-right">
              Priority Level
            </Label>
            <select
              id="priorityLevel"
              value={priorityLevel}
              onChange={(e) => setPriorityLevel(e.target.value)}
              className="col-span-3"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="col-span-3"
              placeholder="(Optional) Group the goal into categories like Travel, Gadgets, etc."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
