"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, MapPin, Clock } from "lucide-react"
import { heroStats } from "@/lib/mock-data"

export function HeroStats() {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `₱${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toLocaleString()
  }

  const formatCurrency = (num: number) => {
    if (num >= 1000000) {
      return `₱${(num / 1000000).toFixed(1)}M`
    }
    return `₱${num.toLocaleString()}`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total MSMEs</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{heroStats.totalMSMEs.toLocaleString()}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>+{heroStats.growthRate}% from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Transactions</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(heroStats.dailyTransactions)}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-xs">Live</Badge>
            <span>Updated {heroStats.trendsLastUpdated}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue Tracked</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(heroStats.revenueTracked)}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="text-green-600">↗ +18% this week</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Geographic Coverage</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{heroStats.regionsActive} Regions</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Nationwide coverage</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
