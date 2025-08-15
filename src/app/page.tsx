import { HeroStats } from "@/components/hero-stats";
import { TrendsChart } from "@/components/trends-chart";
import { HeatMap } from "@/components/heat-map";
import { AlertCards } from "@/components/alert-cards";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectionStatus } from "@/components/connection-status";
import { DataSourceToggle } from "@/components/data-source-toggle";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">KitaKits Analytics</h1>
              <p className="text-muted-foreground">
                Real-time insights from MSMEs across the Philippines
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectionStatus />
              <Badge variant="secondary" className="text-xs">
                Hackathon Demo
              </Badge>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Data Source Toggle */}
        <section className="flex justify-center">
          <DataSourceToggle />
        </section>

        {/* Hero Stats */}
        <section>
          <HeroStats />
        </section>

        {/* Charts Section */}
        <section className="grid gap-6 md:grid-cols-2">
          <TrendsChart />
          <HeatMap />
        </section>

        {/* Alerts Section */}
        <section>
          <AlertCards />
        </section>
      </main>
    </div>
  );
}
