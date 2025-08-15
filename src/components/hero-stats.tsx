"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, MapPin, Clock, Loader2 } from "lucide-react"
import { kitaKitsAPI, type AnalyticsResponse } from "@/lib/api-client"
import { heroStats as fallbackStats } from "@/lib/mock-data"
import { useDataSource } from "@/components/data-source-toggle"

export function HeroStats() {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState(false)
  const isLiveDataMode = useDataSource()

  useEffect(() => {
    const fetchData = async () => {
      if (!isLiveDataMode) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setApiError(false)
        const analyticsData = await kitaKitsAPI.getAnalytics()
        setData(analyticsData)
      } catch (error) {
        console.error('Failed to fetch analytics data:', error)
        setApiError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [isLiveDataMode])

  // Determine what data to show based on toggle state
  const stats = (() => {
    if (!isLiveDataMode) {
      // User selected mock data - use fallback stats
      return {
        ...fallbackStats,
        trendsLastUpdated: "Mock Data"
      }
    }

    if (apiError || !data) {
      // Live mode but API failed - show error state
      return {
        totalMSMEs: 0,
        dailyTransactions: 0,
        revenueTracked: 0,
        regionsActive: 0,
        trendsLastUpdated: "API Error",
        growthRate: 0
      }
    }

    // Live mode with successful API response
    return {
      totalMSMEs: data.overview.totalUsers ?? 0,
      dailyTransactions: data.trends?.daily?.[data.trends.daily.length - 1]?.interactions ?? 0,
      revenueTracked: 0, // Not in live API yet
      regionsActive: 17, // Metro Manila cities (static for now)
      trendsLastUpdated: "Live API",
      growthRate: parseFloat(data.trends?.weekly?.percentageChange?.interactions?.replace(/[+%]/g, '') || '0') || 0
    }
  })()

  const dataSourceInfo = {
    isLive: isLiveDataMode && !apiError && data !== null,
    isError: isLiveDataMode && apiError,
    isMock: !isLiveDataMode,
    label: !isLiveDataMode ? "Mock" : apiError ? "Error" : "Live"
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <div className="text-xs text-muted-foreground">Fetching data...</div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
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
          <div className="text-2xl font-bold">
            {stats.totalMSMEs.toLocaleString()}
            {dataSourceInfo.isLive && stats.totalMSMEs === 0 && (
              <span className="text-sm text-muted-foreground ml-2">(Live - No Data Yet)</span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>+{stats.growthRate}% from last month</span>
            <Badge 
              variant={dataSourceInfo.isLive ? "default" : dataSourceInfo.isError ? "destructive" : "secondary"} 
              className="text-xs ml-2"
            >
              {dataSourceInfo.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Transactions</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(stats.dailyTransactions)}
            {dataSourceInfo.isLive && stats.dailyTransactions === 0 && (
              <span className="text-sm text-muted-foreground ml-2">(Live - No Data Yet)</span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Badge 
              variant={dataSourceInfo.isLive ? "default" : dataSourceInfo.isError ? "destructive" : "secondary"} 
              className="text-xs"
            >
              {dataSourceInfo.label}
            </Badge>
            <span>Updated {stats.trendsLastUpdated}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue Tracked</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.revenueTracked)}</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Badge 
              variant={dataSourceInfo.isLive ? "default" : dataSourceInfo.isError ? "destructive" : "secondary"} 
              className="text-xs"
            >
              {dataSourceInfo.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Metro Manila Coverage</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.regionsActive} Cities</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Badge 
              variant={dataSourceInfo.isLive ? "default" : dataSourceInfo.isError ? "destructive" : "secondary"} 
              className="text-xs"
            >
              {dataSourceInfo.label}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
