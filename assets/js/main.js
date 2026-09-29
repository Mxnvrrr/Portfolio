/**
 * MANVEER SINGH - PORTFOLIO INTERACTION ENGINE
 * Premium Dark Mode, Responsive Controls, Particle Background & Dynamic UI
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation & Mobile Menu
  initNavigation();

  // 2. Hero Interactive Canvas (Constellation / Particles)
  initHeroCanvas();

  // 3. Dynamic Typewriter Headline
  initTypewriter();

  // 4. Project Filtering System
  initProjectFilters();

  // 5. Project Quick View Modal
  initProjectModal();

  // 6. CV Viewer Modal
  initCVModal();

  // 7. Clipboard Copy & Toast Feedback
  initClipboardUtils();

  // 8. Contact Form Handling
  initContactForm();

  // 9. Scroll Reveal Animations
  initScrollAnimations();
});

/* ==========================================================================
   1. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header background on scroll
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active section scrollspy with IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }
}

/* ==========================================================================
   2. HERO INTERACTIVE CANVAS
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 28 : 55;
  const maxDistance = 120;

  let mouse = {
    x: null,
    y: null,
    radius: 120
  };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 1.8 + 1;
      this.baseColor = Math.random() > 0.4 ? 'rgba(99, 102, 241,' : 'rgba(56, 189, 248,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse collision/repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2.5;
          this.y -= Math.sin(angle) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor + ' 0.7)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.22;
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  let isCanvasVisible = true;
  if ('IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      isCanvasVisible = entry.isIntersecting;
      if (isCanvasVisible) {
        animate();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    });
    heroObserver.observe(canvas.parentElement);
  }

  function animate() {
    if (!isCanvasVisible) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();

    animationFrameId = requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
}

/* ==========================================================================
   3. DYNAMIC TYPEWRITER
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    'B.Tech CSE (Artificial Intelligence) Student',
    'Public Relations & Brand Strategist',
    'Monetary Partnership & Corporate Alliances Member',
    'Creative Graphic Designer & Problem Solver'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before new text
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. PROJECT FILTERING SYSTEM
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT QUICK VIEW MODAL
   ========================================================================== */
const projectDetailsData = {
  'techgiant': {
    title: 'Strategic Marketing & PR Amplification',
    organization: 'Team TechGiant',
    role: 'Public Relations Member',
    duration: '2025 – 2026',
    category: 'Public Relations & Marketing',
    skills: ['Public Relations', 'Digital Campaigns', 'Brand Visibility', 'Promotional Graphics', 'Strategic Outreach'],
    description: 'Spearheaded strategic marketing and public relations initiatives at Team TechGiant to expand audience reach and elevate brand recognition across university and regional domains.',
    contributions: [
      'Engineered tailored digital campaigns and customized communication architectures for specific event milestones.',
      'Demonstrated rigorous attention to detail in promotional graphics and content execution.',
      'Streamlined communication channels to establish a cohesive brand identity.'
    ],
    outcome: 'Increased overall team brand visibility by approximately 70–75%, driving noticeable community engagement.'
  },
  'aiesec': {
    title: 'Corporate Monetary Partnerships & Alliances',
    organization: 'AIESEC in IIT Delhi',
    role: 'Monetary Partnership Member',
    duration: 'Mar – May 2026',
    category: 'Corporate Alliances & Sales',
    skills: ['Corporate Sponsorships', 'B2B Pitching', 'Pipeline Optimization', 'Stakeholder Management', 'Public Relations'],
    description: 'Acted as a frontline liaison between corporate stakeholders and AIESEC in IIT Delhi, pitching sponsorship packages and executing strategic outreach pipelines to support international youth exchange initiatives.',
    contributions: [
      'Conducted cold and warm corporate outreach across diverse industry sectors.',
      'Optimized outreach pipelines alongside core team members for prompt follow-ups and aligned messaging.',
      'Represented the chapter during partnership negotiations and executive meetings.'
    ],
    outcome: 'Successfully secured 3–4 high-impact corporate sponsorships, delivering a visible surge in revenue & sales metrics.'
  },
  'delhimun': {
    title: 'Regional Brand Representation & Delegate Acquisition',
    organization: 'Delhi Model United Nations (Delhi MUN)',
    role: 'Brand Ambassador & Core Member',
    duration: '2025 – Present',
    category: 'Brand Strategy & Event Leadership',
    skills: ['Brand Representation', 'Canva', 'Adobe Illustrator', 'Delegate Acquisition', 'Event Promotion'],
    description: 'Directly managed regional brand representation and strategic marketing architectures inside the core Delhi MUN operations department to expand participation and institutional partnerships.',
    contributions: [
      'Conceptualized and produced high-converting cross-platform promotional assets ahead of delivery schedules.',
      'Formulated regional student ambassador outreach to accelerate delegate registration.',
      'Ensured unified brand guidelines across marketing collateral, social stories, and institutional circulars.'
    ],
    outcome: 'Accelerated delegate acquisition ahead of standard schedule, enhancing regional conference visibility.'
  },
  'internware': {
    title: 'UMUNG Festival Sponsor Outreach & Coordination',
    organization: 'Team Internware (Event UMUNG)',
    role: 'Event Volunteer',
    duration: 'Feb 2026',
    category: 'Event Operations & Sponsorships',
    skills: ['Sponsor Outreach', 'Event Operations', 'Delegate Handling', 'Teamwork', 'On-ground Logistics'],
    description: 'Drove sponsor outreach and on-ground operational workflows for the flagship festival UMUNG hosted by Team Internware.',
    contributions: [
      'Assisted with aggressive sponsor outreach and localized promotional campaigns across incoming student cohorts.',
      'Managed delegate check-ins, coordination desk, and real-time operational troubleshooting.',
      'Maintained tight schedule adherence for promotional advertising objectives on-ground.'
    ],
    outcome: 'Ensured smooth on-ground festival workflows and fulfilled 100% of promotional sponsor commitments.'
  },
  'matrix': {
    title: 'MATRIX 3.0 Operational Logistics & Leadership',
    organization: 'GGSIPU Delhi',
    role: 'Event Leadership Volunteer',
    duration: '2025 – 2026',
    category: 'Event Leadership & Logistics',
    skills: ['Operational Logistics', 'Teamwork & Leadership', 'Public Relations', 'Crowd Management'],
    description: 'Coordinated operational logistics and venue execution for MATRIX 3.0, a marquee campus technology and management conclave at Guru Gobind Singh Indraprastha University.',
    contributions: [
      'Handled on-ground crowd flow, speaker hosting, and tech-stage synchronization.',
      'Coordinated logistics between student teams and faculty coordinators.'
    ],
    outcome: 'Facilitated a seamless operational execution with zero logistical downtime during key plenary sessions.'
  },
  'createch': {
    title: 'CREATECH Technical & Creative Design Competition',
    organization: 'ICE Delhi',
    role: 'Design Competitor',
    duration: '2025 – 2026',
    category: 'Design & Creativity',
    skills: ['Graphic Designing', 'Adobe Illustrator', 'Canva', 'Visual Problem Solving', 'Creative Modular Design'],
    description: 'Participated in the competitive CREATECH design challenge at ICE Delhi, tackling rapid-fire technical and creative design modules under tight deadlines.',
    contributions: [
      'Designed modular creative visual identities and digital layouts under stringent competition criteria.',
      'Demonstrated technical precision in vector illustration and typographic hierarchy.'
    ],
    outcome: 'Earned recognition among student designers for creative problem-solving and rapid design execution.'
  },
  'ai-upskilling': {
    title: 'Applied AI & Software Engineering Frameworks',
    organization: 'Academic & Self-Directed',
    role: 'Student Developer & AI Enthusiast',
    duration: 'Ongoing',
    category: 'Technical Upskilling',
    skills: ['Artificial Intelligence', 'Software Development', 'Data Structures', 'Problem Solving', 'Python / ML Frameworks'],
    description: 'Complementing formal B.Tech CSE (Artificial Intelligence) curriculum at IITM Janakpuri with dedicated hands-on exploration of contemporary AI models, algorithmic thinking, and modern software engineering frameworks.',
    contributions: [
      'Exploring real-world AI applications to bridge business communication and computational automation.',
      'Engaging with campus event tech operations and evaluating emerging industry benchmarks.'
    ],
    outcome: 'Equipped with a balanced fusion of analytical engineering acumen and high-caliber interpersonal communication.'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');

  if (!modalOverlay || !closeBtn) return;

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-org').textContent = `${data.role} • ${data.organization}`;
    document.getElementById('modal-duration').textContent = data.duration;
    document.getElementById('modal-desc').textContent = data.description;

    // Contributions list
    const contribList = document.getElementById('modal-contributions');
    contribList.innerHTML = '';
    data.contributions.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${item}</span>
      `;
      contribList.appendChild(li);
    });

    // Outcome
    document.getElementById('modal-outcome').textContent = data.outcome;

    // Skills
    const skillsContainer = document.getElementById('modal-skills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = skill;
      skillsContainer.appendChild(span);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. CV VIEWER MODAL
   ========================================================================== */
function initCVModal() {
  const cvModal = document.getElementById('cv-preview-modal');
  const openCVBtns = document.querySelectorAll('.open-cv-modal-btn');
  const closeCVBtn = document.getElementById('cv-modal-close-btn');

  if (!cvModal) return;

  function openCV() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCV() {
    cvModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openCVBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCV();
    });
  });

  if (closeCVBtn) closeCVBtn.addEventListener('click', closeCV);

  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) closeCV();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('active')) {
      closeCV();
    }
  });
}

/* ==========================================================================
   7. CLIPBOARD UTILITIES & TOAST FEEDBACK
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initClipboardUtils() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy to clipboard.');
        });
      }
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value.trim();
    const email = form.elements['email']?.value.trim();
    const subject = form.elements['subject']?.value.trim() || 'Inquiry regarding collaboration';
    const message = form.elements['message']?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    // Prepare mailto link for direct sending
    const bodyContent = `Hi Manveer,\n\n${message}\n\nFrom: ${name} (${email})`;
    const mailtoUrl = `mailto:manveersingh0112@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

    showToast('Message composed! Opening your email client to send...');
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    form.reset();
  });
}

/* ==========================================================================
   9. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
}
