import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ sesiones }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Sesiones">
      <ExcelSheet data={sesiones} name="Sesion">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Fecha de Inicio" value="FechaInicio" />
        <ExcelColumn label="Fecha de Expiracion" value="FechaExpiracion" />
        <ExcelColumn label="Estado" value="Estado" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;