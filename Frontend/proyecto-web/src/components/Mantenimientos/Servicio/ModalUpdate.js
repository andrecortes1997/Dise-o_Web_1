import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalUpdate = ({ modalUpdate, servicio, handleChange, handlePutServicio, setModalUpdate, clearServicio }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Servicio</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={servicio && servicio.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              placeholder="Descripción"
              name="Descripcion"
              type="text"
              value={servicio && servicio.Descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={servicio && servicio.Estado}
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
          <Button color="info" onClick={() => handlePutServicio()}>
            Editar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearServicio();
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