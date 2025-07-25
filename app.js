let question_fileld = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container_h3')
let container_h3a = document.querySelector('.container_h3a')
function randint(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
let signs=['+','-','*','/']
function GetRandomSign(){
    return signs[randint(0,signs.length)];
} 
function shuffle(array){
    let current_index = array.length,randomIndex;
    while(current_index!=0){
        randomIndex = Math.floor(Math.random()*current_index);
        current_index--;
        [array[current_index],array[randomIndex]]=[array[randomIndex],array[current_index]];
    }
    return array
}
class Question{
    constructor(){
    let a = randint(1,50)
    let b = randint(1,50)
    let sign = GetRandomSign()
    this.question=`${a} ${sign} ${b}`
    if(sign == '+'){
        this.correct = a + b
    }else if (sign == '-'){
        this.correct = a - b
    }else if (sign == '*'){
        this.correct = a * b
    }else if (sign == '/'){
        this.correct = a / b
    }
    this.answers = [
        +(this.correct.toFixed(2)),
        +(randint(this.correct - 15,this.correct - 1).toFixed(2)),
        +(randint(this.correct - 15,this.correct - 1).toFixed(2)),
        +(randint(this.correct + 15,this.correct + 1).toFixed(2)),
        +(randint(this.correct + 15,this.correct + 1).toFixed(2)),
    ]
    shuffle(this.answers)
    }
    display(){
        question_fileld.innerHTML=this.question
        for(let i = 0;i<this.answers.length;i+=1){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}
let correct_answers_given = 0
let total_answer_given = 0
let total_answer=0
let current_question = new Question()
current_question.display()
function updateCounter(){
    container_h3.innerHTML = `Ти відповів правильно на ${total_answer_given} запитань`
    container_h3a.innerHTML = `Ти відповів на ${total_answer} запитань`
}
updateCounter();
for(let i = 0;i<answer_buttons.length;i+=1){
    answer_buttons[i].addEventListener('click',function(){
        if(answer_buttons[i].innerHTML == current_question.correct){
            correct_answers_given+=1
            answer_buttons[i].style = 'background-color:green;'
            anime({
                targets:answer_buttons[i],
                background:'#FFFFFF',
                duration:500,
                delay:100,
                easing:'linear'
            })
            total_answer_given += 1
        }else{
          answer_buttons[i].style = 'background-color:red;'
            anime({
                targets:answer_buttons[i],
                background:'#FFFFFF',
                duration:500,
                delay:100,
                easing:'linear'  
            })
        }
        total_answer+=1
        updateCounter()
        current_question = new Question()
        current_question.display()
    })
}