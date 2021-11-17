import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const InsertTarjeta = ({ tarjeta, modalInsert, handleChange, handlePostTarjeta, setModalInsert, clearTarjeta }) => {
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
            <label>Descripcion</label>
            <input
              className="form-control"
              placeholder="Descripcion"
              name="Descripcion"
              type="text"
              maxLength="50"
              size="50"
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
          <Button color="primary" onClick={() => handlePostTarjeta()}>
            Insertar
          </Button>
          <Button
            color="danger"
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

export default InsertTarjeta;
