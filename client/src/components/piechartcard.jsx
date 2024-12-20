"use client"

import { useState, useMemo, createElement } from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
// import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const desktopData = [
  { category: "saving", percentage: 20, fill: "#4CAF50" },
  { category: "want", percentage: 50, fill: "#FF9800" },
  { category: "need", percentage: 30, fill: "#F44336" },
]

const chartConfig = {
  saving: {
    label: "Saving",
    color: "#4CAF50",
  },
  want: {
    label: "Want",
    color: "#FF9800",
  },
  need: {
    label: "Need",
    color: "#F44336",
  },
} 

export function PieChartComponent() {
  const id = "pie-interactive"
  const [activeCategory, setActiveCategory] = useState(desktopData[0].category)

  const activeIndex = useMemo(
    () => desktopData.findIndex((item) => item.category === activeCategory),
    [activeCategory]
  )
  const categories = useMemo(() => desktopData.map((item) => item.category), [])

  return createElement(
    Card,
    { "data-chart": id, className: "flex flex-col w-full" },
    createElement(ChartStyle, { id: id, config: chartConfig }),
    createElement(
      CardHeader,
      { className: "flex-row items-start space-y-0 pb-0" },
      createElement(
        "div",
        { className: "grid gap-1" },
        createElement(CardTitle, null, "Pie Chart - Interactive"),
        createElement(CardDescription, null, "January - June 2024")
      ),
      createElement(
        Select,
        { value: activeCategory, onValueChange: setActiveCategory },
        createElement(
          SelectTrigger,
          {
            className: "ml-auto h-7 w-[130px] rounded-lg pl-2.5",
            "aria-label": "Select a value",
          },
          createElement(SelectValue, { placeholder: "Select category" })
        ),
        createElement(
          SelectContent,
          { align: "end", className: "rounded-xl" },
          categories.map((key) => {
            const config = chartConfig[key]

            if (!config) {
              return null
            }

            return createElement(
              SelectItem,
              {
                key: key,
                value: key,
                className: "rounded-lg [&_span]:flex",
              },
              createElement(
                "div",
                { className: "flex items-center gap-2 text-xs" },
                createElement("span", {
                  className: "flex h-3 w-3 shrink-0 rounded-sm",
                  style: {
                    backgroundColor: config.color,
                  },
                }),
                config.label
              )
            )
          })
        )
      )
    ),
    createElement(
      CardContent,
      { className: "flex flex-1 justify-center pb-0" },
      createElement(
        ChartContainer,
        {
          id: id,
          config: chartConfig,
          className: "mx-auto aspect-square w-full max-w-[300px]",
        },
        createElement(
          PieChart,
          null,
          createElement(ChartTooltip, {
            cursor: false,
            content: createElement(ChartTooltipContent, { hideLabel: true }),
          }),
          createElement(
            Pie,
            {
              data: desktopData,
              dataKey: "percentage",
              nameKey: "category",
              innerRadius: 60,
              strokeWidth: 5,
              activeIndex: activeIndex,
              activeShape: ({ outerRadius = 0, ...props }) =>
                createElement(
                  "g",
                  null,
                  createElement(Sector, { ...props, outerRadius: outerRadius + 10 }),
                  createElement(Sector, {
                    ...props,
                    outerRadius: outerRadius + 25,
                    innerRadius: outerRadius + 12,
                  })
                ),
            },
            createElement(Label, {
              content: ({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return createElement(
                    "text",
                    {
                      x: viewBox.cx,
                      y: viewBox.cy,
                      textAnchor: "middle",
                      dominantBaseline: "middle",
                    },
                    createElement(
                      "tspan",
                      {
                        x: viewBox.cx,
                        y: viewBox.cy,
                        className: "fill-foreground text-3xl font-bold",
                      },
                      `${desktopData[activeIndex].percentage}%`
                    ),
                    createElement(
                      "tspan",
                      {
                        x: viewBox.cx,
                        y: (viewBox.cy || 0) + 24,
                        className: "fill-muted-foreground",
                      },
                      chartConfig[desktopData[activeIndex].category].label
                    )
                  )
                }
              },
            })
          )
        )
      )
    )
  )
}
