using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPIDemo.Model
{
    public class Product
    {
        [Key]
        public int ID { get; set; }
        public string ProductName { get; set; }
        
        [NotMapped]
        public List<ProductCategory> Category { get; set; }

        public int? ProductCategoryID { get; set; }

        [NotMapped]
        public List<ProductCategoryMapping> strCategory { get; set; }

        [NotMapped]
        public SelectList selectCategory { get; set; }

        public double Cost { get; set; }

        public bool? Active { get; set; }

        public string Description { get; set; }
    }
}
