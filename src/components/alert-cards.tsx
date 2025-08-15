"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle, 
  TrendingUp, 
  Flame, 
  Lightbulb,
  Clock,
  ArrowRight,
  Zap,
  Loader2,
  Target,
  TrendingDown,
  Eye,
  ChevronRight,
  Sparkles,
  Activity
} from "lucide-react"
import { kitaKitsAPI, type AnalyticsResponse } from "@/lib/api-client"
import { alertInsights as fallbackAlerts } from "@/lib/mock-data"
import { useDataSource } from "@/components/data-source-toggle"

export function AlertCards() {
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
  const alerts = (() => {
    if (!isLiveDataMode) {
      // User selected mock data
      return fallbackAlerts
    }

    if (apiError || !data) {
      // Live mode but API failed
      return [{
        id: 1,
        type: 'warning',
        title: 'API Connection Error',
        description: 'Unable to fetch live insights from the analytics API.',
        impact: 'High',
        action: 'Check your internet connection and try again.',
        timeframe: 'Immediate'
      }]
    }

    // Live mode with successful API response
    return data.businessInsights?.keyFindings ? 
      data.businessInsights.keyFindings.slice(0, 4).map((finding, index) => ({
        id: index + 1,
        type: index === 0 ? 'warning' : index === 1 ? 'opportunity' : index === 2 ? 'trending' : 'insight',
        title: index === 0 ? 'Stock Alert' : index === 1 ? 'Price Opportunity' : index === 2 ? 'Trending Product' : 'Market Insight',
        description: finding,
        impact: index < 2 ? 'High' : 'Medium',
        action: data.businessInsights.recommendations?.[index] || 'Monitor trends and adjust strategy',
        timeframe: index === 0 ? 'Immediate' : index === 1 ? 'This week' : 'Ongoing'
      })) : [] // Return empty array instead of fallback alerts
  })()

  const dataSourceInfo = {
    isLive: isLiveDataMode && !apiError && data !== null,
    isError: isLiveDataMode && apiError,
    isMock: !isLiveDataMode,
    label: !isLiveDataMode ? "Mock Insights" : apiError ? "Error" : "Live Insights"
  }
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4" />
      case "trending":
        return <Flame className="h-4 w-4" />
      case "insight":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getAlertVariant = (type: string): "default" | "destructive" => {
    return type === "warning" ? "destructive" : "default"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200"
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case "warning":
        return "🚨"
      case "opportunity":
        return "📈"
      case "trending":
        return "🔥"
      case "insight":
        return "💡"
      default:
        return "⚡"
    }
  }

  // Get card background based on type
  const getCardBg = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-gradient-to-br from-red-50 to-orange-50 border-red-200/50 hover:border-red-300/70"
      case "opportunity":
        return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 hover:border-green-300/70"
      case "trending":
        return "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200/50 hover:border-yellow-300/70"
      case "insight":
        return "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 hover:border-blue-300/70"
      default:
        return "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200/50 hover:border-gray-300/70"
    }
  }

  // Get priority indicator
  const getPriorityStyle = (impact: string) => {
    switch (impact) {
      case "High":
        return "h-2 w-2 bg-red-500 rounded-full animate-pulse"
      case "Medium":
        return "h-2 w-2 bg-yellow-500 rounded-full"
      case "Low":
        return "h-2 w-2 bg-green-500 rounded-full"
      default:
        return "h-2 w-2 bg-gray-400 rounded-full"
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl"></div>
        <Card className="relative border-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-indigo-50/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Sparkles className="h-8 w-8 text-blue-600" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      Actionable Insights
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      AI-powered alerts and recommendations for your business strategy
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="px-3 py-1 bg-white/80 backdrop-blur-sm border-white/20">
                  <Activity className="h-3 w-3 mr-1.5 text-green-600" />
                  <span className="text-xs font-medium">Live Intelligence</span>
                </Badge>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Updated 2m ago</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-16 bg-muted animate-pulse rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : alerts.length === 0 && isLiveDataMode ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
          <div className="text-6xl text-muted-foreground">🤖</div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">No Insights Available Yet</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              AI-powered insights will appear here as users interact with your KitaKits bot and generate business data.
            </p>
          </div>
          <div className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-lg">
            ✅ Connected to Live API • Ready for Business Insights
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {alerts.map((alert, index) => (
          <Card 
            key={alert.id} 
            className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/5 hover:scale-[1.02] ${getCardBg(alert.type)} backdrop-blur-sm border-2`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Priority Indicator */}
            <div className="absolute top-0 right-0 p-4">
              <div className={getPriorityStyle(alert.impact)}></div>
            </div>
            
            {/* Card Header */}
            <CardHeader className="pb-4 relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                      <span className="text-2xl">{getTypeEmoji(alert.type)}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      {getAlertIcon(alert.type)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {alert.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant="outline"
                        className={`text-xs font-medium px-2 py-1 ${getImpactColor(alert.impact)} border-0 shadow-sm`}
                      >
                        <Target className="h-3 w-3 mr-1" />
                        {alert.impact} Priority
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-white/60 text-gray-700">
                        {alert.timeframe}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-5 pb-6">
              {/* Description */}
              <div className="relative">
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {alert.description}
                </p>
              </div>
              
              {/* Action Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Recommended Strategy</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm">
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">
                    {alert.action}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1 font-medium transition-all duration-200 hover:scale-105 shadow-sm" 
                  variant={alert.type === "warning" ? "destructive" : "default"}
                >
                  <Target className="h-3 w-3 mr-2" />
                  Take Action
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="px-3 bg-white/80 hover:bg-white/90 border-white/30 shadow-sm"
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
            
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
          </Card>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <Badge 
          variant={dataSourceInfo.isLive ? "default" : dataSourceInfo.isError ? "destructive" : "secondary"} 
          className="text-xs"
        >
          {dataSourceInfo.label}
        </Badge>
        {data && (
          <span className="text-xs text-muted-foreground">
            Updated: {new Date(data.metadata.generatedAt).toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Enhanced Intelligence Summary */}
      {!isLiveDataMode && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-purple-600/5 to-pink-600/5 rounded-2xl blur-xl"></div>
          <Card className="relative bg-gradient-to-br from-white to-gray-50/50 border-2 border-gray-200/50 hover:border-gray-300/70 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Intelligence Summary
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Key metrics from our AI analysis of MSME data
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                  Mock Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="group relative overflow-hidden">
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200/50 hover:border-red-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-3xl font-bold text-red-600 mb-1">2</div>
                    <div className="text-xs font-medium text-red-700/80">Critical Alerts</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>
                <div className="group relative overflow-hidden">
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200/50 hover:border-yellow-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="h-5 w-5 text-yellow-600" />
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div className="text-3xl font-bold text-yellow-600 mb-1">1</div>
                    <div className="text-xs font-medium text-yellow-700/80">Opportunities</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>
                <div className="group relative overflow-hidden">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200/50 hover:border-green-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <Lightbulb className="h-5 w-5 text-green-600" />
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-3xl font-bold text-green-600 mb-1">1</div>
                    <div className="text-xs font-medium text-green-700/80">Market Insights</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>
                <div className="group relative overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                    <div className="text-xs font-medium text-blue-700/80">Prediction Accuracy</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Trending Keywords */}
      {!isLiveDataMode && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-red-600/5 to-pink-600/5 rounded-2xl blur-xl"></div>
          <Card className="relative bg-gradient-to-br from-white to-orange-50/30 border-2 border-orange-200/50 hover:border-orange-300/70 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
                    <Flame className="h-6 w-6 text-white" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <CardTitle className="text-xl flex items-center space-x-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      <span>Trending This Week</span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Most discussed products and categories among MSMEs
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                  Mock Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {[
                  { keyword: "Instant Noodles", trend: "hot" },
                  { keyword: "Rice Shortage", trend: "critical" }, 
                  { keyword: "Cooking Oil", trend: "declining" },
                  { keyword: "Premium Coffee", trend: "rising" },
                  { keyword: "Cebu Market", trend: "stable" },
                  { keyword: "Supply Chain", trend: "critical" },
                  { keyword: "Price Volatility", trend: "hot" },
                  { keyword: "Rural Growth", trend: "rising" }
                ].map(({ keyword, trend }, index) => {
                  const trendColors = {
                    hot: "bg-gradient-to-r from-red-100 to-orange-100 text-red-700 border-red-200 hover:border-red-300 shadow-red-500/10",
                    critical: "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200 hover:border-yellow-300 shadow-yellow-500/10",
                    rising: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 hover:border-green-300 shadow-green-500/10",
                    declining: "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200 hover:border-gray-300 shadow-gray-500/10",
                    stable: "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200 hover:border-blue-300 shadow-blue-500/10"
                  }
                  
                  const trendIcons = {
                    hot: "🔥",
                    critical: "⚠️",
                    rising: "📈",
                    declining: "📉",
                    stable: "📊"
                  }
                  
                  return (
                    <div 
                      key={index} 
                      className={`group relative px-4 py-2 rounded-full border-2 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-105 ${trendColors[trend as keyof typeof trendColors]}`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{trendIcons[trend as keyof typeof trendIcons]}</span>
                        <span className="text-sm font-medium">{keyword}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-800">Market Pulse</span>
                  </div>
                  <span className="text-orange-700">8 trending topics identified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
