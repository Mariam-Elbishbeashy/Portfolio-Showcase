document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      updateThemeIcons('light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      updateThemeIcons('dark');
    }
  }
  
  function updateThemeIcons(theme) {
    const sunIcon = theme === 'dark' ? 'sun' : 'moon';
    const icons = document.querySelectorAll('[data-lucide="sun"], [data-lucide="moon"]');
    
    icons.forEach(icon => {
      icon.setAttribute('data-lucide', sunIcon);
      lucide.createIcons();
    });
  }
  
  // Check for saved theme preference or use prefers-color-scheme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    updateThemeIcons(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }
  
  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);
  initTheme();
  
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    const isOpen = mobileMenu.classList.toggle('hidden');
    
    // Update icon
    const icon = mobileMenuButton.querySelector('[data-lucide]');
    icon.setAttribute('data-lucide', isOpen ? 'menu' : 'x');
    lucide.createIcons();
  });
  
  // Smooth scrolling for navigation
  document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      const element = document.getElementById(sectionId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          const icon = mobileMenuButton.querySelector('[data-lucide]');
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }
      }
    });
  });
  
  // Scroll to about section from hero
  document.getElementById('scroll-to-about').addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.remove('bg-transparent');
      header.classList.add('bg-gray-900/90', 'backdrop-blur-md', 'shadow-2xl', 'shadow-purple-500/10');
    } else {
      header.classList.add('bg-transparent');
      header.classList.remove('bg-gray-900/90', 'backdrop-blur-md', 'shadow-2xl', 'shadow-purple-500/10');
    }
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: this.elements.name.value,
        email: this.elements.email.value,
        subject: this.elements.subject.value,
        message: this.elements.message.value
      };
      
      console.log('Form submitted:', formData);
      
      // Reset form
      this.reset();
      
      // Show success message (you can implement this)
      alert('Thank you for your message! I will get back to you soon.');
    });
  }
});
document.getElementById('scroll-to-about').addEventListener('click', () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Theme toggle functionality
    const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
      updateIcons('light');
    } else {
      updateIcons('dark');
    }
    
    // Add event listeners to both toggle buttons
    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Toggle light mode class on body
        document.body.classList.toggle('light-mode');
        
        // Update icons based on current theme
        if (document.body.classList.contains('light-mode')) {
          localStorage.setItem('theme', 'light');
          updateIcons('light');
        } else {
          localStorage.setItem('theme', 'dark');
          updateIcons('dark');
        }
      });
    });
    
    // Function to update the icons based on theme
    function updateIcons(theme) {
      const iconElements = document.querySelectorAll('#theme-toggle i, #theme-toggle-mobile i');
      iconElements.forEach(icon => {
        if (theme === 'light') {
          icon.setAttribute('data-lucide', 'moon');
        } else {
          icon.setAttribute('data-lucide', 'sun');
        }
      });
      // Refresh icons
      lucide.createIcons();
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
          icon.setAttribute('data-lucide', 'menu');
        } else {
          icon.setAttribute('data-lucide', 'x');
        }
        lucide.createIcons();
      });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('button[data-section]').forEach(button => {
      button.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          
          // Close mobile menu if open
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const menuIcon = mobileMenuButton.querySelector('i');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
          }
        }
      });
    });
    
    // Scroll to about section
    const scrollToAboutBtn = document.getElementById('scroll-to-about');
    if (scrollToAboutBtn) {
      scrollToAboutBtn.addEventListener('click', function() {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
      });
    }
    
    // Header background on scroll
    const header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.classList.add('bg-gray-900', 'shadow-lg');
        } else {
          header.classList.remove('bg-gray-900', 'shadow-lg');
        }
      });
    }
  });
