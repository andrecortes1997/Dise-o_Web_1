import React from "react";
import ExcelExport from "../../../modules/react-export-excel";

const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelFile.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelFile.ExcelColumn;

const ExportExcel = ({ usuarios }) => {
  return (
    <ExcelFile className="btn btn-info btn-lg btn-block" element="Exportar a Excel" filename="Usuarios">
      <ExcelSheet data={usuarios} name="Usuario">
        <ExcelColumn label="Código" value="Codigo" />
        <ExcelColumn label="Identificación" value="Identificacion" />
        <ExcelColumn label="Nombre Completo" value="Nombre" />
        <ExcelColumn label="Nombre de Usuario" value="Username" />
        <ExcelColumn label="Contraseña" value="Password" /> 
        <ExcelColumn label="Correo" value="Email" /> 
        <ExcelColumn label="Fecha de Nacimiento" value="FechaNacimiento" /> 
        <ExcelColumn label="Estado" value="Estado" /> 
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportExcel;
