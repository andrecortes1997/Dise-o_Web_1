import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Cuenta_Debito/";

export const useCuenta_Debito = () => {
  const [cuentas_debito, setCuentas_Debito] = useState([]);

  const getCuentas_Debito = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setCuentas_Debito(data);
    });
  };

  useEffect(() => {
    getCuentas_Debito();
  }, []);

  const postCuenta_Debito = async (cuenta_debito) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, cuenta_debito, config)
      .then((response) => {
        const { data } = response;
        setCuentas_Debito(cuentas_debito.concat(data));
      })
      .then(() => getCuentas_Debito());
  };

  const putCuenta_Debito = async (cuenta_debito) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + cuenta_debito.Codigo, cuenta_debito, config)
      .then((res) => {
        const newData = cuentas_debito;
        newData.map((item) => {
          if (cuenta_debito.Codigo === item.Codigo) {
            item.CodigoUsuario = cuenta_debito.CodigoUsuario;
            item.CodigoMoneda = cuenta_debito.CodigoMoneda;
            item.CodigoTarjeta = cuenta_debito.CodigoTarjeta;
            item.Descripcion = cuenta_debito.Descripcion;
            item.IBAN = cuenta_debito.IBAN;
            item.Saldo = cuenta_debito.Saldo;
            item.Estado = cuenta_debito.Estado;
          }
          return newData;
        });
        setCuentas_Debito(newData);
      })
      .then(() => getCuentas_Debito());
  };

  const deleteCuenta_Debito = async (cuenta_debito) => {
    const token = getToken();
    const config = getConfig(token);
    if (cuenta_debito.Codigo) {
      await axios.delete(url + cuenta_debito.Codigo, config).then((res) => {
        const newData = cuentas_debito.filter(
          (item) => item.Codigo !== cuenta_debito.Codigo
        );
        setCuentas_Debito(newData);
      });
    }
  };

  return {
    cuentas_debito,
    postCuenta_Debito,
    putCuenta_Debito,
    deleteCuenta_Debito,
  };
};
