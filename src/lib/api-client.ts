// API Client for KitaKits endpoint integration
// Supports both live endpoint and fallback to mock data

interface KitaKitsConfig {
  endpoint?: string;
  timeout?: number;
  fallbackToMock?: boolean;
}

interface AnalyticsResponse {
  metadata: {
    generatedAt: string;
    dataSource: string;
    isLive: boolean;
    filters?: any;
  };
  overview: {
    totalUsers: number;
    totalInteractions: number;
    totalOCRProcessed: number;
    dataPoints?: number;
  };
  userEngagement: {
    dailyActiveUsers: number;
    avgSessionLength: string;
    avgInteractionsPerUser: number;
    retentionRate: string;
    peakUsageHours: string[];
    userGrowthRate: string;
  };
  businessInsights: {
    keyFindings: string[];
    opportunities: Array<{
      title: string;
      description: string;
      potentialImpact: string;
    }>;
    recommendations: string[];
    marketPotential?: any;
  };
  trends: {
    daily: Array<{
      date: string;
      interactions: number;
      newUsers: number;
      ocrProcessed: number;
    }>;
    weekly: {
      currentWeek: {
        interactions: number;
        newUsers: number;
        ocrProcessed: number;
      };
      previousWeek: {
        interactions: number;
        newUsers: number;
        ocrProcessed: number;
      };
      percentageChange: {
        interactions: string;
        newUsers: string;
        ocrProcessed: string;
      };
    };
    monthly?: any;
  };
  ocrAnalytics?: any;
  categories?: any;
  demographics?: any;
  trendingProducts?: Array<{
    name: string;
    fullName?: string;
    sales: number;
    change: number;
    price: string | number;
    category: string;
    stock: number;
    rank?: number;
    salesDetails?: {
      quantity: number;
      revenue: string;
      transactions: number;
      avgPrice: string;
    };
  }>;
  salesSummary?: {
    totalRevenue: number;
    totalTransactions: number;
    avgTransactionValue: number;
    uniqueProducts: number;
    uniqueSellers: number;
    performance?: {
      revenueFormatted: string;
      status: string;
      lastUpdated: string;
    };
  };
  urbanPlanningData?: {
    economicActivity?: {
      overallMetrics?: {
        totalRevenue?: number;
        totalEconomicValue?: number;
        totalTransactions?: number;
        avgTransactionValue?: number;
        uniqueProducts?: number;
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  };
  enhancedBusinessInsights?: any;
}

class KitaKitsAPIClient {
  private config: KitaKitsConfig;
  private possibleEndpoints = [
    'https://kitakitachatbot.onrender.com',      // ✅ CORRECT ENDPOINT
    'https://kitakits-chatbot.onrender.com',
    'https://kitakitschatbot.onrender.com',
    'https://kitakits.onrender.com',
    'https://kitakit-chatbot.onrender.com',
    'https://kitakits-analytics.onrender.com'
  ];

  constructor(config: KitaKitsConfig = {}) {
    this.config = {
      timeout: 5000,
      fallbackToMock: true,
      ...config
    };
  }

  // Try to find live endpoint
  async findLiveEndpoint(): Promise<string | null> {
    console.log('🔍 Searching for live KitaKits endpoint...');
    
    for (const baseUrl of this.possibleEndpoints) {
      try {
        const response = await fetch(`${baseUrl}/analytics`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(this.config.timeout!)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Found live endpoint:', baseUrl);
          return baseUrl;
        }
      } catch (error) {
        // Continue to next endpoint
        console.log(`❌ ${baseUrl} failed:`, error instanceof Error ? error.message : 'Unknown error');
      }
    }

    console.log('❌ No live endpoints found');
    return null;
  }

  // Get analytics data with fallback
  async getAnalytics(filters: Record<string, string> = {}): Promise<AnalyticsResponse> {
    // Try live endpoint first
    const liveEndpoint = await this.findLiveEndpoint();
    
    if (liveEndpoint) {
      try {
        const queryParams = new URLSearchParams(filters);
        const response = await fetch(`${liveEndpoint}/analytics?${queryParams}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(this.config.timeout!)
        });

        if (response.ok) {
          const data = await response.json();
          console.log('📊 Retrieved live data from:', liveEndpoint);
          console.log('📊 Response structure:', {
            hasSuccess: 'success' in data,
            hasMetadata: 'metadata' in data,
            hasOverview: 'overview' in data,
            topLevelKeys: Object.keys(data).slice(0, 10)
          });
          
          // Handle different response formats
          let processedData;
          
          if (data.success !== undefined) {
            // New wrapped format
            processedData = {
              ...data,
              metadata: {
                ...data.metadata,
                isLive: true,
                dataSource: 'KitaKits Live Endpoint'
              }
            };
          } else if (data.metadata && data.overview) {
            // Direct analytics format (current)
            processedData = {
              metadata: {
                ...data.metadata,
                isLive: true,
                dataSource: 'KitaKits Live Endpoint'
              },
              overview: data.overview,
              userEngagement: data.userEngagement,
              businessInsights: data.businessInsights,
              trends: data.trends,
              ocrAnalytics: data.ocrAnalytics,
              categories: data.categories,
              demographics: data.demographics
            };
          } else {
            console.warn('⚠️ Unexpected response format from live endpoint');
            throw new Error('Unexpected response format');
          }
          
          return processedData;
        }
      } catch (error) {
        console.warn('⚠️ Live endpoint failed, falling back to mock data:', error);
      }
    }

    // Fallback to mock data
    if (this.config.fallbackToMock) {
      console.log('📋 Using mock data for demo');
      return this.getMockAnalytics();
    }

    throw new Error('No live endpoint available and mock data disabled');
  }

  // Enhanced mock data that matches real API structure
  private getMockAnalytics(): AnalyticsResponse {
    return {
      metadata: {
        generatedAt: new Date().toISOString(),
        dataSource: 'KitaKits Mock Data (Demo)',
        isLive: false
      },
      overview: {
        totalUsers: 45231, // Mock but realistic for 45K+ MSMEs
        totalInteractions: 156789,
        totalOCRProcessed: 23456
      },
      userEngagement: {
        dailyActiveUsers: 1250,
        avgSessionLength: '5.2 minutes',
        avgInteractionsPerUser: 12.5,
        retentionRate: '68%',
        peakUsageHours: ['9:00-10:00', '14:00-15:00', '20:00-21:00'],
        userGrowthRate: '+15% monthly'
      },
      businessInsights: {
        keyFindings: [
          'Instant noodles demand increased 45% this week across all regions',
          'Rice shortage predicted in NCR within 3 days based on inventory trends',
          '23% price gap for cooking oil between NCR and Visayas regions',
          'MSMEs in Cebu showing 25% growth in premium coffee sales',
          'Peak transaction hours align with meal preparation times'
        ],
        opportunities: [
          {
            title: 'Supply Chain Optimization',
            description: 'Rice shortage alerts provide 3-day advance warning for suppliers',
            potentialImpact: 'Could prevent stockouts affecting 8,500 NCR MSMEs'
          },
          {
            title: 'Regional Price Arbitrage',
            description: 'Cooking oil price gaps between regions create profit opportunities',
            potentialImpact: 'Could optimize distribution margins by 23%'
          },
          {
            title: 'Product Category Expansion',
            description: 'Premium coffee growth in Cebu indicates market opportunity',
            potentialImpact: 'Could expand premium product lines to other regions'
          }
        ],
        recommendations: [
          'Implement predictive alerts for supply chain managers',
          'Create regional pricing optimization dashboard',
          'Develop category-specific trend analysis',
          'Add real-time shortage prediction models'
        ]
      },
      trends: {
        daily: this.generateDailyTrends(),
        weekly: {
          currentWeek: {
            interactions: 156789,
            newUsers: 1245,
            ocrProcessed: 23456
          },
          previousWeek: {
            interactions: 142340,
            newUsers: 1156,
            ocrProcessed: 21890
          },
          percentageChange: {
            interactions: '+10.1%',
            newUsers: '+7.7%',
            ocrProcessed: '+7.2%'
          }
        }
      }
    };
  }

  private generateDailyTrends() {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      last7Days.push({
        date: date.toISOString().split('T')[0],
        interactions: Math.floor(Math.random() * 5000) + 20000,
        newUsers: Math.floor(Math.random() * 200) + 150,
        ocrProcessed: Math.floor(Math.random() * 1000) + 3000
      });
    }
    
    return last7Days;
  }

  // Test endpoint connectivity
  async testConnection(): Promise<{ 
    hasLiveEndpoint: boolean; 
    endpoint?: string; 
    responseTime?: number;
    sampleData?: any;
  }> {
    const startTime = Date.now();
    const liveEndpoint = await this.findLiveEndpoint();
    const responseTime = Date.now() - startTime;

    if (liveEndpoint) {
      try {
        const response = await fetch(`${liveEndpoint}/analytics`);
        const sampleData = await response.json();
        
        return {
          hasLiveEndpoint: true,
          endpoint: liveEndpoint,
          responseTime,
          sampleData: {
            totalUsers: sampleData.overview?.totalUsers,
            totalInteractions: sampleData.overview?.totalInteractions,
            hasRealData: sampleData.overview?.totalUsers > 0
          }
        };
      } catch (error) {
        return {
          hasLiveEndpoint: false,
          responseTime
        };
      }
    }

    return {
      hasLiveEndpoint: false,
      responseTime
    };
  }
}

// Export singleton instance
export const kitaKitsAPI = new KitaKitsAPIClient();

// Export types for use in components
export type { AnalyticsResponse, KitaKitsConfig };
