
export function extractPrice(...elements: any): number {
    console.log(elements.length)
    for (const element of elements) {
      const priceText = element.text().trim();
      console.log(priceText)   
      if(priceText) {
        const cleanPrice = priceText.replace(/[^0-9,]/g, '')
        const dotString = cleanPrice.replace(/,/g, '.')
        const number = parseFloat(dotString)
        return number;
      }
    }

    return ''
}

export function extractCurrency(element:any):string {
    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : '';
}