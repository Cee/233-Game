var canvas;
var stage;

var index_image;
var btn_begin_normal;
var btn_explain_normal;
var btn_rank_normal;

var explain_image;
var icon_back;

var rank_image;


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

	scale(index_image);
	scale(btn_explain_normal);
	scale(btn_rank_normal);
	scale(btn_begin_normal);
	scale(rank_image);

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
	// stage.update();
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
	stage.removeChild(rank_image);
	stage.removeChild(icon_back);
	icon_back.removeAllEventListeners();
	addIndexPage();
	stage.update();
}

/** Scale **/
function scale(obj) {
	obj.scaleX = .5;
	obj.scaleY = .5;
}


function adjust() {
	$("#rank").css("margin-left", $(window).width() / 2 - 140);
}

$(document).ready(function() {
	$(window).resize(function () {
        adjust();
    });
    document.ontouchmove = function(event){
    	event.preventDefault();
	}
});