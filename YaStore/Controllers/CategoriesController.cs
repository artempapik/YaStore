using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using YaStore.Models;
using System.Linq;

namespace YaStore.Controllers
{
	[Route("api/categories")]
	public class CategoriesController : Controller
	{
		public CategoriesController() { }

		[HttpPost]
		public IActionResult Post([FromBody]Category category)
		{
			using (var db = new ApplicationContext())
			{
				db.Categories.Add(category);
				db.SaveChanges();
				return Ok(category);
			}
		}

		[HttpGet("{type}")]
		public IEnumerable<Category> GetCategoriesWithType(CategoryType type)
		{
			using (var db = new ApplicationContext())
			{
				return db.Categories
					.Where(category => category.Type == type)
					.ToList();
			}
		}

		[HttpGet]
		public IEnumerable<Category> GetCategories()
		{
			using (var db = new ApplicationContext())
			{
				return db.Categories.ToList();
			}
		}

		[HttpPut]
		public IActionResult Put([FromBody]Category category)
		{
			using (var db = new ApplicationContext())
			{
				foreach (var c in db.Categories.ToList())
				{
					if (c.Id == category.Id)
					{
						c.Name = category.Name;
						db.SaveChanges();
						return Ok(category);
					}
				}
			}
			return default;
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			//here i should delete both category and products that depend on it
			//BUT if product has more than 1 category, I shouldn't delete it

			using (var db = new ApplicationContext())
			{
				var categoryProducts = db.Categories
					.Include(n => n.CategoryProducts)
					.SelectMany(n => n.CategoryProducts);

				//var categories = db.Categories
				//	.Where(n => n.Id == id);

				//foreach (var category in categories)
				//{
				//	var n = category.CategoryProducts.Count;
				//}

				//should i work with 'categoryProduct' list? maybe

				var productsWhichShouldNotBeDeleted = new List<Product>();
				int counter = 0;

				foreach (var product in db.Products.ToList())
				{
					foreach (var categoryProduct in categoryProducts.ToList())
					{
						if (product.Id == categoryProduct.ProductId)
						{
							counter++;
						}
					}

					if (counter > 1)
					{
						productsWhichShouldNotBeDeleted.Add(product);
					}

					counter = 0;
				}

				//то есть я не должен удалять эти продукты из дибисета продуктов
				//но должен подчистить инфу в таблице CategoryProduct

				var categoryProductsToDelete = from category in db.Categories
							   where category.Id == id
							   join categoryProduct in categoryProducts on category.Id equals categoryProduct.CategoryId
							   select categoryProduct;
							   //join product in db.Products on categoryProduct.ProductId equals product.Id
							   //select product;

				foreach (var n in categoryProductsToDelete)
				{
					//something like these...
					//categoryProducts.ToList().Remove(n);
				}

				//foreach (var product in products)
				//{
				//	//db.Products.Remove(product);
				//	//db.SaveChanges();
				//}

				//return Ok(products);
				return default;
			}
		}
	}
}