"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react"
import { kitaKitsAPI, type AnalyticsResponse } from "@/lib/api-client"
import { trendingProducts as fallbackProducts } from "@/lib/mock-data"
import { useDataSource } from "@/components/data-source-toggle"

export function TrendsChart() {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState(false)
  const [viewMode, setViewMode] = useState<'products' | 'trends'>('products')
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

  // Transform data for the chart
  const chartData = (() => {
    if (!isLiveDataMode) {
      // Show mock data when explicitly in mock mode
      return fallbackProducts.map(product => ({
        name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
        fullName: product.name,
        sales: product.sales,
        change: product.change,
        price: product.price,
        category: product.category,
        stock: product.stock
      }))
    }
    
    if (apiError || !data) {
      // Live mode but no data available
      return []
    }
    
    // Live mode with real data - use trendingProducts from the API response
    if (data?.trendingProducts && Array.isArray(data.trendingProducts) && data.trendingProducts.length > 0) {
      return data.trendingProducts.map(product => ({
        name: product.name,
        fullName: product.fullName || product.name,
        sales: product.sales || 0,
        change: product.change || 0,
        price: parseFloat(product.price) || 0,
        category: product.category || 'Unknown',
        stock: product.stock || 0
      }))
    }
    
    // No trending products data available yet
    return []
  })()
  
  // Transform API data to daily trend chart data if available
  const dailyTrendData = data?.trends?.daily || []

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg shadow-md p-3 space-y-2">
          <p className="font-semibold">{data.fullName}</p>
          <div className="space-y-1 text-sm">
            <p>Sales: <span className="font-medium">{data.sales.toLocaleString()}</span></p>
            <p>Price: <span className="font-medium">₱{data.price}</span></p>
            <p>Category: <span className="font-medium">{data.category}</span></p>
            <p>Stock Level: <span className="font-medium">{data.stock}</span></p>
            <div className="flex items-center space-x-1">
              {data.change > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-600" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600" />
              )}
              <span className={data.change > 0 ? "text-green-600" : "text-red-600"}>
                {data.change > 0 ? '+' : ''}{data.change}% this week
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  // Color bars based on change percentage
  const getBarColor = (change: number) => {
    if (change > 30) return "hsl(142, 76%, 36%)" // Strong green
    if (change > 10) return "hsl(173, 58%, 39%)" // Green
    if (change > 0) return "hsl(197, 37%, 24%)" // Blue
    return "hsl(0, 84%, 60%)" // Red for negative
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {isLoading ? (
            <span>Loading Analytics...</span>
          ) : (
            <div className="flex items-center space-x-2">
              <span>{viewMode === 'products' ? 'Top Trending Products' : 'Daily Trends'}</span>
              <div className="flex space-x-1">
                <Badge 
                  variant={viewMode === 'products' ? "default" : "outline"} 
                  className="text-xs cursor-pointer" 
                  onClick={() => setViewMode('products')}
                >
                  Products
                </Badge>
                <Badge 
                  variant={viewMode === 'trends' ? "default" : "outline"} 
                  className="text-xs cursor-pointer" 
                  onClick={() => setViewMode('trends')}
                >
                  Daily Trends
                </Badge>
              </div>
            </div>
          )}
          <Badge 
            variant={isLiveDataMode && !apiError && data !== null ? "default" : apiError ? "destructive" : "secondary"} 
            className="text-xs"
          >
            {!isLiveDataMode ? "Mock Data" : apiError ? "API Error" : "Live API"}
          </Badge>
        </CardTitle>
        <CardDescription>
          {isLoading ? (
            <span className="flex items-center"><Loader2 className="h-3 w-3 animate-spin mr-2" /> Fetching analytics data...</span>
          ) : (
            viewMode === 'products' ? 
              "Weekly sales performance across all MSMEs" : 
              "Daily interactions from the KitaKits platform"
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="h-80">
            {viewMode === 'products' ? (
              chartData.length === 0 && isLiveDataMode ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-6xl text-muted-foreground">📊</div>
                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground">No Product Data Yet</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                      Your database has been reset. Product analytics will appear here as users interact with your KitaKits bot and add inventory items.
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
                    ✅ Connected to Live API • Database Reset Complete
                  </div>
                </div>
              ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="sales" 
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getBarColor(entry.change)} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              )
            ) : (
              dailyTrendData.length === 0 && isLiveDataMode ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-6xl text-muted-foreground">📈</div>
                  <div>
                    <h3 className="text-lg font-semibold text-muted-foreground">No Trend Data Yet</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md">
                      Daily interaction trends will appear here as users start using your KitaKits bot.
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
                    ✅ Connected to Live API • Ready for User Data
                  </div>
                </div>
              ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dailyTrendData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="interactions" 
                    name="Interactions"
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="newUsers" 
                    name="New Users"
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              )
            )}
          </div>
        )}
        
        {!isLoading && viewMode === 'products' && (
          <>
            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(142, 76%, 36%)" }}></div>
                <span>+30%+ Growth</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(173, 58%, 39%)" }}></div>
                <span>+10% to +30%</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(197, 37%, 24%)" }}></div>
                <span>0% to +10%</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: "hsl(0, 84%, 60%)" }}></div>
                <span>Declining</span>
              </div>
            </div>

            {/* Quick Insights - Only show for mock data */}
            {!isLiveDataMode && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-green-600">🔥 Hottest</div>
                  <div className="text-xs text-muted-foreground">Instant Noodles (+45%)</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-blue-600">📈 Growing</div>
                  <div className="text-xs text-muted-foreground">8 out of 10 products</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-orange-600">⚠️ Watch</div>
                  <div className="text-xs text-muted-foreground">Cooking Oil (-5%)</div>
                </div>
              </div>
            )}
          </>
        )}
        
        {!isLoading && viewMode === 'trends' && data?.trends?.weekly && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-semibold text-blue-600">Interactions</div>
              <div className="text-xs text-muted-foreground">
                {data.trends.weekly.percentageChange.interactions} from last week
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-semibold text-green-600">New Users</div>
              <div className="text-xs text-muted-foreground">
                {data.trends.weekly.percentageChange.newUsers} from last week
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-semibold text-purple-600">OCR Processed</div>
              <div className="text-xs text-muted-foreground">
                {data.trends.weekly.percentageChange.ocrProcessed} from last week
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
