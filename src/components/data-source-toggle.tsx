"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Database, Wifi, WifiOff } from "lucide-react";

export function DataSourceToggle() {
  const [isLiveData, setIsLiveData] = useState(true); // Default to Live API
  
  // Load saved preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kitakits-data-source');
    if (saved !== null) {
      setIsLiveData(saved === 'live');
    }
  }, []);

  // Save preference and broadcast change
  const handleToggle = (checked: boolean) => {
    setIsLiveData(checked);
    localStorage.setItem('kitakits-data-source', checked ? 'live' : 'mock');
    
    // Broadcast the change to all components
    window.dispatchEvent(new CustomEvent('dataSourceChange', {
      detail: { isLiveData: checked }
    }));
  };

  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg border bg-card">
      <Database className="h-4 w-4 text-muted-foreground" />
      
      <div className="flex items-center space-x-2">
        <Label htmlFor="data-source-toggle" className="text-sm font-medium">
          Data Source:
        </Label>
        
        <div className="flex items-center space-x-2">
          <span className={`text-xs ${!isLiveData ? 'font-medium' : 'text-muted-foreground'}`}>
            Mock
          </span>
          
          <Switch
            id="data-source-toggle"
            checked={isLiveData}
            onCheckedChange={handleToggle}
            className="data-[state=checked]:bg-green-600"
          />
          
          <span className={`text-xs ${isLiveData ? 'font-medium' : 'text-muted-foreground'}`}>
            Live API
          </span>
        </div>
      </div>

      <Badge 
        variant={isLiveData ? "default" : "secondary"} 
        className={`text-xs ${isLiveData ? 'bg-green-600 hover:bg-green-700' : ''}`}
      >
        <div className="flex items-center space-x-1">
          {isLiveData ? (
            <Wifi className="h-3 w-3" />
          ) : (
            <WifiOff className="h-3 w-3" />
          )}
          <span>{isLiveData ? 'Live Data' : 'Mock Data'}</span>
        </div>
      </Badge>
    </div>
  );
}

// Hook to use data source state in other components
export function useDataSource() {
  const [isLiveData, setIsLiveData] = useState(true); // Default to Live API

  useEffect(() => {
    // Load initial state
    const saved = localStorage.getItem('kitakits-data-source');
    if (saved !== null) {
      setIsLiveData(saved === 'live');
    }

    // Listen for changes
    const handleDataSourceChange = (event: CustomEvent) => {
      setIsLiveData(event.detail.isLiveData);
    };

    window.addEventListener('dataSourceChange', handleDataSourceChange as EventListener);
    
    return () => {
      window.removeEventListener('dataSourceChange', handleDataSourceChange as EventListener);
    };
  }, []);

  return isLiveData;
}
