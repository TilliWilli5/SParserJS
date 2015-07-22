var CFileLoader = {};
CFileLoader.className = "CFileLoader";
CFileLoader.OnLoad = function(){alert("No handler register")};
CFileLoader.RegisterHandler = function(pFunction)
{
	if(pFunction)
		CFileLoader.OnLoad = pFunction;
};
CFileLoader.Load = function()
{

	var fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.style.visibility = "collapse";
	fileInput.onchange = function()
	{
		var reader = new FileReader();
		reader.onload = function()
		{
			CFileLoader.OnLoad(this.result);
		};
		reader.readAsText(fileInput.files[0]);

	};
	document.body.appendChild(fileInput);
	fileInput.style.visibility = "visible";
};