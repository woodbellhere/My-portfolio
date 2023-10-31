"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnsCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.scrollX, window.scrollY);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(
  //   // 因为高度是在视口和内容单位之间换来换去，需要抵消的长度/高度
  //   s1coords.left + window.scrollX,
  //   s1coords.top + window.scrollY
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  // 以及简便方法
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

//
// page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector(".nav__links").addEventListener("click", function (e) {
  // console.log(e.target);
  e.preventDefault();
  // 匹配策略
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    // 这里就相当于一次性全部注册了
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tabs.forEach(t => addEventListener('click', () => console.log('TAB')));

tabsContainer.addEventListener("click", function (e) {
  // 事件冒泡传上来的事件被触发后又选中目标元素
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  // 哨兵/守卫语句
  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // activate tab
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//
// menu fate animation
const handlerHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", handlerHover.bind(0.5));
nav.addEventListener("mouseout", handlerHover.bind(1));

// sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//   console.log(this.window.scrollY);
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };
// const obsOptions = {
//   // root是观察对象，默认是视口，threshold是被观察元素进入观察的比例
//   root: null,
//   threshold: 0.1,
//   // 还可以设置多个比例，且分别计算进入和离开视口的比例
//   // threshold:[0,0.2]
// };
// // 进入交叉状态后要回调的函数，以及对交叉状态的设置
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
// 这里是header离开视线，而不是第二部分进入视线
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
});

headerObserver.observe(header);

//
// reveal sections
const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//
// lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observe) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting) return;

  // replace data-src with src
  entry.target.src = entry.target.dataset.src;
  // 图片替换又有load事件
  entry.target.classList.remove("lazy-img");
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observe.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // 都可以，懒加载就是为了你要看才换
  rootMargin: "100px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

//
// carousel slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // 动态生成轮播图下方点
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='dots__dot' data-slide='${i}'></button>`
      );
    });
  };
  createDots();

  // 选中点时加上选中样式
  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  activateDot(0);

  // 通过动态指定图片位置而实现轮播效果的函数
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      // 首个图片自然不动
      // 更改slide时，首个图片的内容也动态变化
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  // 开头设置到0
  goToSlide(0);

  // 下一张图片
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    // 这里算图片循环数量也可直接取余
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // 轮播图初始化，生成原点，设置当前圆点和图片为第一个
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();
  //
  // 事件处理
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // 在圆点dataset中预存图片索引数字
      // 点击时动态读取索引数字，并跳转圆点和图片
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(curSlide);
    }
  });
};
slider();

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});
