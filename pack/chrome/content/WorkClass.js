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

// Observer class for the preferences variables
var WorkClass = {
	prefs: null,
	// for Pomodoro module
	workTime: 25,
	breakTime: 5,
	showAlert: true,
	// for countLinks module
	timeToBlock: 5,
	allowedLinks: 2,
	
	// Initialize the extension
	startup: function(){
		// Register to receive notifications of preferences changes
		this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService)
			.getBranch("extensions.WorkWork.");
		this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		this.prefs.addObserver("", this, false);
		
		this.workTime = this.prefs.getIntPref("workTime");
		this.breakTime = this.prefs.getIntPref("breakTime");
		this.showAlert = this.prefs.getBoolPref("showAlert");
		
		this.timeToBlock = this.prefs.getIntPref("timeToBlock");
		this.allowedLinks = this.prefs.getIntPref("allowedLinks");
	},
	
	shutdown: function() {
		this.prefs.removeObserver("", this);
	},
	
	observe: function(subject, topic, data) {
		if (topic != "nsPref:changed")
		{
			return;
		}
	 
		switch(data)
		{
			case "workTime":
				this.workTime = this.prefs.getIntPref("workTime");
			break;
		}
	}
}

window.addEventListener("load", function(e) { WorkClass.startup(); }, false);
window.addEventListener("unload", function(e) { WorkClass.shutdown(); }, false);
