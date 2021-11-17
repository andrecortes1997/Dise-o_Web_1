import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const InsertCtaCredito = ({ ctacredito, modalInsert, handleChange, handlePostCtaCredito, setModalInsert, clearCtaCredito }) => {
  return (
    <>
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div>
            <h3>Insertar Cuenta de Credito</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Codigo Usuario:</label>
            <input
              className="form-control"
              placeholder="Codigo Usuario"
              name="CodigoUsuario"
              type="number"
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
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              placeholder="Descripción"
              name="Descripción"
              type="text"
              maxLength="50"
              size="50"
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
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Fecha de Pago:</label>
            <input
              className="form-control"
              placeholder="Fecha de Pago"
              name="FechaPago"
              type="date"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Pago Minimo:</label>
            <input
              className="form-control"
              placeholder="Pago Minimo"
              name="PagoMinimo"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Pago Contado:</label>
            <input
              className="form-control"
              placeholder="Pago Contado"
              name="PagoContado"
              type="number"
              step="0.01"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={ctacredito && ctacredito.Estado}
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
          <Button color="primary" onClick={() => handlePostCtaCredito()}>
            Insertar
          </Button>
          <Button
            color="danger"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearCtaCredito();
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default InsertCtaCredito;
