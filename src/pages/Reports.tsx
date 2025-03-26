
import { useState } from "react";
import { 
  BarChart3, 
  Calendar, 
  Download, 
  FileText, 
  LineChart, 
  PieChart
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data for charts
const monthlyData = [
  { month: "Jan", income: 6800, expenses: 3200 },
  { month: "Feb", income: 7200, expenses: 3400 },
  { month: "Mar", income: 8400, expenses: 3600 },
  { month: "Apr", income: 7600, expenses: 3100 },
  { month: "May", income: 9200, expenses: 3800 },
  { month: "Jun", income: 8800, expenses: 3500 },
  { month: "Jul", income: 10200, expenses: 4100 },
  { month: "Aug", income: 9800, expenses: 3900 },
  { month: "Sep", income: 11200, expenses: 4300 },
  { month: "Oct", income: 10800, expenses: 4000 },
  { month: "Nov", income: 12400, expenses: 4600 },
  { month: "Dec", income: 11800, expenses: 4400 },
];

const clientData = [
  { name: "Acme Corp", value: 8500 },
  { name: "Globex Industries", value: 6200 },
  { name: "TechStart Inc", value: 9400 },
  { name: "Design Partners", value: 5600 },
  { name: "Other Clients", value: 3800 },
];

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];

const Reports = () => {
  const [timeRange, setTimeRange] = useState("yearly");
  const [year, setYear] = useState("2023");

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold animate-fade-in">Reports</h1>
            <p className="text-muted-foreground animate-fade-in delay-100">Analyze your business performance</p>
          </div>
          
          <div className="flex items-center space-x-2 animate-fade-in">
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="income" className="animate-fade-up">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="income" className="flex items-center">
              <LineChart className="h-4 w-4 mr-2" />
              Income
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Invoices
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="income" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
                <CardDescription>Compare your income and expenses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="month" 
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
                        formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                        contentStyle={{ 
                          backgroundColor: "white", 
                          border: "1px solid #f0f0f0",
                          borderRadius: "0.5rem",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        }}
                        cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                      />
                      <Legend 
                        iconType="circle" 
                        wrapperStyle={{ paddingTop: 20 }} 
                      />
                      <Bar 
                        name="Income" 
                        dataKey="income" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]} 
                        barSize={12}
                        animationDuration={800}
                      />
                      <Bar 
                        name="Expenses" 
                        dataKey="expenses" 
                        fill="#e0e0e0" 
                        radius={[4, 4, 0, 0]} 
                        barSize={12}
                        animationDuration={800}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#888" }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#888" }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                          contentStyle={{ 
                            backgroundColor: "white", 
                            border: "1px solid #f0f0f0",
                            borderRadius: "0.5rem" 
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="income" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ r: 4, fill: "hsl(var(--primary))" }}
                          activeDot={{ r: 6 }}
                          animationDuration={800}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Year-to-Date Summary</CardTitle>
                    <CardDescription>Your financial overview for {year}</CardDescription>
                  </div>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-sm font-medium">$135,400</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-muted-foreground">Expenses</p>
                        <p className="text-sm font-medium">$45,900</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary/30 rounded-full" style={{ width: "34%" }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-muted-foreground">Profit</p>
                        <p className="text-sm font-medium">$89,500</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "66%" }} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Invoices</p>
                        <p className="text-xl font-bold">64</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Invoice</p>
                        <p className="text-xl font-bold">$2,115</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Client</CardTitle>
                  <CardDescription>Breakdown of revenue by client</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={clientData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          animationDuration={800}
                        >
                          {clientData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                          contentStyle={{ 
                            backgroundColor: "white", 
                            border: "1px solid #f0f0f0",
                            borderRadius: "0.5rem" 
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Client Performance</CardTitle>
                  <CardDescription>Top clients by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {clientData.map((client, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{client.name}</p>
                          <p className="text-sm font-medium">${client.value.toLocaleString()}</p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(client.value / Math.max(...clientData.map(c => c.value))) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Detailed Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">64</CardTitle>
                  <CardDescription>Total Invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <span className="text-green-500 mr-1">↑</span> 
                      12% from last year
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">$135,400</CardTitle>
                  <CardDescription>Total Invoiced</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <span className="text-green-500 mr-1">↑</span> 
                      18% from last year
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold">$4,550</CardTitle>
                  <CardDescription>Outstanding Amount</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <span className="text-red-500 mr-1">↓</span> 
                      5% from last month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Invoice Status Distribution</CardTitle>
                <CardDescription>Breakdown of invoices by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Paid", value: 42 },
                        { name: "Due", value: 15 },
                        { name: "Overdue", value: 3 },
                        { name: "Draft", value: 4 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar 
                        dataKey="value" 
                        radius={[4, 4, 0, 0]} 
                        barSize={60}
                        animationDuration={800}
                      >
                        {[
                          <Cell key="cell-0" fill="#10b981" />, // Paid - green
                          <Cell key="cell-1" fill="#f59e0b" />, // Due - yellow
                          <Cell key="cell-2" fill="#ef4444" />, // Overdue - red
                          <Cell key="cell-3" fill="#94a3b8" />, // Draft - gray
                        ]}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Reports;
