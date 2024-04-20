function setCookieData(name, options, val, time) {
	if(options.expires) {
		var date = new Date();
		var value = (val == 'time') ? output() : val;
		date.setTime(date.getTime() + time * options.expires);
		options.expires = date.toUTCString();}
	var forSave = name + '=' + value;
	for(var key in options) {
		forSave += ';' + key + '=' + options[key];}
	document.cookie = forSave;
}

function output() {
	var res = "";
	var date = new Date();
	switch(date.getDay()) {
		case 0: res+="воскресенье ";
		break;
		case 1: res+="понедельник ";
		break;
		case 2: res+="вторник ";
		break;
		case 3: res+="среда ";
		break;
		case 4: res+="четверг ";
		break;
		case 5: res+="пятница ";
		break;
		case 6: res+="суббота ";
		break;
	}
	res += date.getHours()+ ((date.getMinutes()<10) ? ":0" : ":")+date.getMinutes();
	return res;
}

function hasCookie(name) {
	return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (!hasCookie("check") && !hasCookie("none") && hasCookie("lastVisit")) {
	var time = getCookie("lastVisit");
	setTimeout(function() {
		alert("Последний раз вы посещали сайт: " + time); 
		setCookieData('check',{expires: 1 }, ".", 1000*60*60*24);
   }, 1000);
}

if (hasCookie("none")) {
	setCookieData("none", {expires: 1 }, "y", 1000*60*60*24);
	setCookieData("current", {expires: -1 }, "y", 1);
	setCookieData("lastVisit", {expires: -1 }, "y", 1);
}

window.addEventListener("unload", function() {
	if (!hasCookie("none")) {
		setCookieData('lastVisit',{expires: 1 }, "time", 1000*60*60*24);
		setCookieData('current',{expires: 1 }, "otsylki", 1000*60*60*24);
		setCookieData('check',{expires: 1 }, ".", 3000);
	} else {
		setCookieData('check',{expires: 1 }, ".", 3000);
		setCookieData("none", {expires: 1 }, "y", 3000);
	}
});

window.onload = function() {
	let preloader = document.getElementById("preloader");
	preloader.classList.add("hide");
	setTimeout(function() {
		preloader.classList.add("hidden");
	},450)
}