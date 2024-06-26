export type PriceHistoryItem = {
    price: number;
}

export type User = {
    email: string;
}

export type Product = {
    _id?: string;
    url: string;
    currency: string;
    title: string;
    image: string;
    currentPrice: number;
    originalPrice: number;
    priceHistory: PriceHistoryItem[] | [];
    discountRate: number;
    highestPrice: number;
    lowestPrice: number;
    averagePrice: number;
    description: string;
    category: string;
    reviewsCount: number;
    stars: number;
    isOutOfStock: boolean;
    likes: number;
    likedByUsers?: string[];
    users?: User[];
}

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};