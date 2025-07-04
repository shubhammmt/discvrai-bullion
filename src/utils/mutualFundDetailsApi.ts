
const BASE_URL = 'https://p646lccs-8008.inc1.devtunnels.ms';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbGllbnRfbXg3NWc1cmNneWdsdHJydSIsImNsaWVudF9pZCI6ImNsaWVudF9teDc1ZzVyY2d5Z2x0cnJ1IiwiY2xpZW50X25hbWUiOiJUZXN0IEJvdCBBUEkgQ2xpZW50IDYiLCJzY29wZXMiOlsicmVhZDpjb21wYW5pZXMiLCJyZWFkOnByaWNlcyIsInJlYWQ6ZmluYW5jaWFscyIsInJlYWQ6bWFya2V0IiwicmVhZDpjcnlwdG8iLCJyZWFkOm5ld3MiLCJyZWFkOmVhcm5pbmdzIiwicmVhZDphbmFseXRpY3MiLCJyZWFkOnRlY2huaWNhbCIsInJlYWQ6ZnVuZGFtZW50YWxzIiwicmVhZDphaV9pbnNpZ2h0cyIsInJlYWQ6cmF0aW5ncyIsInJlYWQ6c2VnbWVudHMiXSwidG9rZW5fdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsImV4cCI6MTgwOTU1MDA1MSwiaWF0IjoxNzQ5NTUwMTExLCJpc3MiOiJkaXNjdnItZmluYW5jZS1hcGkifQ.9jun8ghunLtWng5UEO57uptBnp1AFCDiWpO4s1OLuVY';
const SESSION_ID = '0aee2f9b-b3ff-447d-bf7e-cb5318a7c550';

export interface MutualFundDetailsResponse {
  success: boolean;
  error: string | null;
  error_code: string | null;
  fund_data: {
    basic_info: {
      fund_identifiers: {
        mf_schcode: number;
        scheme_name: string;
        scheme_short_name: string;
        isin: string;
        amfi_code: number;
      };
      amc_details: {
        amc_name: string;
        amc_short_name: string;
        fund_type: string;
        incorporation_date: string;
        contact_details: {
          address: string;
          telephone: string;
          website: string;
          email: string;
        };
      };
      fund_classification: {
        main_category: string;
        sub_category: string;
        detailed_category: string;
        risk_level: string;
      };
      plan_details: {
        plan_type: string;
        option_type: string;
        systematic_plans: string[];
      };
      fund_lifecycle: {
        launch_date: string;
        fund_age_years: number;
        fund_age_days: number;
        nfo_price: number;
      };
      current_status: {
        scheme_status: string;
        open_for_subscription: boolean;
        open_for_redemption: boolean;
        open_for_switch: boolean;
        last_updated: string;
      };
    };
    performance: {
      current_nav: {
        price: number;
        nav_date: string;
      };
      returns: {
        ret_1week: number;
        ret_1month: number;
        ret_3month: number;
        ret_6month: number;
        ret_1year: number;
        ret_3year: number;
        ret_5year: number;
        ret_inception: number;
      };
      benchmark: {
        benchmark_name: string;
        returns: {
          "1_week": number;
          "1_month": number;
          "3_month": number;
          "6_month": number;
          "1_year": number;
          "3_year": number;
          "5_year": number;
        };
      };
      category_comparison: any;
      last_performance_update: string;
    };
    risk_analytics: {
      beta_metrics: {
        beta_3year: number;
        beta_description: string;
      };
      alpha_metrics: {
        alpha_3year: number;
        alpha_description: string;
      };
      risk_measures: {
        standard_deviation_3year: number;
        risk_classification: string;
        standard_deviation_1year: number | null;
      };
      performance_ratios: {
        sharpe_ratio_3year: number;
        treynor_ratio: number;
        r_squared: number;
      };
    };
    fund_structure: {
      fund_managers: Array<{
        manager_name: string;
        managing_since: string;
        profile: string | null;
      }>;
      expenses: {
        total_expense_ratio: number;
        expense_classification: string;
        entry_load: string;
        exit_load: string;
        sip_expense_ratio: number;
        non_sip_expense_ratio: number;
      };
      investment_details: {
        minimum_investment: number;
        incremental_investment: number;
        sip_minimum: number;
        lumpsum_minimum: number | null;
      };
      aum_information: {
        current_aum: number;
        aum_classification: string;
        aum_date: string | null;
      };
    };
    portfolio: {
      asset_allocation: {
        equity: number | null;
        debt: number;
        cash_and_others: number;
        allocation_date: string;
      };
      sector_allocation: {
        sectors: Record<string, number>;
        allocation_date: string;
      };
      top_holdings: {
        equity_holdings: Array<{
          company_name: string;
          percentage_holding: number;
          sector: string;
        }>;
        total_holdings_count: number;
        holdings_date: string;
      };
      portfolio_changes: {
        recent_additions: any[];
        recent_reductions: Array<{
          security_name: string;
          security_code: number;
          change_percentage: number;
          change_amount: number;
          current_holding: number;
          change_date: string;
        }>;
      };
      portfolio_metrics: {
        total_companies: number;
        top_10_concentration: number;
        sector_diversification: number;
      };
    };
  } | null;
  lookup_method: string | null;
  data_freshness: {
    nav_date: string | null;
    last_updated: string;
    data_completeness: number;
  } | null;
  processing_time_ms: number;
}

export const fetchMutualFundDetails = async (fundId: string): Promise<MutualFundDetailsResponse> => {
  console.log('Fetching mutual fund details for fund ID:', fundId);
  
  try {
    const response = await fetch(`${BASE_URL}/api/v1/feed/mutual-fund/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'X-Session-ID': SESSION_ID,
      },
      body: JSON.stringify({
        fund_id: fundId
      }),
    });

    console.log('API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`Failed to fetch mutual fund details: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Mutual fund details received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching mutual fund details:', error);
    throw error;
  }
};
