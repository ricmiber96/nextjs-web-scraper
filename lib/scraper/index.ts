import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractPrice } from "../utils"

export async function scrapeAmazonProduct (url:string){
    if(!url) return

    try {
        // Scrape product from Amazon
        // return scraped product
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        // Get product title
        const title = $('#productTitle').text().trim()
        console.log(title)
      
        const currentPrice = extractPrice(
            // $('#ejxu63-exa493-jwc3n7-bjv4g8'),
            // $('.a-section .a-spacing-micro'),
            // $('.a-price .aok-align-center'),
            // $('span.a-offscreen')
            $('.a-offscreen').first()
        )

        // const firstPriceText = $('.a-offscreen').first().text();
        // console.log(firstPriceText);

        // const currency = extractCurrency('.a-price-symbol')

        // const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable'
        const images =  $('#imgBlkFront').attr('data-a-dynamic-image') ||  
        $('#landingImage').attr('data-a-dynamic-image') || '{}'

        const imageUrls = Object.keys(JSON.parse(images))
        // const discountRate = $('.savingPercentage').text().replace(/[-%]/g, '')

        console.log({title, currentPrice, imageUrls})

        //Construct data object with scraped data
        const data = {
            url,
            // currency: currency || 'USD',
            currency: 'USD',
            title,
            originalPrice: Number(currentPrice),
            currentPrice: Number(currentPrice),
            // discountRate: Number(discountRate),
            discountRate: Number(0),
            lowestPrice: Number(currentPrice) || 0,
            highestPrice: Number(currentPrice) || 0,
            averagePrice: Number(currentPrice) || 0,
            priceHistory: [],
            description: '',
            category: '',
            reviewsCount: 0,
            stars: 4.5,
            isOutOfStock: false,
            image: imageUrls[0],
        }

        console.log("Data",data)

        return data

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to scrape Amazon product: ${error.message}`)
        }
    }
}