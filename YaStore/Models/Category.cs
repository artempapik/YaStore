using System.Collections.Generic;

namespace YaStore.Models
{
	public class Category
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public CategoryType Type { get; set; }

		public List<CategoryProduct> CategoryProducts { get; set; } = new List<CategoryProduct>();
	}
}