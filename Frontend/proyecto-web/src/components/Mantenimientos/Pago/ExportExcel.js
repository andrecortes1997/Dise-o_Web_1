import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ pagos }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Pagos">
      <ExcelSheet data={pagos} name="Pago">
        <ExcelColumn label="Codigo" value="Codigo" />
        <ExcelColumn label="Codigo de Usuario" value="CodigoUsuario" />
        <ExcelColumn label="Codigo de Servicio" value="CodigoServicio" />
        <ExcelColumn label="Codigo de Tarjeta" value="CodigoTarjeta" />
        <ExcelColumn label="Descripcion" value="Descripcion" /> 
        <ExcelColumn label="Fecha y Hora" value="Fechahora" /> 
        <ExcelColumn label="Monto" value="Monto" /> 
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
