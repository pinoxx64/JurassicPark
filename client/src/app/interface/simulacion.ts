export interface InformeCelda {
    celda: number;
    nivelPeligrosidad: number;
    cantidadAlimento: number;
    averias: number;
    nivelSeguridad: number;
    dinosaurios: string[];
}

export interface IteracionSimulacion {
    iteracion: number;
    informe: InformeCelda[];
}

export interface Simulacion {
    status: number;
    message: string;
    informes: IteracionSimulacion[];
}

export interface SimulacionBrecha {
    celda: number;
    nivelPeligrosidad: number;
    cantidadAlimento: number;
    averias: number;
    nivelSeguridad: number;
    dinosaurios: string[];
    efectos: string;
    probabilidadFuga: number;
    fuga: boolean
}

export interface SimulacionBrechaResponse {
    status: number;
    message: string;
    informes: SimulacionBrecha[];
}