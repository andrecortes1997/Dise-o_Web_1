import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const UpdateTarjeta = ({ modalUpdate, tarjeta, handleChange, handlePutTarjeta, setModalUpdate, clearTarjeta }) => {
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
            <label>Descripcion:</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="50"
              size="50"
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
              maxLength="50"
              size="50"
              value={tarjeta && tarjeta.Numero}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Emision:</label>
            <input
              className="form-control"
              placeholder="Fecha de Emision"
              name="FechaEmision"
              type="date"
              value={tarjeta && tarjeta.FechaEmision}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Vencimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Vencimiento"
              name="FechaVencimiento"
              type="date"
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
              <option value="">Seleccione un Estado</option>
              <option value="I">Inactivo</option>
              <option value="A">Activo</option>
            </select>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => handlePutTarjeta()}>
            Editar
          </Button>
          <Button
            color="danger"
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

export default UpdateTarjeta;
