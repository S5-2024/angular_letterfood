import { Review } from "./review";

export interface Restaurant {
    name: string,
    categories: string[],
    description: string,
    reviews: Review[],
    image: string //Ficar string por enquanto para url
}