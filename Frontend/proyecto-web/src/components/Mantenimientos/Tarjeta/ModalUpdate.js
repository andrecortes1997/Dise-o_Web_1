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

const ModalUpdate = ({ modalUpdate, tarjeta, handleChange, handlePutTarjeta, setModalUpdate, clearTarjeta }) => {

  const { useUsuario } = useMantenimientos();
  const { usuarios } = useUsuario();

  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Tarjeta</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={tarjeta && tarjeta.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Usuario:</label>
            <select
              className="form-control"
              name="CodigoUsuario"
              type="text"
              value={tarjeta && tarjeta.CodigoUsuario}
              onChange={handleChange}
            >
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
              value={tarjeta && tarjeta.Descripcion}
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
              value={tarjeta && tarjeta.Numero}
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
              value={tarjeta && tarjeta.CVC}
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
              value={tarjeta && tarjeta.FechaVencimiento}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={tarjeta && tarjeta.Estado}
              name="Estado"
              type="text"
              onChange={handleChange}
            >
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handlePutTarjeta()}>
            Editar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalUpdate(!modalUpdate);
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

export default ModalUpdate;
