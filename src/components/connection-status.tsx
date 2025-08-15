"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Wifi, WifiOff, RefreshCw, Info } from "lucide-react"
import { kitaKitsAPI } from "@/lib/api-client"

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [endpoint, setEndpoint] = useState<string>("")
  const [isChecking, setIsChecking] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [connectionDetails, setConnectionDetails] = useState<any>(null)

  const checkConnection = async () => {
    setIsChecking(true)
    try {
      const result = await kitaKitsAPI.testConnection()
      setIsConnected(result.hasLiveEndpoint)
      setEndpoint(result.endpoint || "")
      setConnectionDetails(result)
      setLastChecked(new Date())
    } catch (error) {
      setIsConnected(false)
      console.error("Connection test failed:", error)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    // Check connection on component mount
    checkConnection()
  }, [])

  const getStatusColor = () => {
    if (isConnected === null) return "secondary"
    return isConnected ? "default" : "destructive"
  }

  const getStatusText = () => {
    if (isChecking) return "Checking..."
    if (isConnected === null) return "Unknown"
    if (isConnected) return "Live Data"
    return "Mock Data"
  }

  const getStatusIcon = () => {
    if (isChecking) return <RefreshCw className="h-3 w-3 animate-spin" />
    if (isConnected === null) return <Info className="h-3 w-3" />
    return isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={getStatusColor()} className="text-xs">
        {getStatusIcon()}
        <span className="ml-1">{getStatusText()}</span>
      </Badge>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Info className="h-3 w-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {getStatusIcon()}
              <span>Connection Status</span>
            </DialogTitle>
            <DialogDescription>
              KitaKits endpoint connectivity information
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Current Status */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Current Status</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Connection:</span>
                  <Badge variant={getStatusColor()} className="text-xs">
                    {isConnected ? "Live" : "Mock Data"}
                  </Badge>
                </div>
                {endpoint && (
                  <div className="flex justify-between">
                    <span>Endpoint:</span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {endpoint.replace('https://', '')}
                    </span>
                  </div>
                )}
                {lastChecked && (
                  <div className="flex justify-between">
                    <span>Last Checked:</span>
                    <span className="text-xs text-muted-foreground">
                      {lastChecked.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                {connectionDetails?.responseTime && (
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span className="text-xs text-muted-foreground">
                      {connectionDetails.responseTime}ms
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Live Data Info */}
            {isConnected && connectionDetails?.sampleData && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Live Data Sample</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Total MSMEs:</span>
                    <span className="font-medium">
                      {connectionDetails.sampleData.totalUsers?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interactions:</span>
                    <span className="font-medium">
                      {connectionDetails.sampleData.totalInteractions?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Real Data:</span>
                    <Badge variant={connectionDetails.sampleData.hasRealData ? "default" : "secondary"} className="text-xs">
                      {connectionDetails.sampleData.hasRealData ? "Yes" : "Demo"}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Mock Data Info */}
            {!isConnected && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Demo Mode</h4>
                <p className="text-xs text-muted-foreground">
                  Using high-quality mock data that demonstrates the full potential of KitaKits analytics. 
                  The dashboard shows realistic Filipino MSME insights and business intelligence.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-2 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkConnection}
                disabled={isChecking}
              >
                {isChecking ? (
                  <RefreshCw className="h-3 w-3 animate-spin mr-1" />
                ) : (
                  <RefreshCw className="h-3 w-3 mr-1" />
                )}
                Refresh
              </Button>
              
              <div className="text-xs text-muted-foreground">
                {isConnected ? "🟢 Live" : "🟡 Demo"}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
