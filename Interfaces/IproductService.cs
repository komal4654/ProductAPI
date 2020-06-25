using ProductAPIDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPIDemo.Interfaces
{
   public interface IproductService
    {
        public List<Product> GetProductList();

        Task<int> AddProduct(Product objProduct);

        Task<Product> GetProductListByID(int? id);

        Task<int> UpdateProduct(Product objProduct);

        Task<int> DeleteProduct(int? id);

        public List<Product> SearchProduct(string filter);
    }
}
