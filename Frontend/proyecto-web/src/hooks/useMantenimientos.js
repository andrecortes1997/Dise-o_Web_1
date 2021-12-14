import { usePago } from "./usePago";
import { useSesion } from "./useSesion";
import { useMoneda } from "./useMoneda";
import { useUsuario } from "./useUsuario";
import { useTarjeta } from "./useTarjeta";
import { useServicio } from "./useServicio";
import { useEstadistica } from "./useEstadistica";
import { useTransferencia } from "./useTransferencia";
import { useCuenta_Debito } from "./useCuenta_Debito";
import { useCuenta_Credito } from "./useCuenta_Credito";
import { useCharts } from "../hooks/useCharts";


export const useMantenimientos = () => {
    return { usePago, useCharts, useSesion, useMoneda, useUsuario, useTarjeta, useServicio, useEstadistica, useTransferencia, useCuenta_Debito, useCuenta_Credito }
}