// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('navbarHamburger');
  const menu = document.getElementById('navbarMenu');

  // Check if navbar elements exist
  if (!hamburger || !menu) {
    console.log('Navbar elements not found');
    return;
  }

  function openMenu() {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.style.overflow = ''; // Restore body scrolling
  }

  hamburger.addEventListener('click', () => {
    if (menu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking on a menu link
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 600) {
        closeMenu();
      }
    });
  });

  // Highlight current menu item based on URL
  const currentPath = window.location.pathname.split('/').pop().toLowerCase();
  menuLinks.forEach(link => {
    // Remove any previous aria-current
    link.removeAttribute('aria-current');
    // Get the href target (just the filename, case-insensitive)
    const linkTarget = link.getAttribute('href') ? link.getAttribute('href').split('/').pop().toLowerCase() : '';
    // Special case: home page can be '' or 'home.html' or 'index.html'
    if (
      (currentPath === '' && (linkTarget === 'home.html' || linkTarget === 'index.html')) ||
      (currentPath === linkTarget) ||
      (currentPath === '' && linkTarget === '')
    ) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Close menu when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 600 && menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on window resize if it's open
  window.addEventListener('resize', () => {
    if (window.innerWidth > 600 && menu.classList.contains('open')) {
      closeMenu();
    }
  });
}); 