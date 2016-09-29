		//My code is meant to be placed in the same class as the "tester", but outside of the tester's main method.
		//From personal tests, it works up until 11 depths under 2 seconds. Beyond that, there are occasional overflows on some cases.

			//Method used to solve the HiRiQ puzzle
			public static String solver(boolean[] input){
				
				//nodes are used to keep track of the moves and priorities
				class node{
					public boolean[] puzzle;
					public String moves;
					public byte priority;
					public node(boolean[] input, String moveIn, byte priority){
						// Puzzle refers to the HiRiQ board (or, in other words, the boolean array)
						this.puzzle = input;
						this.moves = moveIn;
						this.priority = priority;
					}
				}
				
				//If our input can't get to the solved state or the input is already solved, we return an empty string
				if (parityCheck(input) == 1 || solveCheck(input)){
					return "The input is either unsolvable or already solved";
				}

				// ArrayList used to store all the "children" of the current node [for BFS]
				ArrayList<node> breadthFirst = new ArrayList();

				//All the triplets in which a move is possible:
				byte[][] triplets = {{0,1,2},{3,4,5},{6,7,8},{7,8,9},{8,9,10},{10,11,12},{13,14,15},{14,15,16},{15,16,17},{16,17,18},{17,18,19},
						{20,21,22},{21,22,23},{22,23,24},{23,24,25},{24,25,26},{27,28,29},{30,31,32},{12,19,26},{11,18,25},{2,5,10},{5,10,17},{10,17,24},
						{17,24,29},{24,29,32},{1,4,9},{4,9,16},{9,16,23},{16,23,28},{23,28,31},{0,3,8},{3,8,15},{8,15,22},{15,22,27},{22,27,30},
						{7,14,21},{6,13,20}};
				//Combinations = TTF, TFF, FTT, FFT
				//input boolean array transformed into a node:
				node inputNode = new node(input,"",(byte)0);
				breadthFirst.clear();
				breadthFirst.add(inputNode);

				//queue is used in our search
				Queue<node> queue = new LinkedList<node>();

				//'earlyQueue' handles elements closest to the answer
				Queue<node> earlyQueue = new LinkedList<node>();

				//Minimum amount of white bits (upper bounded at 32)
				byte currentMin=32;

				//The set is used to determine if we use the "early queue" or not
				ArrayList<node> set = new ArrayList<node>();

				//If a "priority 2" element is found, this gives its index
				int foundSuccess = -1;

				//Used to track the size of our depth, as elements might be removed from the ArrayList corresponding to the siblings during a loop
				int size=0;

				//Loops until a result is found
				while(true){
					//If we have elements with a priority (in earlyQueue) they get dealt with first; otherwise we use the regular queue 
					if (earlyQueue.size() > 0){
						set.addAll(earlyQueue);
						
					} else {
						set.addAll(breadthFirst);
						currentMin+=3;
					}
					queue.addAll(set);
					breadthFirst.clear();
					earlyQueue.clear();
					set.clear();
					//We find all the siblings of the next depth in our tree and store them in breadthFirst
					while (!queue.isEmpty()){
						node removed = queue.remove();
						input = removed.puzzle.clone();
						for (int i=0;i<triplets.length;i++){
							if ((input[triplets[i][0]] == input[triplets[i][1]] && input[triplets[i][2]]!=input[triplets[i][0]]) || (input[triplets[i][2]] == input[triplets[i][1]] && input[triplets[i][0]]!=input[triplets[i][1]])){
								removed.puzzle[triplets[i][0]] = !input[triplets[i][0]];
								removed.puzzle[triplets[i][1]] = !input[triplets[i][1]];
								removed.puzzle[triplets[i][2]] = !input[triplets[i][2]];
								//We keep track of our nodes
								breadthFirst.add(new node(removed.puzzle,removed.moves+triplets[i][0]+" @ "+triplets[i][2]+"; ",parityCheck(removed.puzzle)));
								//This is to avoid altering the parent node
								removed.puzzle=input.clone();
							}
						}
					}
					//"breadthFirst.size()" might change during the loop
					size = breadthFirst.size();
					
					for (int i=0; i<size;i++){
						//If we find a solved state, we return the string representing the nodes it took to get there
						if (solveCheck(breadthFirst.get(i).puzzle)){
							return breadthFirst.get(i).moves;
						//If we find a "node" with a priority of 2, we continue the search in its children exclusively	
						} else if(breadthFirst.get(i).priority == 2){
							foundSuccess = i;
						//If our node is unsolvable, we remove it	
						} else if(breadthFirst.get(i).priority==1){
							breadthFirst.remove(i);
						} else {
							//We keep a queue with only the least amount of white bits
							//Note that by doing this, we also avoid exploring nodes that have already been explored
							if (breadthFirst.get(i).priority <= currentMin && breadthFirst.get(i).priority > 2){
								earlyQueue.add(breadthFirst.get(i));
								currentMin=breadthFirst.get(i).priority;
							}
						}
					}
					//Exclusive search in the node of priority 2 (meaning AT MOST 2 steps away from the answer)
					if (foundSuccess>=0){
						node success = breadthFirst.get(foundSuccess);
						breadthFirst.clear();
						breadthFirst.add(success);
					}
				}
			}
			//Checks if the boolean array is solved
			public static boolean solveCheck(boolean[] input){
				for (int i=0;i<input.length;i++){
					if (i==16){
						continue;
					} else if (!input[i]){
						continue;
					} else {
						//Returns false if any bit other than the 16th is a white one
						return false;
					}
				}
				return true;
			}
			
			//Returns a byte from 0 to 3 depending on the state of the input;
			/* >2 -> Amount of white bits (named "pixels")
			 * 1 -> Unsolvable input (which should be removed from our list)
			 * 2 -> Priority; this means the "input" is very close to a solution
			 */
			public static byte parityCheck(boolean[] input){
				byte whitePixels = 0;
				byte blue=0;
				byte red=0;
				byte yellow=0;
				//We compute the values of blue red and yellow as well as the amount of white pixels
				for (int i=0; i<input.length;i++){
					if (input[i]){
						whitePixels++;
					}
					if (input[i]){
						if 	(i==0 || i==5 || i==6 || i==9 || i==12 || i==15 || i==18 || i==21 || i==24 || i==28 || i==30){
							blue++;					
						} else if(i==2 || i==4 || i==8 || i==14 || i==20 || i==11 || i==17 || i==23 || i==27 || i==26 || i==32){
							red++;
						} else if(i==1 || i==3 || i==7 || i==13 || i==10 || i==16 || i==22 || i==19 || i==25 || i==29 || i==31){
							yellow++;
						}
					}
				}
				//Only 5 states from which the solution is reachable with 1 pixel left
				if (whitePixels==1){
					if (!(input[1] || input[13] || input[19] || input[31] || input[16])){
						return 1;
					} else {
						return 2;
					}
				//Parity(B) == Parity(R) != Parity(Y) is a necessary condition for solvable cases	
				} else if(!(blue%2 == red%2 && blue%2 != yellow%2)){
					return 1;
				}
				/* PRIORITY IF... 
				 * 1 yellow on the outer/middle bits; (covered at the states with 1 pixel left)
				 * 1 red 1 blue on 9\4 ; 17\18 ; 23\28 ; 15\14 (1 step away from solution)
				 */
				if (blue==1 && red==1 && yellow==0){
					if ((input[9] && input[4])||(input[17] && input[18])||(input[23] && input[28])||(input[14] && input[15])){
						return 2;
					}
				}
				if (whitePixels>2){
					return whitePixels;
				}
				//Default (0 doesn't affect anything)
				return 0;
			}
	
	}
