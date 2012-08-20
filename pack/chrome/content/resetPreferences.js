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

	// Resets all preferences to some default state
	// TODO: Check if possible to reference defaults.js file
	// TODO: Consider resetting values in fields, not directly in preferences(for Cancel button to work correctly)
	function resetToDefaults(){
		var prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService)
			.getBranch("extensions.WorkWork.");
		prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
		
		prefs.setIntPref("workTime", 25);
		prefs.setIntPref("breakTime", 5);
		prefs.setBoolPref("showAlert", true);
		
		prefs.setIntPref("timeToBlock", 5);
		prefs.setIntPref("allowedLinks", 2);
	}
