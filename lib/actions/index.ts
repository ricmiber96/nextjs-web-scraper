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
import axios from 'axios'
import { json } from 'stream/consumers'

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
//SERVER SIDE CODE 
// export async function getProductById(productId: string) {
//     try {
//         connectToDatabase()
//         const product = await Product.findById({_id: productId})
//         if(!product) return null
//         return product
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             throw new Error(`Failed to get product by ID: ${error.message}`)
//         }
//     }
// }
// CLIENT SIDE CODE
export async function getProductById(productId: string) {
    try {
        connectToDatabase()
        const product = await Product.findById({_id: productId})
        if(!product) return null
        return JSON.parse(JSON.stringify(product))
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get product by ID: ${error.message}`)
        }
    }
}

// export async function getProductById(productId: string) {
//     if (!productId) {
//         console.error('Error: Product ID is not provided');
//         return null;
//       }
//     try {
//         const response = await axios.get(`/api/products/${productId}/`);
//         if (!response) {
//           throw new Error('Failed to fetch product');
//         }
//         const product = await response.data;
//         return product;
//       } catch (error) {
//         console.error('Error fetching product:', error);
//         return null;
//       }
// }


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
        if(!products){
            return {
                products: [],
                totalPages: 1,
                currentPage: 1
            }

        } 

        return {
            products,  
            totalPages,
            currentPage: pageAsNumber
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get products: ${error.message}`)
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

export async function getTrendingProducts() {
    try {
        connectToDatabase()
        const products = await Product.find({}).sort({likes: -1}).limit(4)
        if(!products) return []
        return products
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get trending products: ${error.message}`)
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


export async function toggleUserLike(productId: string, userId: string) {
    try {
        const product = await Product.findById({_id: productId})
        console.log(typeof userId)
        if(!product) return
        const userIndex = product.likedByUsers.findIndex((user: string) => user === userId)
        console.log("userIndex", userIndex)
        if(userIndex === -1) {
            product.likedByUsers.push(userId)
            product.likes += 1
        } else {
            product.likedByUsers.splice(userIndex, 1)
            product.likes -= 1
        }
        await product.save()
        return JSON.parse(JSON.stringify(product))
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to toggle user like: ${error.message}`)
        }
    }
}

export async function navigate(productId: string) {
    redirect(`/products/${productId}`)
}
