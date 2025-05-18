export interface InformeCelda {
    celdaId: number;
    alimentoInicial: number;
    alimentoFinal: number;
    averias: number;
    dinosaurios: number[];
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
