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
            var Listing = (from s in _entities.ProductCategoryMapping
                           select new ProductCategoryMapping { CategoryID = s.CategoryID,ProductID=s.ProductID });
            _products = (from p in _entities.Product
                         select new Product
                         {
                             ProductName = p.ProductName,
                             ID = p.ID,
                             Description = p.Description,
                             Cost = p.Cost,
                             Active = p.Active,

                             Categories = string.Join(",",(from q in _entities.ProductCategory
                                           join l in Listing on q.ID equals l.CategoryID
                                           where l.ProductID==p.ID
                                           select q.CategoryName).ToList()),
                             strCategory = (Listing.Where(x => x.ProductID == p.ID).Select(y => new ProductCategoryMapping { CategoryID = y.CategoryID })).ToList()
                         }).ToList();
            return _products;
        }

        public async Task<Product> GetProductListByID(int? id)
        {
            var Listing = (from s in _entities.ProductCategoryMapping select new ProductCategoryMapping { CategoryID = s.CategoryID, ProductID = s.ProductID });
            var products = (from p in _entities.Product
                            where p.ID == id
                            select new Product
                            {
                                ID = p.ID,
                                ProductName = p.ProductName,
                                Description = p.Description,
                                Cost = p.Cost,
                                Active = p.Active,
                                strCategory = (Listing.Where(x => x.ProductID == p.ID).Select(y => new ProductCategoryMapping { CategoryID = y.CategoryID })).ToList()
                            }).FirstOrDefaultAsync();
            var prodListing = await products;
            return prodListing;
        }

        
        public async Task<int> AddProduct(Product objProduct)
        {
            try
            {
                if (_entities != null)
                {
                    Product prod = new Product();
                    prod.ProductName = objProduct.ProductName;
                    prod.Description = objProduct.Description;
                    prod.Cost= objProduct.Cost;
                    prod.Active = objProduct.Active;
                    prod.ProductCategoryMapping = new List<ProductCategoryMapping>();
                    foreach(var item in objProduct.strCategory)
                    {
                        ProductCategoryMapping obj = new ProductCategoryMapping();
                        obj.CategoryID = item.CategoryID;
                        obj.ProductID = prod.ID;
                        prod.ProductCategoryMapping.Add(obj);
                    }
                    _entities.Product.Add(prod);
                    await _entities.SaveChangesAsync();
                    return prod.ID;
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
                    var deleteMapping = (from p in _entities.ProductCategoryMapping where p.ProductID == objProduct.ID select p);

                    foreach(var item in deleteMapping)
                    {
                        _entities.ProductCategoryMapping.Remove(item);
                    }
                    foreach (var item in objProduct.strCategory)
                    {
                        ProductCategoryMapping obj = new ProductCategoryMapping();
                        obj.CategoryID = item.CategoryID;
                        obj.ProductID = objProduct.ID;
                       _entities.ProductCategoryMapping.Add(obj);
                    }
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
                        var isMappingExists = (from s in _entities.ProductCategoryMapping where s.ProductID == id select s);
                        foreach(var item in isMappingExists)
                        {
                            _entities.ProductCategoryMapping.Remove(item);
                        }
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
                    var Listing = (from s in _entities.ProductCategoryMapping
                                   select new ProductCategoryMapping { CategoryID = s.CategoryID, ProductID = s.ProductID });
                    listing = (from p in _entities.Product
                               join q in _entities.ProductCategoryMapping
                               on p.ID equals q.ProductID
                               join s in _entities.ProductCategory
                               on q.CategoryID equals s.ID
                               where p.ProductName.ToLower().Contains(filter.ToLower()) || s.CategoryName.ToLower().Contains(filter.ToLower())
                               select new Product
                               {
                                   ProductName = p.ProductName,
                                   ID = p.ID,
                                   Description = p.Description,
                                   Cost = p.Cost,
                                   Active = p.Active,
                                   Categories = string.Join(",", (from q in _entities.ProductCategory
                                                                  join l in Listing on q.ID equals l.CategoryID
                                                                  where l.ProductID == p.ID
                                                                  select q.CategoryName).ToList()),
                                   strCategory = (Listing.Where(x => x.ProductID == p.ID).Select(y => new ProductCategoryMapping { CategoryID = y.CategoryID })).ToList()

                               }).ToList();
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
