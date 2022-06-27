const startBtn1 = document.getElementById('startExample1');
startBtn1.addEventListener('click', () => example1());

function example1() {
	const output = document.getElementById('output1');
	const action = document.getElementById('action1');

	let Speech;

	if ("webkitSpeechRecognition" in window) {
		Speech = webkitSpeechRecognition;
	} else if ("SpeechRecognition" in window) {
		Speech = SpeechRecognition;
	} else {
		startBtn.disabled = true;
		output.value = 'This browser does not support SpeechRecognition APIs.';
	};

	const recognition = new Speech();

	recognition.continuous = false;
	recognition.lang = 'en-US';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	recognition.onstart = () => {
		action.innerHTML = 'Listening, please speak...';
	};

	recognition.onspeechend = () => {
		action.innerHTML = 'Stopped listening.';
		recognition.stop();
	}

	recognition.onresult = (event) => {
		const transcript = event.results[0][0].transcript;
		const confidence = event.results[0][0].confidence;
		output.value = 'Text: ' + transcript + '\nConfidence: ' + confidence * 100 + '%';
	};

	recognition.start();
}

const startBtn2 = document.getElementById('startExample2');
startBtn2.addEventListener('click', () => example2());

const colors = [
	'aqua', 'azure',
	'beige', 'bisque',
	'black', 'blue',
	'brown', 'chocolate',
	'coral', 'crimson',
	'cyan', 'fuchsia',
	'ghostwhite', 'gold',
	'goldenrod', 'gray',
	'green', 'indigo',
	'ivory', 'khaki',
	'lavender', 'lime',
	'linen', 'magenta',
	'maroon', 'moccasin',
	'navy', 'olive',
	'orange', 'orchid',
	'peru', 'pink',
	'plum', 'purple',
	'red', 'salmon',
	'sienna', 'silver',
	'snow', 'tan',
	'teal', 'thistle',
	'tomato', 'turquoise',
	'violet', 'white',
	'yellow'
];

function example2() {
	const output = document.getElementById('output2');
	const action = document.getElementById('action2');

	let Speech;

	if ("webkitSpeechRecognition" in window) {
		Speech = webkitSpeechRecognition;
	} else if ("SpeechRecognition" in window) {
		Speech = SpeechRecognition;
	} else {
		startBtn.disabled = true;
		output.value = 'This browser does not support SpeechRecognition APIs.';
	};

	const recognition = new Speech();

	recognition.continuous = false;
	recognition.lang = 'en-US';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;

	let speechRecognitionList;
	if ("SpeechGrammarList" in window) {
		speechRecognitionList = new SpeechGrammarList();
		const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
		speechRecognitionList.addFromString(grammar, 1);
		recognition.grammars = speechRecognitionList;
	}

	recognition.onstart = () => {
		action.innerHTML = 'Listening, please speak...';
	};

	recognition.onspeechend = () => {
		action.innerHTML = 'Stopped listening.';
		recognition.stop();
	}

	recognition.onnomatch = () => {
		action.innerHTML = 'Could not find that color.';
	}

	recognition.onresult = (event) => {
		const transcript = event.results[0][0].transcript;
		output.value = 'Color: ' + transcript;
		output.style.backgroundColor = transcript;
	};

	recognition.start();
}