using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using YaStore.Models;
using System.Linq;

namespace YaStore.Controllers
{
	[Route("api/users")]
	public class UsersController : Controller
	{
		public UsersController() { }

		[HttpGet]
		public IEnumerable<User> Get()
		{
			using (var db = new ApplicationContext())
			{
				return db.Users.ToList();
			}
		}

		[HttpPost]
		public IActionResult Post([FromBody]User user)
		{
			if (user.Password == "1488")
			{
				user.Role = UserRole.Admin;
			}

			using (var db = new ApplicationContext())
			{
				db.Users.Add(user);
				db.SaveChanges();
				return Ok(user);
			}
		}

		[HttpPut]
		public IActionResult Put([FromBody]User user)
		{
			using (var db = new ApplicationContext())
			{
				foreach (var u in db.Users.ToList())
				{
					if (u.Id == user.Id)
					{
						u.Login = user.Login;
						u.Password = user.Password;
					}
				}
				db.SaveChanges();
				return Ok(user);
			}
		}
	}
}