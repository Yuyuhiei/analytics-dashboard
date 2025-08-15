// Mock data for KitaKits Analytics Dashboard

export const heroStats = {
  totalMSMEs: 45231,
  dailyTransactions: 156789,
  revenueTracked: 2300000,
  regionsActive: 17, // Metro Manila has 17 cities/municipality
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
  // Metro Manila Cities
  "Manila": { 
    msmes: 1850, 
    avgTransaction: 1450, 
    status: "high",
    growth: "+22%",
    topProduct: "Street Food",
    alert: "High foot traffic area"
  },
  "Quezon City": { 
    msmes: 2400, 
    avgTransaction: 980, 
    status: "high",
    growth: "+18%",
    topProduct: "Restaurant Meals",
    alert: "Commercial district expansion"
  },
  "Makati": { 
    msmes: 1200, 
    avgTransaction: 2100, 
    status: "high",
    growth: "+15%",
    topProduct: "Coffee",
    alert: null
  },
  "Taguig": { 
    msmes: 950, 
    avgTransaction: 1800, 
    status: "high",
    growth: "+25%",
    topProduct: "Fast Food",
    alert: "BGC growth opportunity"
  },
  "Pasig": { 
    msmes: 780, 
    avgTransaction: 1200, 
    status: "medium",
    growth: "+12%",
    topProduct: "Groceries",
    alert: null
  },
  "Caloocan": { 
    msmes: 650, 
    avgTransaction: 720, 
    status: "medium",
    growth: "+8%",
    topProduct: "Rice",
    alert: null
  },
  "Las Piñas": { 
    msmes: 420, 
    avgTransaction: 650, 
    status: "low",
    growth: "+6%",
    topProduct: "Fish",
    alert: null
  },
  "Malabon": { 
    msmes: 380, 
    avgTransaction: 580, 
    status: "low",
    growth: "+5%",
    topProduct: "Seafood",
    alert: null
  },
  "Mandaluyong": { 
    msmes: 520, 
    avgTransaction: 1100, 
    status: "medium",
    growth: "+14%",
    topProduct: "Shopping Mall Food",
    alert: null
  },
  "Marikina": { 
    msmes: 480, 
    avgTransaction: 890, 
    status: "medium",
    growth: "+10%",
    topProduct: "Local Delicacies",
    alert: null
  },
  "Muntinlupa": { 
    msmes: 340, 
    avgTransaction: 750, 
    status: "low",
    growth: "+7%",
    topProduct: "Convenience Store",
    alert: null
  },
  "Navotas": { 
    msmes: 290, 
    avgTransaction: 520, 
    status: "low",
    growth: "+4%",
    topProduct: "Fresh Fish",
    alert: null
  },
  "Parañaque": { 
    msmes: 580, 
    avgTransaction: 980, 
    status: "medium",
    growth: "+11%",
    topProduct: "Airport Food",
    alert: null
  },
  "Pasay": { 
    msmes: 620, 
    avgTransaction: 1150, 
    status: "medium",
    growth: "+13%",
    topProduct: "Tourist Food",
    alert: "Tourism recovery"
  },
  "Pateros": { 
    msmes: 85, 
    avgTransaction: 420, 
    status: "low",
    growth: "+3%",
    topProduct: "Duck Eggs",
    alert: null
  },
  "San Juan": { 
    msmes: 280, 
    avgTransaction: 850, 
    status: "medium",
    growth: "+9%",
    topProduct: "Bakery Items",
    alert: null
  },
  "Valenzuela": { 
    msmes: 450, 
    avgTransaction: 680, 
    status: "low",
    growth: "+6%",
    topProduct: "Manufacturing Food",
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
