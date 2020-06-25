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
                            _entities.ProductCategory.Remove(productCatListing);
                            result = await _entities.SaveChangesAsync();
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
        public List<ProductCategory> SearchProductCat(string filter)
        {
            var listing = new List<ProductCategory>();
            if (_entities != null)
            {
                try
                {
                    listing = (from p in _entities.ProductCategory
                               where p.CategoryName.Contains(filter)
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

