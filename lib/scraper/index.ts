import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractDiscountRate, extractOriginalPrice, extractPrice } from "../utils"

export async function scrapeAmazonProduct (url:string){
    if(!url) return

    try {
        // Scrape product from Amazon
        // return scraped product
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        // Get product title
        const title = $('#productTitle').text().trim()
        const currentPrice = extractPrice(
            // $('#ejxu63-exa493-jwc3n7-bjv4g8'),
            // $('.a-section .a-spacing-micro'),
            // $('.a-price .aok-align-center'),
            // $('span.a-offscreen')
            $('.a-offscreen').first()
        )


        // const firstPriceText = $('.a-offscreen').first().text();
        // console.log(firstPriceText);

        const currency = $('.a-price-symbol').first().text();
        // const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable'
        const images =  $('#imgBlkFront').attr('data-a-dynamic-image') ||  
        $('#landingImage').attr('data-a-dynamic-image') || '{}'
        const imageUrls = Object.keys(JSON.parse(images))
        // const discountRate = $('.savingPercentage').text().replace(/[-%]/g, '')

        // console.log({title, currentPrice, imageUrls})

        const description = extractDescription( 
            $('.a-unordered-list .a-vertical .a-spacing-mini').first(),
            $('li.a-spacing-mini'),
            $('a-list-item')
        )
     
        //Construct data object with scraped data
        const originalPrice = extractOriginalPrice($('.basisPrice:contains("Precio")').first().text())


        const discountRate = extractDiscountRate($('.reinventPriceSavingsPercentageMargin').text())



        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        
        const data = {
            url,
            // currency: currency || 'USD',
            currency,
            title,
            originalPrice: Number(originalPrice) || Number(currentPrice),
            currentPrice: Number(currentPrice) || Number(originalPrice),
            // discountRate: Number(discountRate),
            discountRate: Number(discountRate),
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
            priceHistory: [],
            description: description || '',
            category: '',
            reviewsCount: 0,
            stars: 4.5,
            isOutOfStock: outOfStock,
            image: imageUrls[0],
        }
        return data

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to scrape Amazon product: ${error.message}`)
        }
    }
}