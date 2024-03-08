// // import '../themes/style.scss';

export default function Carousel(domElem, option){

  const prevButton = document.querySelector('.btn-prv');
  const nextButton = document.querySelector('.btn-next');
  const $autoplayButton = document.querySelector('.btn.play');
  const $currentIndex = document.querySelector('.current-index');
  const $slidesLength = document.querySelector('.slides-length');
  const $slider = typeof domElem == 'string' ? document.querySelector(`${domElem}`) : domElem;
  const $sliderTrack = document.querySelector('.carousel-track');
  const $robotImgs = document.querySelectorAll('.carousel .img');
  const $count = document.querySelector('.count');
  const $countprevBtn = document.querySelector('.carousel-btns .btn-prv');
  const $countnextBtn = document.querySelector('.carousel-btns .btn-next');
  const $countplayBtn = document.querySelector('.carousel-btns .play');
  const $boards = document.querySelectorAll('.board-item');
  const $background = document.querySelector('.background');
  const $magiccircle = document.querySelector('.magiccircle');
  let slides = document.querySelectorAll('.crousel-slide');
  let currentIndex = 0;
  let isPlaying = false;
  let windowHasFocus = true;
  let interval, pregress;
  let isDragging = false;
  let startX, percent;


  option.speed = option.speed || 0.3 ;
  option.delay = option.delay;
  // option.lightSpeed = option.lightSpeed;
  // option.lightColor = option.lightColor;
  option.onChangeActive = option.onChangeActive;

  gsap.to( $magiccircle, {width: 1220, opacity: 1, delay: 1.8, duration: 1.4, ease: "expo.out" });
  gsap.to( $slider, {y: -150, opacity: 1, delay: 1.85, duration: 1.4, ease: "expo.out" });
  gsap.to( $count, {opacity: 1, delay: 2.45, duration: 0.5, ease: "expo.out" });
  gsap.to( $countprevBtn, {x: -60, opacity: 1, delay: 2.3, duration: 0.5, ease: "expo.inout" });
  gsap.to( $countnextBtn, {x: 60, opacity: 1, delay: 2.3, duration: 0.5, ease: "expo.inout" });
  gsap.to( $countplayBtn, {x: 70, opacity: 1, delay: 2.3, duration: 0.5, ease: "expo.inout" });
  gsap.to( $boards, {height: 700, delay: 2.7, duration: 1, ease: "expo.inout", opacity: 0.7 });
  gsap.to( $background, {scale: 1.2, delay: 1.9, opacity: 0.6, duration: 0.6, ease: "expo.inout" });

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
        const firstChild = $sliderTrack.firstElementChild;
        $sliderTrack.insertBefore(slides[i], firstChild);
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
      a.classList.remove('prevprev');
      a.classList.remove('next');
      a.classList.remove('nextnext');

      if(currentIndex > slides.length/2){
        currentIndex = currentIndex - slides.length
      }

      if(a.getAttribute('data-index') == currentIndex){
        a.classList.add('active')
      }else if(a.getAttribute('data-index') == currentIndex - 1){
        a.classList.add('prev')
      }else if(a.getAttribute('data-index') == currentIndex - 2){
        a.classList.add('prevprev')
      }else if(a.getAttribute('data-index') == currentIndex + 1){
        a.classList.add('next')
      }else if(a.getAttribute('data-index') == currentIndex + 2){
        a.classList.add('nextnext')
      }

      //끝 인덱스 분기처리
      if(currentIndex + 1 > slides.length/2){
        //next
        a.classList.remove('next');
        if(a.getAttribute('data-index') == currentIndex - (slides.length - 1)){
          a.classList.add('next');
        }
      }if(currentIndex + 2 > slides.length/2){
        //nextnext
        a.classList.remove('nextnext');
        if(a.getAttribute('data-index') == currentIndex - (slides.length - 2)){
          a.classList.add('nextnext');
        }
      }else if(currentIndex - 1 < -1 * Math.floor(slides.length/2) && slides.length % 2 !== 0){
        //slides.length 홀수
        //prev
        a.classList.remove('prev');
        if(a.getAttribute('data-index') == -currentIndex){
          a.classList.add('prev');
        }
      }else if(currentIndex - 1 < -1 * Math.floor(slides.length/2) + 1 && slides.length % 2 == 0){
        //slides.length 짝수
        //prev
        a.classList.remove('prev');
        if(a.getAttribute('data-index') == Math.floor(slides.length + currentIndex - 1)){
          a.classList.add('prev');
        }
      }
      
      if(currentIndex - 2 < -1 * Math.floor(slides.length/2) && slides.length % 2 !== 0){
        //slides.length 홀수
        //prevprev
        a.classList.remove('prevprev');
        if(a.getAttribute('data-index') == slides.length - Math.abs(currentIndex - 2)){
          a.classList.add('prevprev');
        }
      }
      if(currentIndex - 2 < -1 * Math.floor(slides.length/2) + 1 && slides.length % 2 == 0){
        //slides.length 짝수
        //prevprev
        a.classList.remove('prevprev');
        if(a.getAttribute('data-index') == slides.length - Math.abs(currentIndex - 2)){
          a.classList.add('prevprev');
        }
      }
    }

    setTranslation();
  }

  function onMousedown(e){
    isDragging = true;
    // startX = e.pageX;
    startX = e.pageX - $sliderTrack.offsetLeft; //처음 좌표: 부모로부터 좌로 얼마나 떨어져 있는지

    for(let a of slides){
      a.style.transition = 0 + 's';
    }

    isPlaying = true;
    onAutoplayButton();

    console.log('down')
  }

  function onMouseleave(){
    isDragging = false;

    for(let a of slides){
      a.style.transition = option.speed + 's';
    }

    setTranslation();
    console.log('leave')
  }

  function onMouseup(){
    isDragging = false;

    for(let a of slides){
      a.style.transition = option.speed + 's';
    }

    judgeSlides(percent);
    console.log('up')
    // $slider.removeEventListener('mouseup',onMouseup);
  }

  function onMousemove(e){
    if (!isDragging) return;
    e.preventDefault();
    // const x = e.pageX;
    const x = e.pageX - $sliderTrack.offsetLeft;//실시간 좌표
    const walk = x - startX;//이동한 거리 = 실시간 좌표 - 처음 좌표

    percent = walk/5;

    giveTranslation(percent);
    // console.log('move')
    // $slider.removeEventListener('mousemove', (e) => onMousemove(e));
  }

  function onPrevButton(){
    isPlaying = true;
    onAutoplayButton();
    for(let a of slides){
      a.style.transition = option.speed + 's';
    }  

    console.log(currentIndex, 'gottenIndex')
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    console.log(currentIndex, 'realIndex')

    moveSlide(currentIndex);
  }
  
  function onNextButton(){
    isPlaying = true;
    onAutoplayButton();
    for(let a of slides){
      a.style.transition = option.speed + 's';
    }  

    console.log(currentIndex, 'gottenIndex')
    currentIndex = (currentIndex + 1) % slides.length;
    console.log(currentIndex, 'realIndex')
    console.log(currentIndex + 1, 'showedIndex')

    moveSlide(currentIndex);
  }

  function judgeSlides(percent) {
    //어느 정도 슬라이드 되면 인덱스가 넘어가는 함수
    if(percent < 0 && Math.abs(percent) > 10){
      currentIndex = (currentIndex + 1) % slides.length;
      moveSlide(currentIndex);
    }else if(percent > 0 && Math.abs(percent) > 10){
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      moveSlide(currentIndex);
    }else{
      setTranslation();
    }
  }

  function pregressFunc(currentVal,tobeVal,progress){
    return currentVal + (tobeVal - currentVal) * progress;
  }

  function giveTranslation(percent){
    const $active = document.querySelector('.crousel-slide.active');
    const $prev = document.querySelector('.crousel-slide.prev');
    const $prevprev = document.querySelector('.crousel-slide.prevprev');
    const $next = document.querySelector('.crousel-slide.next');
    const $nextnext = document.querySelector('.crousel-slide.nextnext');

    pregress = Math.abs(percent/100);

    // function pregressFunc(currentVal,tobeVal,progress){
    //   return currentVal + (tobeVal - currentVal) * progress;
    // }

    if(percent < 0){
      // active -> prev
      $active.style.transform = `translate3d(${pregressFunc(0,-170,pregress)}px, ${pregressFunc(0,70,pregress)}px, ${pregressFunc(0,-100,pregress)}px) rotateY(${pregressFunc(0,20,pregress)}deg) scale(${pregressFunc(1.3,0.9,pregress)})`;
      $active.style.opacity = `${pregressFunc(1,0.4,pregress)}`;
      $active.style.zIndex = `${Math.floor(pregressFunc(10,0,pregress*2))}`; 
      $active.style.filter = `blur(${pregressFunc(0,5,pregress)}px)`;
      // prev -> prevprev
      $prev.style.transform = `translate3d(${pregressFunc(-170,-120,pregress)}px, ${pregressFunc(70,100,pregress)}px, ${pregressFunc(-100,-110,pregress)}px) rotateY(${pregressFunc(20,20,pregress)}deg) scale(${pregressFunc(0.9,0.7,pregress)})`;
      $prev.style.opacity = `${pregressFunc(0.4,0,pregress)}`;
      // next -> active
      $next.style.transform = `translate3d(${pregressFunc(170,0,pregress)}px, ${pregressFunc(70,0,pregress)}px, ${pregressFunc(-100,0,pregress)}px) rotateY(${pregressFunc(-20,0,pregress)}deg) scale(${pregressFunc(0.9,1.35,pregress)})`;
      $next.style.opacity = `${pregressFunc(0.4,1,pregress)}`;
      $next.style.zIndex = `${Math.floor(pregressFunc(0,10,pregress*2))}`; 
      $next.style.filter = `blur(${pregressFunc(5,0,pregress)}px)`;
      // nextnext -> next
      $nextnext.style.transform = `translate3d(${pregressFunc(120,170,pregress)}px, ${pregressFunc(100,70,pregress)}px, ${pregressFunc(-110,-100,pregress)}px) rotateY(${pregressFunc(-20,-20,pregress)}deg) scale(${pregressFunc(0.7,0.9,pregress)})`;
      $nextnext.style.opacity = `${pregressFunc(0,0.4,pregress)}`;

    }else if(percent > 0){
      // active -> next
      $active.style.transform = `translate3d(${pregressFunc(0,170,pregress)}px, ${pregressFunc(0,70,pregress)}px, ${pregressFunc(0,-100,pregress)}px) rotateY(${pregressFunc(0,-20,pregress)}deg) scale(${pregressFunc(1.3,0.9,pregress)})`;
      $active.style.opacity = `${pregressFunc(1,0.4,pregress)}`;
      $active.style.zIndex = `${Math.floor(pregressFunc(10,0,pregress*2))}`; 
      $active.style.filter = `blur(${pregressFunc(0,5,pregress)}px)`;
      // prev -> active
      $prev.style.transform = `translate3d(${pregressFunc(-170,0,pregress)}px, ${pregressFunc(70,0,pregress)}px, ${pregressFunc(-100,0,pregress)}px) rotateY(${pregressFunc(20,0,pregress)}deg) scale(${pregressFunc(0.9,1.35,pregress)})`;
      $prev.style.opacity = `${pregressFunc(0.4,1,pregress)}`;
      $prev.style.filter = `blur(${pregressFunc(5,0,pregress)}px)`;
      // prevprev -> prev
      $prevprev.style.transform = `translate3d(${pregressFunc(-120,-170,pregress)}px, ${pregressFunc(100,70,pregress)}px, ${pregressFunc(-110,-100,pregress)}px) rotateY(${pregressFunc(20,20,pregress)}deg) scale(${pregressFunc(0.7,0.9,pregress)})`;
      $prevprev.style.opacity = `${pregressFunc(0,0.4,pregress)}`;
      // next -> nextnext
      $next.style.transform = `translate3d(${pregressFunc(170,120,pregress)}px, ${pregressFunc(70,100,pregress)}px, ${pregressFunc(-100,-110,pregress)}px) rotateY(${pregressFunc(-20,-20,pregress)}deg) scale(${pregressFunc(0.9,0.7,pregress)})`;
      $next.style.opacity = `${pregressFunc(0.4,0,pregress)}`;
    }
  }

  function setTranslation(){
    const $active = document.querySelector('.crousel-slide.active');
    const $prev = document.querySelector('.crousel-slide.prev');
    const $prevprev = document.querySelector('.crousel-slide.prevprev');
    const $next = document.querySelector('.crousel-slide.next');
    const $nextnext = document.querySelector('.crousel-slide.nextnext');

    $active.style.transform = `translate3d(0, 0, 0) rotateY(0) scale(1.35)`;
    $active.style.opacity = `1.3`
    $active.style.zIndex = `10`
    $active.style.filter = `none`
    $prev.style.transform = `translate3d(-170px, 70px, -100px) rotateY(20deg) scale(0.9)`;
    $prev.style.opacity = `0.4`
    $prev.style.zIndex = `0`
    $prev.style.filter = `blur(5px)`
    $prevprev.style.transform = `translate3d(0, 0, 0) rotateY(0) scale(0.7)`;
    $prevprev.style.opacity = `0`
    $prevprev.style.zIndex = `0`
    $prevprev.style.filter = `blur(5px)`
    $next.style.transform = `translate3d(170px, 70px, -100px) rotateY(-20deg) scale(0.9)`;
    $next.style.opacity = `0.4`
    $next.style.zIndex = `0`
    $next.style.filter = `blur(5px)`
    $nextnext.style.transform = `translate3d(0, 0, 0) rotateY(0) scale(0.7)`;
    $nextnext.style.opacity = `0`
    $nextnext.style.zIndex = `0`
    $nextnext.style.filter = `blur(5px)`
  }

  function autoPlay(){
    currentIndex = currentIndex + 1;
    moveSlide(currentIndex);
  }

  function onAutoplayButton(){

    if(!isPlaying){
      //stop 상태라면
      for(let a of slides){
        a.style.transition = option.speed + 's';
      }  
      $autoplayButton.classList.add('play');
      $autoplayButton.classList.remove('stop');
      interval = setInterval(autoPlay,1200);
    }else{
      //play 상태라면
      for(let a of slides){
        a.style.transition = 0 + 's';
      }  
      $autoplayButton.classList.add('stop');
      $autoplayButton.classList.remove('play');
      clearInterval(interval);
    }

    isPlaying = !isPlaying;

  }

  function onBlur(){
    windowHasFocus = false;
    isPlaying = true;
    onAutoplayButton();

    $magiccircle.style.animation = 'none';
    for(let a of $robotImgs){
      //로봇이미지 멈추게
      a.style.animation = 'none';
      a.style.transform = 'translateY(-1%)'
    }

    console.log('lose focus');
  }

  function onFocus(){
    windowHasFocus = true;
    isPlaying = false;
    clearInterval(interval);
    setTimeout(onAutoplayButton,0);

    $magiccircle.style.animation = 'roll 90s linear infinite';
    for(let a of $robotImgs){
      //로봇이미지 멈추게
      a.style.animation = 'robots 1s ease-in infinite alternate';
    }

    console.log('get focus');
  }

  function mouseMoving(e){
    let valX = innerWidth/2 - e.pageX;
    let valY = innerHeight/2 - e.pageY;

    gsap.to( $background, {x: valX/50, y: valY/50});
  }

  setTimeout(onAutoplayButton,1700);
  initSlideIndex();
  moveSlide(currentIndex);
  setTranslation();

  prevButton.addEventListener('click',onPrevButton)
  nextButton.addEventListener('click',onNextButton)
  $autoplayButton.addEventListener('click',onAutoplayButton);
  
  $slider.addEventListener('mousedown', (e) => onMousedown(e));
  $slider.addEventListener('mouseleave',onMouseleave);
  $slider.addEventListener('mouseup',onMouseup);
  $slider.addEventListener('mousemove', (e) => onMousemove(e));
  
  window.addEventListener('blur',onBlur);
  window.addEventListener('focus',()=>{
    onFocus();
    // document.addEventListener('mousemove', (e) => mouseMoving(e));
  });
  document.addEventListener('mousemove', (e) => mouseMoving(e));
}