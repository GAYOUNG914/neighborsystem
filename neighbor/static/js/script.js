// // import '../themes/style.scss';

// //carousel

// let isDragging = false;
// let startX, scrollLeft, percent;
// const slider = document.querySelector('.ai-monitor__carousel');
// const slides = document.querySelectorAll('.ai-monitor__carousel__slide');
// const activeSlide = document.querySelector('.ai-monitor__carousel__slide--active');
// const prevSlide = document.querySelector('.ai-monitor__carousel__slide--prev');
// const prevprevSlide = document.querySelector('.ai-monitor__carousel__slide--prev--prev');
// const nextSlide = document.querySelector('.ai-monitor__carousel__slide--next');
// const nextnextSlide = document.querySelector('.ai-monitor__carousel__slide--next--next');

// slider.addEventListener('mousedown', (e) => {
//   isDragging = true;
//   startX = e.pageX - slider.offsetLeft; //부모로부터 좌로 얼마나 떨어져 있는지
//   // scrollLeft = slider.scrollLeft;

//   console.log('down')
// });

// slider.addEventListener('mouseleave', () => {
//   isDragging = false;

//   console.log('leave')

//   setSliderState(percent);
// });

// slider.addEventListener('mouseup', () => {
//   isDragging = false;

//   console.log('up')

//   setSliderState(percent);
// });

// slider.addEventListener('mousemove', (e) => {
//   if (!isDragging) return;
//   e.preventDefault();
//   const x = e.pageX - slider.offsetLeft;
//   const walk = x - startX;
//   // slider.scrollLeft = scrollLeft - walk;

//   percent = walk/startX * 100;

//   // setSliderCSS(percent);

//   console.log('move')
// });

// // function setSliderCSS(percent){
// //   if (percent < 0){
    
// //   }
// // }

// function initSlideState (){
  
//   for(let a of slides){
//     if(!a.classList.contains('ai-monitor__carousel__slide--active')){
//       slides[0].classList.add('ai-monitor__carousel__slide--active');
//     }
//   }
  
//   const activeIndex = Array.from(slides).findIndex(element => element.classList.contains('ai-monitor__carousel__slide--active'));
  
//   //무한으로 돌려야해서 인덱스 부여하는게 까다로운 것 같다
  
//   slides[activeIndex - 1].classList.add('ai-monitor__carousel__slide--prev');
//   slides[activeIndex - 2].classList.add('ai-monitor__carousel__slide--prev--prev');

//   slides[activeIndex + 1].classList.add('ai-monitor__carousel__slide--next');
//   slides[activeIndex + 2].classList.add('ai-monitor__carousel__slide--next--next');
// }
// initSlideState();



// function setSliderState(percent){

//   const prevprevIndex = Array.from(slides).findIndex(element => element.classList.contains('ai-monitor__carousel__slide--prev--prev'));
//   const nextnextIndex = Array.from(slides).findIndex(element => element.classList.contains('ai-monitor__carousel__slide--next--next'));

//   if (percent < 0 && slides.length > 5){
//     //좌로 드래그, 슬라이드 갯수 5개보다 많음
  
//     //prevprev가 안보여야됨
//     activeSlide.setAttribute('class','ai-monitor__carousel__slide--prev');
//     prevSlide.setAttribute('class','ai-monitor__carousel__slide--prev--prev');
//     prevprevSlide.setAttribute('class','ai-monitor__carousel__slide');
//     nextSlide.setAttribute('class','ai-monitor__carousel__slide--active');
//     nextnextSlide.setAttribute('class','ai-monitor__carousel__slide--next');
//     //nextnext다음의 슬라이드에 nextnext 클래스 붙어야함
//     //nextnext다음의 슬라이드 인덱스 들고와서 클래스 붙이면 될듯
//     slides[nextnextIndex + 1].setAttribute('class','ai-monitor__carousel__slide--next--next');
//   }else if(percent < 0 && slides.length == 5){
//     //좌로 드래그, 슬라이드 갯수가 5개
//     //이 땐 어떻게 할겨..?
//   }else if(percent < 0 && slides.length < 5){
//     //좌로 드래그, 슬라이드 갯수가 5개 미만
//     //이 땐 어떻게 할겨..?
//   }

//   if(percent > 0 && slides.length > 5){
//     //우로 드래그, 슬라이드 갯수 5개보다 많음
    
//     //nextnext가 안보여야됨
//     activeSlide.setAttribute('class','ai-monitor__carousel__slide--next');
//     prevSlide.setAttribute('class','ai-monitor__carousel__slide--active');
//     prevprevSlide.setAttribute('class','ai-monitor__carousel__slide--prev');
//     nextSlide.setAttribute('class','ai-monitor__carousel__slide--next--next');
//     nextnextSlide.setAttribute('class','ai-monitor__carousel__slide');
//     //prevprev이전의 슬라이드에 prevprev 클래스 붙어야함
//     //prevprev이전의  슬라이드 인덱스 들고와서 클래스 붙이면 될듯    
//     slides[prevprevIndex - 1].setAttribute('class','ai-monitor__carousel__slide--prev--prev');
//   }

// }


//img gsap
const carousel = document.querySelector('.carousel');
const robotImgs = document.querySelectorAll('.img');

gsap.to( carousel, { y: -150, opacity: 1, scale: 1, delay: 1.85, duration: 1.4, ease: "expo.out" })