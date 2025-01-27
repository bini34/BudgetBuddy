import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { MonthPicker } from "./monthpicker";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function CalendarPopover({ date, setDate }) {
    const currentMonth = date || new Date();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    variant={"outline"} 
                    className={cn(
                        "w-[200px] sm:w-[250px] md:w-[280px] justify-start text-left font-normal", 
                        !date && "text-muted-foreground"
                    )}
                    aria-label="Select month and year"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(currentMonth, "MMM yyyy")}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <VisuallyHidden asChild>
                    <h2>Select month and year</h2>
                </VisuallyHidden>
                <MonthPicker onMonthSelect={setDate} selectedMonth={currentMonth} />
            </PopoverContent>
        </Popover>
    );
}
