import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ estadisticas }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Estadisticas">
      <ExcelSheet data={estadisticas} name="Estadistica">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Fecha y Hora" value="FechaHora" />
        <ExcelColumn label="Navegador" value="Navegador" />
        <ExcelColumn label="Plataforma del Dispositivo" value="PlataformaDispositivo" />
        <ExcelColumn label="Fabricante del Dispositivo" value="FabricanteDispositivo" />
        <ExcelColumn label="Vista" value="Vista" />
        <ExcelColumn label="Accion" value="Accion" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;