import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ monedas }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Monedas">
      <ExcelSheet data={monedas} name="Moneda">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Descripcion" value="Descripcion" />
        <ExcelColumn label="Estado" value="Estado" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
