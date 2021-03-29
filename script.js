/* Индекс слайда по умолчанию */
let show=1;
const secondsTimer=3;
let delay=1;
let seconds = secondsTimer;
let slideIndex=1;
let timer=0;

show = Number(localStorage.getItem("show"));
slideIndex=Number(localStorage.getItem("slideIndexStorage"));

if (!show){
    delay=0;
}

if (show){
    document.write("ВЫКЛ")
}else{
    document.write("ВКЛ")
}

const onButton = document.querySelector('#button');

document.addEventListener('keydown', function(e){
    switch(e.key){

        case "ArrowLeft":  // если нажата клавиша влево
            minusSlide()
            break;
        case "ArrowRight":   // если нажата клавиша вправо
            plusSlide()
            break;
        case "Escape":
            console.log("3qwe")
            changeButton()
            break;

    }
});

onButton.addEventListener('click', () =>{
    changeButton()
});

function changeButton(){
    resetTimer()
    if(show) {
        onButton.textContent='ВКЛ'
        show = 0;
        delay=0;
        localStorage.setItem("show",String(0));
    }
    else {
        onButton.textContent='ВЫКЛ'
        show = 1;
        delay=1;
        localStorage.setItem("show",String(1));
    }
    seconds=secondsTimer+1;
}

showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
    resetTimer();
    seconds=secondsTimer+1
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);
    resetTimer();
    seconds=secondsTimer+1
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    resetTimer();
    showSlides(slideIndex = n);
    seconds=secondsTimer+1;
}

/* Основная функция сладера */
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("item");
    const dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    console.log(slideIndex);
    localStorage.setItem("slideIndexStorage",String(slideIndex));
}

resetTimer();

function resetTimer(){
    clearInterval(timer) //Очистим интервал, это позволит прервать его работу и отменить перелистывание
    timer = setInterval(function(){
        slideIndex+=delay;
        showSlides(slideIndex);
    },secondsTimer*1000);
}

setInterval(()=>{
    seconds = seconds - 1;
    if(!seconds){seconds = secondsTimer;}
    document.getElementById("timeVisual").innerHTML = seconds
},1000)





