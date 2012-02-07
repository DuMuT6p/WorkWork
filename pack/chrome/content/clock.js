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
	
	// variables set by user
	var workTime = 25; // in minutes
	var breakTime = 5; // in minutes
	//var bigBreakTime = 1; // in minutes
	//var sessions = 4; // number of sessions before big break

	// variables set in execution
	var sessionTime; // in miliseconds
	//var currenSession; // current number of session
	var t; // setTimeout object
	var pomodoroState = 'noWork'; // work, break, noWork
		
	// XUL sound player	
	var alarm = Components.classes["@mozilla.org/sound;1"]
            .createInstance(Components.interfaces.nsISound);
	alarm.init();
	
	var alarmURI = Components.classes["@mozilla.org/network/io-service;1"]  
                          .getService(Components.interfaces.nsIIOService)  
                          .newURI("chrome://workwork/content/alarm_beep.wav", null, null);  
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
			if((currentTime - sessionTime)/60000 > workTime)
				takeBreak();
		}
		else if(pomodoroState == 'break'){
			if((currentTime - sessionTime)/60000 > breakTime)
				endBreak();				
		}
		
		t = setTimeout("clock()", 1000);				
	}
	
	function takeBreak(){
		pomodoroState = 'break';
		alarm.play(alarmURL);
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
		alert("Get back to work!"); // TODO: make this optional
		
		var b = document.getElementById('button');
		b.label = "Work!";
		b.style.color="Red";
		
		var d = new Date();
		sessionTime = d.getTime();
	}
	