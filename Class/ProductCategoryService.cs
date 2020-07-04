using Microsoft.AspNetCore.Mvc;
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
    public class ProductCategoryService : IproductCategory
    {

            public List<ProductCategory> _products;
            DataContext _entities;

            public ProductCategoryService(DataContext db)
            {
                _entities = db;
            }
        public async Task<ProductCategory> GetProductCategoryListByID(int? id)
        {
            var products = (from p in _entities.ProductCategory
                            where p.ID == id
                            select new ProductCategory
                            {
                                ID = p.ID,
                                CategoryName = p.CategoryName,
                                Description = p.Description,
                                Active = p.Active,
                            }).FirstOrDefaultAsync();
            var prodListing = await products;
            return prodListing;
        }

        public List<ProductCategory> GetProductCatList()
            {
                _products = (from p in _entities.ProductCategory select p).ToList();
                return _products;
            }
            public async Task<int> AddProductCat(ProductCategory objProductCat)
            {
                try
                {
                    if (_entities != null)
                    {
                        await _entities.ProductCategory.AddAsync(objProductCat);
                        await _entities.SaveChangesAsync();
                        return objProductCat.ID;
                    }
                    return 0;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public async Task<int> UpdateProductCat(int id, ProductCategory objProductCat)
            {
                try
                {
                    int result = 0;
                    if (_entities != null)
                    {
                        _entities.ProductCategory.Update(objProductCat);
                        result = await _entities.SaveChangesAsync();
                        return result;
                    }
                    return result;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            public async Task<int> DeleteProductCat(int? id)
            {
                int result = 0;
                if (_entities != null)
                {
                    try
                    {
                        var productCatListing = await _entities.ProductCategory.FirstOrDefaultAsync(x => x.ID == id);
                        if (productCatListing != null)
                        {
                        var productListing = (from p in _entities.ProductCategoryMapping where p.CategoryID == id select p).Count();
                        if (productListing == 0)
                        {
                            _entities.ProductCategory.Remove(productCatListing);
                            result = await _entities.SaveChangesAsync();
                        }
                        }
                        return result;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
                return result;
            }
        public List<ProductCategory> SearchProductCategory(string filter)
        {
            var listing = new List<ProductCategory>();
            if (_entities != null)
            {
                try
                {
                    listing = (from p in _entities.ProductCategory
                               where p.CategoryName.ToLower().Contains(filter.ToLower())
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

