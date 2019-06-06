namespace YaStore.Models
{
	public class Purchase
	{
		public int Id { get; set; }

		public int Product { get; set; }

		public int UserId { get; set; }

		public User User { get; set; }

		public bool Bought { get; set; }
	}
}