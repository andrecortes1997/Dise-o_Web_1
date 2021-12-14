import React from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import { useMantenimientos } from '../../../hooks/useMantenimientos';

const ModalInsert = ({ modalInsert, handleChange, handlePostCuenta_Credito, setModalInsert, clearCuenta_Credito }) => {

  const { useUsuario, useMoneda, useTarjeta } = useMantenimientos();
  const  { usuarios } = useUsuario();
  const  { monedas } = useMoneda();
  const { tarjetas } = useTarjeta();

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
            <label>Usuario:</label>
            <select
              className="form-control"
              name="CodigoUsuario"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione un Usuario</option>
              {usuarios.map((usuario) => (
                usuario.Estado === 'A' &&
                <option key={usuario && usuario.Codigo} value={usuario.Codigo}>{usuario.Nombre}</option>
              ))}
            </select>
          </FormGroup>
          
          <FormGroup>
            <label>Moneda:</label>
            <select
              className="form-control"
              name="CodigoMoneda"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione una Moneda</option>
              {monedas.map((moneda) => (
                moneda.Estado === 'A' &&
                <option key={moneda && moneda.Codigo} value={moneda.Codigo}>{moneda.Descripcion}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <label>Tarjeta:</label>
            <select
              className="form-control"
              name="CodigoTarjeta"
              type="text"
              onChange={handleChange}
            >
              <option value="">Seleccione una Tarjeta</option>
              {tarjetas.map((tarjeta) => (
                tarjeta.Estado === 'A' &&
                <option key={tarjeta && tarjeta.Codigo} value={tarjeta.Codigo}>{tarjeta.Numero}</option>
              ))}
            </select>
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
              type="datetime-local"
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
        </ModalBody>

        <ModalFooter>
          <Button color="info" onClick={() => handlePostCuenta_Credito()}>
            Insertar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalInsert(!modalInsert);
              clearCuenta_Credito();
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