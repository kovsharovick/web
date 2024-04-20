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

if (hasCookie("scrollP") && !hasCookie("none")) {
	window.scrollTo(0, getCookie("scrollP"));
	setCookieData('scrollP',{expires: -1 }, ".", 1000*60*60*24);
}

if (!hasCookie("check") && !hasCookie("none") && hasCookie("lastVisit")) {
	var time = getCookie("lastVisit");
	setCookieData('check',{expires: 1 }, ".", 1000*60*60*24);
	setTimeout(function() {
		alert("Последний раз вы посещали сайт: " + time); 
   }, 1000);
}

if (hasCookie("none")) {
	setCookieData("none", {expires: 1 }, "y", 1000*60*60*24);
	setCookieData("current", {expires: -1 }, "y", 1);
	setCookieData("lastVisit", {expires: -1 }, "y", 1);
	setCookieData("scrollP", {expires: -1}, "y", 1);
}

window.addEventListener("unload", function() {
	if (!hasCookie("none")) {
		setCookieData('lastVisit',{expires: 1}, "time", 1000*60*60*24);
		setCookieData("scrollP", {expires: 1}, window.pageYOffset, 1000*60*60*24);
		setCookieData('check',{expires: 1}, ".", 3000);
		setCookieData('current',{expires: 1}, "practica", 1000*60*60*24);
	} else {
		setCookieData("none", {expires: 1 }, "y", 3000);
		setCookieData('check',{expires: 1 }, ".", 3000);
	}
});


let button = document.querySelector('#add');
button.addEventListener("click", animateonce);

function animateonce() {
  button.classList.add("click");
  window.location = "mailto:esikov.2005@gmail.com?subject=Предложение;body=Здравствуйте! Я бы хотел предложить вам свой анекдот ";
  setTimeout(() => {
    button.classList.remove("click");
  }, 300);
}

button.addEventListener("click", (e) => {
	let path = e.currentTarget.getAttribute('data-path');
	document.querySelector('[data-target="${path}"]').classList.add("modal-visible");
	modalOverlay.classList.add("modal-overlay-visible");
	
});

window.onload = function() {
	let preloader = document.getElementById("preloader");
	preloader.classList.add("hide");
	setTimeout(function() {
		preloader.classList.add("hidden");
	},450)
}

var check = window.pageYOffset;
window.onscroll = function showHeader() {
	let header = document.querySelector(".header");
	if (window.pageYOffset > 300) {
		header.classList.add('header_fixed');
		check = 1;
	} else if (window.pageYOffset > 250 && check > 0) {
		header.classList.remove('header_fixed');
		header.classList.add('header_left');
		check = 0;
	} else {
		header.classList.remove('header_left');
	}
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

function onEntry5(entry) {
	entry.forEach(change => {
	 if (change.isIntersecting) {
	change.target.classList.add('visible5');
	} else {
	change.target.classList.remove('visible5');
	}});
}

let observer5 = new IntersectionObserver(onEntry5, options);
let elements5 = document.querySelectorAll('.scroll5');

for (let elm of elements5) {
	observer5.observe(elm);
}

function onEntry1(entry) {
	entry.forEach(change => {
	 if (change.isIntersecting) {
	change.target.classList.add('visible1');
	}});
}

let observer1 = new IntersectionObserver(onEntry1, options);
let elements1 = document.querySelectorAll('.scroll1');

for (let elm of elements1) {
	observer1.observe(elm);
}