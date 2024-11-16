import { User } from "./user";

export interface Review {
    user: User,
    rate: number,
    comment: string,
    createdOn: string
}