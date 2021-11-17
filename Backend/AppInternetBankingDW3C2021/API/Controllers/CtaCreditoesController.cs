using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using API.Models;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [Authorize]
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class CtaCreditoesController : ApiController
    {
        private INTERNET_BANKING_DW1_3C2021Entities db = new INTERNET_BANKING_DW1_3C2021Entities();

        // GET: api/CtaCreditoes
        public IQueryable<CtaCredito> GetCtaCredito()
        {
            return db.CtaCredito;
        }

        // GET: api/CtaCreditoes/5
        [ResponseType(typeof(CtaCredito))]
        public IHttpActionResult GetCtaCredito(int id)
        {
            CtaCredito ctaCredito = db.CtaCredito.Find(id);
            if (ctaCredito == null)
            {
                return NotFound();
            }

            return Ok(ctaCredito);
        }

        // PUT: api/CtaCreditoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCtaCredito(int id, CtaCredito ctaCredito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ctaCredito.Codigo)
            {
                return BadRequest();
            }

            db.Entry(ctaCredito).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CtaCreditoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/CtaCreditoes
        [ResponseType(typeof(CtaCredito))]
        public IHttpActionResult PostCtaCredito(CtaCredito ctaCredito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CtaCredito.Add(ctaCredito);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ctaCredito.Codigo }, ctaCredito);
        }

        // DELETE: api/CtaCreditoes/5
        [ResponseType(typeof(CtaCredito))]
        public IHttpActionResult DeleteCtaCredito(int id)
        {
            CtaCredito ctaCredito = db.CtaCredito.Find(id);
            if (ctaCredito == null)
            {
                return NotFound();
            }

            db.CtaCredito.Remove(ctaCredito);
            db.SaveChanges();

            return Ok(ctaCredito);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CtaCreditoExists(int id)
        {
            return db.CtaCredito.Count(e => e.Codigo == id) > 0;
        }
    }
}