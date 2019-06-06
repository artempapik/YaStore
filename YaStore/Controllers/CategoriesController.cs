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

		[HttpGet("{type}")]
		public IEnumerable<Category> Get(CategoryType type)
		{
			using (var db = new ApplicationContext())
			{
				return db.Categories
					.Where(category => category.Type == type)
					.ToList();
			}
		}

		[HttpGet]
		public IEnumerable<Category> Get()
		{
			using (var db = new ApplicationContext())
			{
				return db.Categories.ToList();
			}
		}

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

		[HttpPut("{id}")]
		public IActionResult Put(int id, [FromBody]Category category)
		{
			return default;
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			return default;
		}
	}
}