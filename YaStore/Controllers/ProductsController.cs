using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using YaStore.Models;
using System.Linq;

namespace YaStore.Controllers
{
	[Route("api/products")]
	public class ProductsController : Controller
	{
		public ProductsController() { }

		[HttpPut]
		public IActionResult Put([FromBody]Product product)
		{
			using (var db = new ApplicationContext())
			{
				foreach (var p in db.Products.ToList())
				{
					if (p.Id == product.Id)
					{
						p.Price = product.Price;
						p.Name = product.Name;
						p.Description = product.Description;
						p.Availability = product.Availability;
						db.SaveChanges();
						return Ok(product);
					}
				}
			}
			return default;
		}

		//[HttpGet("{id}")]
		//public IEnumerable<Product> Get(int id)
		//{
		//	using (var db = new ApplicationContext())
		//	{
		//		var categoryProducts = db.Categories
		//			.Include(n => n.CategoryProducts)
		//			.SelectMany(n => n.CategoryProducts);

		//		var products = from category in db.Categories
		//					 where category.Id == id
		//					 join categoryProduct in categoryProducts on category.Id equals categoryProduct.CategoryId
		//					 join product in db.Products on categoryProduct.ProductId equals product.Id
		//					 select product;

		//		return products.ToList();
		//	}
		//}

		[HttpGet("{type}")]
		public IEnumerable<Product> Get(int type)
		{
			using (var db = new ApplicationContext())
			{
				var categoryProducts = db.Categories
					.Include(n => n.CategoryProducts)
					.SelectMany(n => n.CategoryProducts);

				var products = from category in db.Categories
							   where (int)category.Type == type
							   join categoryProduct in categoryProducts on category.Id equals categoryProduct.CategoryId
							   join product in db.Products on categoryProduct.ProductId equals product.Id
							   select product;

				return products.ToList();
			}
		}

		[HttpGet("{categoryId}/{productId}")]
		public Product Get(int categoryId, int productId)
		{
			using (var db = new ApplicationContext())
			{
				return db.Products.FirstOrDefault(n => n.Id == productId);
			}
		}

		[HttpGet]
		public IEnumerable<Product> Get()
		{
			using (var db = new ApplicationContext())
			{
				return db.Products.ToList();
			}
		}

		[HttpPost]
		public IActionResult Post([FromBody]Product product)
		{
			using (var db = new ApplicationContext())
			{
				db.Products.Add(product);
				db.SaveChanges();
				var categories = db.Categories.ToList();

				for (int i = 0; i < product.Ids.Length; i++)
				{
					int id = product.Ids[i];
					Category category = categories.FirstOrDefault(n => n.Id == id);
					category.CategoryProducts.Add(new CategoryProduct
					{
						CategoryId = id,
						ProductId = product.Id
					});
				}

				db.SaveChanges();
				return Ok(product);
			}
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			return default;
		}
	}
}