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
    public class CtaDebitoesController : ApiController
    {
        private INTERNET_BANKING_DW1_3C2021Entities db = new INTERNET_BANKING_DW1_3C2021Entities();

        // GET: api/CtaDebitoes
        public IQueryable<CtaDebito> GetCtaDebito()
        {
            return db.CtaDebito;
        }

        // GET: api/CtaDebitoes/5
        [ResponseType(typeof(CtaDebito))]
        public IHttpActionResult GetCtaDebito(int id)
        {
            CtaDebito ctaDebito = db.CtaDebito.Find(id);
            if (ctaDebito == null)
            {
                return NotFound();
            }

            return Ok(ctaDebito);
        }

        // PUT: api/CtaDebitoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCtaDebito(int id, CtaDebito ctaDebito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ctaDebito.Codigo)
            {
                return BadRequest();
            }

            db.Entry(ctaDebito).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CtaDebitoExists(id))
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

        // POST: api/CtaDebitoes
        [ResponseType(typeof(CtaDebito))]
        public IHttpActionResult PostCtaDebito(CtaDebito ctaDebito)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CtaDebito.Add(ctaDebito);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = ctaDebito.Codigo }, ctaDebito);
        }

        // DELETE: api/CtaDebitoes/5
        [ResponseType(typeof(CtaDebito))]
        public IHttpActionResult DeleteCtaDebito(int id)
        {
            CtaDebito ctaDebito = db.CtaDebito.Find(id);
            if (ctaDebito == null)
            {
                return NotFound();
            }

            db.CtaDebito.Remove(ctaDebito);
            db.SaveChanges();

            return Ok(ctaDebito);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CtaDebitoExists(int id)
        {
            return db.CtaDebito.Count(e => e.Codigo == id) > 0;
        }
    }
}