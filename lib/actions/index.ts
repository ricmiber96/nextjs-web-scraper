"use server"

import { connectToDatabase } from "../db/mongoose"
import Product from "../models/product.model"
import { scrapeAmazonProduct } from "../scraper"
import { revalidatePath } from "next/cache"

export async function scrapeAndStoreProduct(productUrl: string) {
    // Validate URL
    // Check if URL is from Amazon
    if(!productUrl) return
    try {
        connectToDatabase()
           // Scrap products from Amazon
        const scrapedProduct = await scrapeAmazonProduct(productUrl)
        if(!scrapedProduct) return
        // Store products in database
        let product = scrapedProduct

        const existingProduct = await Product.findOne({url: product.url})
        if(existingProduct){
            const updatedPriceHistory: any = [...existingProduct.priceHistory, {price: product.currentPrice}]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                // lowestPrice: Math.min(...updatedPriceHistory.map((item: { price: number }) => item.price)),
                // highestPrice: Math.max(...updatedPriceHistory.map((item: { price: number }) => item.price)),
                // averagePrice: updatedPriceHistory.reduce((acc: number, item: { price: number }) => acc + item.price, 0) / updatedPriceHistory.length,
                lowestPrice:0,
                highestPrice:0,
                averagePrice:0,

        }
            
    }

    const newProduct = await Product.findOneAndUpdate({url: product.url}, product, {upsert: true, new: true})
    revalidatePath(`/products/${newProduct._id}`);
    
        
    } catch (error) {
        if (error instanceof Error) {
        throw new Error(`Failed to scrape products: ${error.message}`)
        }
    }

}

export async function getProductById(productId: string) {
    try {
        connectToDatabase()
        const product = await Product.findById({_id: productId})
        if(!product) return null
        return product
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get product by ID: ${error.message}`)
        }
    }
}


export async function getAllProducts() {
    try {
        connectToDatabase()
        const products = await Product.find({})
        if(!products) return []
        return products
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get all products: ${error.message}`)
        }
    }
}