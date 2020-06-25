using ProductAPIDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPIDemo.Interfaces
{
   public interface IproductCategory
    {
        public List<ProductCategory> GetProductCatList();

        Task<int> AddProductCat(ProductCategory objProductCat);

        Task<int> UpdateProductCat(int id, ProductCategory objProductCat);

        Task<int> DeleteProductCat(int? id);
    }
}
