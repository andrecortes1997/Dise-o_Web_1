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

const ModalUpdate = ({
  modalUpdate,
  pago,
  handleChange,
  handlePutPago,
  setModalUpdate,
  clearPago,
}) => {
  const { useServicio, useUsuario, useTarjeta } = useMantenimientos();
  const { usuarios } = useUsuario();
  const { servicios } = useServicio();
  const { tarjetas } = useTarjeta();

  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Pago</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={pago && pago.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Usuario:</label>
            <select
              className="form-control"
              name="CodigoUsuario"
              type="text"
              value={pago && pago.CodigoUsuario}
              onChange={handleChange}
            >
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
              value={pago && pago.CodigoServicio}
              onChange={handleChange}
            >
              {servicios.map(servicio => (
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
              value={pago && pago.CodigoTarjeta}
              onChange={handleChange}
            >
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
              value={pago && pago.Descripcion}
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
              value={pago && pago.Fechahora}
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
              value={pago && pago.Monto}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handlePutPago()}>
            Editar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalUpdate(!modalUpdate);
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

export default ModalUpdate;
