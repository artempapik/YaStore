using System;

namespace Tasks
{
	class Tree
	{
		const int CHILDREN_AMOUNT = 10;
		const int DEPTH = 5;

		public static void Fill(Node root)
		{
			if (root.CurrentDepth == DEPTH)
			{
				return;
			}

			for (int i = 0; i < CHILDREN_AMOUNT; i++)
			{
				root.Children.Add(new Node(root.CurrentDepth + 1));
			}

			for (int i = 0; i < root.Children.Count; i++)
			{
				root.Children[i].Parent = root;
			}

			for (int i = 0; i < root.Children.Count; i++)
			{
				Fill(root.Children[i]);
			}
		}

		public static Node GetFirstParent(Node firstNode, Node secondNode)
		{
			//TODO
			//change the rules - don't use CurrentDepth property
			int firstLevel = firstNode.CurrentDepth;
			int secondLevel = secondNode.CurrentDepth;

			Console.WriteLine($"levels: {firstLevel} {secondLevel}");

			if (firstLevel == secondLevel)
			{
				while (true)
				{
					firstNode = firstNode.Parent;
					secondNode = secondNode.Parent;

					if (firstNode == secondNode)
					{
						return firstNode;
					}
				}
			}
			else
			{
				int difference = Math.Abs(firstLevel - secondLevel);

				if (firstLevel > secondLevel)
				{
					while (difference != 0)
					{
						firstNode = firstNode.Parent;
						difference--;
					}
				}
				else
				{
					while (difference != 0)
					{
						secondNode = secondNode.Parent;
						difference--;
					}
				}

				while (true)
				{
					firstNode = firstNode.Parent;
					secondNode = secondNode.Parent;

					if (firstNode == secondNode)
					{
						return firstNode;
					}
				}
			}
		}
	}
}