
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data
const upcomingPayments = [
  {
    id: "p1",
    client: "Acme Corp",
    invoice: "INV-2023-005",
    amount: "$2,400.00",
    dueDate: "Nov 5, 2023",
    status: "pending",
  },
  {
    id: "p2",
    client: "TechStart Inc",
    invoice: "INV-2023-006",
    amount: "$1,800.00",
    dueDate: "Nov 8, 2023",
    status: "pending",
  },
  {
    id: "p3",
    client: "Design Partners",
    invoice: "INV-2023-007",
    amount: "$3,600.00",
    dueDate: "Nov 15, 2023",
    status: "pending",
  },
];

export const UpcomingCard = () => {
  return (
    <Card className="animate-fade-up delay-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Upcoming Payments</CardTitle>
        <CardDescription>Payments expected in the next 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingPayments.map((payment) => (
            <div 
              key={payment.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="space-y-1">
                <p className="font-medium">{payment.client}</p>
                <p className="text-sm text-muted-foreground">{payment.invoice}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{payment.amount}</p>
                <p className="text-sm text-muted-foreground">Due {payment.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
