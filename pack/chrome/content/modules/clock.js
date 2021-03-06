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
	// TODO: more meaningfull variable names and more comments
	// TODO: implement sessions or clean code for them
	// TODO: implement user options

	/*
	// HTML5 sound player
	<script type="text/javascript" >
		
		// HTML5 sound player
		function alabala(){
			var s = document.getElementById("p1");
			s.play();
			//alert(s);
		}
	</script>
	<html:audio controls="controls" id="p1" preload="auto">
		<html:source src="18384__inferno__largex.wav.ogg" type="audio/ogg" />
	</html:audio>
	*/

/*	
	// variables set by user - set in default preferences, left here for clarity, will be removed later
//	var WorkClass.workTime = 25; // in minutes
//	var WorkClass.breakTime = 5; // in minutes
//	var WorkClass.showAlert = true; // shows a pop up alert
	//var bigBreakTime = 1; // in minutes
	//var sessions = 4; // number of sessions before big break
*/

	// variables set in execution
	var sessionTime; // in miliseconds
	//var currentSession; // current number of session
	var t; // setTimeout object
	var pomodoroState = 'noWork'; // work, break, noWork
		
	// XUL sound player	
	var alarm = Components.classes["@mozilla.org/sound;1"]
            .createInstance(Components.interfaces.nsISound);
	alarm.init();
	
	var alarmURI = Components.classes["@mozilla.org/network/io-service;1"]  
                          .getService(Components.interfaces.nsIIOService)  
                          .newURI("chrome://WorkWork/content/sounds/alarm_beep.wav", null, null);  
    // Checking URI for future feature of adding custom sound files
	try {  
      var alarmURL = alarmURI.QueryInterface(Components.interfaces.nsIURL);  
    }  
    catch(e) {  
      alert("The URI is not an URL.");  
    }  
	
	function buttonClicked(){
		if(pomodoroState == 'noWork'){
			startWork();
		}else{
			stopWork();
		}
	}

	function startWork(){
		pomodoroState = 'work';
		var b = document.getElementById('button');
		b.label = "Work!";
		b.style.color="Red";
		
		var d = new Date();
		sessionTime = d.getTime();
		clock();
	}
	
	function stopWork(){
		pomodoroState = 'noWork';
		var b = document.getElementById('button');
		b.label = "Stopped";
		b.style.color="Green";
		
		sessionTime = 0;
		clearTimeout(t);			
	}
	
	function clock(){
		var d = new Date();
		var currentTime = d.getTime();
		if(pomodoroState == 'work'){
			if((currentTime - sessionTime)/60000 > WorkClass.workTime)
				takeBreak();
		}
		else if(pomodoroState == 'break'){
			if((currentTime - sessionTime)/60000 > WorkClass.breakTime)
				endBreak();				
		}
		
		t = setTimeout("clock()", 1000);				
	}
	
	function takeBreak(){
		pomodoroState = 'break';
		alarm.play(alarmURL);
		if(WorkClass.showAlert)
			alert("Take a break!"); // TODO: make this optional
		
		var b = document.getElementById('button');
		b.label = "Break";
		b.style.color="Blue";
		
		var d = new Date();
		sessionTime = d.getTime();
	}
	
	function endBreak(){
		pomodoroState = 'work';
		alarm.play(alarmURL);
		if(WorkClass.showAlert)
			alert("Get back to work!"); // TODO: make this optional
		
		var b = document.getElementById('button');
		b.label = "Work!";
		b.style.color="Red";
		
		var d = new Date();
		sessionTime = d.getTime();
	}
	