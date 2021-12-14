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
    [RoutePrefix("api/Pago")]
    [EnableCors(origins: "http://localhost:3000, https://api-internet-banking.azurewebsites.net", headers: "*", methods: "*")]
    public class PagoController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetId(int id)
        {
            Pago pago = new Pago();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, CodigoServicio, CodigoTarjeta, Descripcion,
                                                            Fechahora, Monto
                                                            FROM Pago WHERE Codigo = @Codigo", sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", id);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        pago.Codigo = sqlDataReader.GetInt32(0);
                        pago.CodigoUsuario = sqlDataReader.GetInt32(1);
                        pago.CodigoServicio = sqlDataReader.GetInt32(2);
                        pago.CodigoTarjeta = sqlDataReader.GetInt32(3);
                        pago.Descripcion = sqlDataReader.GetString(4);
                        pago.Fechahora = sqlDataReader.GetDateTime(5);
                        pago.Monto = sqlDataReader.GetDecimal(6);
                    }

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return Ok(pago);
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            List<Pago> pagos = new List<Pago>();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, CodigoServicio, CodigoTarjeta, Descripcion,
                                                            Fechahora, Monto 
                                                            FROM Pago", sqlConnection);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Pago pago = new Pago();
                        pago.Codigo = sqlDataReader.GetInt32(0);
                        pago.CodigoUsuario = sqlDataReader.GetInt32(1);
                        pago.CodigoServicio = sqlDataReader.GetInt32(2);
                        pago.CodigoTarjeta = sqlDataReader.GetInt32(3);
                        pago.Descripcion = sqlDataReader.GetString(4);
                        pago.Fechahora = sqlDataReader.GetDateTime(5);
                        pago.Monto = sqlDataReader.GetDecimal(6);

                        pagos.Add(pago);
                    }

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return Ok(pagos);
        }

        [HttpPost]
        public IHttpActionResult Ingresar(Pago pago)
        {
            if (pago == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"INSERT INTO Pago (CodigoUsuario, CodigoServicio, CodigoTarjeta, Descripcion,
                                                            Fechahora, Monto) VALUES
                                                            (@CodigoUsuario, @CodigoServicio, @CodigoTarjeta, @Descripcion,
                                                            @Fechahora, @Monto)", sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", pago.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@CodigoServicio", pago.CodigoServicio);
                    sqlCommand.Parameters.AddWithValue("@CodigoTarjeta", pago.CodigoTarjeta);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", pago.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@Fechahora", pago.Fechahora);
                    sqlCommand.Parameters.AddWithValue("@Monto", pago.Monto);

                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return Ok(pago);
        }

        [HttpPut]
        public IHttpActionResult Actualizar(Pago pago)
        {
            if (pago == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"UPDATE Pago SET CodigoUsuario = @CodigoUsuario,
                                                                               CodigoServicio = @CodigoServicio,
                                                                               CodigoTarjeta = @CodigoTarjeta,
                                                                               Descripcion = @Descripcion,
                                                                               Fechahora = @Fechahora, 
                                                                               Monto = @Monto
                                                                               WHERE Codigo = @Codigo", sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", pago.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@CodigoServicio", pago.CodigoServicio);
                    sqlCommand.Parameters.AddWithValue("@CodigoTarjeta", pago.CodigoTarjeta);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", pago.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@Fechahora", pago.Fechahora);
                    sqlCommand.Parameters.AddWithValue("@Monto", pago.Monto);

                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
            return Ok(pago);
        }

        [HttpDelete]
        public IHttpActionResult Eliminar(int id)
        {
            if (id < 1)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"DELETE Pago WHERE Codigo = @Codigo", sqlConnection);

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
