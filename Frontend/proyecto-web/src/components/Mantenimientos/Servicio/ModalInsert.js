import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const ModalInsert = ({ modalInsert, handleChange, handlePostServicio, setModalInsert, clearServicio }) => {
  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Servicio</h3>
          </div>
        </ModalHeader>

        <ModalBody>
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
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handlePostServicio()}>
            Insertar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalInsert(!modalInsert);
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

export default ModalInsert;