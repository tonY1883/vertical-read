var CONVERTED_PUNCTUATION = {
	"—": "〡",
	"〞": "﹁",
	"〝": "﹂",
	"「": "﹁",
	"」": "﹂",
	"…": "⋮",
	"\\.\\.\\.": "⋮",
	"\\?": "？",
	":": "：",
	";": "；",
	"!": "！",
};

var fileSelector = document.getElementById("file_input");
fileSelector.addEventListener('change', () => {
	var file = fileSelector.files[0];
	fname = file.name;
	var reader = new FileReader();
	reader.onload = function (e) {
		var contents = e.target.result;
		prepareText(contents);
	};
	reader.readAsText(file);
});

var fontSizeSelector = document.getElementById("font_size");
fontSizeSelector.addEventListener('change', () => {
	let fontSize = fontSizeSelector.value;
	document.getElementById("text").style.fontSize = (fontSize + "rem");
});

var fontSelector = document.getElementById("font_select");
fontSelector.addEventListener('change', () => {
	document.getElementById("text").style.fontFamily = fontSelector.options[fontSelector.selectedIndex].value;
});

var bgColorSelector = document.getElementById("bg_color");
bgColorSelector.addEventListener('change', () => {
	document.getElementById("text").style.backgroundColor = bgColorSelector.value;
});

var fgColorSelector = document.getElementById("fg_color");
fgColorSelector.addEventListener('change', () => {
	document.getElementById("text").style.color = fgColorSelector.value;
});

function prepareText(inputString) {
	var paragraphs = inputString.split(/[\r\n]+/);

	showText(paragraphs);
}

function showText(paragraphs) {
	var page = document.getElementById("text");
	page.innerHTML = "";
	var html = "";
	for (let index = 0; index < paragraphs.length; index++) {
		//TODO parse styling
		let content = paragraphs[index];
		for (let [key, value] of Object.entries(CONVERTED_PUNCTUATION)) {
			let re = new RegExp(key, "g");
			content = content.replace(re, value);
		}
		html += "<p>" + content + "</p>";
	}
	page.innerHTML = html;
}
