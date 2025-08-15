"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, TrendingUp, Users, AlertTriangle, Loader2 } from "lucide-react"
import { regionData } from "@/lib/mock-data"
import { kitaKitsAPI, type AnalyticsResponse } from "@/lib/api-client"
import { useDataSource } from "@/components/data-source-toggle"

export function HeatMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
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

  // Determine data source
  const currentRegionData = (() => {
    if (!isLiveDataMode) {
      return regionData // Use mock data
    }
    
    if (apiError || !data) {
      return {} // No data available
    }
    
    // Live mode with real data - check if we have geographic data
    const geoData = data.urbanPlanningData?.geographicData
    if (!geoData || geoData.userDistribution?.length === 0) {
      return {} // Empty geographic data
    }
    
    // Transform API geographic data to region format (when available)
    // For now, return empty since database is reset
    return {}
  })()

  // Get color based on MSME density/status
  const getRegionColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-red-500 hover:bg-red-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-400 hover:bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "high":
        return "High Density"
      case "medium":
        return "Medium Density"
      case "low":
        return "Low Density"
      default:
        return "No Data"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  // Simplified Philippines regions layout
  const regions = [
    { name: "CAR", row: 1, col: 2 },
    { name: "Region 1", row: 1, col: 1 },
    { name: "Region 2", row: 1, col: 3 },
    { name: "NCR", row: 2, col: 2 },
    { name: "Region 3", row: 2, col: 1 },
    { name: "Region 4A", row: 2, col: 3 },
    { name: "Region 4B", row: 3, col: 3 },
    { name: "Region 5", row: 3, col: 4 },
    { name: "Region 6", row: 4, col: 2 },
    { name: "Region 7", row: 4, col: 3 },
    { name: "Region 8", row: 4, col: 4 },
    { name: "Region 9", row: 5, col: 1 },
    { name: "Region 10", row: 5, col: 2 },
    { name: "Region 11", row: 5, col: 3 },
    { name: "Region 12", row: 5, col: 4 },
    { name: "ARMM", row: 6, col: 2 }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Geographic Heat Map
          <Badge variant="secondary" className="text-xs">
            MSME Density
          </Badge>
        </CardTitle>
        <CardDescription>
          Regional distribution of MSMEs across the Philippines
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-4 justify-center text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>High Density (8K+ MSMEs)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Medium Density (3K-8K MSMEs)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Low Density (\u003c3K MSMEs)</span>
          </div>
        </div>

        {/* Simplified Philippines Map Grid */}
        <div className="relative mx-auto max-w-md">
          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            Object.keys(currentRegionData).length === 0 && isLiveDataMode ? (
              <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-6xl text-muted-foreground">🗺️</div>
                <div>
                  <h3 className="text-lg font-semibold text-muted-foreground">No Geographic Data Yet</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md">
                    Regional MSME distribution will appear here as users interact with your KitaKits bot from different locations across the Philippines.
                  </p>
                </div>
                <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
                  ✅ Connected to Live API • Waiting for Location Data
                </div>
              </div>
            ) : (
          <div className="grid grid-cols-4 gap-1 h-96">
            {Array.from({ length: 24 }, (_, index) => {
              const row = Math.floor(index / 4) + 1
              const col = (index % 4) + 1
              const region = regions.find(r => r.row === row && r.col === col)
              
              if (!region) {
                return <div key={index} className="rounded"></div>
              }

              const regionInfo = currentRegionData[region.name as keyof typeof currentRegionData] || regionData[region.name as keyof typeof regionData]
              
              return (
                <Dialog key={region.name}>
                  <DialogTrigger asChild>
                    <button
                      className={`
                        rounded-lg p-2 transition-all duration-200 cursor-pointer
                        ${getRegionColor(regionInfo.status)}
                        text-white text-xs font-medium
                        transform hover:scale-105 shadow-md hover:shadow-lg
                      `}
                      onClick={() => setSelectedRegion(region.name)}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <MapPin className="h-3 w-3 mb-1" />
                        <div className="text-[10px] leading-tight text-center">
                          {region.name}
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5" />
                        <span>{region.name}</span>
                      </DialogTitle>
                      <DialogDescription>
                        Detailed insights for {region.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">{regionInfo.msmes.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Total MSMEs</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold">₱{regionInfo.avgTransaction}</div>
                          <div className="text-xs text-muted-foreground">Avg Transaction</div>
                        </div>
                      </div>

                      {/* Status and Growth */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status:</span>
                          <Badge variant="outline" className={getStatusColor(regionInfo.status)}>
                            {getStatusLabel(regionInfo.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Growth:</span>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-green-600 font-medium">{regionInfo.growth}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Top Product:</span>
                          <span className="font-medium">{regionInfo.topProduct}</span>
                        </div>
                      </div>

                      {/* Alert if any */}
                      {regionInfo.alert && (
                        <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-yellow-800">Alert</div>
                            <div className="text-xs text-yellow-700">{regionInfo.alert}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
          )
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="font-semibold text-red-600">🏙️ Metro Areas</div>
            <div className="text-xs text-muted-foreground">NCR, Region 7 (High Density)</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="font-semibold text-yellow-600">🌾 Rural Growth</div>
            <div className="text-xs text-muted-foreground">Average +12% growth</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="font-semibold text-green-600">🎯 Opportunity</div>
            <div className="text-xs text-muted-foreground">Mindanao expansion</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
