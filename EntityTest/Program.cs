using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System;
using EntityTest.Models;

namespace EntityTest
{
	class Program
	{
		static void Main()
		{
			//Fill();
			//using (var db = new ApplicationContext())
			//{
			//	var categoryProducts = db.Categories
			//		.Include(c => c.CategoryProducts)
			//		.SelectMany(n => n.CategoryProducts);

			//	var result = from category in db.Categories
			//				 join categoryProduct in categoryProducts on category.Id equals categoryProduct.CategoryId
			//				 join product in db.Products on categoryProduct.ProductId equals product.Id
			//				 select new
			//				 {
			//					 CategoryName = category.Name,
			//					 ProductName = product.Name
			//				 };

			//	foreach (var n in result)
			//	{
			//		Console.WriteLine($"{n.CategoryName} {n.ProductName}");
			//	}
			//}

			//Fill();

			using (var db = new ApplicationContext())
			{
				foreach (var n in db.Users.ToList())
				{
					Console.WriteLine(n.Login);
					foreach (var q in n.Purchases)
					{
						Console.WriteLine(q.Name);
					}
					Console.WriteLine();
				}
			}
		}

		static void Fill()
		{
			using (var db = new ApplicationContext())
			{
				db.Users.AddRange(new[]
				{
					new User
					{
						Login="a",
						Password="123"
					},
					new User
					{
						Login="b",
						Password="123"
					},
					new User
					{
						Login="c",
						Password="123"
					}
				});

				db.SaveChanges();

				var users = db.Users.ToList();

				users[0].Purchases.AddRange(new[]
				{
					new Purchase
					{
						Name="p1"
					},
					new Purchase
					{
						Name="p2"
					}
				});

				db.SaveChanges();

				users[1].Purchases.AddRange(new[]
				{
					new Purchase
					{
						Name="p1"
					},
					new Purchase
					{
						Name="p2"
					}
				});

				db.SaveChanges();

				users[2].Purchases.AddRange(new[]
				{
					new Purchase
					{
						Name="p1"
					},
					new Purchase
					{
						Name="p2"
					}
				});

				db.SaveChanges();
			}

			//using (var db = new ApplicationContext())
			//{
			//	db.Categories.AddRange(new[]
			//	{
			//		new Category
			//		{
			//			Name = "Rap"
			//		},
			//		new Category
			//		{
			//			Name = "Rock"
			//		},
			//		new Category
			//		{
			//			Name = "Pop"
			//		}
			//	});

			//	db.SaveChanges();

			//	db.Products.AddRange(new[]
			//	{
			//		new Product
			//		{
			//			Name = "A"
			//		},
			//		new Product
			//		{
			//			Name = "B"
			//		},
			//		new Product
			//		{
			//			Name = "C"
			//		},
			//		new Product
			//		{
			//			Name = "D"
			//		},
			//		new Product
			//		{
			//			Name = "E"
			//		}
			//	});

			//	db.SaveChanges();
			//	var categories = db.Categories.ToList();

			//	categories[0].CategoryProducts.AddRange(new[]
			//	{
			//		new CategoryProduct
			//		{
			//			CategoryId = 1,
			//			ProductId = 1
			//		},
			//		new CategoryProduct
			//		{
			//			CategoryId = 1,
			//			ProductId = 3
			//		}
			//	});

			//	categories[1].CategoryProducts.AddRange(new[]
			//	{
			//		new CategoryProduct
			//		{
			//			CategoryId = 2,
			//			ProductId = 1
			//		},
			//		new CategoryProduct
			//		{
			//			CategoryId = 2,
			//			ProductId = 2
			//		},
			//		new CategoryProduct
			//		{
			//			CategoryId = 2,
			//			ProductId = 4
			//		}
			//	});

			//	categories[2].CategoryProducts.AddRange(new[]
			//	{
			//		new CategoryProduct
			//		{
			//			CategoryId = 3,
			//			ProductId = 3
			//		},
			//		new CategoryProduct
			//		{
			//			CategoryId = 3,
			//			ProductId = 5
			//		}
			//	});

			//	db.SaveChanges();
			//}
		}
	}
}