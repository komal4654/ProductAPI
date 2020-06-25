using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPIDemo.Model
{
    public class ProductCategory
    {
        [Key]
        public int ID { get; set; }
        public string CategoryName { get; set; }
        public bool? Active { get; set; }
        public string Description { get; set; }

    }
}
