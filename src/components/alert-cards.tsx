"use client"

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
  Zap
} from "lucide-react"
import { alertInsights } from "@/lib/mock-data"

export function AlertCards() {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Actionable Insights</h2>
          <p className="text-muted-foreground">
            AI-powered alerts and recommendations for your business strategy
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          <Clock className="h-3 w-3 mr-1" />
          Real-time
        </Badge>
      </div>

      {/* Alert Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {alertInsights.map((alert) => (
          <Card key={alert.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getTypeEmoji(alert.type)}</span>
                  <span>{alert.title}</span>
                </div>
                <Badge 
                  variant="outline"
                  className={`text-xs ${getImpactColor(alert.impact)} border`}
                >
                  {alert.impact} Impact
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {alert.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">Recommended Action:</span>
                  <span className="text-muted-foreground">{alert.timeframe}</span>
                </div>
                <p className="text-sm bg-muted p-3 rounded-lg">
                  {alert.action}
                </p>
              </div>

              <Button 
                size="sm" 
                className="w-full" 
                variant={alert.type === "warning" ? "destructive" : "default"}
              >
                Take Action
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Intelligence Summary</CardTitle>
          <CardDescription>
            Key metrics from our AI analysis of MSME data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-xs text-muted-foreground">Critical Alerts</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1</div>
              <div className="text-xs text-muted-foreground">Opportunities</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-xs text-muted-foreground">Market Insights</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-xs text-muted-foreground">Prediction Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trending Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Flame className="h-4 w-4" />
            <span>Trending This Week</span>
          </CardTitle>
          <CardDescription>
            Most discussed products and categories among MSMEs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "Instant Noodles", 
              "Rice Shortage", 
              "Cooking Oil", 
              "Premium Coffee", 
              "Cebu Market", 
              "Supply Chain",
              "Price Volatility",
              "Rural Growth"
            ].map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
