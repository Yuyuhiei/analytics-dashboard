import { HeroStats } from "@/components/hero-stats";
import { TrendsChart } from "@/components/trends-chart";
import { HeatMap } from "@/components/heat-map";
import { AlertCards } from "@/components/alert-cards";
import { ThemeToggle } from "@/components/theme-toggle";
import { ConnectionStatus } from "@/components/connection-status";
import { DataSourceToggle } from "@/components/data-source-toggle";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/kitakita-svg.svg"
                    alt="KitaKita Logo"
                    width={64}
                    height={64}
                    className="h-16 w-auto dark:brightness-0 dark:invert"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight" style={{ color: '#3F9160' }}>
                    Analytics Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Real-time insights from MSMEs across the Metro Manila
                  </p>
                </div>
              </div>
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
