
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className }: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300 min-h-screen">
        <Header />
        <div className={cn(
          "pt-20 px-4 md:px-6 pb-8 animate-fade-in",
          className
        )}>
          {children}
        </div>
      </main>
    </div>
  );
};
