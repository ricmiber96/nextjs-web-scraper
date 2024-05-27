
export function extractPrice(...elements: any):string {
    console.log(elements.length)
    for (const element of elements) {
      const priceText = element.text().trim();
      console.log(priceText)   
      if(priceText) {
        const cleanPrice = priceText.replace(/[^\d.]/g, '');
        return cleanPrice;
      }
    }

    return ''
}

export function extractCurrency(element:any):string {
    const currencyText = element.text().trim().slice(0, 1);
    return currencyText ? currencyText : '';
}