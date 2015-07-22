var ParserManager = {};
//Static members of class ParserManager
ParserManager.className = "ParserManager";
ParserManager.default =
ParserManager.theParser = null;
ParserManager.GetParser = function()
{

}
ParserManager.UseParser = function(pParser)
{
	if(pParser)
		ParserManager.theParser = pParser;
};