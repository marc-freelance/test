
import { CreditCard, DollarSign, FileText, UserRound } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentInvoicesCard } from "@/components/dashboard/RecentInvoicesCard";
import { IncomeChart } from "@/components/dashboard/IncomeChart";
import { UpcomingCard } from "@/components/dashboard/UpcomingCard";

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold animate-fade-in">Dashboard</h1>
          <p className="text-muted-foreground animate-fade-in delay-100">Welcome back! Here's an overview of your business.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          <StatCard 
            title="Total Revenue" 
            value="$24,780" 
            icon={DollarSign}
            change={{ value: "12%", isPositive: true }}
          />
          <StatCard 
            title="Outstanding" 
            value="$4,550" 
            icon={CreditCard}
            change={{ value: "5%", isPositive: false }}
          />
          <StatCard 
            title="Invoices" 
            value="36" 
            icon={FileText}
            change={{ value: "8%", isPositive: true }}
          />
          <StatCard 
            title="Active Clients" 
            value="12" 
            icon={UserRound}
            change={{ value: "2", isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <IncomeChart />
            <RecentInvoicesCard />
          </div>
          <div className="space-y-6">
            <UpcomingCard />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
