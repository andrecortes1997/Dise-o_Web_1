import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Transferencia/";

export const useTransferencia = () => {
  const [transferencias, setTransferencias] = useState([]);

  const getTransferencias = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setTransferencias(data);
    });
  };

  useEffect(() => {
    getTransferencias();
  }, []);

  const postTransferencia = async (transferencia) => {
    console.log(transferencia)
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, transferencia, config)
      .then((response) => {
        const { data } = response;
        setTransferencias(transferencias.concat(data));
      })
      .then(() => getTransferencias());
  };

  const putTransferencia = async (transferencia) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + transferencia.Codigo, transferencia, config)
      .then((res) => {
        const newData = transferencias;
        newData.map((item) => {
          if (transferencia.Codigo === item.Codigo) {
            item.CuentaOrigen = transferencia.CuentaOrigen;
            item.CuentaDestino = transferencia.CuentaDestino;
            item.FechaHora = transferencia.FechaHora;
            item.Descripcion = transferencia.Descripcion;
            item.Monto = transferencia.Monto;
            item.Estado = transferencia.Estado;
          }
          return newData;
        });
        setTransferencias(newData);
      })
      .then(() => getTransferencias());
  };

  const deleteTransferencia = async (transferencia) => {
    const token = getToken();
    const config = getConfig(token);
    if (transferencia.Codigo) {
      await axios.delete(url + transferencia.Codigo, config).then((res) => {
        const newData = transferencias.filter(
          (item) => item.Codigo !== transferencia.Codigo
        );
        setTransferencias(newData);
      });
    }
  };

  return {
    transferencias,
    postTransferencia,
    putTransferencia,
    deleteTransferencia,
  };
};