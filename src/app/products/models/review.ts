import { CreatedBy } from "./created-by";

export interface Review {
    id: number;
    product: number;
    created_by: CreatedBy;
    rate: number;
    text: string;
    created_at: string;
}