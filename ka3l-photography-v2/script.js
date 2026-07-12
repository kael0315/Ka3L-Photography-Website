document.addEventListener('DOMContentLoaded', () => {

  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('loaded'), 350);
  });
  setTimeout(() => preloader.classList.add('loaded'), 2200);

  const header = document.getElementById('siteHeader');
  setTimeout(() => header.classList.add('visible'), 500);

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['top', 'packages', 'booking', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spyObserver.observe(s));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  document.getElementById('scrollCue').addEventListener('click', () => {
    document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
  });

  const irisBlades = document.getElementById('irisBlades');
  const BLADE_COUNT = 9;
  for (let i = 0; i < BLADE_COUNT; i++) {
    const angle = (360 / BLADE_COUNT) * i;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M100,100 L153,74 Q182,100 153,126 Z');
    path.setAttribute('fill', 'url(#bladeGrad)');
    path.setAttribute('opacity', i % 2 === 0 ? '0.92' : '0.6');
    path.setAttribute('class', 'blade');
    path.setAttribute('transform', `rotate(${angle} 100 100)`);
    irisBlades.appendChild(path);
  }
  requestAnimationFrame(() => {
    setTimeout(() => irisBlades.classList.add('open'), 250);
  });

  const categories = [
    {
      id: 'birthday',
      label: 'Birthday Event',
      note: 'Professional stills & lifestyle portraiture built to document high-energy celebrations, intimate details, and sentimental milestones across all generations.',
      packages: [
        {
          id: 'little-milestones', name: 'The Little Milestones', price: 2500,
          desc: "Tailored specifically for Kids' Birthday Parties and high-energy cake smashes.",
          inclusions: [
            'Up to 3 hrs continuous event coverage',
            'High-speed action, candid playground moments & games',
            '40 fully color-graded and retouched soft copies',
            'Unlimited raw files via private cloud link, 48 hrs'
          ]
        },
        {
          id: 'chill-celebration', name: 'The Chill Celebration', price: 5500, badge: 'Most Popular',
          desc: 'Perfect for Adult Birthday Parties, reunions, and intimate dinners.',
          inclusions: [
            'Up to 3.5 hrs continuous event coverage',
            'Venue details, candid interactions & group toasts',
            '50 signature color-graded soft copies',
            'Clean editorial portrait frames of the celebrant',
            'Unlimited raw files via private cloud link, 48 hrs'
          ]
        },
        {
          id: 'golden-years', name: 'The Golden Years', price: 9500,
          desc: 'Gentle, respectful pacing customized for Seniors (60th, 70th & 80th milestones).',
          inclusions: [
            'Up to 4 hrs coverage with respectful pacing',
            'Dedicated 30-min mini-portrait session for immediate family',
            'Sentimental multigenerational family portraiture',
            '65 timeless color-graded soft copies',
            'Unlimited raw files via private cloud link, 48 hrs'
          ]
        }
      ]
    },
    {
      id: 'prenup',
      label: 'Prenup & Engagement',
      note: 'Tailored lifestyle portraiture, pre-wedding storytelling, and engagement solutions capturing creative themes, modern movement, and elegant profiles.',
      packages: [
        {
          id: 'essential-session', name: 'The Essential Session', price: 2500,
          desc: 'Perfect for simple, elegant individual profiles or quick couple announcements.',
          inclusions: [
            'Up to 2 hrs continuous shooting',
            '1 outfit · 1 location, covered cleanly',
            '15 fully color-graded, enhanced soft copies',
            'Standard skin and blemish retouching',
            'Tailored posing guidance'
          ]
        },
        {
          id: 'classic-romance', name: 'The Classic Romance', price: 5500, badge: 'Most Popular',
          desc: 'Our standard creative concept coverage with editorial styling.',
          inclusions: [
            'Up to 3.5 hrs continuous shooting',
            'Max 3 outfits · up to 2 locations',
            '35 premium skin-retouched soft copies',
            'Bonus 15–30s vertical video teaser',
            'Hands-on editorial-style posing guidance'
          ]
        },
        {
          id: 'ultimate-love-story', name: 'The Ultimate Love Story', price: 9500,
          desc: 'The comprehensive multi-theme pre-wedding elite catalog.',
          inclusions: [
            'Up to 5.5 hrs comprehensive premium coverage',
            'Max 5 outfits · unlimited nearby locations',
            '60 ultra-premium, magazine-quality soft copies',
            '1-min cinematic pre-wedding highlight video',
            'Full style & concept mood board consultation'
          ]
        }
      ]
    },
    {
      id: 'foodcafe',
      label: 'Food & Cafe',
      note: 'High-end commercial lookbooks, menu designs, cafe interiors, and aesthetic flat-lays engineered for modern restaurant social media, printing, and food delivery platforms.',
      packages: [
        {
          id: 'cafe-starter', name: 'The Cafe Starter', price: 2500,
          desc: 'Ideal for menu updates, delivery apps, or single launch events.',
          inclusions: [
            'Up to 2 hrs continuous on-site shooting',
            'Focused cataloging of core menu items',
            '15 fully color-graded commercial soft copies',
            'Basic professional lighting setup for flat-lays',
            'High-res raw files via private link, 48 hrs'
          ]
        },
        {
          id: 'brand-refresh', name: 'The Brand Refresh', price: 5500, badge: 'Most Popular',
          desc: 'Ideal for dynamic brand refreshes and regular social content updates.',
          inclusions: [
            'Up to 3.5 hrs continuous on-site shooting',
            '35 magazine-ready commercial asset soft copies',
            'Dynamic action frames — pours, plating & more',
            '1 vertical video teaser for Reels / TikTok',
            'High-res raw files via private link, 48 hrs'
          ]
        },
        {
          id: 'full-commercial-rollout', name: 'The Full Commercial Rollout', price: 9500,
          desc: 'Comprehensive premium digital campaign and large-scale asset menus.',
          inclusions: [
            'Up to 5 hrs multi-concept commercial coverage',
            '60 ultra-premium, blemish-cleaned food design files',
            'Full creative direction — flat-lays & kitchen stories',
            '1 HD cinematic promo video (60s) with licensed music',
            'High-res raw files via private link, 48 hrs'
          ]
        }
      ]
    },
    {
      id: 'bundle',
      label: 'All-in-One Bundle',
      note: 'Unify your visual narrative by locking down pre-shoot and main event coverage under a single elite crew framework, for maximum seamless integration.',
      packages: [
        {
          id: 'essential-milestone-bundle', name: 'The Essential Milestone Bundle', price: 14000,
          desc: 'Saves ₱1,500 compared to booking standalone timeline items.',
          inclusions: [
            'Pre-shoot: Full Silver Portrait Session — 3 hrs, 2 outfits, 40 edited photos, Save-the-Date film',
            'Main event: Extended Silver Event Coverage — up to 5 hrs',
            '2-person team, dedicated photography & cinematic video',
            'Deliverables: full pre-shoot files + 4-min Celebration Film'
          ]
        },
        {
          id: 'grand-royal-bundle', name: 'The Grand Royal Bundle', price: 25000, badge: 'Elite Choice',
          desc: 'The complete VIP treatment with comprehensive fast-track delivery.',
          inclusions: [
            'Pre-shoot: Full Gold Portrait Experience — 6 hrs, unlimited outfits, 70+ photos, Concept Film',
            'Main event: Full-Day Event Coverage — up to 7 hrs',
            '3-person elite production unit, deep angle tracking',
            'Pre-shoot Concept Film + 5–7 min Milestone Master Film + framed display piece',
            'Fast-track editing — guaranteed delivery within 14 business days'
          ]
        }
      ]
    }
  ];

  const contractTerms = [
    {
      title: 'Reservation Deposit',
      text: 'A non-refundable 30% downpayment is required to lock in your booking date. No calendar slot is guaranteed or held officially until this payment is settled.'
    },
    {
      title: 'Payment Milestones',
      text: 'Standalone single-session packages require the remaining balance to be fully paid on or before the day of the shoot. For comprehensive combo bundles, 40% is due on the pre-shoot date, and the final 30% balance is settled completely on the main event date.'
    },
    {
      title: 'Overtime Tracking',
      text: 'Services are strictly scaled to the coverage duration designated in your package. A standard overtime fee of ₱1,000 per hour will automatically apply if the shoot or production program runs over.'
    },
    {
      title: 'Permits & Logistics',
      text: 'Venue entrance fees, permit processing, and studio booking charges are 100% the responsibility of the client. Standard hot operational meals must be arranged for the active production crew during full-day shoots.'
    },
    {
      title: 'Cancellation & Rescheduling',
      text: 'Change of dates must be requested at least 48 hours in advance to avoid crew re-booking charges. If the client cancels the booking completely, the 30% reservation deposit is retained as liquidated damages.'
    },
    {
      title: 'Creative Direction & Delivery',
      text: 'Ka3L Photography retains complete creative authority over post-production styles and color grading choices. Polished high-resolution digital assets are delivered via a secure download link according to your package timeline. Unedited raw logs are not provided.'
    }
  ];

  const tabBar = document.getElementById('tabBar');
  const packageGrid = document.getElementById('packageGrid');
  const categoryNote = document.getElementById('categoryNote');

  const state = {
    activeCategory: categories[0].id,
    selectedPackage: null,
    selectedDate: null,
    selectedTime: null,
    bookings: {}
  };

  function renderTabs() {
    tabBar.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tab-btn' + (state.activeCategory === cat.id ? ' active' : '');
      btn.innerHTML = `${cat.label}<span class="tab-count">(${cat.packages.length})</span>`;
      btn.addEventListener('click', () => {
        state.activeCategory = cat.id;
        renderTabs();
        renderPackages();
      });
      tabBar.appendChild(btn);
    });
  }

  function renderPackages() {
    const cat = categories.find(c => c.id === state.activeCategory);
    categoryNote.textContent = cat.note;
    packageGrid.innerHTML = '';
    cat.packages.forEach((pkg, i) => {
      const card = document.createElement('div');
      card.className = 'pkg-card reveal';
      card.style.transitionDelay = `${i * 80}ms`;
      card.dataset.id = pkg.id;
      if (state.selectedPackage && state.selectedPackage.id === pkg.id) card.classList.add('chosen');
      card.innerHTML = `
        <div class="pkg-head">
          <p class="pkg-eyebrow">${cat.label}</p>
          ${pkg.badge ? `<span class="pkg-badge${pkg.badge === 'Elite Choice' ? ' elite' : ''}">${pkg.badge}</span>` : ''}
        </div>
        <h3 class="pkg-name">${pkg.name}</h3>
        <p class="pkg-price">₱${pkg.price.toLocaleString()}</p>
        <p class="pkg-desc">${pkg.desc}</p>
        <ul class="pkg-list">
          ${pkg.inclusions.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <button type="button" class="pkg-select">Select package</button>
      `;
      packageGrid.appendChild(card);
      revealObserver.observe(card);
      card.querySelector('.pkg-select').addEventListener('click', () => selectPackage(pkg, cat));
    });
  }

  function selectPackage(pkg, cat) {
    state.selectedPackage = { ...pkg, category: cat.label };
    renderPackages();
    document.getElementById('summaryPkgName').textContent = `${pkg.name} (${cat.label})`;
    document.getElementById('summaryPkgPrice').textContent = '₱' + pkg.price.toLocaleString();
    updateContractSummary();
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderTabs();
  renderPackages();

  const TIMES = ['9:00 AM', '1:00 PM', '4:00 PM'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  const monthLabel = document.getElementById('monthLabel');
  const calendarGrid = document.getElementById('calendarGrid');

  function fmtKey(y, m, d) {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  function renderCalendar() {
    calendarGrid.innerHTML = '';
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    monthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendarGrid.appendChild(document.createElement('div'));
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(viewYear, viewMonth, d);
      const key = fmtKey(viewYear, viewMonth, d);
      const isPast = cellDate < today;
      const bookedCount = TIMES.filter(t => state.bookings[key + '|' + t]).length;
      const isFull = bookedCount >= TIMES.length;

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'day-cell' + ((isPast || isFull) ? ' full' : '');
      if (state.selectedDate === key) cell.classList.add('selected');
      cell.innerHTML = `<span>${d}</span>${bookedCount > 0 && !isFull ? `<span class="day-count">${bookedCount}/${TIMES.length}</span>` : ''}`;

      if (!isPast && !isFull) {
        cell.addEventListener('click', () => selectDate(key, d));
      }
      calendarGrid.appendChild(cell);
    }
  }

  function selectDate(key, dayNum) {
    state.selectedDate = key;
    state.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    hideContract();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    state.selectedDateLabel = `${monthNames[viewMonth]} ${dayNum}, ${viewYear}`;
  }

  function renderTimeSlots() {
    const wrap = document.getElementById('timeSlots');
    wrap.innerHTML = '';
    TIMES.forEach(t => {
      const taken = !!state.bookings[state.selectedDate + '|' + t];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot-btn' + (taken ? ' taken' : '');
      btn.textContent = taken ? `${t} — Booked` : t;
      if (state.selectedTime === t) btn.classList.add('chosen');
      if (!taken) {
        btn.addEventListener('click', () => {
          state.selectedTime = t;
          renderTimeSlots();
          showContract();
        });
      } else {
        btn.disabled = true;
      }
      wrap.appendChild(btn);
    });
  }

  document.getElementById('prevMonth').addEventListener('click', () => {
    viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    state.selectedDate = null;
    document.getElementById('timeSlots').innerHTML = '<p class="time-slot-placeholder">Select a date on the calendar to see open times.</p>';
    hideContract();
    renderCalendar();
  });
  document.getElementById('nextMonth').addEventListener('click', () => {
    viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    state.selectedDate = null;
    document.getElementById('timeSlots').innerHTML = '<p class="time-slot-placeholder">Select a date on the calendar to see open times.</p>';
    hideContract();
    renderCalendar();
  });

  renderCalendar();

  const accordionEl = document.getElementById('accordion');
  contractTerms.forEach((term, i) => {
    const item = document.createElement('div');
    item.className = 'accordion-item' + (i === 0 ? ' open' : '');
    item.innerHTML = `
      <button type="button" class="accordion-trigger">
        <span><span class="acc-num">0${i + 1}</span>${term.title}</span>
        <span class="acc-icon">+</span>
      </button>
      <div class="accordion-panel"><p>${term.text}</p></div>
    `;
    item.querySelector('.accordion-trigger').addEventListener('click', () => {
      item.classList.toggle('open');
    });
    accordionEl.appendChild(item);
  });

  const contractWrap = document.getElementById('contractWrap');

  function showContract() {
    updateContractSummary();
    contractWrap.classList.remove('hidden');
    contractWrap.classList.add('reveal');
    requestAnimationFrame(() => contractWrap.classList.add('in-view'));
    contractWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function hideContract() {
    contractWrap.classList.add('hidden');
    document.getElementById('successMsg').classList.add('hidden');
  }

  function updateContractSummary() {
    document.getElementById('csPackage').textContent = state.selectedPackage
      ? `${state.selectedPackage.name} (${state.selectedPackage.category})`
      : '—';
    document.getElementById('csRate').textContent = state.selectedPackage
      ? '₱' + state.selectedPackage.price.toLocaleString()
      : '—';
    document.getElementById('csDate').textContent = state.selectedDateLabel || '—';
    document.getElementById('csTime').textContent = state.selectedTime || '—';
    document.getElementById('signatureDate').textContent = state.selectedDateLabel
      ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '—';
  }

  const signatureInput = document.getElementById('signatureInput');
  const signaturePreview = document.getElementById('signaturePreview');
  signatureInput.addEventListener('input', () => {
    signaturePreview.textContent = signatureInput.value;
  });

  const contractForm = document.getElementById('contractForm');
  const formError = document.getElementById('formError');
  const successMsg = document.getElementById('successMsg');

  contractForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formError.classList.add('hidden');

    if (!state.selectedPackage) {
      formError.textContent = 'Please select a package above first.';
      formError.classList.remove('hidden');
      return;
    }
    if (!state.selectedDate || !state.selectedTime) {
      formError.textContent = 'Please choose a date and time slot.';
      formError.classList.remove('hidden');
      return;
    }

    const name = document.getElementById('clientName').value.trim();
    const email = document.getElementById('clientEmail').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const venue = document.getElementById('eventVenue').value.trim();
    const agree = document.getElementById('agreeCheck').checked;
    const signature = signatureInput.value.trim();

    if (!name || !email || !phone || !venue) {
      formError.textContent = 'Please complete all client and event details.';
      formError.classList.remove('hidden');
      return;
    }
    if (!agree) {
      formError.textContent = 'Please confirm you have read and agree to the Terms of Agreement.';
      formError.classList.remove('hidden');
      return;
    }
    if (!signature) {
      formError.textContent = 'Please type your full name as your e-signature.';
      formError.classList.remove('hidden');
      return;
    }

    const key = state.selectedDate + '|' + state.selectedTime;
    state.bookings[key] = {
      name, email, phone, venue, signature,
      package: state.selectedPackage.name,
      category: state.selectedPackage.category
    };

    document.getElementById('successDetails').textContent =
      `${name}, your contract is signed. The ${state.selectedPackage.name} (${state.selectedPackage.category}) session — ₱${state.selectedPackage.price.toLocaleString()} — is reserved for ${state.selectedDateLabel} at ${state.selectedTime} at ${venue}. A confirmation will be sent to ${email}.`;
    successMsg.classList.remove('hidden');

    const finishedTime = state.selectedTime;
    state.selectedTime = null;
    renderCalendar();
    renderTimeSlots();
    contractForm.reset();
    signaturePreview.textContent = '';

    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
