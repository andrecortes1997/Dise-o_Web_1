import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalInsert = ({ modalInsert, handleChange, handlePostTransferencia, setModalInsert, clearTransferencia }) => {
  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Transferencia</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Cuenta de Origen:</label>
            <input
              className="form-control"
              placeholder="Cuenta de Origen"
              name="CuentaOrigen"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Cuenta de Destino:</label>
            <input
              className="form-control"
              placeholder="Cuenta de Destino"
              name="CuentaDestino"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha y Hora:</label>
            <input
              className="form-control"
              placeholder="Fecha y Hora"
              name="FechaHora"
              type="datetime-local"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              placeholder="Descripción"
              name="Descripcion"
              type="text"
              maxLength="50"
              size="50"
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
          <Button color="info" onClick={() => handlePostTransferencia()}>
            Insertar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearTransferencia();
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