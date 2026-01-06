export interface GetProduct {
    item_id: string;
    barcode: number;
    name: string;
    price: number;
    stock: number;
    created_at: string;
    updated_at: string;
}

export interface CreateProduct {
    barcode: number;
    name: string;
    price: number;
    stock: number;
}

