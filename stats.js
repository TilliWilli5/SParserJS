var CStructure = CBase.Extend
(
	function Constructor(pResource)
	{
		this.class = CStructure;
		this.values = this.class.defaultValues;
		if(pResource)
		{
			for(var property in this.default)
			{
				if(pResource[property])
					this.values[property] = pResource[property];
			}
		}/*
		else
		{
			for(var property in this.class.default)
			{
				this[property] = this.class.default[property];
			}
		}*/
	},
	function Serialize()
	{
		return "[Virtual function]: " + this.class.className + "->" + Serialize.name;
	}
);
//Static members of class CStructure
CStructure.className = "CStructure";
CStructure.example = {
	startDeposit:0,
	income:0,
	endDeposit:0,
	health:"A",
	mental:"A",
	rate:"A",
	gameType:"0.02/0.04",
	startTime:"2015-05-28 22:18:15",
	endTime:"2015-05-28 23:31:09",
	totalTime:"23:12:59"
};
CStructure.defaultValues = {
	startDeposit:null,
	income:null,
	endDeposit:null,
	health:null,
	mental:null,
	rate:null,
	gameType:null,
	startTime:null,
	endTime:null,
	totalTime:null
};

///
var CPartyPokerSession = CStructure.Extend
(

);
CPartyPokerSession.default = {
	startDeposit:null,
	income:null,
	endDeposit:null,
	health:null,
	mental:null,
	rate:null,
	gameType:null,
	startTime:null,
	endTime:null,
	totalTime:null
};
//Static members of class CStructure
CStructure.className = "CStructure";
CStructure._example = {
	startDeposit:0,
	income:0,
	endDeposit:0,
	health:"A",
	mental:"A",
	rate:"A",
	gameType:"0.02/0.04",
	startTime:"2015-05-28 22:18:15",
	endTime:"2015-05-28 23:31:09",
	totalTime:"23:12:59"
};
CStructure._default = {
	startDeposit:null,
	income:null,
	endDeposit:null,
	health:null,
	mental:null,
	rate:null,
	gameType:null,
	startTime:null,
	endTime:null,
	totalTime:null
};
//Constructor of class CStructure
CStructure.Create = function(pResource)
{
	this.class = CStructure;
	if(pResource)
	{
		for(var property in CStructure.default)
		{
			this[property] = pResource[property] || CStructure.default[property];
		}
	}
	else
	{
		for(var property in CStructure.default)
		{
			this[property] = CStructure.default[property];
		}
	}

};
//Methods of class CStructure
//CStructure.Create.prototype.