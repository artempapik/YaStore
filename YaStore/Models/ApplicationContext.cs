﻿using Microsoft.EntityFrameworkCore;

namespace YaStore.Models
{
	public class ApplicationContext : DbContext
	{
		public ApplicationContext() : base() => Database.EnsureCreated();

		public DbSet<Category> Categories { get; set; }

		public DbSet<Product> Products { get; set; }

		public DbSet<User> Users { get; set; }

		public DbSet<Purchase> Purchases { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => 
			optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=testdb;Trusted_Connection=True;");

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder
				.Entity<CategoryProduct>()
				.HasKey(key => new { key.CategoryId, key.ProductId });

			modelBuilder
				.Entity<CategoryProduct>()
				.HasOne(cp => cp.Category)
				.WithMany(c => c.CategoryProducts)
				.HasForeignKey(c => c.CategoryId);

			modelBuilder
				.Entity<CategoryProduct>()
				.HasOne(cp => cp.Product)
				.WithMany(p => p.CategoryProducts)
				.HasForeignKey(p => p.ProductId);
		}
	}
}