import React from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from 'reactstrap';

const ModalUpdate = ({
  modalUpdate,
  usuario,
  handleChange,
  handlePutUsuario,
  setModalUpdate,
  clearUsuario,
}) => {

  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={usuario && usuario.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Identificación:</label>
            <input
              className="form-control"
              placeholder="Identificación"
              name="Identificacion"
              type="text"
              onChange={handleChange}
              value={usuario && usuario.Identificacion}
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
              value={usuario && usuario.Nombre}
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
              value={usuario && usuario.Username}
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
              value={usuario && usuario.Password}
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
              value={usuario && usuario.Email}
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
              value={usuario && usuario.FechaNacimiento}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={usuario && usuario.Estado}
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
          <Button color="info" onClick={() => handlePutUsuario()}>
            Editar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalUpdate(!modalUpdate);
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

export default ModalUpdate;
