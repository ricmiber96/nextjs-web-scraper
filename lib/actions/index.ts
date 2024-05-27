"use server"

import { scrapeAmazonProduct } from "./scraper"

export async function scrapeAndStoreProduct(productUrl: string) {
    // Validate URL
    // Check if URL is from Amazon
    if(!productUrl) return
    try {
           // Scrap products from Amazon
        const scrapedProducts= await scrapeAmazonProduct(productUrl)
        if(!scrapedProducts) return
        // Store products in database

        
    } catch (error) {
        if (error instanceof Error) {
        throw new Error(`Failed to scrape products: ${error.message}`)
        }
    }

}