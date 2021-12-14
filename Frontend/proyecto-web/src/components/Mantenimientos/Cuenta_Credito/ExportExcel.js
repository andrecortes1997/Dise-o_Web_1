import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ cuentas_credito }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Cuentas_Credito">
      <ExcelSheet data={cuentas_credito} name="Cuenta_Credito">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Codigo de Moneda" value="CodigoMoneda" />
        <ExcelColumn label="Codigo de Tarjeta" value="CodigoTarjeta" />
        <ExcelColumn label="Descripcion" value="Descripcion" /> 
        <ExcelColumn label="IBAN" value="IBAN" /> 
        <ExcelColumn label="Saldo" value="Saldo" />
        <ExcelColumn label="Fecha del Pago" value="FechaPago" /> 
        <ExcelColumn label="Pago Minimo" value="PagoMinimo" /> 
        <ExcelColumn label="Pago Contado" value="PagoContado" /> 
        <ExcelColumn label="Estado" value="Estado" /> 
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;