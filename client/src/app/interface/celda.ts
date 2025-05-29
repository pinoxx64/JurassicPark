export interface Celda {
    id: number;
    nivelPeligrosidad: number;
    cantidadAlimento: number;
    averias: number;
    nivelSeguridad: number;
}

export interface CeldaM{
    id: number;
    nivelPeligrosidad: number;
    cantidadAlimento: number;
    averias: number;
    nivelSeguridad: number;
    dinosaurios: string[]
}

export interface CeldaResponse {
    status: number;
    message: string;
    celdas: Celda[];
}

export interface CeldaResponse {
    status: number;
    message: string;
    celda: Celda;
}
