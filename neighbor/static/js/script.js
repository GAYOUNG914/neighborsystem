// // import '../themes/style.scss';

////carousel
const prevButton = document.querySelector('.btn-prv');
const nextButton = document.querySelector('.btn-next');
const $currentIndex = document.querySelector('.current-index');
const $slidesLength = document.querySelector('.slides-length');
const slider = document.querySelector('.carousel');
const sliderTrack = document.querySelector('.carousel-track');
let slides = document.querySelectorAll('.crousel-slide');
let currentIndex = 0;
let interval;

gsap.to( slider, {y:-150, opacity: 1, delay: 1.85, duration: 1.4, ease: "expo.out" });


function initSlideIndex(){
  $slidesLength.textContent = '/' + slides.length;

  for (let i = 0; i < slides.length; i++) {
    
    slides[i].setAttribute('data-index',i);

    if(i > slides.length/2){
        slides[i].setAttribute('data-index',Math.floor(slides.length/2) - i);
    }
  }
  for (let i = 0; i < slides.length; i++) {
    if(slides[i].getAttribute('data-index') < 0){
      const firstChild = sliderTrack.firstElementChild;
      sliderTrack.insertBefore(slides[i], firstChild);
    }
  }
}

function moveSlide(num){

  currentIndex = num;
  
  $currentIndex.textContent = num + 1;
  if(num + 1 <= 0){
    num = slides.length + num
    $currentIndex.textContent = num + 1;
  }

  for(let a of slides){
    a.classList.remove('active');
    a.classList.remove('prev');
    a.classList.remove('next');

    if(currentIndex > slides.length/2){
      currentIndex = currentIndex - slides.length
    }

    if(a.getAttribute('data-index') == currentIndex){
      a.classList.add('active')
    }else if(a.getAttribute('data-index') == currentIndex - 1){
      a.classList.add('prev')
    }else if(a.getAttribute('data-index') == currentIndex + 1){
      a.classList.add('next')
    }

    //끝 인덱스 분기처리
    if(currentIndex + 1 > slides.length/2){
      a.classList.remove('next');
      if(a.getAttribute('data-index') == currentIndex - (slides.length - 1)){
        a.classList.add('next');
      }
    }else if(currentIndex - 1 < -1 * Math.floor(slides.length/2) && slides.length % 2 !== 0){
      //slides.length 홀수
      a.classList.remove('prev');
      if(a.getAttribute('data-index') == -currentIndex){
        a.classList.add('prev');
      }
    }else if(currentIndex - 1 < -1 * Math.floor(slides.length/2) + 1 && slides.length % 2 == 0){
      //slides.length 짝수
      a.classList.remove('prev');
      if(a.getAttribute('data-index') == Math.floor(slides.length + currentIndex - 1)){
        a.classList.add('prev');
      }
    }
  }
  // console.log(-1 * Math.floor(slides.length/2))
}


prevButton.addEventListener('click',()=>{
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveSlide(currentIndex);
})

nextButton.addEventListener('click',()=>{
  currentIndex = (currentIndex + 1) % slides.length;
  moveSlide(currentIndex);
})

initSlideIndex();
moveSlide(currentIndex);

//드래그 슬라이드
//api 클릭 이벤트 (노션 참고)
//보드판 나오게 작업
//마법진 안 잘리게 + 다듬기 (a : 실린더로 빛 효과)
//플러그인화(스피드,딜레이,액티브 슬라이드 정보 콘솔찍기)

