import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, transferencia, handleChange, handlePutTransferencia, setModalUpdate, clearTransferencia }) => {
  return (
    <Modal isOpen={modalUpdate}>
      <ModalHeader>
        <div>
          <h3>Editar Transferencia</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>Codigo:</label>
          <input
            className="form-control"
            readOnly
            type="text"
            value={transferencia && transferencia.Codigo}
          />
        </FormGroup>

        <FormGroup>
          <label>Cuenta de Origen:</label>
          <input
            className="form-control"
            placeholder="Cuenta de Origen"
            name="CuentaOrigen"
            type="text"
            value={transferencia && transferencia.CuentaOrigen}
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
            value={transferencia && transferencia.CuentaDestino}
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
            value={transferencia && transferencia.FechaHora}
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
            value={transferencia && transferencia.Descripcion}
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
            value={transferencia && transferencia.Monto}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Estado:</label>
          <select
            className="form-control"
            value={transferencia && transferencia.Estado}
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
        <Button color="info" onClick={() => handlePutTransferencia()}>
          Editar
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            setModalUpdate(!modalUpdate);
            clearTransferencia();
          }}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalUpdate;