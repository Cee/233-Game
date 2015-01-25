var canvas;
var stage;

var index_image;
var btn_begin_normal;
var btn_explain_normal;
var btn_sort_normal;

var explain_image;

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
	index_image = new createjs.Bitmap("img/index_bg.jpg");
	btn_begin_normal = new createjs.Bitmap("img/btn_begin_normal.png");
	btn_explain_normal = new createjs.Bitmap("img/btn_explain_normal.png");
	btn_sort_normal = new createjs.Bitmap("img/btn_sort_normal.png");
	explain_image = new createjs.Bitmap("img/explain_bg.png");

	scale(index_image);
	scale(btn_explain_normal);
	scale(btn_sort_normal);
	scale(btn_begin_normal);

	btn_explain_normal.x = 30;
	btn_explain_normal.y = 510;
	btn_explain_normal.addEventListener("click", handleExplainClick);

	btn_sort_normal.x = 200;
	btn_sort_normal.y = 510;
	btn_sort_normal.addEventListener("click", handleSortClick);

	btn_begin_normal.x = 65;
	btn_begin_normal.y = 295;
	btn_begin_normal.addEventListener("click", handleStartClick);

	index_image.image.onload = function() { 
		stage.update();
	};

	btn_explain_normal.image.onload = function() {
		stage.update();
	}

	btn_sort_normal.image.onload = function() {
		stage.update();
	}

	btn_begin_normal.image.onload = function() {
		stage.update();
	};

	explain_image.image.onload = function() {
		scale(explain_image);
		explain_image.addEventListener("click", handleExplainBackClick);
	};

	
}

function addIndexPage() {
	stage.addChild(index_image);
	stage.addChild(btn_begin_normal);
	stage.addChild(btn_explain_normal);
	stage.addChild(btn_sort_normal);
	stage.update();
}

function removeIndexPage() {
	stage.removeChild(index_image);
	stage.removeChild(btn_begin_normal);
	stage.removeChild(btn_explain_normal);
	stage.removeChild(btn_sort_normal);
	stage.update();
}

/** Btn Click Handlers **/
function handleStartClick() {
	removeIndexPage();
	// stage.update();
}

function handleSortClick() {
	removeIndexPage();
	// stage.update();
}

function handleExplainClick() {
	removeIndexPage();
	stage.addChild(explain_image);
	stage.update();
}

function handleExplainBackClick() {
	stage.removeChild(explain_image);
	addIndexPage();
	stage.update();
}

/** Scale **/
function scale(obj) {
	obj.scaleX = .5;
	obj.scaleY = .5;
}