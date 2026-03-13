import FirecrawlApp from '@mendable/firecrawl-js';

const apiKey = process.env.FIRE_CRAWL_API_KEY;

if (!apiKey) {
  console.warn('FIRE_CRAWL_API_KEY is not set. Firecrawl service will not work.');
}

const firecrawl = apiKey ? new FirecrawlApp({ apiKey }) : null;

export const crawlWebsite = async (url: string) => {
  if (!firecrawl) {
    throw new Error('Firecrawl is not configured.');
  }
  
  try {
    const crawlResult = await firecrawl.crawlUrl(url, {
      limit: 100,
      scrapeOptions: {
        formats: ['markdown'],
      },
    });
    return crawlResult;
  } catch (error) {
    console.error('Error crawling website:', error);
    throw error;
  }
};
