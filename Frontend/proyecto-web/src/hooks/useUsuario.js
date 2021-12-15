import { useEffect, useState } from "react";
import axios from "axios";

import { baseUrl, getToken, getConfig } from "../services/API";

const url = baseUrl + "Usuario/";

export const useUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({});

  const getUsuarios = async () => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url, config).then((response) => {
      const { data } = response;
      setUsuarios(data);
    });
  };

  const getUsuarioById = async (usuarioId) => {
    const token = getToken();
    const config = getConfig(token);
    await axios.get(url + usuarioId, config).then((response) => {
      const { data } = response;
      setUsuario(data);
    });
  };

  useEffect(() => {
    const usuarioId = localStorage.getItem("Codigo");
    getUsuarios();
    if (usuarioId) {
      getUsuarioById(usuarioId);
    }
  }, []);

  const postUsuario = async (usuario) => {
    console.log(usuario)
    const token = getToken();
    const config = getConfig(token);
    await axios
      .post(url, usuario, config)
      .then((response) => {
        const { data } = response;
        setUsuarios(usuarios.concat(data));
      })
      .then(() => getUsuarios());
  };

  const putUsuario = async (usuario) => {
    const token = getToken();
    const config = getConfig(token);
    await axios
      .put(url + usuario.Codigo, usuario, config)
      .then((res) => {
        const newData = usuarios;
        newData.map((item) => {
          if (usuario.Codigo === item.Codigo) {
            item.Identificacion = usuario.Identificacion;
            item.Nombre = usuario.Nombre;
            item.Username = usuario.Username;
            item.Password = usuario.Password;
            item.Email = usuario.Email;
            item.FechaNacimiento = usuario.FechaNacimiento;
            item.Estado = usuario.Estado;
          }
          return newData;
        });
        setUsuarios(newData);
      })
      .then(() => getUsuarios());
  };

  const deleteUsuario = async (usuario) => {
    const token = getToken();
    const config = getConfig(token);
    if (usuario.Codigo) {
      await axios.delete(url + usuario.Codigo, config).then((res) => {
        const newData = usuarios.filter(
          (item) => item.Codigo !== usuario.Codigo
        );
        setUsuarios(newData);
      });
    }
  };

  return {
    usuarios,
    usuario,
    postUsuario,
    putUsuario,
    deleteUsuario,
  };
};