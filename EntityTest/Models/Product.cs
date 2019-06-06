using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace EntityTest
{
	public class Product
	{
		public int Id { get; set; }

		public decimal Price { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public bool Availability { get; set; }

		public int CategoryId { get; set; }

		[NotMapped]
		public int[] Ids { get; set; }

		public List<CategoryProduct> CategoryProducts { get; set; } = new List<CategoryProduct>();
	}
}