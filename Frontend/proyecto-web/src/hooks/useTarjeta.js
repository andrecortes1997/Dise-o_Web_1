import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Tarjeta/";

export const useTarjeta = () => {
  const [tarjetas, setTarjetas] = useState([]);

  const getTarjetas = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setTarjetas(data);
    });
  };

  useEffect(() => {
    getTarjetas();
  }, []);

  const postTarjeta = async (tarjeta) => {
    console.log(tarjeta)
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, tarjeta, config)
      .then((response) => {
        const { data } = response;
        setTarjetas(tarjetas.concat(data));
      })
      .then(() => getTarjetas());
  };

  const putTarjeta = async (tarjeta) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + tarjeta.Codigo, tarjeta, config)
      .then((response) => {
        const newData = tarjetas;
        newData.map((item) => {
          if (tarjeta.Codigo === item.Codigo) {
            item.CodigoUsuario = tarjeta.CodigoUsuario;
            item.Descripcion = tarjeta.Descripcion;
            item.Numero = tarjeta.Numero;
            item.CVC = tarjeta.CVC;
            item.FechaVencimiento = tarjeta.FechaVencimiento;
            item.Estado = tarjeta.Estado;
          }
          return newData;
        });
        setTarjetas(newData);
      })
      .then(() => getTarjetas());
  };

  const deleteTarjeta = async (tarjeta) => {
    const token = getToken();
    const config = getConfig(token);
    if (tarjeta.Codigo) {
      await axios.delete(url + tarjeta.Codigo, config).then((res) => {
        const newData = tarjetas.filter(
          (item) => item.Codigo !== tarjeta.Codigo
        );
        setTarjetas(newData);
      });
    }
  };

  return { tarjetas, postTarjeta, putTarjeta, deleteTarjeta };
};
