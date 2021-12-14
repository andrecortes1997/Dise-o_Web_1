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
    [RoutePrefix("api/Tarjeta")]
    [EnableCors(origins: "http://localhost:3000, https://api-internet-banking.azurewebsites.net", headers: "*", methods: "*")]
    public class TarjetaController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetId(int id)
        {
            Tarjeta tarjeta = new Tarjeta();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, Descripcion, 
                                                             Numero, CVC, FechaVencimiento, Estado
                                                             FROM   Tarjeta
                                                             WHERE Codigo = @Codigo", sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", id);

                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        tarjeta.Codigo = sqlDataReader.GetInt32(0);
                        tarjeta.CodigoUsuario = sqlDataReader.GetInt32(1);
                        tarjeta.Descripcion = sqlDataReader.GetString(2);
                        tarjeta.Numero = sqlDataReader.GetString(3);
                        tarjeta.CVC = sqlDataReader.GetString(4);
                        tarjeta.FechaVencimiento = sqlDataReader.GetDateTime(5);
                        tarjeta.Estado = sqlDataReader.GetString(6);
                    }

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(tarjeta);
        }

        [HttpGet]
        public IHttpActionResult GetAll()
        {
            List<Tarjeta> tarjetas = new List<Tarjeta>();
            try
            {
                using (SqlConnection sqlConnection = new
                    SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand = new SqlCommand(@"SELECT Codigo, CodigoUsuario, Descripcion,  Numero, 
                                                                CVC, FechaVencimiento, Estado
                                                             FROM   Tarjeta", sqlConnection);
                    sqlConnection.Open();

                    SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

                    while (sqlDataReader.Read())
                    {
                        Tarjeta tarjeta = new Tarjeta();

                        tarjeta.Codigo = sqlDataReader.GetInt32(0);
                        tarjeta.CodigoUsuario = sqlDataReader.GetInt32(1);
                        tarjeta.Descripcion = sqlDataReader.GetString(2);
                        tarjeta.Numero = sqlDataReader.GetString(3);
                        tarjeta.CVC = sqlDataReader.GetString(4);
                        tarjeta.FechaVencimiento = sqlDataReader.GetDateTime(5);
                        tarjeta.Estado = sqlDataReader.GetString(6);

                        tarjetas.Add(tarjeta);
                    }
                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return Ok(tarjetas);
        }


        [HttpPost]
        public IHttpActionResult Ingresar(Tarjeta tarjeta)
        {
            if (tarjeta == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand =
                        new SqlCommand(@" INSERT INTO Tarjeta (CodigoUsuario, Descripcion,  Numero, 
                                                                CVC, FechaVencimiento, Estado) 
                                         VALUES (@CodigoUsuario, @Descripcion, @Numero, @CVC, @FechaVencimiento, @Estado)",
                                         sqlConnection);


                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", tarjeta.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", tarjeta.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@Numero", tarjeta.Numero);
                    sqlCommand.Parameters.AddWithValue("@CVC", tarjeta.CVC);
                    sqlCommand.Parameters.AddWithValue("@FechaVencimiento", tarjeta.FechaVencimiento);
                    sqlCommand.Parameters.AddWithValue("@Estado", tarjeta.Estado);

                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(tarjeta);
        }

        [HttpPut]
        public IHttpActionResult Actualizar(Tarjeta tarjeta)
        {
            if (tarjeta == null)
                return BadRequest();

            try
            {
                using (SqlConnection sqlConnection =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["INTERNET_BANKING"].ConnectionString))
                {
                    SqlCommand sqlCommand =
                        new SqlCommand(@" UPDATE Tarjeta SET CodigoUsuario = @CodigoUsuario,
                                                            Descripcion = @Descripcion, 
                                                            Numero= @Numero, 
                                                            CVC = @CVC, 
                                                            FechaVencimiento = @FechaVencimiento, 
                                                            Estado = @Estado 
                                          WHERE Codigo = @Codigo",
                                         sqlConnection);

                    sqlCommand.Parameters.AddWithValue("@Codigo", tarjeta.Codigo);
                    sqlCommand.Parameters.AddWithValue("@CodigoUsuario", tarjeta.CodigoUsuario);
                    sqlCommand.Parameters.AddWithValue("@Descripcion", tarjeta.Descripcion);
                    sqlCommand.Parameters.AddWithValue("@Numero", tarjeta.Numero);
                    sqlCommand.Parameters.AddWithValue("@CVC", tarjeta.CVC);
                    sqlCommand.Parameters.AddWithValue("@FechaVencimiento", tarjeta.FechaVencimiento);
                    sqlCommand.Parameters.AddWithValue("@Estado", tarjeta.Estado);


                    sqlConnection.Open();

                    int filasAfectadas = sqlCommand.ExecuteNonQuery();

                    sqlConnection.Close();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok(tarjeta);
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
                        new SqlCommand(@" DELETE Tarjeta WHERE Codigo = @Codigo",
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