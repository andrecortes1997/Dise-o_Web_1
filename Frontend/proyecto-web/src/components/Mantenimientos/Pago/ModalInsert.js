import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from 'reactstrap';

import { useMantenimientos } from '../../../hooks/useMantenimientos';

const ModalInsert = ({
  modalInsert,
  handleChange,
  handlePostPago,
  setModalInsert,
  clearPago,
}) => {
  
  const { useServicio, useUsuario, useTarjeta } = useMantenimientos();
  const { usuarios } = useUsuario();
  const  { servicios } = useServicio();
  const { tarjetas } = useTarjeta();

  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Pago</h3>
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
            <label>Servicio:</label>
            <select
              className="form-control"
              name="CodigoServicio"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione un Servicio</option>
              {servicios.map((servicio) => (
                servicio.Estado === 'A' &&
                <option key={servicio && servicio.Codigo} value={servicio.Codigo}>{servicio.Descripcion}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Tarjeta:</label>
            <select
              className="form-control"
              name="CodigoTarjeta"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione una tarjeta </option>
              {tarjetas.map((tarjeta) => (
                tarjeta.Estado === 'A' &&
                <option key={tarjeta && tarjeta.Codigo} value={tarjeta.Codigo}>{tarjeta.Numero}</option>
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
            <label>Fecha y hora:</label>
            <input
              className="form-control"
              placeholder="Fecha y hora"
              name="Fechahora"
              type="datetime-local"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Monto:</label>
            <input
              className="form-control"
              placeholder="Monto"
              name="Monto"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handlePostPago()}>
            Insertar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearPago();
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
