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
    [RoutePrefix("api/Cuenta_Debito")]
    [EnableCors(origins: "http://localhost:3000, https://api-internet-banking.azurewebsites.net", headers: "*", methods: "*")]
    public class Cuenta_DebitoController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetId(int id)
        {
            Cuenta_Debito cuenta_debito = new Cuenta_Debito();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, CodigoMoneda,CodigoTarjeta,
                                                             Descripcion, IBAN, Saldo, Estado
                                                             FROM   Cuenta_Debito
                                                             WHERE Codigo = @Codigo", sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", id);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        cuenta_debito.Codigo = sqlDataReader.GetInt32(0);
                        cuenta_debito.CodigoUsuario = sqlDataReader.GetInt32(1);
                        cuenta_debito.CodigoMoneda = sqlDataReader.GetInt32(2);
                        cuenta_debito.CodigoTarjeta = sqlDataReader.GetInt32(3);
                        cuenta_debito.Descripcion = sqlDataReader.GetString(4);
                        cuenta_debito.IBAN = sqlDataReader.GetString(5);
                        cuenta_debito.Saldo = sqlDataReader.GetDecimal(6);
                        cuenta_debito.Estado = sqlDataReader.GetString(7);
                    }

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(cuenta_debito);
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            List<Cuenta_Debito> cuentas_debito = new List<Cuenta_Debito>();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, CodigoMoneda,CodigoTarjeta,
                                                             Descripcion, IBAN, Saldo, Estado
                                                             FROM   Cuenta_Debito", sqlConnection);
                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Cuenta_Debito cuenta_debito = new Cuenta_Debito();

                        cuenta_debito.Codigo = sqlDataReader.GetInt32(0);
                        cuenta_debito.CodigoUsuario = sqlDataReader.GetInt32(1);
                        cuenta_debito.CodigoMoneda = sqlDataReader.GetInt32(2);
                        cuenta_debito.CodigoTarjeta = sqlDataReader.GetInt32(3);
                        cuenta_debito.Descripcion = sqlDataReader.GetString(4);
                        cuenta_debito.IBAN = sqlDataReader.GetString(5);
                        cuenta_debito.Saldo = sqlDataReader.GetDecimal(6);
                        cuenta_debito.Estado = sqlDataReader.GetString(7);

                        cuentas_debito.Add(cuenta_debito);
                    }
                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return Ok(cuentas_debito);
        }


        [HttpPost]
        public IHttpActionResult Ingresar(Cuenta_Debito cuenta_debito)
        {
            if (cuenta_debito == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand =
                        new SqlCommand(@" INSERT INTO Cuenta_Debito (CodigoUsuario, CodigoMoneda,CodigoTarjeta, Descripcion, 
                                                                IBAN, Saldo, Estado) 
                                         VALUES (@CodigoUsuario, @CodigoMoneda,@CodigoTarjeta, @Descripcion, @IBAN, @Saldo, @Estado)",
                                         sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", cuenta_debito.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@CodigoMoneda", cuenta_debito.CodigoMoneda);
                    sqlCommand.Parameters.AddWithValue("@CodigoTarjeta", cuenta_debito.CodigoTarjeta);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", cuenta_debito.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@IBAN", cuenta_debito.IBAN);
                    sqlCommand.Parameters.AddWithValue("@Saldo", cuenta_debito.Saldo);
                    sqlCommand.Parameters.AddWithValue("@Estado", cuenta_debito.Estado);

                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(cuenta_debito);
        }

        [HttpPut]
        public IHttpActionResult Actualizar(Cuenta_Debito cuenta_debito)
        {
            if (cuenta_debito == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand =
                        new SqlCommand(@" UPDATE Cuenta_Debito
                                                        SET CodigoUsuario = @CodigoUsuario, 
                                                            CodigoMoneda = @CodigoMoneda,
CodigoTarjeta = @CodigoTarjeta ,
                                                            Descripcion = @Descripcion, 
                                                            IBAN = @IBAN, 
                                                            Saldo = @Saldo, 
                                                            Estado = @Estado 
                                          WHERE Codigo = @Codigo",
                                         sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", cuenta_debito.Codigo);
                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", cuenta_debito.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@CodigoMoneda", cuenta_debito.CodigoMoneda);
                    sqlCommand.Parameters.AddWithValue("@CodigoTarjeta", cuenta_debito.CodigoTarjeta);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", cuenta_debito.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@IBAN", cuenta_debito.IBAN);
                    sqlCommand.Parameters.AddWithValue("@Saldo", cuenta_debito.Saldo);
                    sqlCommand.Parameters.AddWithValue("@Estado", cuenta_debito.Estado);

                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(cuenta_debito);
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
                        new SqlCommand(@" DELETE Cuenta_Debito WHERE Codigo = @Codigo",
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