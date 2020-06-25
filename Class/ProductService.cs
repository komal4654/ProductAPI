using Microsoft.EntityFrameworkCore;
using ProductAPIDemo.Data;
using ProductAPIDemo.Interfaces;
using ProductAPIDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPIDemo.Class
{
    public class ProductService : IproductService
    {
        public List<Product> _products;
        DataContext _entities;

        public ProductService(DataContext db)
        {
            _entities = db;
        }

        public List<Product> GetProductList()
        {
            _products = (from p in _entities.Product select p).ToList();
            return _products;
        }

        public async Task<Product> GetProductListByID(int? id)
        {
            var products=await _entities.Product.Where(x => x.ID == id).Select(y => y).FirstOrDefaultAsync();
            return products;
        }

        
        public async Task<int> AddProduct(Product objProduct)
        {
            try
            {
                if (_entities != null)
                {
                    await _entities.Product.AddAsync(objProduct);
                    await _entities.SaveChangesAsync();
                    return objProduct.ID;
                }
                return 0;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateProduct(Product objProduct)
        {
            try
            {
                int result = 0;
                if (_entities != null)
                {
                    _entities.Product.Update(objProduct);
                   result= await _entities.SaveChangesAsync();
                    return result;
                }
                return result;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteProduct(int? id)
        {
            int result = 0;
            if (_entities != null)
            {
                try
                {
                    var productListing = await _entities.Product.FirstOrDefaultAsync(x => x.ID == id);
                    if (productListing != null)
                    {
                        _entities.Product.Remove(productListing);
                        result=await _entities.SaveChangesAsync();
                    }
                    return result;
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
            return result;
        }
        public List<Product> SearchProduct(string filter)
        {
            var listing = new List<Product>();
            if (_entities != null)
            {
                try
                {
                    listing = (from p in _entities.Product
                                   join q in _entities.ProductCategory
                                   on p.ProductCategoryID equals q.ID into g
                               from gdataAll in g.DefaultIfEmpty()
                               where p.ProductName.Contains(filter) || gdataAll.CategoryName.Contains(filter)
                               select p).ToList();
                    return listing;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return listing;
        }
    }
}
