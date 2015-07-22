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
		var result = {};
		var games = pResource.split("#Game No :");
		for(var iX=1; iX<games.length; ++iX)
		{
			var gameStatements = games[iX].split("\n");
			var game = new CPPPGame.Create();
			game.Initialize();
			game.id = parseInt(gameStatements[0] - 1);

			{
				var blinds = gameStatements[2].split(" ")[0].split("/");
				game.smallBlind = parseFloat( blinds[0].substr(1));
				game.bigBlind = parseFloat( blinds[1].substr(1));
			}

		}
		return result = game;
	}
);
CParserPartyPoker.className = "CParserPartyPoker";
CParserPartyPoker.defaultConfiguration = {
	value:null
};