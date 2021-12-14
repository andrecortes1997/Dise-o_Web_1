import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, moneda, handleChange, handlePutMoneda, setModalUpdate, clearMoneda }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Moneda</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={moneda && moneda.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              placeholder="Descripción"
              name="Descripcion"
              type="text"
              value={moneda && moneda.Descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={moneda && moneda.Estado}
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
          <Button color="info" onClick={() => handlePutMoneda()}>
            Editar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearMoneda();
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
