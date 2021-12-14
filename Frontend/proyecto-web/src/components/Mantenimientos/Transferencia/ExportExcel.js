import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ transferencias }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Transferencias">
      <ExcelSheet data={transferencias} name="Transferencia">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Cuenta Origen" value="CuentaOrigen" />
        <ExcelColumn label="Cuenta Destino" value="CuentaDestino" />
        <ExcelColumn label="Fecha y Hora" value="FechaHora" />
        <ExcelColumn label="Descripcion" value="Descripcion" />
        <ExcelColumn label="Monto" value="Monto" />
        <ExcelColumn label="Estado" value="Estado" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
