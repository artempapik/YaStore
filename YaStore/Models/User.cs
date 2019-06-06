using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace YaStore.Models
{
	public class User
	{
		public int Id { get; set; }

		public string Login { get; set; }

		public string Password { get; set; }

		public UserRole Role { get; set; }

		public List<Purchase> Purchases { get; set; } = new List<Purchase>();

		[NotMapped]
		public int ProductId { get; set; }
	}
}