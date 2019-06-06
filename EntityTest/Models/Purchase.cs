using System;
using System.Collections.Generic;
using System.Text;

namespace EntityTest.Models
{
	public class Purchase
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public int UserId { get; set; }
		public User User { get; set; }
	}
}