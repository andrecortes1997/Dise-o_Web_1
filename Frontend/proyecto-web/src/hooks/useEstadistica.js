import { useEffect, useState } from "react";
import { browserName, osName, mobileVendor } from 'react-device-detect';
import axios from "axios";

import { useDateTime } from "./useDateTime";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Estadistica/";

export const useEstadistica = () => {
  const [estadisticas, setEstadisticas] = useState([]);
  const { currentdate, getDatetime } = useDateTime();

  const getEstadisticas = async (token) => {
    try {
      const config = getConfig(token);
      await axios.get(url, config).then((response) => {
        const { data } = response;
        setEstadisticas(data);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      getEstadisticas(token);
    }
  }, []);

  const postEstadistica = async (codigo, vista, accion) => {
    const token = getToken();
    const config = getConfig(token);
    const estadistica = {
      CodigoUsuario: codigo,
      FechaHora: getDatetime(currentdate),
      Navegador: browserName,
      PlataformaDispositivo: osName,
      FabricanteDispositivo: mobileVendor,
      Vista: vista,
      Accion: accion,
    }
    await axios.post(url, estadistica, config).then((response) => {
      const { data } = response;
      setEstadisticas(estadisticas.concat(data));
    });
  };

  return { estadisticas, postEstadistica };
};
