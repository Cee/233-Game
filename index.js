var canvas;
var stage;

var index_image;
var btn_begin_normal;
var btn_explain_normal;
var btn_rank_normal;

var explain_image;
var icon_back;

var rank_image;

var game_bg;

var game_refresh_timer = null;
var game_logic_timer = null;
var showingIcons = new Array();
var duration = 3000.0;
var icon_count = 0;
var all_height = 550;
var timePoint = 0;
var speed = 800;

status = 0;
score = 0;

function init() {

	canvas = document.getElementById("game_canvas");
	stage = new createjs.Stage("game_canvas");

	createjs.Touch.enable(stage);
	stage.enableMouseOver();

	if (window.devicePixelRatio) {
		// grab the width and height from canvas
		var height = canvas.getAttribute('height');
		var width = canvas.getAttribute('width');
		// reset the canvas width and height with window.devicePixelRatio applied
		canvas.setAttribute('width', Math.round(width * window.devicePixelRatio));
		canvas.setAttribute('height', Math.round( height * window.devicePixelRatio));
		// force the canvas back to the original size using css
		canvas.style.width = width+"px";
		canvas.style.height = height+"px";
		// set CreateJS to render scaled
		stage.scaleX = stage.scaleY = window.devicePixelRatio;
	}
	
	loadImage();
	addIndexPage();
}

function loadImage() {
	index_image = new createjs.Bitmap("img/index_bg.png");
	btn_begin_normal = new createjs.Bitmap("img/btn_begin_normal.png");
	btn_explain_normal = new createjs.Bitmap("img/btn_explain_normal.png");
	btn_rank_normal = new createjs.Bitmap("img/btn_rank_normal.png");
	explain_image = new createjs.Bitmap("img/explain_bg.jpg");
	icon_back = new createjs.Bitmap("img/icon_back.png");
	rank_image = new createjs.Bitmap("img/rank_bg.jpg");
	game_bg = new createjs.Bitmap("img/game_bg.jpg");

	scale(index_image);
	scale(btn_explain_normal);
	scale(btn_rank_normal);
	scale(btn_begin_normal);
	scale(rank_image);
	scale(game_bg);

	btn_explain_normal.x = 30;
	btn_explain_normal.y = 420;
	btn_explain_normal.addEventListener("click", handleExplainClick);

	btn_rank_normal.x = 200;
	btn_rank_normal.y = 420;
	btn_rank_normal.addEventListener("click", handleRankClick);

	btn_begin_normal.x = 65;
	btn_begin_normal.y = 265;
	btn_begin_normal.addEventListener("click", handleStartClick);

	icon_back.x = 0;
	icon_back.y = 0;

	index_image.image.onload = function() { 
		stage.update();
	};

	btn_explain_normal.image.onload = function() {
		stage.update();
	}

	btn_rank_normal.image.onload = function() {
		stage.update();
	}

	btn_begin_normal.image.onload = function() {
		stage.update();
	};

	explain_image.image.onload = function() {
		scale(explain_image);
	};

	icon_back.image.onload = function() {
		scale(icon_back);
	}

	
}

function addIndexPage() {
	preventOnTouchMove();
	stage.addChild(index_image);
	stage.addChild(btn_begin_normal);
	stage.addChild(btn_explain_normal);
	stage.addChild(btn_rank_normal);
	stage.update();
}

function removeIndexPage() {
	stage.removeChild(index_image);
	stage.removeChild(btn_begin_normal);
	stage.removeChild(btn_explain_normal);
	stage.removeChild(btn_rank_normal);
	stage.update();
}

/** Btn Click Handlers **/
function handleStartClick() {
	removeIndexPage();
	allowOnTouchMove();
	stage.addChild(game_bg);
	$("#game").removeClass("hide");
	stage.update();
	startGame();
}

function handleExplainClick() {
	removeIndexPage();
	icon_back.addEventListener("click", handleExplainBackClick);
	explain_image.addEventListener("click", handleExplainBackClick);
	stage.addChild(explain_image);
	stage.addChild(icon_back);
	stage.update();
}

function handleRankClick() {
	$("#rank").removeClass("hide");
	removeIndexPage();
	icon_back.addEventListener("click", handleIndexRankBackClick);
	rank_image.addEventListener("click", handleIndexRankBackClick);
	stage.addChild(rank_image);
	stage.addChild(icon_back);
	stage.update();
}

function handleExplainBackClick() {
	stage.removeChild(explain_image);
	stage.removeChild(icon_back);
	icon_back.removeAllEventListeners();
	addIndexPage();
	stage.update();
}

function handleIndexRankBackClick() {
	$("#rank").addClass("hide");
	$("#game").addClass("hide");
	stage.removeChild(rank_image);
	stage.removeChild(icon_back);
	icon_back.removeAllEventListeners();
	addIndexPage();
	stage.update();
}

/** Game **/
function startGame() {
    game_refresh_timer = setInterval(function() {
    	// move
    	$(".icon").each(function(index, element) {
    		var node = showingIcons[index];
    		var diff = timePoint - node["timePoint"];
    		var percent = parseFloat(diff / node["duration"]);
    		var top = all_height * percent;
    		$(element).css("top", top);
    	});

    	// remove
    	// var game_pool = $("#game");
    	// $(".icon").each(function(index, element) {
    	// 	if (parseInt($(element).css("top").replace('px', '')) > 480) {
    	// 		console.log(element);
    	// 		game_pool.removeChild(game_pool.childNodes[index]);
    	// 		delete showingIcons[index];
    	// 	}
    	// });
    	// $(showingIcons).each(function(index, element) {
    	// 	if (element["top"] > 480) {
    	// 		delete element;
    	// 	}
    	// })
    	// add
    	if (timePoint % speed == 0) {
    		appendIcon();
    	}
    	timePoint += 10; // timePoint: ms
    	// console.log(timePoint);
    }, 10);
}

function startGameLogic(num) {
	// game_logic_timer = setInterval(function() {
		// console.log(click_numbers.length);
		// if (click_numbers.length > 0) {
			// var num = click_numbers.shift();
			
		// }
	// }, 10);
	console.log(status, num, score);
	if (status == 0) {
		if (parseInt(num) !== parseInt(2)) {
			endGame();
		}
	} else if (status == 1) {
		if (parseInt(num) !== parseInt(3)) {
			endGame();
		}
	} else if (status == 2) {
		if (parseInt(num) !== parseInt(3)) {
			endGame();
		} else {
			score++;
		}
	}
	status++;
	status = status % 3;
}

function appendIcon() {
	icon_count++;
	var number = Math.floor(Math.random() * 2) + 2;
	var icon_class = Math.floor(Math.random() * 4) + 1;
	var left = Math.floor(Math.random() * 230);
	var degree = Math.floor(Math.random() * 180) - 90;
	var node = 	"<div class='icon_" + number + "_" + icon_class + " icon'" +
				"style='margin-left:" + left + "px; " + rotate_icon(degree) + "; top: -150px;'" +
				"id='" + number + "'" +
				"></div>";
	$("#game").append(node);
	$("#game").children().last().click(function() {
		$(this).addClass("hide");
		startGameLogic(parseInt($(this).attr("id")));
	});
	// console.log($("#game").children().last());
	// // $("#game:last-child").click(function() {
	// // 	click_numbers.push(parseInt($(this).attr("id")));
	// // 	$(this).addClass("hide");
	// // });
	var showingIcon = {
		"index": icon_count,
		"top": -150,
		"timePoint": timePoint,
		"duration": duration
	};
	showingIcons.push(showingIcon);
}

function endGame() {
	preventOnTouchMove();
	alert("End");
}
/** Scale **/
function scale(obj) {
	obj.scaleX = .5;
	obj.scaleY = .5;
}

/** Rotate **/
function rotate_icon(degree) {
	var str = 
			"-ms-transform: rotate(" + degree + "deg); /* IE 9 */" +
    		"-webkit-transform: rotate(" + degree + "deg); /* Chrome, Safari, Opera */" +
    		"transform: rotate(" + degree + "deg);";
    return str;
}

/** UI **/
function adjust() {
	$("#rank").css("margin-left", $(window).width() / 2 - 140);
	$("#game").css("margin-left", $(window).width() / 2 - 130);
}

function preventOnTouchMove() {
	document.ontouchmove = function(event){
    	event.preventDefault();
	}
}

function allowOnTouchMove() {
	document.ontouchmove = function(event){
    	return true;
	}	
}

$(document).ready(function() {
	$(window).resize(function () {
        adjust();
    });
});