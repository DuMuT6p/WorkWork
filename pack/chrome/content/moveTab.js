/*
    Copyright (C) 2012 DuMuT6p

    This file is part of WorkWork.
	
	WorkWork is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WorkWork is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WorkWork.  If not, see <http://www.gnu.org/licenses/>.
*/
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