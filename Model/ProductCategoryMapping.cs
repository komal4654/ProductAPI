using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPIDemo.Model
{
    public class ProductCategoryMapping
    {
        [Key]
        public int CategoryMappingID { get; set; }

        public int? ProductID { get; set; }

        public int CategoryID { get; set; }
    }
}
