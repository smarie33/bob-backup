window.onload = makeOpeningWindowHeight;
window.onresize = makeOpeningWindowHeight;
window.onscroll = parallax;
let audio = '';
let oldScrollY = window.scrollY;

function makeOpeningWindowHeight(){
  const opening = document.querySelector('#opening');
  opening.style.height = window.innerHeight+"px";
  const dedications = document.querySelector('#dedications');
  dedications.style.marginTop = window.innerHeight+"px";
  dedications.style.height = (document.querySelector('#dedications img').offsetHeight + document.querySelector('#dedications p').offsetHeight)+"px";

  const nav = document.querySelector('nav');
  nav.style.height = window.innerHeight+"px";
  const body = document.querySelector('body');
  document.querySelector('#opening').style.backgroundSize = (window.innerHeight > window.innerWidth) ? "cover" : "100% auto";

  const flowerHolder = document.querySelector('.flower-holder');
  const flower1 = document.querySelector('.flower-holder .audio-flower-1 .flower-img');
  const flower2 = document.querySelector('.flower-holder .audio-flower-2');
  flower2.style.top = (flower1.offsetHeight/1.5)+"px";
  flowerHolder.style.height = ((flower1.offsetHeight)+document.querySelector('.flower-holder .audio-flower-2 .flower-img').offsetHeight)+"px";

  const flowerHolderB = document.querySelector('.flower-holder-b');
  const flower1b = document.querySelector('.flower-holder-b .audio-flower-1 .flower-img');
  const flower2b = document.querySelector('.flower-holder-b .audio-flower-2');
  const flowerbimg = document.querySelector('.flower-holder-b .audio-flower-2 .flower-img');
  const flowerbtxt = document.querySelector('.flower-holder-b .audio-flower-2 .words');
  flower2b.style.top = (flower1b.offsetHeight/1.5)+"px";
  flowerHolderB.style.height = ((flower1b.offsetHeight/1.5)+flowerbimg.offsetHeight+flowerbtxt.offsetHeight)+"px";
  const ovlpimgs = document.querySelector('.overlapping-imgs');
  const olir_5 = document.querySelector('.overlapping-imgs .rotate-5');
  const olir5 = document.querySelector('.overlapping-imgs .rotate5');
  olir_5.style.top = (olir5.offsetHeight - 100)+"px";
  ovlpimgs.style.height = ((olir_5.offsetHeight + olir5.offsetHeight))+"px";

  let skewedImgs = document.querySelectorAll("[data-size]");
  [...skewedImgs].forEach(si => {
    let wh = si.getAttribute('data-size').split('/');
    if(wh[0] == wh[1]){
      let style = window.getComputedStyle(si, null);
      si.style.height = parseFloat(style.getPropertyValue("width"))+"px";
    }else{
      if(window.innerWidth > 992){
        let reCalc = calculateAspectRatioFit(parseFloat(wh[0]), parseFloat(wh[1]), (window.innerWidth - 400), (window.innerWidth - 400));
        let style = window.getComputedStyle(si, null);
        si.style.height = reCalc.height+"px";
        si.style.width = reCalc.width+"px";
      }else{
        let reCalc = calculateAspectRatioFit(parseFloat(wh[0]), parseFloat(wh[1]), (window.innerWidth - 100), (window.innerWidth - 100));
        let style = window.getComputedStyle(si, null);
        si.style.height = reCalc.height+"px";
        si.style.width = reCalc.width+"px";
      }
    }
  })
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }

document.querySelector('header button').onclick = menuToggle;
document.querySelector('header .mobile-button').onclick = menuToggle;

let mainMenu = document.querySelectorAll('.main-menu');
[...mainMenu].forEach(mm => { mm.onclick = menuToggle})

let media = document.querySelectorAll('.audio');
[...media].forEach(m => { m.onclick = playMedia})

function playMedia(event){
  event.preventDefault();
  event.stopPropagation();
  let mediaLink = '';
  let aLink;
  if(event.target.nodeName != "A"){
    mediaLink = event.target.parentNode.href;
    aLink = event.target.parentNode;
  }else{
    mediaLink = event.target.href;
    aLink = event.target;
  }
  if(audio == '' || audio == null || audio == undefined){
    let bouncing = document.querySelectorAll(".bouncing");
    if(bouncing.length > 0){
      [...bouncing].foreach(link => link.classList.remove('bouncing'));
    }
    aLink.parentNode.classList.add('bouncing');
    audio = new Audio(mediaLink);
    audio.play();
  }else{
    audio.pause();
    aLink.parentNode.classList.remove('bouncing');
    audio = '';
  }
}

function menuToggle(){
  document.querySelector('header button').classList.toggle('is-active');
  document.querySelector('header .mobile-button').classList.toggle('open');
  document.querySelector('nav:first-of-type').classList.toggle('show');
  document.querySelector('.play-icon-link').classList.toggle('hide');
  document.querySelector('body').classList.toggle('no-scroll');
  document.querySelector('html').classList.toggle('no-scroll');
}

function parallax(event){
 let sectionss = document.querySelectorAll("section");
 [...sectionss].forEach(section => {
   if(section.id != 'opening' && section.id != 'dedications'){
     let viewportOffset = section.getBoundingClientRect();
     let top = viewportOffset.top;
     section.querySelector('.bg').style.top = (-1*top)+'px';
   };
 })
  let sections = document.querySelectorAll('section');
  let topDistance;
  [...sections].forEach(section => {
    if(section.id == "opening"){
      topDistance = window.pageYOffset;
    }else{
      viewportOffset = section.getBoundingClientRect();
      topDistance = viewportOffset.top;
    }
    let layers = section.querySelectorAll('.parallaxing');
    if(layers != null){
      [...layers].forEach(layer => {
        let depth = layer.getAttribute('data-depth');
        let movement = -(topDistance * depth);
        let translate3d = 'translate3d(0, ' + movement + 'px, 0)';
        if(layer.classList.contains('rotate5')){
          translate3d = 'translate3d(0, ' + movement + 'px, 0) rotate(5deg)';
        }
        if(layer.classList.contains('rotate-5')){
          translate3d = 'translate3d(0, ' + movement + 'px, 0) rotate(-5deg)';
        }
        if(layer.classList.contains('rotate15')){
          translate3d = 'translate3d(0, ' + movement + 'px, 0) rotate(15deg)';
        }
        if(layer.classList.contains('rotate-15')){
          translate3d = 'translate3d(0, ' + movement + 'px, 0) rotate(-15deg)';
        }
        layer.style['-webkit-transform'] = translate3d;
        layer.style['-moz-transform'] = translate3d;
        layer.style['-ms-transform'] = translate3d;
        layer.style['-o-transform'] = translate3d;
        layer.style.transform = translate3d;
      })
    }
  })
}