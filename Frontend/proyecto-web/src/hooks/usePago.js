import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Pago/";

export const usePago = () => {
  const [pagos, setPagos] = useState([]);

  const getPagos = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setPagos(data);
    });
  };

  useEffect(() => {
    getPagos();
  }, []);

  const postPago = async (pago) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, pago, config)
      .then((response) => {
        const { data } = response;
        setPagos(pagos.concat(data));
      })
      .then(() => getPagos());
  };

  const putPago = async (pago) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + pago.Codigo, pago, config)
      .then((response) => {
        const newData = pagos;
        newData.map((item) => {
          if (pago.Codigo === item.Codigo) {
            item.CodigoUsuario = pago.CodigoUsuario;
            item.CodigoServicio = pago.CodigoServicio;
            item.CodigoTarjeta = pago.CodigoTarjeta;
            item.Descripcion = pago.Descripcion;
            item.Fechahora = pago.Fechahora;
            item.Monto = pago.Monto;
          }
          return newData;
        });
        setPagos(newData);
      })
      .then(() => getPagos());
  };

  const deletePago = async (pago) => {
    const token = getToken();
    const config = getConfig(token);
    if (pago.Codigo) {
      await axios.delete(url + pago.Codigo, config).then((res) => {
        const newData = pagos.filter(
          (item) => item.Codigo !== pago.Codigo
        );
        setPagos(newData);
      });
    }
  };

  return { pagos, postPago, putPago, deletePago };
};
