import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ servicios }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Servicios">
      <ExcelSheet data={servicios} name="Servicio">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Descripcion" value="Descripcion" />
        <ExcelColumn label="Estado" value="Estado" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
