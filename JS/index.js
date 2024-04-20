function hasCookie(name) {
	return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (hasCookie("check")) {
	setCookieData('check',{expires: 1 }, ".", 1000*60*60*24); 
}

if (hasCookie("current") && !hasCookie("check")) {
    if (getCookie("current") == "athor") {
		window.open("../dopinf.html", "_self");
	} else if (getCookie("current") == "otsylki") {
		window.open("../ssylki.html", "_self");
	} else if (getCookie("current") == "practica") {
		window.open("../practica.html", "_self");
	} else if (getCookie("current") == "teoria") {
		window.open("../teoria.html", "_self");
	} else if (hasCookie("lastVisit")) {
		var time =  getCookie("lastVisit");
		setCookieData('check',{expires: 1 }, ".", 1000*60*60*24);
		setTimeout(function() {
			alert("Последний раз вы посещали сайт: " + time); 
   		}, 1000);
	}
} else if (!hasCookie("check")) {
	setCookieData('check',{expires: 1 }, ".", 1000*60*60*24);
	setTimeout(function() {
		alert("До этого вы не посещали данный сайт.");  
   }, 1000);
}
 
if (hasCookie("none")) {
	setCookieData("none", {expires: 1 }, "y", 1000*60*60*24);
	setCookieData("current", {expires: -1 }, "y", 1);
	setCookieData("lastVisit", {expires: -1 }, "y", 1);
	setCookieData("scrollT", {expires: -1}, "y", 1);
	setCookieData("scrollP", {expires: -1}, "y", 1);
}

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

window.addEventListener("unload", function() {
	if (!hasCookie("none") && !hasCookie("check")) {
		setCookieData('current',{expires: 1 }, "index", 1000*60*60*24);
	} else if (!hasCookie("none")) {
		setCookieData('lastVisit',{expires: 1 }, "time", 1000*60*60*24);
		setCookieData('check',{expires: 1 }, ".", 3000);
		setCookieData('current',{expires: 1 }, "index", 1000*60*60*24);
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

function onEntry2(entry) {
	entry.forEach(change => {
	 if (change.isIntersecting) {
	change.target.classList.add('visible2');
	} else {
	change.target.classList.remove('visible2');
	}});
}


let options = { threshold: [0.5]};
let observer2 = new IntersectionObserver(onEntry2, options);
let elements2 = document.querySelectorAll('.scroll2');

for (let elm of elements2) {
	observer2.observe(elm);
}

document.getElementById('btn').onclick = none;

function none() {
	setCookieData("none", {expires: 1 }, "y", 1000*60*60*24);
	setCookieData("current", {expires: -1 }, "y", 1);
	setCookieData("lastVisit", {expires: -1 }, "y", 1);
	setCookieData("scrollT", {expires: -1}, "y", 1);
	setCookieData("scrollP", {expires: -1}, "y", 1);
	alert("Cookie не будут сохранятся")
}