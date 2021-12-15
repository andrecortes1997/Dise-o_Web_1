import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from 'reactstrap';

const ModalInsert = ({
  modalInsert,
  handleChange,
  handlePostUsuario,
  setModalInsert,
  clearUsuario,
}) => {

  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Usuario</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Identificación:</label>
            <input
              className="form-control"
              placeholder="Identificación"
              name="Identificacion"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre Completo:</label>
            <input
              className="form-control"
              placeholder="Nombre Completo"
              name="Nombre"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre de Usuario:</label>
            <input
              className="form-control"
              placeholder="Nombre de Usuario"
              name="Username"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Contraseña:</label>
            <input
              className="form-control"
              placeholder="Contraseña"
              name="Password"
              type="password"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Correo:</label>
            <input
              className="form-control"
              placeholder="Correo"
              name="Email"
              type="email"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Nacimiento:</label>
            <input
              className="form-control"
              placeholder="Fecha de Nacimiento"
              name="FechaNacimiento"
              type="datetime-local"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handlePostUsuario()}>
            Insertar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearUsuario();
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
