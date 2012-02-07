		// TODO: EVERYTHING!
		
		/*	
	// used in "transfer to not-working-group" module of extension
	function tabLoaded(){
		var newTab = gBrowser.getBrowserForTab(gBrowser.addTab("http://www.google.com/"));
		newTab.addEventListener("load", tabOpened , true);
	}
*/

        function checkAndMoveTab()
        {
                var menuSpot = document.getElementById('context_tabViewNewGroup');
                var menuClick = document.createEvent("MouseEvents");
                alert(menuSpot);
                if(menuSpot) {
                alert('spot and click');
                 menuClick.initMouseEvent(
                   "click",
                   true,     // Click events bubble
                   true,     // and they can be cancelled
                   document.defaultView,  // Use the default view
                   1,        // Just a single click
                   0,        // Don't bother with co-ordinates
                   0,
                   0,
                   0,
                   false,    // Don't apply any key modifiers
                   false,
                   false,
                   false,
                   0,        // 0 - left, 1 - middle, 2 - right
                   null);    // Click events don't have any targets other than
                             // the recipient of the click
                    alert(menuClick);
                    if(menuSpot.dispatchEvent(menuClick)) alert("false");
                    else alert("true");
                }
        }