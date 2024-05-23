"use server"

export async function scrapeAndStoreProducts(productUrl: string) {
    // Validate URL
    // Check if URL is from Amazon
    if(!productUrl) return
    try {
        const scrapedProducts= await scrapeAmazonProduct(productUrl)
        
    } catch (error) {
        if (error instanceof Error) {
        throw new Error(`Failed to scrape products: ${error.message}`)
        }
    }
    // Scrap products from Amazon
    // Store products in database
}