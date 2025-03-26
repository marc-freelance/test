
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon: Icon, change, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white p-6 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-all animate-fade-up interactive-card",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center text-sm">
          <span className={cn(
            "font-medium",
            change.isPositive ? "text-green-500" : "text-red-500"
          )}>
            {change.isPositive ? "+" : ""}{change.value}
          </span>
          <span className="text-muted-foreground ml-1">vs. last month</span>
        </div>
      )}
    </div>
  );
};
