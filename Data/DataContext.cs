using Microsoft.EntityFrameworkCore;
using ProductAPIDemo.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPIDemo.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }
        public DbSet<Product> Product{get;set;}

        public DbSet<ProductCategory> ProductCategory { get; set; }

        public DbSet<ProductCategoryMapping> ProductCategoryMapping { get; set; }

    }
}
