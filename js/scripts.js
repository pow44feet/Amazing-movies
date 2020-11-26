//Preloader
window.onload = function () {
document.body.classList.add('loaded_hiding');
window.setTimeout(function () {
document.body.classList.add('loaded');
document.body.classList.remove('loaded_hiding');
}, 3000);
}

//Default function
function testWebP(callback) {

var webP = new Image();
webP.onload = webP.onerror = function () {
   callback(webP.height == 2);
};
webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
   
testWebP(function (support) {

   if (support == true) {
      document.querySelector('body').classList.add('webp');
   }else{
      document.querySelector('body').classList.add('no-webp');
   }
});

//Header menu hide on slide down + burger menu
let prevPos = window.pageYOffset;
const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
function headerSlideUp() {
   header.style.top = `-${header.offsetHeight}px`;
}
function headerSlideDown() {
   header.style.top = `${header.offsetHeight}px`;
}

window.onscroll = function () {
   let currentPos = window.pageYOffset;
   if (prevPos > currentPos) { //if page scrolled up then header sliding down
      header.style.top = "0";
      header.classList.add('header--scrolled');
   } else { //if page was scrolled down then header sliding up
      headerSlideUp();
      menu.classList.remove('menu--active');
      burger.classList.remove('burger--active');
   }
   prevPos = currentPos; //top of the page, default state
   if (prevPos === 0) {
      header.classList.remove('header--scrolled');
   }
}
//Burger menu
burger.onclick = function() {
   if (this.classList.contains('burger--active')) {
      this.classList.remove('burger--active');
      menu.classList.remove('menu--active');
   } else {
      this.classList.add('burger--active');
      menu.classList.add('menu--active');
      menuOverlay();
   }
}



/* burger.onclick = function () {
   let menuBody = document.querySelector('.header .container');
   let newLayer = document.createElement('div');
   let overlayActive = document.querySelector('.overlay-menu.overlay--active')
   if (this.classList.contains('burger--active') || menuBody.classList.contains(overlayActive)) {
      this.classList.remove('burger--active');
      menu.classList.remove('menu--active');
      overlayActive.remove();
   } else {
      this.classList.add('burger--active');
      menu.classList.add('menu--active');
      newLayer.classList.add('overlay-menu');
      menuBody.append(newLayer);
      newLayer.classList.add('overlay--active');
   }
}
 */


//Burger Submenu open
/* function menuOverlay() {
   
   burger.onclick = function () {
      if (menuBody.classList.contains('overlay-menu')) {
         menuBody.classList.remove('overlay-menu');
      } else {
         newLayer.classList.add('overlay-menu');
         menuBody.append(newLayer);
         newLayer.classList.add('overlay--active');
      }
   }
   
} */


//Search button

let mobileSearchOn = document.querySelector('.user__plag-search');
let searchForm = document.querySelector('.search');
const overlayForm = document.querySelector('.overlay-form');

function searchShow() {
   searchForm.classList.add('search--active');
   overlayForm.classList.add('overlay--active');

}
function searchHide() {
   searchForm.classList.remove('search--active');
   overlayForm.classList.remove('overlay--active');
}

mobileSearchOn.onclick = function () {
   if (!(searchForm.classList.contains('search--active'))) {
      searchShow();
   } else {
      searchHide();
   }
}

let closeSearchBtn = document.querySelector('.search .close-button');
closeSearchBtn.onclick = function () {
   searchHide();
}

$(document).mouseup(function (e) { // событие клика по веб-документу
   var div = $(".search--active"); // тут указываем ID элемента
   if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
      searchHide();
   }
});






//Login popup
$(document).ready(function () {
   $('.popup-link').on('click', function (e) { //If user want to login or sign in
      e.preventDefault();
      $('.popup-wrap').toggleClass('popup-active'); //added modal window active class
      $('.menu').removeClass('menu--active'); //because of mobile devices
      $('.burger').removeClass('burger--active'); //because of mobile devices
      $('body').toggleClass('body--blocked'); //disable window scrolling
      $('.overlay').toggleClass('overlay--active'); //blocking document content
      if (window.pageYOffset > 0) {
         headerSlideUp(); //header sliding up if page scrolled down by top
      }
      $(document).mouseup(function (e) { // событие клика по веб-документу
         var div = $(".login-wrap"); // тут указываем ID элемента
         if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            removeModal();
            $('body').removeClass('body--blocked');
         }
      });
   });

   $(".close-button").on('click', function () { //Если клик по крестику -> закрыть окно
      removeModal();
      $('body').removeClass('body--blocked');
   });

   function removeModal() {
      $(".popup-wrap").removeClass("popup-active");
      $(".overlay").removeClass("overlay--active");
   }
});


//FILM LIST FILTER
var checkClass = function () {
   if ($('.film-list__column').hasClass('hide')) {
     $('.film-list__column').removeClass('hide');
   }
};

$('.flat-catalog__item[data-filter="all"]').click(function () {
   checkClass();
   $(".film-list__column").removeClass('hide').removeClass('show').show();

});

$(function() {

   var newSelection = "";
   
   //Клик по категории "ALL"
   if ($('.flat-catalog__item[data-filter="all"]')) {

      $('.film-list__column').addClass('hide').hide().slice(0, 10).removeClass('hide').addClass('show').show();

      if ($('.film-list__column:hidden').length == 0) {
         $(".show-more-btn").removeClass('show').addClass('hide').hide();
      }

      $(".show-more-btn").click(function(e){ // click event for load more
         e.preventDefault();
         $('.film-list__column:hidden').slice(0, 5).removeClass('hide').addClass('show').show(); // select next 10 hidden divs and show them
         if($('.film-list__column:hidden').length == 0){ // check if any hidden divs still exist
            $(".show-more-btn").addClass('hide').hide(); // alert if there are none left
         }
      });
   } 
      

   //Клик по другим категориям
   $(".flat-catalog__item button").click(function () {
      
      //каждый раз по клику по категории появляется кнопка "показать ещё"
      $(".show-more-btn").removeClass('hide').show();

      //При клике по кнопке категории текущая становится активной
		$(".flat-catalog__item").removeClass("flat-catalog--active");
		$(this).parent().addClass("flat-catalog--active");

      //В переменную передается категория кнопки
      newSelection = $(this).parent().attr("data-filter");

      //Все элементы фильтра становятся видны
      checkClass();

      //Все элементы не выбранной категории скрываются классом hide и display none
      var others = $(".film-list__column").not("." + newSelection).removeClass('show').addClass('hide').hide();
      //Все элементы выбранной категории появляются 
      var list = $("." + newSelection).removeClass('hide')/* .addClass('show').show() */;
      console.log(list);

      //Перебираются все элементы объекта list
      for (let i = 0; i < list.length; i++) {
         if (list[i].hasClass = "show") {
            list[i].style.display = "none";
         }
      }

      //показываются первые 10 элементов
      list.slice(0, 10).removeClass('hide').addClass('show').show(); // select the first ten

      if (list.length == 0) {
         $(".show-more-btn").removeClass('show').addClass('hide').hide();
      }

      $(".show-more-btn").click(function(e){ // click event for load more
         e.preventDefault();
         list.filter(":hidden").slice(0, 5).removeClass('hide').addClass('show').show(); // select next 10 hidden divs and show them
         if(list.filter(":hidden").length == 0){ // check if any hidden divs still exist
            $(".show-more-btn").addClass('hide').hide(); // alert if there are none left
         }
      });

	});
});

//Функция show
function showItems() {
   this.removeClass('hide').addClass('show').show();
};
//Функция hide
function hideItems(a) {
   a.removeCLass('show').addCLass('hide').hide();
};

//LOAD MORE BUTTON
function loadMore(a) {
   $(a).slice(0, 10).show(); // select the first ten
   $(".show-more-btn").click(function(e){ // click event for load more
       e.preventDefault();
       $(a).filter(":hidden").slice(0, 5).show(); // select next 10 hidden divs and show them
       if($(a).filter(":hidden").length == 0){ // check if any hidden divs still exist
           $(".show-more-btn").addClass('hide').hide(); // alert if there are none left
       }
   });
};


//FAVORITE MOVIES STATUS
let favorites = document.querySelectorAll('.info-line__favorites-icon');
for (let i = 0; i < favorites.length; i++) {
   favorites[i].onclick = function () {
      if (this.classList.contains('info-line__favorites--active')) {
         this.classList.remove('info-line__favorites--active');
         favoriteOff();
         
      } else {
         this.classList.add('info-line__favorites--active');
         favoriteOn();
         
      }
   }
}

function favoriteOn() {
   let popupFavorites = document.querySelector('.popup-add-favorites');
   popupFavorites.classList.remove('popup-add-favorites--hidden');
   setTimeout(function () {
      popupFavorites.classList.add('popup-add-favorites--hidden');
   }, 2000);
}

function favoriteOff() {
   let popupFavorites = document.querySelector('.popup-remove-favorites');
   popupFavorites.classList.remove('popup-remove-favorites--hidden');
   setTimeout(function () {
      popupFavorites.classList.add('popup-remove-favorites--hidden');
   }, 2000);
}


//WATCH MOVIES STATUS
let seen = document.querySelectorAll('.info-line__seen-icon');
for (let i = 0; i < seen.length; i++) {
   seen[i].onclick = function () {
      if (this.classList.contains('info-line__seen--active')) {
         this.classList.remove('info-line__seen--active');
         seenOff();
      } else {
         this.classList.add('info-line__seen--active');
         seenOn();
      }
   }
}

function seenOn() {
   let popupSeen = document.querySelector('.popup-add-seen');
   popupSeen.classList.remove('popup-add-seen--hidden');
   setTimeout(function () {
      popupSeen.classList.add('popup-add-seen--hidden');
   }, 2000);
}

function seenOff() {
   let popupSeen = document.querySelector('.popup-remove-seen');
   popupSeen.classList.remove('popup-remove-seen--hidden');
   setTimeout(function () {
      popupSeen.classList.add('popup-remove-seen--hidden');
   }, 2000);
}


//NEWS SLIDE APPEARENCE
$(document).ready(function () {
   $('.news-slide__column').slice(0, 4).show().removeClass('hide').addClass('show');

   $('.news-slide__bottom button').on('click', function (e) {
      $('.news-slide__column:hidden').slice(0, 4).show().removeClass('hide').addClass('show');
      
      if ($('.news-slide__column:hidden').length == 0) {
         $('.news-slide__bottom').addClass('hide').hide();
      }
   });
})

//BUTTON ADD ANIMATION
let btnAdd = document.querySelectorAll(".add-collection");
for (let i = 0; i < btnAdd.length; i++) {
   btnAdd[i].onclick = function() {
      if (this.classList.contains("btn-active")) {
         this.classList.remove("btn-active");
         btnAddOff();
      } else {
         this.classList.add("btn-active");
         btnAddOn();
      }
   }  
}

function btnAddOn() {
   let btnAddOn = document.querySelector('.popup-add-list');
   btnAddOn.classList.remove('popup-add-list--hidden');
   setTimeout(function () {
      btnAddOn.classList.add('popup-add-list--hidden');
   } , 2000);
}

function btnAddOff() {
   let btnAddOff = document.querySelector('.popup-remove-list');
   btnAddOff.classList.remove('popup-remove-list--hidden');
   setTimeout(function () {
      btnAddOff.classList.add('popup-remove-list--hidden');
   } , 2000);
} 


//Video Lightning jQuery lightbox plugin
$(function() {
   $(".trailer").jqueryVideoLightning({
   autoplay: 1,
   backdrop_color:"#000",
   backdrop_opacity: 0.6,
   glow: 1,
   glow_color: "#fff",
   
   });
});


//PLAY TRAILER BUTTON ACTIVATION
let playTrailer = document.querySelectorAll('.play-trailer');
for (i = 0; i < playTrailer.length; i++) {
   playTrailer[i].addEventListener('click', function () {
      let currentBtn = this;

      let parent = currentBtn.closest('.film-block__body');
      let video = parent.querySelector('.film-video__video');
      

      function setupVideo(video) {
         let link = video.querySelector('.film-video__link');
         let media = video.querySelector('.film-video__image');
         let button = video.querySelector('.film-video__button');
         let id = parseMediaURL(media);
      
         let iframe = createIframe(id);

         link.remove();
         button.remove();
         video.appendChild(iframe);
      
         link.removeAttribute('href');
         video.classList.add('film-video--enabled');
      }


      setupVideo(video);
   });
}


//YOUTUBE VIDEO EMBED VIDEO FAKE BLOCK
function findVideos() {
   let videos = document.querySelectorAll('.film-video__video');

   for (let i = 0; i < videos.length; i++) {
       setupVideo(videos[i]);
   }
}

function setupVideo(video) {
   let link = video.querySelector('.film-video__link');
   let media = video.querySelector('.film-video__image');
   let button = video.querySelector('.film-video__button');
   let id = parseMediaURL(media);

   video.addEventListener('click', () => {
       let iframe = createIframe(id);

       link.remove();
       button.remove();
       video.appendChild(iframe);
   });

   link.removeAttribute('href');
   video.classList.add('film-video--enabled');
}

function parseMediaURL(media) {
   let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
   let url = media.src;
   let match = url.match(regexp);

   return match[1];
}

function createIframe(id) {
   let iframe = document.createElement('iframe');

   iframe.setAttribute('allowfullscreen', '');
   iframe.setAttribute('allow', 'autoplay');
   iframe.setAttribute('src', generateURL(id));
   iframe.classList.add('film-video__image');

   return iframe;
}

function generateURL(id) {
   let query = '?rel=0&showinfo=0&autoplay=1';

   return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();