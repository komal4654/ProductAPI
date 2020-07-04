using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using ProductAPIDemo.Data;
using ProductAPIDemo.Interfaces;
using ProductAPIDemo.Model;

namespace ProductAPIDemo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        DataContext _entities;
        private IproductService _service;

        public ProductController(DataContext dc, IproductService productService)
        {
            _entities = dc;
            _service = productService;
        }

        [HttpGet("GetProductListing")]
        public IQueryable<Product> GetProductListing()
        {
            try
            {
                var productListing = new List<Product>();
                //if (string.IsNullOrEmpty(filter))
                //{
                    productListing = _service.GetProductList();
                    if (productListing == null)
                    {
                        // return NotFound();
                    }
                //}
                //else
                //{
                //    productListing = _service.SearchProduct(filter);

                //}
                return productListing.AsQueryable();
                // return Ok(productListing);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //[HttpGet("GetProductListing")]
        //public ActionResult<List<Product>>GetProductListing()
        //{
        //    try
        //    {
        //        var productListing= _service.GetProductList();
        //        if(productListing == null)
        //        {
        //            return NotFound();
        //        }
        //        return Ok(productListing);
        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
        //}


        [HttpPost]
        [Route("AddProducts")]
        public async Task<IActionResult> AddProducts(Product data)
        {
            try
            {
                var addProduct = await _service.AddProduct(data);
                if (addProduct == 0)
                {
                    return NotFound();
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpGet("GetProductListById/{id}")]
        public async Task<IActionResult> GetProductListById(int? id)
        {
            try
            {
                if (id == null)
                {
                    return NotFound();
                }
                else
                {
                    var productListing = await _service.GetProductListByID(id);
                    productListing.Category = GetProductCategory();
                    return Ok(productListing);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // [HttpPost("UpdateProducts")]
        [HttpPost]
        [Route("UpdateProducts")]
        public async Task<IActionResult> UpdateProduct(Product data)
        {
            try
            {
                if (data.ID == 0)
                {
                    return BadRequest();
                }
                var updateProduct = await _service.UpdateProduct(data);
                if (updateProduct == 0)
                {
                    return NotFound();
                }
                return Ok(data);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost("DeleteProducts/{id}")]
        public async Task<ActionResult> DeleteProduct(int? id)
        {
            int result = 0;
            try
            {
                result = await _service.DeleteProduct(id);
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


        //[HttpGet("SearchProduct/{filter}")]
        //public ActionResult<List<Product>> SearchProduct(string filter)
        //{
        //    var query = new List<Product>();
        //    try
        //    {
        //        query = _service.SearchProduct(filter);
        //        if (query == null || query.Count==0)
        //        {
        //            return Ok();
        //        }
        //        return Ok(query);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        [HttpPost]
        [Route("SearchProduct")]
        public IQueryable<Product> SearchProduct([FromBody]Product data)
        {
            var query = new List<Product>();
            try
            {
                query = _service.SearchProduct(data.ProductName);
               return query.AsQueryable();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [HttpGet]
        [Route("GetProductCategory")]
        public List<ProductCategory> GetProductCategory()
        {
            var query = (from p in _entities.ProductCategory
                         select new ProductCategory
                         {
                             ID=p.ID,
                             CategoryName=p.CategoryName
                         }).ToList();
            return query;
        }
    }
}
