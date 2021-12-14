using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApiSegura.Models;

namespace WebApiSegura.Controllers
{
    [Authorize]
    [RoutePrefix("api/Cuenta_Credito")]
    [EnableCors(origins: "http://localhost:3000, https://api-internet-banking.azurewebsites.net", headers: "*", methods: "*")]
    public class Cuenta_CreditoController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetId(int id)
        {
            Cuenta_Credito cuenta_credito = new Cuenta_Credito();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, CodigoMoneda,CodigoTarjeta,
                                                             Descripcion, IBAN, Saldo, FechaPago,PagoMinimo,PagoContado,Estado
                                                             FROM   Cuenta_Credito
                                                             WHERE Codigo = @Codigo", sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", id);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        cuenta_credito.Codigo = sqlDataReader.GetInt32(0);
                        cuenta_credito.CodigoUsuario = sqlDataReader.GetInt32(1);
                        cuenta_credito.CodigoMoneda = sqlDataReader.GetInt32(2);
                        cuenta_credito.CodigoTarjeta = sqlDataReader.GetInt32(3);

                        cuenta_credito.Descripcion = sqlDataReader.GetString(4);
                        cuenta_credito.IBAN = sqlDataReader.GetString(5);
                        cuenta_credito.Saldo = sqlDataReader.GetDecimal(6);
                        cuenta_credito.FechaPago = sqlDataReader.GetDateTime(7);
                        cuenta_credito.PagoMinimo = sqlDataReader.GetDecimal(8);
                        cuenta_credito.PagoContado = sqlDataReader.GetDecimal(9);

                        cuenta_credito.Estado = sqlDataReader.GetString(10);
                    }

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(cuenta_credito);
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            List<Cuenta_Credito> cuentas_credito = new List<Cuenta_Credito>();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, CodigoMoneda,CodigoTarjeta,
                                                            Descripcion, IBAN, Saldo, FechaPago,PagoMinimo,PagoContado,Estado
                                                             FROM   Cuenta_Credito"
                                                            , sqlConnection);
                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Cuenta_Credito cuenta_credito = new Cuenta_Credito();

                        cuenta_credito.Codigo = sqlDataReader.GetInt32(0);
                        cuenta_credito.CodigoUsuario = sqlDataReader.GetInt32(1);
                        cuenta_credito.CodigoMoneda = sqlDataReader.GetInt32(2);
                        cuenta_credito.CodigoTarjeta = sqlDataReader.GetInt32(3);

                        cuenta_credito.Descripcion = sqlDataReader.GetString(4);
                        cuenta_credito.IBAN = sqlDataReader.GetString(5);
                        cuenta_credito.Saldo = sqlDataReader.GetDecimal(6);
                        cuenta_credito.FechaPago = sqlDataReader.GetDateTime(7);
                        cuenta_credito.PagoMinimo = sqlDataReader.GetDecimal(8);
                        cuenta_credito.PagoContado = sqlDataReader.GetDecimal(9);

                        cuenta_credito.Estado = sqlDataReader.GetString(10);

                        cuentas_credito.Add(cuenta_credito);
                    }
                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return Ok(cuentas_credito);
        }


        [HttpPost]
        public IHttpActionResult Ingresar(Cuenta_Credito cuenta_credito)
        {
            if (cuenta_credito == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand =
                        new SqlCommand(@" INSERT INTO Cuenta_Credito (CodigoUsuario, CodigoMoneda,CodigoTarjeta,Descripcion, 
                                                                IBAN, Saldo,FechaPago,PagoMinimo,PagoContado ,Estado) 
                                         VALUES (@CodigoUsuario, @CodigoMoneda,@CodigoTarjeta,@Descripcion, @IBAN, @Saldo,@FechaPago,@PagoMinimo,@PagoContado, @Estado)",
                                         sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", cuenta_credito.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@CodigoMoneda", cuenta_credito.CodigoMoneda);
                    sqlCommand.Parameters.AddWithValue("@CodigoTarjeta", cuenta_credito.CodigoTarjeta);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", cuenta_credito.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@IBAN", cuenta_credito.IBAN);
                    sqlCommand.Parameters.AddWithValue("@Saldo", cuenta_credito.Saldo);



                    sqlCommand.Parameters.AddWithValue("@FechaPago", cuenta_credito.FechaPago);
                    sqlCommand.Parameters.AddWithValue("@PagoMinimo", cuenta_credito.PagoMinimo);
                    sqlCommand.Parameters.AddWithValue("@PagoContado", cuenta_credito.PagoContado);
                    sqlCommand.Parameters.AddWithValue("@Estado", cuenta_credito.Estado);

                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(cuenta_credito);
        }

        [HttpPut]
        public IHttpActionResult Actualizar(Cuenta_Credito cuenta_credito)
        {
            if (cuenta_credito == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand =
                        new SqlCommand(@" UPDATE Cuenta_Credito
                                                        SET CodigoUsuario = @CodigoUsuario, 
                                                            CodigoMoneda = @CodigoMoneda,
CodigoTarjeta=@CodigoTarjeta,
                                                            Descripcion = @Descripcion, 
                                                            IBAN = @IBAN, 
                                                            Saldo = @Saldo, 
                                                            FechaPago = @FechaPago, 
                                                            PagoMinimo = @PagoMinimo, 
                                                            PagoContado = @PagoContado,
                                                            Estado = @Estado 
                                          WHERE Codigo = @Codigo",
                                         sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", cuenta_credito.Codigo);
                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", cuenta_credito.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@CodigoMoneda", cuenta_credito.CodigoMoneda);
                    sqlCommand.Parameters.AddWithValue("@CodigoTarjeta", cuenta_credito.CodigoTarjeta);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", cuenta_credito.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@IBAN", cuenta_credito.IBAN);
                    sqlCommand.Parameters.AddWithValue("@Saldo", cuenta_credito.Saldo);



                    sqlCommand.Parameters.AddWithValue("@FechaPago", cuenta_credito.FechaPago);
                    sqlCommand.Parameters.AddWithValue("@PagoMinimo", cuenta_credito.PagoMinimo);
                    sqlCommand.Parameters.AddWithValue("@PagoContado", cuenta_credito.PagoContado);
                    sqlCommand.Parameters.AddWithValue("@Estado", cuenta_credito.Estado);


                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(cuenta_credito);
        }

        [HttpDelete]
        public IHttpActionResult Eliminar(int id)
        {
            if (id < 1)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand =
                        new SqlCommand(@" DELETE Cuenta_Credito WHERE Codigo = @Codigo",
                                         sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", id);

                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(id);
        }
    }
}