/* Начальная инициализация */
let show=1; // булево значение кнопки
const secondsTimer=3;// Задержка между слайдами
let delay=1;
let seconds = secondsTimer;
let slideIndex=1;
let timer=0;
/* Получение данных из localStorage */
show = Number(localStorage.getItem("show"));
slideIndex=Number(localStorage.getItem("slideIndexStorage"));
/* Установка значения кнопки */
if (!show){
    delay=0;
}

if (show){
    document.write("ВЫКЛ")
}else{
    document.write("ВКЛ")
}
/* Обработка нажатий */
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
/* Изменение текста кнопки и прокрутки */
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

/* Следущий слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
    resetTimer();
    seconds=secondsTimer+1
}

/* Предыдущий слайд*/
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
/* Сброс таймера */
function resetTimer(){
    clearInterval(timer) 
    timer = setInterval(function(){
        slideIndex+=delay;
        showSlides(slideIndex);
    },secondsTimer*1000);
}
/* Таймер */
setInterval(()=>{
    seconds = seconds - 1;
    if(!seconds){seconds = secondsTimer;}
    document.getElementById("timeVisual").innerHTML = seconds
},1000)





