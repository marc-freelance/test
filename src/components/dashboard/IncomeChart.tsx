
import { useState } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data
const monthlyData = [
  { name: "Jan", income: 8400 },
  { name: "Feb", income: 7600 },
  { name: "Mar", income: 10200 },
  { name: "Apr", income: 9800 },
  { name: "May", income: 12000 },
  { name: "Jun", income: 11400 },
  { name: "Jul", income: 9200 },
  { name: "Aug", income: 10800 },
  { name: "Sep", income: 12600 },
  { name: "Oct", income: 13200 },
  { name: "Nov", income: 14800 },
  { name: "Dec", income: 15400 },
];

const quarterlyData = [
  { name: "Q1", income: 26200 },
  { name: "Q2", income: 33200 },
  { name: "Q3", income: 32600 },
  { name: "Q4", income: 43400 },
];

const yearlyData = [
  { name: "2020", income: 78000 },
  { name: "2021", income: 92000 },
  { name: "2022", income: 108000 },
  { name: "2023", income: 135400 },
];

type TimeRange = "monthly" | "quarterly" | "yearly";

export const IncomeChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("monthly");
  const [year, setYear] = useState("2023");
  
  const data = 
    timeRange === "monthly" 
      ? monthlyData 
      : timeRange === "quarterly" 
      ? quarterlyData 
      : yearlyData;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden animate-fade-up delay-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b gap-4">
        <h3 className="font-semibold">Income Overview</h3>
        
        <div className="flex items-center space-x-2">
          {timeRange !== "yearly" && (
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[100px] h-9">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant={timeRange === "monthly" ? "default" : "outline"}
              className="h-9"
              onClick={() => setTimeRange("monthly")}
            >
              Monthly
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === "quarterly" ? "default" : "outline"}
              className="h-9"
              onClick={() => setTimeRange("quarterly")}
            >
              Quarterly
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === "yearly" ? "default" : "outline"}
              className="h-9"
              onClick={() => setTimeRange("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#888" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Income"]}
              contentStyle={{ 
                backgroundColor: "white", 
                border: "1px solid #f0f0f0",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
              cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
            />
            <Bar 
              dataKey="income" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]} 
              barSize={timeRange === "monthly" ? 20 : 40}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
