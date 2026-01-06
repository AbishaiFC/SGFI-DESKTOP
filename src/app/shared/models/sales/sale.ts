export interface GetSale {
    sale_id: string;
    products: ProductsSale[];
    timestamps: string;
}

export interface GetPendingSale {
    pending_transaction_id: string;
    products: ProductsSale[];
}

export interface ProductsSale {
    item_id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface ProductSale {
    name: string;
    price: number;
}