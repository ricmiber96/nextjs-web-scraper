"use server"
import { notFound, redirect } from 'next/navigation'
import { connectToDatabase } from "../db/mongoose"
import Product from "../models/product.model"
import { scrapeAmazonProduct } from "../scraper"
import { revalidatePath } from "next/cache"
import { User } from '@/types'
import { generateEmailBody, sendEmail } from '../nodemailer'
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils'
import { NextApiRequest, NextApiResponse } from 'next'

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
            console.log("Product already exists")
            const updatedPriceHistory: any = [...existingProduct.priceHistory, {price: product.currentPrice}]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),

        }

        console.log("product", product)
     
    }

    const newProduct = await Product.findOneAndUpdate({url: product.url}, product, {upsert: true, new: true})
    revalidatePath(`/products/${newProduct._id}`);
    return { 
        id: newProduct._id, 
        title: newProduct.title

    }
;

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

export async function getProductsByName(productName: string) {
    try {
        connectToDatabase()
        const products = await Product.find({title: {$regex: productName, $options: 'i'}})
        if(!products) return null
        return products
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get product by name: ${error.message}`)
        }
    }
}

export async function getProductsPaginated(page: number) {

    if (!page) return null
    const limit = 12
    const pageAsNumber = Number(page)
    const limitAsNumber = Number(limit)
    const skip = (pageAsNumber - 1) * limitAsNumber

    try {
        connectToDatabase()
        const products = await Product.find({}).skip(skip).limit(limitAsNumber).exec()
        const totalProducts = await Product.countDocuments({}).exec()
        const totalPages = Math.ceil(totalProducts / limitAsNumber)
        if(!products) return null
        return {
            products,  
            totalPages,
            currentPage: pageAsNumber
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get product by name: ${error.message}`)
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
export async function getSimilarProducts(productId: string) {
    try {
        connectToDatabase()
        const currentProduct = await Product.findById({_id: productId})
        if(!currentProduct) return null
        const similarProducts = await Product.find({_id: {$ne: productId}}).limit(4)
        if(!similarProducts) return []
        return similarProducts
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get all products: ${error.message}`)
        }
    }
}


export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
        const product = await Product.findById({_id: productId})
        if(!product) return
        const userExists = product.users.some((user: User) => user.email === userEmail)

        if(!userExists) {
            product.users.push({email: userEmail})
            await product.save()
            const emailContent = await generateEmailBody(product, "WELCOME")
            await sendEmail(emailContent, [userEmail])
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to add email to product: ${error.message}`)
        }
    }
}


export async function navigate(productId: string) {
    redirect(`/products/${productId}`)
}
