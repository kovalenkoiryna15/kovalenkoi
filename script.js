const blanks = document.querySelectorAll('.blank');
const themeDots = document.querySelectorAll('.theme-dot');

window.onload = function() {

  handleScrollEvents();

  addThemesDotsHandler();

}

const nextBlank = () => {
  const current = document.querySelector('.blank_current');
  current.classList.remove('blank_current');
  // Check for next blank
  if (current.nextElementSibling) {
    // Add current class to next element sibling
    current.nextElementSibling.classList.add('blank_current');
  } else {
    // Add current class to start
    blanks[0].classList.add('blank_current');
  }
}
const previousBlank = () => {
  const current = document.querySelector('.blank_current');
  current.classList.remove('blank_current');
  // Check for next blank
  if (current.previousElementSibling) {
    // Add current class to previous element sibling
    current.previousElementSibling.classList.add('blank_current');
  } else {
    // Add current class to end
    blanks[blanks.length -1].classList.add('blank_current');
  }
}

// Scroll events
const handleScrollEvents = () => {
  window.addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Mozilla Firefox - this.handleMouseWheelDOM
  window.addEventListener('mousewheel', MouseWheelHandler, false); // Other browsers this.handleMouseWheel
  // document.attachEvent('onmousewheel', MouseWheelHandler); //???????IE 6/7/8
  window.addEventListener('touchstart', this.touchStart, false); // mobile devices
  window.addEventListener('touchmove', this.touchMove, false); // mobile devices
  let i = 1;
  let mouseWheel = true;
  function MouseWheelHandler(e) {
    if (!mouseWheel) {
      return false;
    }
    mouseWheel = false;
    // Stop mouse wheel event for 1 second
    setTimeout(function() {
      mouseWheel = true;
    }, 500); 
    e = window.event || e;
    const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    const h = document.documentElement.clientHeight;
    const section = document.getElementsByClassName("blank");
    console.log(i);
    if (i <= section.length && i >= 0) {
      //scrolling down?
      if (delta < 0) {
        nextBlank();
        // window.scrollTo({
        //   top: h * i,
        //   behavior: "smooth"
        // });
        i++;
      } else {
        //scrolling up?
        previousBlank();
        // window.scrollTo({
        //   top: h * i,
        //   behavior: "smooth"
        // });
        i--;
      }
    } else {
      i = 1;
      nextBlank();
      // window.scrollTo({
      //   top: 0,
      //   behavior: "smooth"
      // });
    }
  }
}

// Themes Options
const addThemesDotsHandler = () => {
  themeDots.forEach(item => {
    item.addEventListener('click', function(e){
      let clickedDot = e.target;
      let themeMode = clickedDot.getAttribute('mode');
      setTheme(themeMode);
    })
  });
}

function setTheme (themeMode) {
  if (themeMode == 'dark') {
    console.log(document.getElementById('theme-style'))
    document.getElementById('theme-style').href = 'style.css';    
  } else if (themeMode == 'green') {
    document.getElementById('theme-style').href = 'themes/green.css';
  } else if (themeMode == 'light') {
    document.getElementById('theme-style').href = 'themes/light.css';
  } else if (themeMode == 'purple') {
    document.getElementById('theme-style').href = 'themes/purple.css';
  } else {
    document.getElementById('theme-style').href = 'style.css';
  }
}