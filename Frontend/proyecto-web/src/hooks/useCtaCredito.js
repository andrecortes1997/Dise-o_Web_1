import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "CtaCreditoes/";

export const useCtaCredito = () => {
  const [ctascredito, setCtasCredito] = useState([]);

  const getCtasCredito = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setCtasCredito(data);
    });
  };

  useEffect(() => {
    getCtasCredito();
  }, []);

  const postCtaCredito = async (ctacredito) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, ctacredito, config)
      .then((response) => {
        const { data } = response;
        setCtasCredito(ctascredito.concat(data));
      })
      .then(() => getCtasCredito());
  };

  const putCtaCredito = async (ctacredito) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + ctacredito.Codigo, ctacredito, config)
      .then((res) => {
        const newData = ctascredito;
        newData.map((item) => {
          if (ctacredito.Codigo === item.Codigo) {
            item.CodigoUsuario = ctacredito.CodigoUsuario;
            item.CodigoMoneda = ctacredito.CodigoMoneda;
            item.CodigoTarjeta = ctacredito.CodigoTarjeta;
            item.Descripcion = ctacredito.Descripción;
            item.IBAN = ctacredito.IBAN;
            item.Saldo = ctacredito.Saldo;
            item.FechaPago = ctacredito.FechaPago;
            item.PagoMinimo = ctacredito.PagoMinimo;
            item.PagoContado = ctacredito.PagoContado;
            item.Estado = ctacredito.Estado;
          }
          return newData;
        });
        setCtasCredito(newData);
      })
      .then(() => getCtasCredito());
  };

  const deleteCtaCredito = async (ctacredito) => {
    const token = getToken();
    const config = getConfig(token);
    if (ctacredito.Codigo) {
      await axios.delete(url + ctacredito.Codigo, config).then((res) => {
        const newData = ctascredito.filter(
          (item) => item.Codigo !== ctacredito.Codigo
        );
        setCtasCredito(newData);
      });
    }
  };

  return {
    ctascredito,
    postCtaCredito,
    putCtaCredito,
    deleteCtaCredito,
  };
};
