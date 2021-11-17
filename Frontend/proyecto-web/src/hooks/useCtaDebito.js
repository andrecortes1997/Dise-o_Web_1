import { useEffect, useState } from 'react';
import axios from 'axios';

import { baseUrl, getToken, getConfig } from '../services/API';

const url = baseUrl + 'CtaDebitoes/';

export const useCtaDebito = () => {
  const [ctasdebito, setCtasDebito] = useState([]);

  const getCtasDebito = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then(response => {
      const { data } = response;
      setCtasDebito(data);
    });
  };

  useEffect(() => {
    getCtasDebito();
  }, []);

  const postCtaDebito = async ctadebito => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, ctadebito, config)
      .then(response => {
        const { data } = response;
        setCtasDebito(ctasdebito.concat(data));
      })
      .then(() => getCtasDebito());
  };

  const putCtaDebito = async ctadebito => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + ctadebito.Codigo, ctadebito, config)
      .then(res => {
        const newData = ctasdebito;
        newData.map(item => {
          if (ctadebito.Codigo === item.Codigo) {
            item.CodigoUsuario = ctadebito.CodigoUsuario;
            item.CodigoMoneda = ctadebito.CodigoMoneda;
            item.CodigoTarjeta = ctadebito.CodigoTarjeta;
            item.Descripcion = ctadebito.Descripcion;
            item.IBAN = ctadebito.IBAN;
            item.Saldo = ctadebito.Saldo;
            item.Estado = ctadebito.Estado;
          }
          return newData;
        });
        setCtasDebito(newData);
      })
      .then(() => getCtasDebito());
  };

  const deleteCtaDebito = async ctadebito => {
    const token = getToken();
    const config = getConfig(token);
    if (ctadebito.Codigo) {
      await axios.delete(url + ctadebito.Codigo, config).then(res => {
        const newData = ctasdebito.filter(
          item => item.Codigo !== ctadebito.Codigo,
        );
        setCtasDebito(newData);
      });
    }
  };

  return {
    ctasdebito,
    postCtaDebito,
    putCtaDebito,
    deleteCtaDebito,
  };
};
