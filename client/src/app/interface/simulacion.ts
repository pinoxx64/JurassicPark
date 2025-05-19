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
