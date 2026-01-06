export interface MessageModel {
    type: string;
    payload: any;
}

export interface PayloadProduct {
    item_id: string;
    name: string;
    price: number,
    quantity: number;
}

export interface PayloadWelcome {
    mensaje: string;
    conexiones_activas: number;
}

export interface PayloadNotification {
    mensaje: string;
    timestamp: string;
}