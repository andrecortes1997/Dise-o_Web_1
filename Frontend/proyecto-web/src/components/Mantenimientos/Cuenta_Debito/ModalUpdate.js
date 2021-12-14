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

const ModalUpdate = ({ modalUpdate, cuenta_debito, handleChange, handlePutCuenta_Debito, setModalUpdate, clearCuenta_Debito }) => {

  const { useUsuario, useMoneda, useTarjeta } = useMantenimientos();
  const  { usuarios } = useUsuario();
  const  { monedas } = useMoneda();
  const { tarjetas } = useTarjeta();

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
              value={cuenta_debito && cuenta_debito.Codigo}
            />
          </FormGroup>

          <FormGroup>
            <label>Usuario:</label>
            <select
              className="form-control"
              name="CodigoUsuario"
              type="text"
              value={cuenta_debito && cuenta_debito.CodigoUsuario}
              onChange={handleChange}
            >
              {usuarios.map(usuario => (
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
              value={cuenta_debito && cuenta_debito.CodigoMoneda}
              onChange={handleChange}
            >
              {monedas.map(moneda => (
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
              value={cuenta_debito && cuenta_debito.CodigoTarjeta}
              onChange={handleChange}
            >
              {tarjetas.map(tarjeta => (
                tarjeta.Estado === 'A' &&
                <option key={tarjeta && tarjeta.Codigo} value={tarjeta.Codigo}>{tarjeta.Numero}</option>
              ))}
            </select>
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
              value={cuenta_debito && cuenta_debito.Descripcion}
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
              value={cuenta_debito && cuenta_debito.IBAN}
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
              value={cuenta_debito && cuenta_debito.Saldo}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <select
              className="form-control"
              value={cuenta_debito && cuenta_debito.Estado}
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
          <Button color="info" onClick={() => handlePutCuenta_Debito()}>
            Editar
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setModalUpdate(!modalUpdate);
              clearCuenta_Debito();
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
