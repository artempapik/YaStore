using System.Collections.Generic;
using System;

namespace Tasks
{
	static class Program
	{
		static void Main()
		{
			//MultiplyingRecursive();
			//AnimalsTest();
			//TreeTest();
			//UniqueTest();
		}

		private static T[] MergeAionys<T>(this T[] arr1, T[] arr2)
		{
			var result = new List<T>();
			T[] smallerArr = arr1.Length > arr2.Length ? arr2 : arr1;
			T[] biggerArr = smallerArr == arr1 ? arr2 : arr1;

			for (int i = 0; i < smallerArr.Length; i++)
			{
				result.Add(arr1[i]);
				result.Add(arr2[i]);
			}

			for (int i = smallerArr.Length; i < biggerArr.Length; i++)
			{
				result.Add(biggerArr[i]);
			}

			return result.ToArray();
		}

		public static void Print<T>(this IEnumerable<T> sequence)
		{
			foreach (var n in sequence)
			{
				Console.Write($"{n} ");
			}
			Console.WriteLine();
		}

		private static int MultiplyingRecursive()
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

		private static void TreeTest()
		{
			var root = new Node(0);
			Tree.Fill(root);
			Node a = root.Children[0];
			Node b = root.Children[1];
			Node result = Tree.GetFirstParent(a, b);
			Console.WriteLine(result.CurrentDepth);
		}

		private static void UniqueTest()
		{
			const int size = 100500;
			var random = new Random();

			DateTime before;
			DateTime after;
			TimeSpan elapsedTime;

			var first = new int[size];
			var second = new int[size];

			for (int i = 0; i < size; i++)
			{
				first[i] = random.Next(0, 10000);
				second[i] = random.Next(int.MinValue, int.MaxValue);
			}

			Console.WriteLine($"size = {size}\n");

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