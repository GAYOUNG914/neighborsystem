// // import '../themes/style.scss';

////carousel

let isDragging = false;
let startX, scrollLeft, percent;
const slider = document.querySelector('.carousel');
const sliderTrack = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.crousel-slide');
const lastIndex = slides.length - 1;
let selected = 0;
let interval;


// sliderTrack.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   startX = e.pageX - sliderTrack.offsetLeft; //부모로부터 좌로 얼마나 떨어져 있는지
//   // scrollLeft = sliderTrack.scrollLeft;

//   console.log('down')
// });

// sliderTrack.addEventListener('mouseup', () => {
//   isDragging = false;

//   console.log('up')

//   // setSliderState(percent);
// });

// sliderTrack.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;
//   e.preventDefault();
//   const x = e.pageX - sliderTrack.offsetLeft;
//   const walk = x - startX;
//   // sliderTrack.scrollLeft = scrollLeft - walk;

//   percent = walk/startX * 100;

//   // setSliderCSS(percent);

//   console.log('move')
// });

function initSlideState (){

  for(let i=0; i < slides.length; i++){
    slides[i].setAttribute('data-index',i);
  }

  for(let a of slides){
    // if(!a.classList.contains('crousel-slide--active')){

      a.classList.remove('crousel-slide--active');
      // console.log(a.getAttribute('data-index'))
      if(a.getAttribute('data-index') == selected)a.classList.add('crousel-slide--active');
    // }
  }
  console.log(selected)
  

  const activeIndex = Array.from(slides).findIndex(element => element.classList.contains('crousel-slide--active'));
  
}


//슬라이드 전환 시 CSS Animation 속성을 부여
const setTransition = (value) => {
  sliderTrack.style.transition = value;
};

//슬라이드 인덱스에 맞춰 CSS Translate 값을 조정
const setTranslate = ({ index, reset }) => {
  if (reset) sliderTrack.style.transform = `translate(-${sliderTrack.clientWidth/slides.length}px, 0)`;
  else 
  sliderTrack.style.transform = `translate(-${(index + 1) * sliderTrack.clientWidth/slides.length}px, 0)`;
};

const handlePrev = () => {
  selected -= 1;
  setTransition('transform 0.3s linear');
  if (selected < 0) {
    selected = 0;
    slides[lastIndex].remove();
    slides[lastIndex-1].remove();


    initSlideState();
    setTranslate({ index: selected });
    selected = lastIndex;

  }
};

const handleNext = () => {
  selected += 1;
  setTransition('transform 0.3s linear');
  setTranslate({ index: selected });
  if (selected > lastIndex) {
    selected = 0;

  }
  initSlideState();
  // console.log(selected);
};

const makeButton = () => {
  if (slides.length > 1) {
    const prevButton = document.createElement('button');
    prevButton.classList.add('btn');
    prevButton.classList.add('btn-prv');
    // prevButton.innerHTML = '<div class="carousel-btns"></div>';
    prevButton.addEventListener('click', handlePrev);

    const nextButton = document.createElement('button');
    nextButton.classList.add('btn');
    nextButton.classList.add('btn-next');
    // nextButton.innerHTML = '<div class="carousel-btns"></div>';
    nextButton.addEventListener('click', handleNext);

    document.querySelector('.carousel-btns').appendChild(prevButton);
    document.querySelector('.carousel-btns').appendChild(nextButton);
  }
};


const cloneElement = () => {
  sliderTrack.prepend(slides[lastIndex].cloneNode(true));
  sliderTrack.prepend(slides[lastIndex - 1].cloneNode(true));
  // for(let i=slides.length - 1; i > -1 ; i--){
  //   sliderTrack.prepend(slides[i].cloneNode(true));
  // }
  // sliderTrack.append(slides[1].cloneNode(true));
  setTranslate({ reset: true });
};

const render = () => {
  initSlideState();
  makeButton();
  cloneElement();
  // autoplay({ duration: 2000 });
};
render();



// function setSliderState(percent){

  // const activeSlide = document.querySelector('.crousel-slide--active');
  // const prevSlide = document.querySelector('.crousel-slide--prev');
  // const prevprevSlide = document.querySelector('.crousel-slide--prev--prev');
  // const nextSlide = document.querySelector('.crousel-slide--next');
  // const nextnextSlide = document.querySelector('.crousel-slide--next--next');

  // const prevprevIndex = Array.from(slides).findIndex(element => element.classList.contains('crousel-slide--prev--prev'));
  // const nextnextIndex = Array.from(slides).findIndex(element => element.classList.contains('crousel-slide--next--next'));

  // if (percent < 0 && slides.length > 5){
  //   //좌로 드래그, 슬라이드 갯수 5개보다 많음
  
  //   //prevprev가 안보여야됨
  //   activeSlide.setAttribute('class','crousel-slide--prev');
  //   prevSlide.setAttribute('class','crousel-slide--prev--prev');
  //   prevprevSlide.setAttribute('class','crousel-slide');
  //   nextSlide.setAttribute('class','crousel-slide--active');
  //   nextnextSlide.setAttribute('class','crousel-slide--next');
  //   //nextnext다음의 슬라이드에 nextnext 클래스 붙어야함
  //   //nextnext다음의 슬라이드 인덱스 들고와서 클래스 붙이면 될듯
  //   slides[nextnextIndex + 1].setAttribute('class','crousel-slide--next--next');
  // }else if(percent < 0 && slides.length == 5){
  //   //좌로 드래그, 슬라이드 갯수가 5개
  //   //이 땐 어떻게 할겨..?
  // }else if(percent < 0 && slides.length < 5){
  //   //좌로 드래그, 슬라이드 갯수가 5개 미만
  //   //이 땐 어떻게 할겨..?
  // }

  // if(percent > 0 && slides.length > 5){
  //   //우로 드래그, 슬라이드 갯수 5개보다 많음
    
  //   //nextnext가 안보여야됨
  //   activeSlide.setAttribute('class','crousel-slide--next');
  //   prevSlide.setAttribute('class','crousel-slide--active');
  //   prevprevSlide.setAttribute('class','crousel-slide--prev');
  //   nextSlide.setAttribute('class','crousel-slide--next--next');
  //   nextnextSlide.setAttribute('class','crousel-slide');
  //   //prevprev이전의 슬라이드에 prevprev 클래스 붙어야함
  //   //prevprev이전의  슬라이드 인덱스 들고와서 클래스 붙이면 될듯    
  //   slides[prevprevIndex - 1].setAttribute('class','crousel-slide--prev--prev');
  // }

// }

gsap.to( slider, { y: -150, opacity: 1, scale: 1, delay: 1.85, duration: 1.4, ease: "expo.out" })

