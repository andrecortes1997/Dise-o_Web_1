import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const UpdateCtaDebito = ({ modalUpdate, ctadebito, handleChange, handlePutCtaDebito, setModalUpdate, clearCtaDebito }) => {
  return (
    <>
      <Modal isOpen={modalUpdate}>
        <ModalHeader>
          <div>
            <h3>Editar Cuenta de Debito</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo:</label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={ctadebito && ctadebito.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              name="CodigoUsuario"
              type="number"
              value={ctadebito && ctadebito.CodigoUsuario}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Moneda:</label>
            <input
              className="form-control"
              placeholder="Codigo Moneda"
              name="CodigoMoneda"
              type="number"
              value={ctadebito && ctadebito.CodigoMoneda}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Codigo Tarjeta:</label>
            <input
              className="form-control"
              placeholder="Codigo Tarjeta"
              name="CodigoTarjeta"
              type="number"
              value={ctadebito && ctadebito.CodigoTarjeta}
              onChange={handleChange}
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
              value={ctadebito && ctadebito.Descripcion}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>IBAN:</label>
            <input
              className="form-control"
              placeholder="IBAN"
              name="IBAN"
              type="text"
              maxLength="22"
              size="22"
              value={ctadebito && ctadebito.IBAN}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Saldo:</label>
            <input
              className="form-control"
              placeholder="Saldo"
              name="Saldo"
              type="number"
              step="0.01"
              value={ctadebito && ctadebito.Saldo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={ctadebito && ctadebito.Estado}
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
          <Button color="primary" onClick={() => handlePutCtaDebito()}>
            Editar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearCtaDebito();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default UpdateCtaDebito;