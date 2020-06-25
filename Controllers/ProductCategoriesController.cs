using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPIDemo.Data;
using ProductAPIDemo.Interfaces;
using ProductAPIDemo.Model;

namespace ProductAPIDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProductCategoriesController : ControllerBase
    {
        DataContext _context;
        private IproductCategory _service;

        public ProductCategoriesController(DataContext dc, IproductCategory productCategoryService)
        {
            _context = dc;
            _service = productCategoryService;
        }


        [HttpGet("GetProductCategoryListing")]
        public IQueryable<ProductCategory> GetProductCategoryListing()
        {
            try
            {
                var productcatListing = _service.GetProductCatList();
                if (productcatListing == null)
                {
                    return null;
                }
                return productcatListing.AsQueryable();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        [HttpGet("GetProductCategoryListById/{id}")]
        public async Task<ActionResult<ProductCategory>> GetProductCategoryListById(int? id)
        {
            var productCategory = await _context.ProductCategory.FindAsync(id);
            if (productCategory == null)
            {
                return NotFound();
            }
            return productCategory;
        }


        [HttpPost]
        [Route("UpdateProductCategory")]
        public async Task<IActionResult> UpdateProductCategory(ProductCategory productCategory)
        {
            if (productCategory.ID==0)
            {
                return BadRequest();
            }

            _context.Entry(productCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCategoryExists(productCategory.ID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

     
        [HttpPost]
        [Route("AddProductCategory")]
        public async Task<ActionResult<ProductCategory>> AddProductCategory(ProductCategory productCategory)
        {
            _context.ProductCategory.Add(productCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductCategory", new { id = productCategory.ID }, productCategory);
        }

        [HttpPost("DeleteProductsCategory/{id}")]
        public async Task<ActionResult> DeleteProductsCategory(int? id)
        {
            int result = 0;
            try
            {
                result = await _service.DeleteProductCat(id);
                if (result == 0)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private bool ProductCategoryExists(int id)
        {
            return _context.ProductCategory.Any(e => e.ID == id);
        }
    }
}
