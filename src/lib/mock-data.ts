// Mock data for KitaKits Analytics Dashboard

export const heroStats = {
  totalMSMEs: 45231,
  dailyTransactions: 156789,
  revenueTracked: 2300000,
  regionsActive: 12,
  trendsLastUpdated: "2 minutes ago",
  growthRate: 23.5
}

export const trendingProducts = [
  { 
    name: "Jasmine Rice 25kg", 
    sales: 12450, 
    change: +15,
    price: 1250,
    category: "Staples",
    stock: "Low"
  },
  { 
    name: "Cooking Oil 1L", 
    sales: 8230, 
    change: -5,
    price: 85,
    category: "Cooking",
    stock: "Medium"
  },
  { 
    name: "Instant Noodles", 
    sales: 15670, 
    change: +45,
    price: 12,
    category: "Processed",
    stock: "High"
  },
  { 
    name: "Sugar 1kg", 
    sales: 5440, 
    change: +8,
    price: 65,
    category: "Staples",
    stock: "Medium"
  },
  { 
    name: "Canned Sardines", 
    sales: 7890, 
    change: +22,
    price: 28,
    category: "Processed",
    stock: "High"
  },
  { 
    name: "Coffee 3-in-1", 
    sales: 9340, 
    change: +12,
    price: 8,
    category: "Beverages",
    stock: "High"
  },
  { 
    name: "Laundry Soap", 
    sales: 4560, 
    change: -2,
    price: 15,
    category: "Household",
    stock: "Medium"
  },
  { 
    name: "Milk Powder 400g", 
    sales: 3890, 
    change: +18,
    price: 180,
    category: "Dairy",
    stock: "Low"
  },
  { 
    name: "Bread Loaf", 
    sales: 11230, 
    change: +6,
    price: 35,
    category: "Bakery",
    stock: "High"
  },
  { 
    name: "Eggs 12pcs", 
    sales: 8970, 
    change: +25,
    price: 95,
    category: "Fresh",
    stock: "Medium"
  }
]

export const regionData = {
  "NCR": { 
    msmes: 8500, 
    avgTransaction: 1250, 
    status: "high",
    growth: "+15%",
    topProduct: "Instant Noodles",
    alert: "High demand for rice"
  },
  "Region 1": { 
    msmes: 3200, 
    avgTransaction: 890, 
    status: "medium",
    growth: "+8%",
    topProduct: "Rice",
    alert: null
  },
  "Region 2": { 
    msmes: 2800, 
    avgTransaction: 780, 
    status: "medium",
    growth: "+12%",
    topProduct: "Cooking Oil",
    alert: null
  },
  "Region 3": { 
    msmes: 6200, 
    avgTransaction: 980, 
    status: "medium",
    growth: "+18%",
    topProduct: "Sugar",
    alert: "Price gap opportunity"
  },
  "Region 4A": { 
    msmes: 4100, 
    avgTransaction: 920, 
    status: "medium",
    growth: "+10%",
    topProduct: "Coffee",
    alert: null
  },
  "Region 4B": { 
    msmes: 2400, 
    avgTransaction: 680, 
    status: "low",
    growth: "+5%",
    topProduct: "Sardines",
    alert: null
  },
  "Region 5": { 
    msmes: 3600, 
    avgTransaction: 820, 
    status: "medium",
    growth: "+14%",
    topProduct: "Rice",
    alert: null
  },
  "Region 6": { 
    msmes: 4800, 
    avgTransaction: 950, 
    status: "medium",
    growth: "+20%",
    topProduct: "Sugar",
    alert: null
  },
  "Region 7": { 
    msmes: 5100, 
    avgTransaction: 850, 
    status: "high",
    growth: "+25%",
    topProduct: "Instant Noodles",
    alert: null
  },
  "Region 8": { 
    msmes: 2900, 
    avgTransaction: 720, 
    status: "medium",
    growth: "+9%",
    topProduct: "Coffee",
    alert: null
  },
  "Region 9": { 
    msmes: 2100, 
    avgTransaction: 650, 
    status: "low",
    growth: "+7%",
    topProduct: "Rice",
    alert: null
  },
  "Region 10": { 
    msmes: 3400, 
    avgTransaction: 880, 
    status: "medium",
    growth: "+16%",
    topProduct: "Cooking Oil",
    alert: null
  },
  "Region 11": { 
    msmes: 2800, 
    avgTransaction: 790, 
    status: "medium",
    growth: "+11%",
    topProduct: "Sardines",
    alert: null
  },
  "Region 12": { 
    msmes: 2200, 
    avgTransaction: 680, 
    status: "low",
    growth: "+6%",
    topProduct: "Rice",
    alert: null
  },
  "CAR": { 
    msmes: 1200, 
    avgTransaction: 920, 
    status: "medium",
    growth: "+13%",
    topProduct: "Coffee",
    alert: null
  },
  "ARMM": { 
    msmes: 1800, 
    avgTransaction: 580, 
    status: "low",
    growth: "+4%",
    topProduct: "Rice",
    alert: null
  }
}

export const alertInsights = [
  {
    id: 1,
    type: "warning",
    icon: "🚨",
    title: "Stock Alert",
    description: "Rice shortage predicted in NCR within 3 days",
    impact: "High",
    action: "Increase supply chain priority",
    timeframe: "Immediate"
  },
  {
    id: 2,
    type: "opportunity",
    icon: "📈",
    title: "Price Gap Opportunity",
    description: "23% price gap for cooking oil between NCR and Visayas",
    impact: "Medium",
    action: "Optimize distribution pricing",
    timeframe: "This week"
  },
  {
    id: 3,
    type: "trending",
    icon: "🔥",
    title: "Trending Product",
    description: "Instant noodles sales up 45% this week across all regions",
    impact: "High",
    action: "Scale inventory and promotions",
    timeframe: "Ongoing"
  },
  {
    id: 4,
    type: "insight",
    icon: "💡",
    title: "Market Insight",
    description: "MSMEs in Cebu showing 25% growth in premium coffee sales",
    impact: "Medium",
    action: "Consider premium product line expansion",
    timeframe: "Next month"
  }
]

export const weeklyTrends = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      name: "Total Transactions",
      data: [145000, 152000, 148000, 163000, 171000, 156000, 139000],
      color: "hsl(var(--chart-1))"
    },
    {
      name: "Revenue (₱)",
      data: [2100000, 2250000, 2180000, 2400000, 2550000, 2300000, 2050000],
      color: "hsl(var(--chart-2))"
    }
  ]
}

export const categoryBreakdown = [
  { name: "Staples", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Processed", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Beverages", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Household", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Fresh", value: 10, color: "hsl(var(--chart-5))" }
]
