const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

const  resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    // déplacement du carrousel
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    // gestion des détails
    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');

    // ✅ gestion des flèches
    if (index === 0) {
        arrowLeft.classList.add('disabled');
    } else {
        arrowLeft.classList.remove('disabled');
    }

    if (index === totalItems - 1) {
        arrowRight.classList.add('disabled');
    } else {
        arrowRight.classList.remove('disabled');
    }
};


const imgItems = document.querySelectorAll('.portfolio-carousel .img-item');
const totalItems = imgItems.length;

arrowRight.addEventListener('click', () => {
    if (index < totalItems - 1) {
        index++;
        activePortfolio();
    }
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        activePortfolio();
    }
});

document.addEventListener('DOMContentLoaded', () => {
  // Attache un listener à chaque bouton .view-btn
  document.querySelectorAll('.img-item .view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // éviter la propagation vers le parent
      const imgEl = btn.closest('.img-item')?.querySelector('img');
      if (imgEl && imgEl.src) {
        openImage(imgEl.src, imgEl.alt || '');
      } else {
        console.warn('Aucune image trouvée pour ce bouton.');
      }
    });
  });
});

function openImage(src, altText = '') {
  // empêcher d'ouvrir plusieurs overlays
  if (document.querySelector('.fullscreen-overlay')) return;

  // overlay
  const overlay = document.createElement('div');
  overlay.className = 'fullscreen-overlay';

  // image
  const img = document.createElement('img');
  img.src = src;
  img.alt = altText;

  // empêcher la fermeture quand on clique sur l'image
  img.addEventListener('click', (e) => e.stopPropagation());

  // bouton fermer (accessible)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.setAttribute('aria-label', 'Fermer');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeOverlay();
  });

  // fermer au clic sur le fond
  overlay.addEventListener('click', removeOverlay);

  // fermer à la touche Échap
  function escHandler(e) {
    if (e.key === 'Escape') removeOverlay();
  }

  function removeOverlay() {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.removeEventListener('keydown', escHandler);
  }

  document.addEventListener('keydown', escHandler);

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);
}
