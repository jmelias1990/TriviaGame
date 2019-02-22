var triviaQuestions = [{
	question: "What is the name of the extra toe some dogs have on their front paws?",
	answerList: ["Pinky", "Dewclaw", "Four Finger", "Thumb"],
	answer: 1
},{
	question: "What dog breed was recognized as royalty in ancient China?",
	answerList: ["Pug", "Pittbull", "Shiba Inu", "Poodle"],
	answer: 0
},{
	question: "Which breed originated from Germany?",
	answerList: ["Rottweiler", "Akita", "Yorkie", "Shih Tzu"],
	answer: 0
},{
	question: "Where is the only place a dog can sweat from?",
	answerList: ["Ears", "Butt Cheeks", "Paw Pads", "Top of Head"],
	answer: 2
},{
	question: "What do dogs do to cool off?",
	answerList: ["Shake", "Walk in Circles", "Sleep", "Pant"],
	answer: 3
},{
	question: "How many vocal sounds do dogs have?",
	answerList: ["10", "3", "25", "7"],
	answer: 0
},{
	question: "What orgin do humans have that dogs dont?",
	answerList: ["Heart", "Appendix", "Kidneys", "Gallbladder"],
	answer: 1
},{
	question: "What helps a dog 'see' in the dark?",
	answerList: ["Paws", "Ears", "Wiskers","Tail"],
	answer: 2
},{
	question: "How many teeth do normal adult dogs have?",
	answerList: ["24", "42", "50", "38"],
	answer: 1
},{
	question: "What is a dog's most highly developed sense?",
	answerList: ["Sound", "Sight", "Taste", "Smell"],
	answer: 3
},{
	question: "What is the most popular breed of dog, according to the American Kennel Club’s registrations?",
	answerList: ["Labrador", "Beagle", "Corgi", "Pug"],
	answer: 0
},{
	question: " How old was the world’s oldest dog, an Australian cattle hound named Bluey, in human years?",
	answerList: ["30", "29", "27","40"],
	answer: 1
},{
	question: "What is the name of the dog on the front of the Cracker Jack box?",
	answerList: ["Fido", "Spot", "Max", "Bingo"],
	answer: 3
},{
	question: "What breed of dog is the smallest used in hunting?",
	answerList: ["Mini Dachshund", "Toy Poodle", "Chihuahua", "Mini Pinscher"],
	answer: 0
},{
	question: "Which dog yodels instead of barks?",
	answerList: ["Otterhound", "Shiba Inu", "Basenji", "Basset Hound"],
	answer: 2
}];

var gifArray = ['HappyDog', 'NoDog', 'tilt', 'hello', 'blow', 'shiba', 'swim', 'fall', 'grass', 'beg', 'five', 'fren', 'tug','smile','boops'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}