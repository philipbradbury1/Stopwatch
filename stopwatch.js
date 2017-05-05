

 var stopwatch = (function(){
 	var s;
 	return {
	 		settings: {
	 		watch: document.querySelectorAll(".stopwatch")[0],
	 		stop: 1,
	 		mill: 0,
	 		secs: 0,
	 		mins:0,
	 		get time(){ 
	 			return ("0" + this.mins).slice(-2) + ":" + ("0" + this.secs).slice(-2) + ":" + ("0" + this.mill).slice(-2) }
	 	},
	 	init: function() {
	 		s = this.settings;
	 		s.watch.innerHTML = s.time;
	 		console.log(s.mins);
	 		setInterval(this.timer,1);
	 	},
	 	reset: function() {
	 		stopwatch.stop();
	 		s.mill = 0;
	 		s.secs = 0;
	 		s.mins = 0;
	 		s.watch.innerHTML = s.time;
	 	},
	 	start: function() {
	 		s.stop = 0;
	 		console.log("click");
	 	},
	 	stop: function() {
	 		s.stop = 1;
	 	},
	 	timer: function(){
	 		if (s.stop === 0){
	 			if (s.mill === 100){
	 				s.secs++;
	 				s.mill = 0;
	 			}
	 			if (s.secs === 60){
	 				s.mins++;
	 				s.secs = 1;
	 			}


	 		s.watch.innerHTML = s.time;
	 		s.mill++;
	 		}else {
	 			return
	 		}
	 		
	 	}
}

})();

 stopwatch.init();


var digitalwatch = (function(){
	var s;
	var beginTime = 0;
	var timePause = 0;
	return { 
		settings:{ 
			watch:document.querySelectorAll(".digitalwatch")[0],
			stop: 1,
	 		mill: 0,
	 		secs: 0,
	 		mins:0,
	 		get time(){ 
	 			return ("0" + this.mins).slice(-2) + ":" + ("0" + this.secs).slice(-2) + ":" + ("00" + this.mill).slice(-3, -1) }
		},
		init: function() {
	 		s = this.settings;
	 		s.watch.innerHTML = s.time;
	 		setInterval(this.timer,1);
	 	},
	 	now: function(){
	 		return (new Date).getTime();
	 	},
	 	reset: function() {
	 		stopwatch.stop();
	 		s.mill = 0;
	 		s.secs = 0;
	 		s.mins = 0;
	 		s.watch.innerHTML = s.time;
	 		timePause = beginTime = 0;
	 	},
	 	start: function() {
	 		s.stop = 0;

	 		if(beginTime != 0){
	 			beginTime = beginTime
	 		} else{
	 			beginTime = digitalwatch.now();
	 		}
	 	},
	 	stop: function() {
	 		s.stop = 1;
	 		if (beginTime != 0){
	 			timePause = timePause + digitalwatch.now() - beginTime;
	 		} else{
	 			timePause = timePause;
	 		}
	 		beginTime = 0;

	 	},
	 	time: function(){
	 		return timePause + (digitalwatch.now() - beginTime);
	 	},
	 	timer: function(){
	 		if (s.stop === 0){

	 			s.mins = Math.floor(digitalwatch.time() / (60 * 1000) % 60);
	 			s.secs = Math.floor(digitalwatch.time() / 1000) % 60;
	 			s.mill = digitalwatch.time() % 1000;

	 			s.watch.innerHTML = s.time;
	 		}	
	 	}
	}


})();

digitalwatch.init();


var startButton = document.getElementById("startButton");
startButton.addEventListener("click", stopwatch.start);

var stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopwatch.stop);

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", stopwatch.reset);


var startButton2 = document.getElementById("startButton2");
startButton2.addEventListener("click", digitalwatch.start);

var stopButton2 = document.getElementById("stopButton2");
stopButton2.addEventListener("click", digitalwatch.stop);

var resetButton2 = document.getElementById("resetButton2");
resetButton2.addEventListener("click", digitalwatch.reset);