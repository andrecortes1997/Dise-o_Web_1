import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Moneda/";

export const useMoneda = () => {
  const [monedas, setMonedas] = useState([]);

  const getMonedas = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setMonedas(data);
    });
  };

  useEffect(() => {
    getMonedas();
  }, []);

  const postMoneda = async (moneda) => {
    console.log(moneda)
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, moneda, config)
      .then((response) => {
        const { data } = response;
        setMonedas(monedas.concat(data));
      })
      .then(() => getMonedas());
  };

  const putMoneda = async (moneda) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + moneda.Codigo, moneda, config)
      .then((response) => {
        const newData = monedas;
        newData.map((item) => {
          if (moneda.Codigo === item.Codigo) {
            item.Descripcion = moneda.Descripcion;
            item.Estado = moneda.Estado;
          }
          return newData;
        });
        setMonedas(newData);
      })
      .then(() => getMonedas());
  };

  const deleteMoneda = async (moneda) => {
    const token = getToken();
    const config = getConfig(token);
    if (moneda.Codigo) {
      await axios.delete(url + moneda.Codigo, config).then((res) => {
        const newData = monedas.filter(
          (item) => item.Codigo !== moneda.Codigo
        );
        setMonedas(newData);
      });
    }
  };

  return { monedas, postMoneda, putMoneda, deleteMoneda };
};
