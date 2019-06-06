using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using YaStore.Models;
using System.Linq;

namespace YaStore.Controllers
{
	[Route("api/cart")]
	public class CartController : Controller
	{
		public CartController() { }

		[HttpDelete("{userId}/{productId}")]
		public IActionResult Delete(int userId, int productId)
		{
			using (var db = new ApplicationContext())
			{
				foreach (var purchase in db.Purchases.ToList())
				{
					if (purchase.UserId == userId)
					{
						if (purchase.Product == productId)
						{
							db.Purchases.Remove(purchase);
							db.SaveChanges();
							return Ok(purchase);
						}
					}
				}
			}
			return default;
		}

		[HttpGet("{userId}")]
		public IEnumerable<Product> Get(int userId)
		{
			using (var db = new ApplicationContext())
			{
				var purchasesIds = db.Purchases
					.Where(n => n.UserId == userId)
					.Select(n => n.Product);

				var result = new List<Product>();

				foreach (var n in db.Products.ToList())
				{
					foreach (var id in purchasesIds)
					{
						if (n.Id == id)
						{
							result.Add(n);
						}
					}
				}

				return result;
			}
		}

		[HttpGet("{userId}/{smth}")]
		public IEnumerable<Product> Get(int userId, int smth)
		{
			using (var db = new ApplicationContext())
			{
				var purchasesIds = db.Purchases
					.Where(n => n.Bought && n.UserId == userId)
					.Select(n => n.Product);

				var result = new List<Product>();

				foreach (var n in db.Products.ToList())
				{
					foreach (var id in purchasesIds)
					{
						if (n.Id == id)
						{
							result.Add(n);
						}
					}
				}

				return result;
			}
		}

		[HttpGet("{userId}/{smth}/{smth1}")]
		public IEnumerable<Purchase> Get(int userId, int smth, int smth1)
		{
			using (var db = new ApplicationContext())
			{
				return db.Purchases
					.Where(n => n.UserId == userId)
					.ToList();
			}
		}

		[HttpPut]
		public IActionResult Put([FromBody]User user)
		{
			using (var db = new ApplicationContext())
			{
				foreach (var purchase in db.Purchases.ToList())
				{
					if (purchase.UserId == user.Id && purchase.Product == user.ProductId)
					{
						purchase.Bought = true;
						break;
					}
				}

				db.SaveChanges();
				return Ok(user);
			}
		}

		[HttpPost]
		public IActionResult Post([FromBody]User user)
		{
			int userId = user.Id;
			int productId = user.ProductId;

			using (var db = new ApplicationContext())
			{
				user = db.Users.FirstOrDefault(n => n.Id == userId);
				user.Purchases.Add(new Purchase
				{
					Product = productId
				});
				db.SaveChanges();
			}

			return Ok(user);
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