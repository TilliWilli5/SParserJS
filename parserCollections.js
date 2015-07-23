//
//General class CParser
//
var CParser = CBase.Extend
(
	function Constructor()
	{
		this.class = CParser;
		this.configuration = this.class.defaultConfiguration;
	},
	//Methods
	function Initialize(pConfiguration)
	{
		if(pConfiguration)
		{
			for(var property in this.class.defaultConfiguration)
				if(pConfiguration[property])
					this.configuration[property] = pConfiguration[property];
		}
	},
	function Parse(pResource)
	{
		return "[Virtual function]: " + this.class.className + "->" + Parse.name;
	}
);
CParser.className = "CParser";
CParser.defaultConfiguration = {
	value:null
};

//
//Derived classes from CParser
//
var CParserPartyPoker = CParser.Extend
(
	function Constructor()
	{
		this.class = CParserPartyPoker;
		this.configuration = this.class.defaultConfiguration;
	},
	//Methods
	function Parse(pResource)
	{
		var _result = {};
		var games = pResource.split("#Game No :");
		var gameStats = [];
		for(var iX=1; iX<games.length; ++iX)
		{
			var gameStatements = games[iX].split("\n");
			var game = new CPPPGame.Create();
			game.Initialize();
			game.id = parseInt(gameStatements[0] - 1);

			{
				//Blinds
				var blinds = gameStatements[2].split(" ")[0].split("/");
				game.smallBlind = parseFloat( blinds[0].substr(1));
				game.bigBlind = parseFloat( blinds[1].substr(1));
			}
			{
				//Players number
				game.timeStart = gameStatements[2].split("-")[1].trim();
				game.playersNumber = gameStatements[5].split(":")[1].split("/")[0].trim();
				game.playersTotal = gameStatements[5].split(":")[1].split("/")[1].trim();
			}
			{
				//Positions and deposit stats
				game.buttonPosition = gameStatements[4].split(" ")[1].trim();
				for(var iY=0; iY<9; ++iY)
				{
					if(gameStatements[6 + iY].indexOf("TilliWilli") !== -1)
					{
						game.myPosition = gameStatements[6 + iY].split(":")[0].split(" ")[1].trim();
						game.depositStart = gameStatements[6 + iY].split("(")[1].split("$")[1].split(" ")[0].trim();
						break;
					}
				}
			}
			{
				//Actions stats
				var preFlopLineAnchor = 0;
				var flopLineAnchor = 0;
				var turnLineAnchor = 0;
				var riverLineAnchor = 0;
				for(var iZ=6; iZ<gameStatements.length; ++iZ)
				{
					if(gameStatements[iZ].slice(0, 10) === "** Dealing")
					{
						if(gameStatements[iZ].slice(0, 13) === "** Dealing do")
							preFlopLineAnchor = iZ;
						if(gameStatements[iZ].slice(0, 13) === "** Dealing Fl")
							flopLineAnchor = iZ;
						if(gameStatements[iZ].slice(0, 13) === "** Dealing Tu")
							turnLineAnchor = iZ;
						if(gameStatements[iZ].slice(0, 13) === "** Dealing Ri")
							riverLineAnchor = iZ;
					}
				}
				game.actionsPreFlop = [];
				game.actionsFlop = [];
				game.actionsTurn = [];
				game.actionsRiver = [];
				
				if(preFlopLineAnchor !== 0)
					for(var iZ=preFlopLineAnchor; iZ<flopLineAnchor; ++iZ)
					{
						
						game.actionsPreFlop.push(gameStatements[iZ]);
					}
				if(flopLineAnchor !== 0)
					for(var iZ=flopLineAnchor; iZ<turnLineAnchor; ++iZ)
					{
						game.actionsFlop.push(gameStatements[iZ]);
					}
				if(turnLineAnchor !== 0)
					for(var iZ=turnLineAnchor; iZ<riverLineAnchor; ++iZ)
					{
						game.actionsTurn.push(gameStatements[iZ]);
					}
				if(riverLineAnchor !== 0)
					for(var iZ=riverLineAnchor; iZ<(gameStatements.length-3); ++iZ)
					{
						game.actionsRiver.push(gameStatements[iZ]);
					}
				
			}
			{
				//Cards info
				game.myCard1 = gameStatements[preFlopLineAnchor + 1].split(" ")[5];
				game.myCard2 = gameStatements[preFlopLineAnchor + 1].split(" ")[6];
				
				if(flopLineAnchor !== 0)
					game.cardsFlop = gameStatements[flopLineAnchor].split("[")[1].slice(0, -2);
				if(turnLineAnchor !== 0)
					game.cardsTurn = gameStatements[turnLineAnchor].split("[")[1].slice(0, -2);
				if(riverLineAnchor !== 0)
					game.cardsRiver = gameStatements[riverLineAnchor].split("[")[1].slice(0, -2);
				
				//game.cardsTurn = game.actionsPreFlop[0].split(" ")[4];
				//game.cardsRiver = game.actionsPreFlop[0].split(" ")[4];
			}
			{
				//Showdown
				game.showdowns = [];
				game.winners = [];
				if(riverLineAnchor === 0)
				{
					if(turnLineAnchor === 0)
					{
						if(flopLineAnchor === 0)
						{
							if(preFlopLineAnchor === 0)
							{
								;//do nothing
							}
							else
							{
								for(var iZ=preFlopLineAnchor; iZ<flopLineAnchor; ++iZ)
								{
									if(gameStatements[iZ].indexOf("shows") !== -1)
										game.showdowns.push(gameStatements[iZ]);
									if(gameStatements[iZ].indexOf("wins") !== -1)
										game.winners.push(gameStatements[iZ]);
								}
							}
						}
						else
						{
							for(var iZ=flopLineAnchor; iZ<turnLineAnchor; ++iZ)
							{
								if(gameStatements[iZ].indexOf("shows") !== -1)
									game.showdowns.push(gameStatements[iZ]);
								if(gameStatements[iZ].indexOf("wins") !== -1)
									game.winners.push(gameStatements[iZ]);
							}
						}
					}
					else
					{
						for(var iZ=turnLineAnchor; iZ<riverLineAnchor; ++iZ)
						{
							if(gameStatements[iZ].indexOf("shows") !== -1)
								game.showdowns.push(gameStatements[iZ]);
							if(gameStatements[iZ].indexOf("wins") !== -1)
								game.winners.push(gameStatements[iZ]);
						}
					}
				}
				else
				{
					for(var iZ=riverLineAnchor; iZ<(gameStatements.length-3); ++iZ)
					{
						if(gameStatements[iZ].indexOf("shows") !== -1)
							game.showdowns.push(gameStatements[iZ]);
						if(gameStatements[iZ].indexOf("wins") !== -1)
							game.winners.push(gameStatements[iZ]);
					}
				}
			}
			gameStats.push(game);
		}
		return _result = gameStats;
	}
);
CParserPartyPoker.className = "CParserPartyPoker";
CParserPartyPoker.defaultConfiguration = {
	value:null
};