window.onload = function() {
  addThemesDotsHandler();
  addNavButtonsClickHandler();
  initWriter();
};

const addNavButtonsClickHandler = () => {
  document.querySelector('.nav').addEventListener('click', function(e){
    if (e.target.classList.contains('nav__link')) {
      let clickedLink = e.target;
      removeActiveIcons();
      removeActiveLinks();
      selectActiveLink(clickedLink);
    }
    if(e.target.classList.contains('nav-ico')) {
      let clickedIcon = e.target;
      removeActiveIcons();
      removeActiveLinks();
      selectActiveIcon(clickedIcon);
    }
  });      
};

const removeActiveLinks = () => {
  let links = document.querySelectorAll('.nav__link');
  links.forEach(link => {
    link.classList.remove('nav__link_active');
  })
}
const removeActiveIcons = () => {
  let icons = document.querySelectorAll('.nav-ico');
  icons.forEach(icon => {
    icon.classList.remove('nav-ico_active');
  })
}

const selectActiveLink = (clickedLink) => {
  clickedLink.classList.add('nav__link_active');
}
const selectActiveIcon = (clickedIcon) => {
  clickedIcon.classList.add('nav-ico_active');
}

// Themes Options
const addThemesDotsHandler = () => {
  const themeDots = document.querySelectorAll('.theme-dot');
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

//ES6 Class TypeWriter
class TypeWriter {
  constructor (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
    this.timerID;
  }
  type() {
    // Current Index Of Word
    const currentWord = this.wordIndex % this.words.length;
    // Get Full Text Of Current Word
    const fullTxt = this.words[currentWord];
    //Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
    // Initial Type Speed
    let typeSpeed = 200;

    if(this.isDeleting){
      typeSpeed /= 3;
    }
    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
      typeSpeed = this.wait;
      //Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === ''){
      this.isDeleting = false;
      //Move to next word
      this.wordIndex++;
      //Pause before start typing
      typeSpeed = 200;
    }
    this.timerID = setTimeout(()=> this.type(), typeSpeed);
  }
  stop(){   
    clearTimeout(this.timerID);
  }
};

// Init Writer App
function initWriter() {  
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter      
  const writer = new TypeWriter(txtElement, words, wait);           
};
