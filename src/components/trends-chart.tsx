"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, TrendingDown } from "lucide-react"
import { trendingProducts } from "@/lib/mock-data"

export function TrendsChart() {
  // Transform data for the chart
  const chartData = trendingProducts.map(product => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    fullName: product.name,
    sales: product.sales,
    change: product.change,
    price: product.price,
    category: product.category,
    stock: product.stock
  }))

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
          Top Trending Products
          <Badge variant="secondary" className="text-xs">
            Live Data
          </Badge>
        </CardTitle>
        <CardDescription>
          Weekly sales performance across all MSMEs - Updated 2 minutes ago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
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
        </div>
        
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

        {/* Quick Insights */}
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
      </CardContent>
    </Card>
  )
}
