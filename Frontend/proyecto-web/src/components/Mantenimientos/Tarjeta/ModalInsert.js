import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import { useMantenimientos } from '../../../hooks/useMantenimientos';

const ModalInsert = ({ modalInsert, handleChange, handlePostTarjeta, setModalInsert, clearTarjeta }) => {

  const { useUsuario } = useMantenimientos();
  const { usuarios } = useUsuario();

  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Tarjeta</h3>
          </div>
        </ModalHeader>

        <ModalBody>

          <FormGroup>
            <label>Usuario:</label>
            <select
              className="form-control"
              name="CodigoUsuario"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione un Usuario</option>
              {usuarios.map((usuario) => (
                usuario.Estado === 'A' &&
                <option key={usuario && usuario.Codigo} value={usuario.Codigo}>{usuario.Nombre}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              placeholder="Descripción"
              name="Descripcion"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Numero de Tarjeta:</label>
            <input
              className="form-control"
              placeholder="Numero de Tarjeta"
              name="Numero"
              type="text"
              maxLength="16"
              size="16"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>CVC:</label>
            <input
              className="form-control"
              placeholder="CVC"
              name="CVC"
              type="text"
              maxLength="3"
              size="3"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Vencimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Vencimiento"
              name="FechaVencimiento"
              type="datetime-local"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handlePostTarjeta()}>
            Insertar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearTarjeta();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModalInsert;
