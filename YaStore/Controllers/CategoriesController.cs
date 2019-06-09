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
			using (var db = new ApplicationContext())
			{
				foreach (var category in db.Categories.ToList())
				{
					if (category.Id == id)
					{
						db.Categories.Remove(category);
						db.SaveChanges();
						break;
					}
				}

				foreach (var category in db.Categories.ToList())
				{
					foreach (var categoryProduct in category.CategoryProducts)
					{
						if (categoryProduct.CategoryId == id)
						{
							category.CategoryProducts.Remove(categoryProduct);
							db.SaveChanges();
							break;
						}
					}
				}

				var categoryProducts = db.Categories
					.Include(n => n.CategoryProducts)
					.SelectMany(n => n.CategoryProducts)
					.ToList();

				if (categoryProducts.Count == 0)
				{
					foreach (var product in db.Products.ToList())
					{
						db.Products.Remove(product);
						db.SaveChanges();
					}
				}
				else
				{
					bool needDelete = true;

					foreach (var product in db.Products.ToList())
					{
						foreach (var categoryProduct in categoryProducts)
						{
							if (product.Id == categoryProduct.ProductId)
							{
								needDelete = false;
								break;
							}
						}

						if (needDelete)
						{
							db.Products.Remove(product);
							db.SaveChanges();
						}

						needDelete = true;
					}
				}

				return Ok(id);
			}
		}
	}
}