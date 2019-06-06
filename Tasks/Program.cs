using System.Collections.Generic;
using System;

namespace Tasks
{
	class Program
	{
		static void Main()
		{
			//MultiplyingRecursive();
			//AnimalsTest();
			//TreeTest();
			//UniqueTest();
		}

		static int MultiplyingRecursive()
		{
			int result = 1;
			Main();
			return result;

			void Main()
			{
				int number = int.Parse(Console.ReadLine());

				if (number < 0)
				{
					return;
				}

				if (number % 2 == 1)
				{
					result *= number;
				}

				Main();
			}
		}

		class Animal
		{
			public string Name { get; set; }

			public int Hands { get; set; }

			public int Legs { get; set; }

			public string Color { get; set; }

			public override string ToString() => $"{Name}; {Hands} hands, {Legs} legs, {Color} color";
		}

		static void AnimalsTest()
		{
			var animals = new List<Animal>();
			int choice;
			int index;

			string name, color;
			int hands, legs;

			while (true)
			{
				Console.WriteLine("1. Add\n2. Print\n3. Change name\n4. Delete\n5. Exit\n");
				choice = int.Parse(Console.ReadLine());

				switch (choice)
				{
					case 1:
						Console.Write("name - ");
						name = Console.ReadLine();

						Console.Write("hands - ");
						hands = int.Parse(Console.ReadLine());

						Console.Write("legs - ");
						legs = int.Parse(Console.ReadLine());

						Console.Write("color - ");
						color = Console.ReadLine();

						animals.Add(new Animal
						{
							Name = name,
							Hands = hands,
							Legs = legs,
							Color = color
						});
						Console.WriteLine("* added *");
						break;
					case 2:
						if (animals.Count == 0)
						{
							Console.WriteLine("* empty *");
						}

						for (int i = 0; i < animals.Count; i++)
						{
							Console.WriteLine($"{i + 1}. {animals[i]}");
						}
						break;
					case 3:
						Console.Write("index - ");
						index = int.Parse(Console.ReadLine());
						Console.Write("name - ");
						name = Console.ReadLine();

						animals[--index].Name = name;
						Console.WriteLine("* changed *");
						break;
					case 4:
						Console.Write("index - ");
						index = int.Parse(Console.ReadLine());
						animals.RemoveAt(--index);
						Console.WriteLine("* deleted *");
						break;
					case 5:
						return;
					default:
						Console.WriteLine("* wrong choice *");
						break;
				}
			}
		}

		static void TreeTest()
		{
			var root = new Node(0);
			Tree.Fill(root);
			Node a = root.Children[0];
			Node b = root.Children[1];
			Node result = Tree.GetFirstParent(a, b);
			Console.WriteLine(result.CurrentDepth);
		}

		static void UniqueTest()
		{
			const int SIZE = 100500;
			var random = new Random();

			DateTime before;
			DateTime after;
			TimeSpan elapsedTime;

			var first = new int[SIZE];
			var second = new int[SIZE];

			for (int i = 0; i < SIZE; i++)
			{
				first[i] = random.Next(0, 10000);
				second[i] = random.Next(int.MinValue, int.MaxValue);
			}

			Console.WriteLine($"size = {SIZE}\n");

			void Simple()
			{
				before = DateTime.Now;
				Unique.Simple(first, second);
				after = DateTime.Now;
				elapsedTime = after - before;
				Console.WriteLine($"simple: {elapsedTime.TotalMilliseconds}");
			}

			void LessSimple()
			{
				before = DateTime.Now;
				Unique.LessSimple(first, second);
				after = DateTime.Now;
				elapsedTime = after - before;
				Console.WriteLine($"less simple: {elapsedTime.TotalMilliseconds}");
			}

			void Fast()
			{
				before = DateTime.Now;
				Unique.FasterWay(first, second);
				after = DateTime.Now;
				elapsedTime = after - before;
				Console.WriteLine($"fast: {elapsedTime.TotalMilliseconds}");
			}

			void Linq()
			{
				before = DateTime.Now;
				Unique.UsingLinq(first, second);
				after = DateTime.Now;
				elapsedTime = after - before;
				Console.WriteLine($"linq: {elapsedTime.TotalMilliseconds}");
			}

			Simple();
			LessSimple();
			Fast();
			Linq();
		}
	}
}