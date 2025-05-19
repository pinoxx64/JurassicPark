export interface Celda {
    id: number;
    nivelPeligrosidad: number;
    cantidadAlimento: number;
    averias: number;
    nivelSeguridad: number;
}

export interface CeldaResponse {
    status: number;
    message: string;
    celdas: Celda[];
}
