import { PriceHistoryItem } from "@/types";

export function extractPrice(...elements: any): number {
    for (const element of elements) {
      const priceText = element.text().trim(); 
      if(priceText) {
        const cleanPrice = priceText.replace(/[^0-9,]/g, '')
        const dotString = cleanPrice.replace(/,/g, '.')
        const number = parseFloat(dotString)
        return number;
      }
    }

    return 0
}

export function extractDescription(...elements: any): string {
  for (const element of elements) {
    const descriptionText = element.text().trim();
    if(descriptionText) {
      return descriptionText
    }
  }

  return ''
}


export function extractOriginalPrice(text: string): number {
  if(!text) return 0
  const priceText =  text.split('€')[1].trim();
  const cleanPrice = priceText.replace(/[^0-9,]/g, '')
  const dotString = cleanPrice.replace(/,/g, '.')
  const number = parseFloat(dotString)
  return number;
}

export function extractCurrency(element:any):string {
    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : '';
}
 
export function extractDiscountRate(text: string): number {
  if(!text) return 0
  const priceText =  text.split('%')[0].trim();
  const cleanPrice = priceText.replace(/[^0-9,]/g, '')
  const dotString = cleanPrice.replace(/,/g, '.')
  const number = parseFloat(dotString)
  return number;
}

export const getLowestPrice = (pricesHistory: PriceHistoryItem[]): number => {
  return Math.min(...pricesHistory.map((item) => item.price));
}


export const getHighestPrice = (pricesHistory: PriceHistoryItem[]): number => {
  return Math.max(...pricesHistory.map((item) => item.price));
}

export const getAveragePrice = (pricesHistory: PriceHistoryItem[]): number => {
  const sumOfPrices = pricesHistory.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / pricesHistory.length || 0;

  return parseFloat(averagePrice.toFixed(2));
}
