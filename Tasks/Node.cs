using System.Collections.Generic;

namespace Tasks
{
	class Node
	{
		public Node Parent { get; set; }
		public List<Node> Children { get; set; } = new List<Node>();
		public int CurrentDepth { get; set; }

		public Node(int nodeDepth) => CurrentDepth = nodeDepth;
	}
}