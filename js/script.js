document.addEventListener('DOMContentLoaded', () => {
  const categoriesBtns = document.querySelectorAll('[data-categories-btn]');
  const categoriesDropdown = document.querySelector('[data-categories-dropdown]');
  const searchBtns = document.querySelectorAll('[data-search-btn]');
  const searchDropdown = document.querySelector('[data-search-dropdown]');
  const menuBtns = document.querySelectorAll('[data-menu-btn]');
  const menuDropdown = document.querySelector('[data-menu-dropdown]');
  const dropdowns = document.querySelectorAll('[data-dropdown]');

  openDropdown(categoriesBtns, categoriesDropdown);
  openDropdown(searchBtns, searchDropdown);
  openDropdown(menuBtns, menuDropdown);

  function openDropdown(btns, dropdown) {
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const isActive = dropdown.classList.contains('mc-dropdown--active');

        dropdowns.forEach((item) => {
          if (item.classList.contains('mc-dropdown--active')) {
            item.classList.remove('mc-dropdown--active');
          }
        });
        if (!isActive) {
          dropdown.classList.add('mc-dropdown--active');
        }
        setPos();
        console.log('safsf');
      });

      window.addEventListener('resize', function () {
        setPos();
      });

      function setPos() {
        if (window.innerWidth < 576) {
          dropdown.style.cssText = `inset: 0`;
        } else {
          const leftPos = btn.getBoundingClientRect().x - dropdown.offsetWidth / 2;
          const rightPos = window.innerWidth - btn.getBoundingClientRect().x - btn.offsetWidth;

          if (window.innerWidth - btn.getBoundingClientRect().x < dropdown.offsetWidth) {
            dropdown.style.cssText = `right: ${rightPos}px; left: auto`;
          } else {
            dropdown.style.cssText = `left: ${leftPos}px;`;
          }
        }
      }
    });
  }

  const links = document.querySelectorAll('[data-anchor]');

  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      links.forEach((link) => {
        link.classList.remove('jump-nav__item-active');
      });

      event.target.classList.add('jump-nav__item-active');
    });
  });

  const accordionItems = document.querySelectorAll('[data-accordion]');

  accordionItems.forEach((item) => {
    const header = item.querySelector('[data-accordion-btn]');
    const content = item.querySelector('[data-accordion-content]');

    header.addEventListener('click', () => {
      const isActive = !content.hasAttribute('hidden');

      closeAllItems();

      if (!isActive) {
        content.removeAttribute('hidden');
      }
    });
  });

  function closeAllItems() {
    accordionItems.forEach((item) => {
      const content = item.querySelector('[data-accordion-content]');

      if (!content.hasAttribute('hidden')) {
        content.setAttribute('hidden', '');
      }
    });
  }

  const sliderWrappers = document.querySelectorAll('[data-slider-wrapper]');

  const hero = document.querySelector('[data-hero]');
  const footer = document.querySelector('[data-footer]');
  const cta = document.querySelector('[data-cta]');

  window.addEventListener('scroll', function () {
    const heroPosition = hero.getBoundingClientRect();
    const footerPosition = footer.getBoundingClientRect();
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (
      (heroPosition.top <= scrollPosition + window.innerHeight && heroPosition.bottom >= scrollPosition) ||
      (footerPosition.top <= scrollPosition + window.innerHeight && footerPosition.bottom >= scrollPosition)
    ) {
      cta.classList.remove('sticky-bottom--active');
    } else {
      cta.classList.add('sticky-bottom--active');
    }
  });

  sliderWrappers.forEach((wrapper) => {
    const slider = wrapper.querySelector('[data-slider]');
    const prev = wrapper.querySelector('.mc-carousel__arrow--prev');
    const next = wrapper.querySelector('.mc-carousel__arrow--next');
    $(slider).slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 6,
      prevArrow: prev,
      nextArrow: next,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            dots: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
          },
        },
      ],
    });
  });
});
