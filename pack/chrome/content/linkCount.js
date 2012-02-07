	// TODO: implement user set options menu
	// TODO: cleanup debug alerts
	// TODO: add less narrow domain checking
	// TODO: detect links better
	// TODO: make more meaningfull variable names
	
	// class linkProperties
	function LinkProperties(){
		this.linkCount = 0;
		this.linkTimeLeft = 0;
	} 

	var link = new Array();
	var prop = new LinkProperties();
	var stopNextTab = false;
	var firstLink = true;
	
	// user set options
	var timeToBlock = 1; // in minutes
	var allowedLinks = 2;
	
	function isLink(elementName){
		if(elementName == "a" || elementName == "A")
			return true;
		else 
			return false
	}	
	
	function blockLink(){
		stopNextTab = true;
	}
	
	function linkCount(event){
		var refererURL = window.content.location.href;
		if(isLink(event.target.tagName)){ // the name of the tag that triggered the event
			var d = new Date();
			
			// if we have clicked a link on this domain before
			if(link[refererURL]){
			
				// block link for this domain (refererURL) for timeToBlock minutes
				var d = new Date();
				var timeNow = d.getTime();		
				if((timeNow - link[refererURL].linkTimeLeft)/60000 < timeToBlock){
					if(link[refererURL].linkCount == allowedLinks){
						stopNextTab = true;
						blockLink();
					}
					link[refererURL].linkTimeLeft = timeNow; // working in miliseconds
					link[refererURL].linkCount++;
				}
				else {
					link[refererURL] = null;
					stopNextTab = false;
				}
			

			}
			else{
				var properties = new LinkProperties();
				properties.linkCount++;
				properties.linkTimeLeft = d.getTime(); // working in miliseconds 
				link[refererURL] = properties;
			}
			

			
		}
		

	}
	
	window.addEventListener("click", linkCount, false);
	
	// removes the tab before it is shown
	// TODO: if there is a way, replace with prevention of event
	function tabOpened(event){
		if(stopNextTab){
			var newTab = event.target;
			gBrowser.removeTab(newTab);
			stopNextTab = false;
			alert("Too many tabs!");
		}	
	}

	var con = gBrowser.tabContainer;
	con.addEventListener("TabOpen", tabOpened, false);
	
/*	
	// used in "transfer to not-working-group" module of extension
	function tabLoaded(){
		var newTab = gBrowser.getBrowserForTab(gBrowser.addTab("http://www.google.com/"));
		newTab.addEventListener("load", tabOpened , true);
	}
*/