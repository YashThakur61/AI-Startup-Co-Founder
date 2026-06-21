interface TavilySearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface TavilyResponse {
  results: TavilySearchResult[];
  query: string;
}

export async function searchMarket(query: string): Promise<TavilySearchResult[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn('TAVILY_API_KEY not set, returning empty search results');
    return [];
  }

  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        search_depth: 'advanced',
        max_results: 8,
      }),
    });

    if (!response.ok) {
      console.error(`Tavily API error: ${response.status}`);
      return [];
    }

    const data: TavilyResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Tavily search failed:', error);
    return [];
  }
}

export async function searchCompetitors(idea: string, market: string): Promise<TavilySearchResult[]> {
  return searchMarket(`competitors in ${market} for ${idea} startup companies`);
}

export async function searchTrends(market: string): Promise<TavilySearchResult[]> {
  return searchMarket(`${market} industry trends 2024 2025 market analysis growth`);
}
