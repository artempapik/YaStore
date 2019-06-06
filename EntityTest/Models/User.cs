using System.Collections.Generic;

namespace EntityTest.Models
{
	public class User
	{
		public int Id { get; set; }

		public string Login { get; set; }

		public string Password { get; set; }

		public UserRole Role { get; set; }

		public List<Purchase> Purchases { get; set; } = new List<Purchase>();
	}
}