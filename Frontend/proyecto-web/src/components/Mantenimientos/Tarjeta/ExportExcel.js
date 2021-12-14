import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ tarjetas }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Tarjetas">
      <ExcelSheet data={tarjetas} name="Tarjeta">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Descripcion" value="Descripcion" />
        <ExcelColumn label="Numero de Tarjeta" value="Numero" />
        <ExcelColumn label="CVC" value="CVC" />
        <ExcelColumn label="Fecha de Vencimiento" value="FechaVencimiento" />
        <ExcelColumn label="Estado" value="Estado" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;