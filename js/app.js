const start_btn = document.querySelector(".start_btn");
const continue_btn = start_btn.querySelector('.restart');
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const restart_quiz = result_box.querySelector(".restart");

start_btn.onclick = () => {
    start_btn.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
}

let que_count = 0;
let userScore = 0;

function showQuestions(index) {
    const quiz_text = document.querySelector(".quiz_text");

    let que_tag = '<span>' + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] + '</span></div>'

    quiz_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

const next_btn = document.querySelector('.next_btn');
next_btn.onclick = () => {
    if(que_count < questions.length - 1){
        que_count++;
        showQuestions(que_count);
    } else {
        showResult();
    }
}

function optionSelected(answer){
    let userAns = answer.textContent; // user tanlagan variant
    let correctAns = questions[que_count].answer; // arraydan kelayotgan to'g'ri javob
    const allOptions = option_list.children.length; // barcha variantlarimizni olamiz
    // qancha bo'lishidan qatiy nazar 

    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add('correct');
        console.log('Correct answer' + ' ' + userScore);
    } else {
        answer.classList.add('incorrect');
        console.log('Wrong answer')
    }

    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add('disabled');
    }

    next_btn.classList.add('show');
}

function showResult() {
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 3) {
        let scoreTag = '<p>🥳 Wooow sen' + userScore + ' tasiga javob berolding!</p>'
        scoreText.innerHTML = scoreTag;
    } else if(userScore > 1) {
        let scoreTag = '<p>😉 Yaxshi' + userScore + ' tasiga javob berolding!</p>'
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<p>😐 Afsuski seni baling yetarli emas!</p>'
        scoreText.innerHTML = scoreTag;
    }
}

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove('activeResult');
    que_count = 0;
    userScore = 0;
    showQuestions(que_count)
    next_btn.classList.remove('show');
}