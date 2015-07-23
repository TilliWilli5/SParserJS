var CStructure = CBase.Extend
(
	function Constructor(pResource)
	{
		this.class = CStructure;
	},
	function Initialize(pResource)
	{
		for(var property in this.class.default)
		{
			this[property] = this.class.default[property];
		}
		if(pResource)
		{
			for(var property in pResource)
			{
				if(this.hasOwnProperty(property))
					this[property] = pResource[property];
			}
		}
	}

);
CStructure.className = "CStructure";
CStructure.default = {
	value1:1,
	value2:2,
	value3:3
};

//
//Derived classes from CStructure
//
var CPPPGame = CStructure.Extend(
	function Constructor(pResource)
	{
		this.class = CPPPGame;
	}
);
CPPPGame.className = "CPPPSession";
CPPPGame.default = {
	id:0,
	smallBlind:0,
	bigBlind:0,
	timeStart:0,
	timeEnd:0,
	playersNumber:0,
	playersTotal:0,
	buttonPosition:0,
	myPosition:0,
	depositStart:0,
	//
	actionsPreFlop:[],	//["check", "call 0.04", "raise 0.16", "fold", "all-in 3.75"]
	actionsFlop:[],
	actionsTurn:[],
	actionsRiver:[],
	//
	myCard1:null,		//"Ac"
	myCard2:null,		//"Td"
	cardsFlop:null,		//"5s Jh 7d"
	cardsTurn:null, 	//"2s"
	cardsRiver:null,	//"9s"
	//
	showdowns:[], // MrAiR888 shows [ 9c, 9s ]two pairs, Nines and Sevens.
	winners:[]		//who win : MrAiR888 wins $1.32 USD from the main pot with two pairs, Nines and Sevens.
};
CPPPGame.ECardsRank = {
	0:"2",
	1:"3",
	2:"4",
	3:"5",
	4:"6",
	5:"7",
	6:"8",
	7:"9",
	8:"10",
	9:"J",
	10:"Q",
	11:"K",
	12:"A"

};
CPPPGame.ECardsSuitShort = {
	0:"s",
	1:"h",
	2:"d",
	3:"c"
};
CPPPGame.ECardsSuit = {
	0:"spades",
	1:"hearts",
	2:"diamonds",
	3:"clubs"
};
CPPPGame.ECardsSuitSymbols = {
	0:"♠",
	1:"♥",
	2:"♦",
	3:"♣"
};