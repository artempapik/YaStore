using System.Collections.Generic;
using System.Linq;
using System;

namespace Tasks
{
	class Unique
	{
		public static List<int> Simple(int[] first, int[] second)
		{
			var result = new List<int>();

			bool exist = false;

			for (int i = 0; i < second.Length; i++)
			{
				for (int j = 0; j < first.Length; j++)
				{
					if (second[i] == first[j])
					{
						exist = true;
						break;
					}
				}

				if (!exist)
				{
					result.Add(second[i]);
				}
				exist = false;
			}

			return result;
		}

		public static List<int> LessSimple(int[] first, int[] second)
		{
			var temp = new Dictionary<int, int>();
			Array.ForEach(first, n => temp.TryAdd(n, 0));
			return Simple(temp.Keys.ToArray(), second);
		}

		public static List<int> FasterWay(int[] first, int[] second)
		{
			var result = new List<int>();
			var temp = new Dictionary<int, int>();
			Array.ForEach(first, n => temp.TryAdd(n, 0));

			for (int i = 0; i < second.Length; i++)
			{
				if (temp.TryAdd(second[i], 0))
				{
					result.Add(second[i]);
				}
			}

			return result;
		}

		public static List<int> UsingLinq(int[] first, int[] second) => second
			.Except(first)
			.ToList();
	}
}