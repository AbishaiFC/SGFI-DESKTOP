export interface AlertModel {
    title: string;
    detail: string;
    type: AlertType;
}

export enum AlertType {
    SUCCESS = 'success',
    ERROR = 'error'
}