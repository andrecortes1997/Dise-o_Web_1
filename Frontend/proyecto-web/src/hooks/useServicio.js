import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Servicio/";

export const useServicio = () => {
  const [servicios, setServicios] = useState([]);

  const getServicios = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setServicios(data);
    });
  };

  useEffect(() => {
    getServicios();
  }, []);

  const postServicio = async (servicio) => {
    console.log(servicio)
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, servicio, config)
      .then((response) => {
        const { data } = response;
        setServicios(servicios.concat(data));
      })
      .then(() => getServicios());
  };

  const putServicio = async (servicio) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + servicio.Codigo, servicio, config)
      .then((response) => {
        const newData = servicios;
        newData.map((item) => {
          if (servicio.Codigo === item.Codigo) {
            item.Descripcion = servicio.Descripcion;
            item.Estado = servicio.Estado;
          }
          return newData;
        });
        setServicios(newData);
      })
      .then(() => getServicios());
  };

  const deleteServicio = async (servicio) => {
    const token = getToken();
    const config = getConfig(token);
    if (servicio.Codigo) {
      await axios.delete(url + servicio.Codigo, config).then((res) => {
        const newData = servicios.filter(
          (item) => item.Codigo !== servicio.Codigo
        );
        setServicios(newData);
      });
    }
  };

  return { servicios, postServicio, putServicio, deleteServicio };
};