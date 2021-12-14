import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Cuenta_Credito/";

export const useCuenta_Credito = () => {
  const [cuentas_credito, setCuentas_Credito] = useState([]);

  const getCuentas_Credito = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setCuentas_Credito(data);
    });
  };

  useEffect(() => {
    getCuentas_Credito();
  }, []);

  const postCuenta_Credito = async (cuenta_credito) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, cuenta_credito, config)
      .then((response) => {
        const { data } = response;
        setCuentas_Credito(cuentas_credito.concat(data));
      })
      .then(() => getCuentas_Credito());
  };

  const putCuenta_Credito = async (cuenta_credito) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + cuenta_credito.Codigo, cuenta_credito, config)
      .then((res) => {
        const newData = cuentas_credito;
        newData.map((item) => {
          if (cuenta_credito.Codigo === item.Codigo) {
            item.CodigoUsuario = cuenta_credito.CodigoUsuario;
            item.CodigoMoneda = cuenta_credito.CodigoMoneda;
            item.CodigoTarjeta = cuenta_credito.CodigoTarjeta;
            item.Descripcion = cuenta_credito.Descripcion;
            item.IBAN = cuenta_credito.IBAN;
            item.Saldo = cuenta_credito.Saldo;
            item.FechaPago = cuenta_credito.FechaPago;
            item.PagoMinimo = cuenta_credito.PagoMinimo;
            item.PagoContado = cuenta_credito.PagoContado;
            item.Estado = cuenta_credito.Estado;
          }
          return newData;
        });
        setCuentas_Credito(newData);
      })
      .then(() => getCuentas_Credito());
  };

  const deleteCuenta_Credito = async (cuenta_credito) => {
    const token = getToken();
    const config = getConfig(token);
    if (cuenta_credito.Codigo) {
      await axios.delete(url + cuenta_credito.Codigo, config).then((res) => {
        const newData = cuentas_credito.filter(
          (item) => item.Codigo !== cuenta_credito.Codigo
        );
        setCuentas_Credito(newData);
      });
    }
  };

  return {
    cuentas_credito,
    postCuenta_Credito,
    putCuenta_Credito,
    deleteCuenta_Credito,
  };
};
