// ELOYCE University — Smart Campus Assistance System Application Logic
// --- 1. INITIAL GROUNDED CAMPUS STATE ---
    const HERO_SLIDES = [
      {
        tag: 'Campus Notice',
        text: 'Academic registration for Winter to Wednesday, November 1 at 2:00pm',
        cta: 'READ MORE →',
        targetTab: 'submit'
      },
      {
        tag: 'Smart Assistance Live',
        text: 'Automatic AI priority routing is active for IT, Classroom, Maintenance, Transport & Lost Belongings.',
        cta: 'SUBMIT TICKET →',
        targetTab: 'submit'
      },
      {
        tag: 'Authority SLA Update',
        text: '94% of Critical & High campus requests resolved within target SLA window this week.',
        cta: 'VIEW DASHBOARD →',
        targetTab: 'admin'
      }
    ];

    const CATEGORY_TO_DEPT = {
      'Classroom': 'Academic & Classroom Ops',
      'IT & Network': 'IT & Digital Services',
      'Maintenance': 'Facilities & Campus Maintenance',
      'Transport': 'Transport & Fleet Division',
      'Lost Belongings': 'Campus Security & Lost-Found',
      'Academic Support': 'Academic & Classroom Ops',
      'Administrative': 'Registrar & Student Admin'
    };

    const PRIORITY_WEIGHT = {
      'Critical': 4,
      'High': 3,
      'Medium': 2,
      'Low': 1
    };

    const INITIAL_REQUESTS = [
      {
        id: 'REQ-1048',
        title: 'Ceiling Projector & HDMI Matrix Dead During Midterm Review',
        category: 'Classroom',
        location: 'Science Hall - Room 104',
        studentName: 'Alex Rivera',
        studentId: 'ELU-2026-0419',
        priority: 'Critical',
        aiRecommendedPriority: 'Critical',
        aiReason: 'Matched urgent keywords ("midterm", "dead", "projector") in active lecture hall.',
        department: 'Academic & Classroom Ops',
        status: 'In Progress',
        createdAt: 'Today, 09:15 AM',
        description: 'The main laser projector in Science Hall 104 refuses to power on and shows a red lamp fault light right before our scheduled 80-student midterm review session.',
        history: [
          { time: '09:15 AM', status: 'Submitted', note: 'Submitted by Alex Rivera (AI Auto-Priority: Critical)' },
          { time: '09:18 AM', status: 'Assigned', note: 'Auto-routed to Academic & Classroom Ops (Lead: Prof. David Chen)' },
          { time: '09:27 AM', status: 'In Progress', note: 'AV Technician dispatched with backup projector unit to Room 104.' }
        ]
      },
      {
        id: 'REQ-1047',
        title: 'Water Pipe Leak Near Electrical Panel in Chemistry Lab',
        category: 'Maintenance',
        location: 'Science Hall - Lab 208',
        studentName: 'Priya Patel',
        studentId: 'ELU-2026-0882',
        priority: 'Critical',
        aiRecommendedPriority: 'Critical',
        aiReason: 'Safety hazard keywords detected ("water", "leak", "electrical panel").',
        department: 'Facilities & Campus Maintenance',
        status: 'Assigned',
        createdAt: 'Today, 10:02 AM',
        description: 'Steady water drip from the ceiling pipe next to the south wall electrical breaker box in Chemistry Lab 208. Floor is wet and hazardous.',
        history: [
          { time: '10:02 AM', status: 'Submitted', note: 'Submitted by Priya Patel (AI Auto-Priority: Critical)' },
          { time: '10:04 AM', status: 'Assigned', note: 'Assigned to Facilities & Campus Maintenance emergency plumbing crew.' }
        ]
      },
      {
        id: 'REQ-1046',
        title: 'EduRoam Wi-Fi Authentication Failing Across 3rd Floor Study Carrels',
        category: 'IT & Network',
        location: 'Main Library - 3rd Floor',
        studentName: 'Alex Rivera',
        studentId: 'ELU-2026-0419',
        priority: 'High',
        aiRecommendedPriority: 'High',
        aiReason: 'Multi-user network outage ("wi-fi", "failing") affecting library floor.',
        department: 'IT & Digital Services',
        status: 'In Progress',
        createdAt: 'Today, 10:40 AM',
        description: 'Students on the 3rd floor of the Main Library cannot connect to EduRoam or access the Canvas LMS portal; access point LED is blinking amber.',
        history: [
          { time: '10:40 AM', status: 'Submitted', note: 'Submitted by Alex Rivera (AI Auto-Priority: High)' },
          { time: '10:45 AM', status: 'Assigned', note: 'Assigned to IT & Digital Services Network Team.' },
          { time: '11:05 AM', status: 'In Progress', note: 'Rebooting AP-LIB-304 switch port and verifying RADIUS server.' }
        ]
      },
      {
        id: 'REQ-1045',
        title: 'Lost Silver MacBook Pro & University ID Pouch on West Route Shuttle',
        category: 'Lost Belongings',
        location: 'North Parking & Shuttle Hub',
        studentName: 'Liam O\'Connor',
        studentId: 'ELU-2026-0512',
        priority: 'High',
        aiRecommendedPriority: 'High',
        aiReason: 'High-value personal & security item ("lost", "macbook", "id").',
        department: 'Campus Security & Lost-Found',
        status: 'Assigned',
        createdAt: 'Yesterday, 04:50 PM',
        description: 'Left a 14-inch silver MacBook Pro in a navy sleeve with my ELOYCE student ID card on Shuttle Bus #4 during the 4:30 PM West Campus loop.',
        history: [
          { time: 'Yesterday, 04:50 PM', status: 'Submitted', note: 'Submitted by Liam O\'Connor' },
          { time: 'Yesterday, 05:05 PM', status: 'Assigned', note: 'Routed to Campus Security & Lost-Found + Shuttle Dispatch.' }
        ]
      },
      {
        id: 'REQ-1044',
        title: 'Morning Campus Shuttle Route B Running 25 Minutes Behind Schedule',
        category: 'Transport',
        location: 'North Parking & Shuttle Hub',
        studentName: 'Alex Rivera',
        studentId: 'ELU-2026-0419',
        priority: 'Medium',
        aiRecommendedPriority: 'Medium',
        aiReason: 'Transport delay affecting morning class commute.',
        department: 'Transport & Fleet Division',
        status: 'Resolved',
        createdAt: 'Yesterday, 08:30 AM',
        description: 'Shuttle Route B at North Lot has had over 45 students waiting for 25 minutes before 9 AM classes.',
        history: [
          { time: 'Yesterday, 08:30 AM', status: 'Submitted', note: 'Submitted by Alex Rivera' },
          { time: 'Yesterday, 08:34 AM', status: 'Assigned', note: 'Assigned to Transport & Fleet Division' },
          { time: 'Yesterday, 08:42 AM', status: 'In Progress', note: 'Dispatched supplemental Shuttle #7 to clear North Lot queue.' },
          { time: 'Yesterday, 09:10 AM', status: 'Resolved', note: 'All waiting students transported; route cadence restored.' }
        ]
      },
      {
        id: 'REQ-1043',
        title: 'Prerequisite Override & Winter Lab Section Registration Hold',
        category: 'Academic Support',
        location: 'Engineering Quad - Advising 110',
        studentName: 'Priya Patel',
        studentId: 'ELU-2026-0882',
        priority: 'Medium',
        aiRecommendedPriority: 'Medium',
        aiReason: 'Academic registration block requiring advisor clearance.',
        department: 'Academic & Classroom Ops',
        status: 'Submitted',
        createdAt: '2 days ago',
        description: 'System shows a prerequisite hold for ECE 310 Lab even though transfer credit for MATH 121.3 is approved on my degree audit.',
        history: [
          { time: '2 days ago', status: 'Submitted', note: 'Submitted by Priya Patel' }
        ]
      },
      {
        id: 'REQ-1042',
        title: 'Official Stamped Enrollment Verification Letter for Scholarship',
        category: 'Administrative',
        location: 'Administration Bldg - Window 2',
        studentName: 'Alex Rivera',
        studentId: 'ELU-2026-0419',
        priority: 'Low',
        aiRecommendedPriority: 'Low',
        aiReason: 'Routine administrative document request.',
        department: 'Registrar & Student Admin',
        status: 'Resolved',
        createdAt: '3 days ago',
        description: 'Requesting an official enrollment verification letter and stamped Fall transcript for external STEM scholarship renewal.',
        history: [
          { time: '3 days ago', status: 'Submitted', note: 'Submitted by Alex Rivera' },
          { time: '2 days ago', status: 'Assigned', note: 'Assigned to Registrar & Student Admin' },
          { time: 'Yesterday', status: 'Resolved', note: 'Digital copy uploaded to Student Portal & physical copy ready at Window 2.' }
        ]
      }
    ];

    const INITIAL_TODOS = [
      { id: 't1', text: 'ENGL 202 - Review peer essays', due: 'Today 5:00 PM', done: false },
      { id: 't2', text: 'Complete lab safety refresher course', due: 'Thu 11:59 PM', done: true },
      { id: 't3', text: 'Group Milestone Video submission', due: 'Fri 2:00 PM', done: false },
      { id: 't4', text: 'MATH 121.3 Calculus II Problem Set 7', due: 'Mon 9:00 AM', done: false }
    ];

    const SCHEDULE_BY_DAY = {
      'Sun': [{ time: 'All Day', course: 'No Scheduled Classes — Library Open 10 AM – 10 PM', room: 'Main Quad' }],
      'Mon': [
        { time: '09:00 AM', course: 'COMM 101.2 Intro to Comm', room: 'Science Hall 104' },
        { time: '02:00 PM', course: 'MATH 121.3 Calculus II', room: 'Engineering 302' }
      ],
      'Tue': [
        { time: '11:00 AM', course: 'ENGL 202 Writing in the Majors', room: 'Humanities 210' },
        { time: '03:30 PM', course: 'CS 340 Systems Architecture Lab', room: 'Engineering 108' }
      ],
      'Wed': [
        { time: '09:00 AM', course: 'COMM 101.2 Intro to Comm', room: 'Science Hall 104' },
        { time: '10:00 AM', course: 'POSC 101.4 Comparative Politics', room: 'Founders Hall 201' },
        { time: '02:00 PM', course: 'MATH 121.3 Calculus II', room: 'Engineering 302' }
      ],
      'Thu': [
        { time: '11:00 AM', course: 'ENGL 202 Writing in the Majors', room: 'Humanities 210' }
      ],
      'Fri': [
        { time: '09:00 AM', course: 'COMM 101.2 Intro to Comm', room: 'Science Hall 104' },
        { time: '01:00 PM', course: 'Senior Capstone Seminar', room: 'Science Hall 305' }
      ],
      'Sat': [{ time: 'All Day', course: 'Weekend Shuttle Loop Active Every 30 Mins', room: 'North Lot Hub' }]
    };

    let appState = {
      activeTab: 'portal',
      currentUser: {
        name: 'Alex Rivera',
        id: 'ELU-2026-0419',
        department: 'Computer Science',
        role: 'student'
      },
      heroSlideIdx: 0,
      selectedScheduleDay: 'Wed',
      selectedCampusZone: 'Science Hall',
      studentScope: 'mine',
      adminSortMode: 'priority',
      activeModalTicketId: null,
      radioPlaying: false,
      requests: [...INITIAL_REQUESTS],
      todos: [...INITIAL_TODOS],
      notifications: [
        {
          id: 'n1',
          ticketId: 'REQ-1048',
          title: 'Status Updated to In Progress',
          message: 'Academic & Classroom Ops dispatched an AV technician to Science Hall 104.',
          time: '12 mins ago',
          unread: true
        },
        {
          id: 'n2',
          ticketId: 'REQ-1046',
          title: 'Department Assigned: IT & Digital Services',
          message: 'Your Main Library Wi-Fi ticket (#REQ-1046) is now being handled by the Network Team.',
          time: '35 mins ago',
          unread: true
        },
        {
          id: 'n3',
          ticketId: 'REQ-1044',
          title: 'Request Resolved (#REQ-1044)',
          message: 'Transport & Fleet Division resolved "Morning Campus Shuttle Route B Delay".',
          time: 'Yesterday',
          unread: true
        }
      ]
    };

    // Load persisted state safely if present
    try {
      const saved = localStorage.getItem('eloyce_campus_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.requests) && parsed.requests.length > 0) {
          appState.requests = parsed.requests;
          appState.notifications = parsed.notifications || appState.notifications;
        }
      }
    } catch (e) {
      // Ignore storage access errors in sandboxed frames
    }

    function persistState() {
      try {
        localStorage.setItem('eloyce_campus_state_v1', JSON.stringify({
          requests: appState.requests,
          notifications: appState.notifications
        }));
      } catch (e) {
        // Ignore storage errors
      }
    }

    // --- 2. BONUS CHALLENGE: AUTOMATIC PRIORITY RECOMMENDATION ENGINE ---
    function analyzeComplaintPriority(category, title, description, location) {
      const combined = `${title || ''} ${description || ''} ${location || ''}`.toLowerCase();

      const criticalTerms = [
        'fire', 'smoke', 'spark', 'sparking', 'flood', 'leak', 'gas', 'shock',
        'electrical', 'emergency', 'injured', 'medical', 'trapped', 'elevator stuck',
        'midterm', 'final exam', 'exam', 'server down', 'blackout', 'power outage',
        'dead', 'security threat', 'burst'
      ];
      const highTerms = [
        'outage', 'broken projector', 'projector', 'no wifi', 'wi-fi', 'wifi',
        'network down', 'locked out', 'lost laptop', 'macbook', 'passport',
        'wallet', 'id card', 'ac broken', 'heating', 'overheating', 'urgent',
        'microphone', 'smartboard', 'shuttle breakdown'
      ];
      const lowTerms = [
        'transcript', 'letter', 'copy', 'certificate', 'inquiry', 'question',
        'suggestion', 'paint', 'poster', 'general', 'Catalog'
      ];

      const matchedCritical = criticalTerms.filter(t => combined.includes(t));
      const matchedHigh = highTerms.filter(t => combined.includes(t));
      const matchedLow = lowTerms.filter(t => combined.includes(t));

      let priority = 'Medium';
      let confidence = 86;
      let sla = 'Within 24 Hours';
      let reason = `Standard ${category} service request routing.`;
      let tags = [`Category: ${category}`];

      if (matchedCritical.length > 0) {
        priority = 'Critical';
        confidence = Math.min(98, 90 + matchedCritical.length * 3);
        sla = 'Immediate (< 1 Hour)';
        reason = `High-severity safety or live academic disruption keywords detected (${matchedCritical.slice(0, 3).join(', ')}).`;
        matchedCritical.slice(0, 4).forEach(k => tags.push(`Urgent: "${k}"`));
      } else if (matchedHigh.length > 0 || category === 'IT & Network' && combined.length > 25) {
        priority = 'High';
        confidence = Math.min(95, 87 + matchedHigh.length * 3);
        sla = 'Urgent (< 4 Hours)';
        reason = matchedHigh.length > 0
          ? `Urgent operational or high-value impact terms detected (${matchedHigh.slice(0, 3).join(', ')}).`
          : `Active ${category} disruption requiring rapid technical response.`;
        matchedHigh.slice(0, 4).forEach(k => tags.push(`Signal: "${k}"`));
      } else if (matchedLow.length > 0 || category === 'Administrative') {
        priority = 'Low';
        confidence = 91;
        sla = 'Routine (< 72 Hours)';
        reason = `Routine administrative or non-urgent documentation request.`;
        matchedLow.slice(0, 3).forEach(k => tags.push(`Routine: "${k}"`));
      } else {
        priority = 'Medium';
        confidence = 88;
        sla = 'Standard (< 24 Hours)';
        reason = `Categorized under ${category} with standard departmental SLA priority.`;
      }

      const department = CATEGORY_TO_DEPT[category] || 'Academic & Classroom Ops';
      return { priority, confidence, sla, reason, tags, department };
    }

    function runLivePriorityRecommendation() {
      const categoryEl = document.getElementById('req-category');
      const titleEl = document.getElementById('req-title');
      const descEl = document.getElementById('req-description');
      const locEl = document.getElementById('req-location');
      const autoToggle = document.getElementById('req-auto-priority-toggle');
      const prioritySelect = document.getElementById('req-priority');
      const deptSelect = document.getElementById('req-department');

      if (!categoryEl || !titleEl || !descEl) return;

      const result = analyzeComplaintPriority(
        categoryEl.value,
        titleEl.value,
        descEl.value,
        locEl ? locEl.value : ''
      );

      if (autoToggle && autoToggle.checked && prioritySelect) {
        prioritySelect.value = result.priority;
      }
      if (deptSelect) {
        deptSelect.value = result.department;
      }

      const badge = document.getElementById('ai-rec-priority-badge');
      const conf = document.getElementById('ai-confidence-pill');
      const sla = document.getElementById('ai-rec-sla');
      const dept = document.getElementById('ai-rec-dept');
      const exp = document.getElementById('ai-rec-explanation');
      const kw = document.getElementById('ai-rec-keywords');

      if (badge) {
        badge.textContent = `${result.priority} Priority`;
        const styles = {
          'Critical': 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-500 text-white shadow',
          'High': 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-orange-500 text-white shadow',
          'Medium': 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow',
          'Low': 'px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-400 text-slate-950 shadow'
        };
        badge.className = styles[result.priority] || styles['Medium'];
      }
      if (conf) conf.textContent = `${result.confidence}% Confidence`;
      if (sla) sla.textContent = result.sla;
      if (dept) dept.textContent = result.department;
      if (exp) exp.textContent = result.reason;
      if (kw) {
        kw.innerHTML = result.tags.map(t => `<span class="px-2 py-0.5 rounded bg-white/10 text-[10px] text-amber-200 border border-white/10">${escapeHtml(t)}</span>`).join('');
      }
    }

    function openQuickScenario(key) {
      switchMainTab('submit');
      const presets = {
        'exam_projector': {
          category: 'Classroom',
          location: 'Science Hall - Room 201',
          title: 'Main Projector Sparking & Dead 15 Mins Before Final Exam',
          description: 'The ceiling projector in Science Hall 201 made a popping sound and shut off completely right before our scheduled 120-student Computer Science exam. Immediate AV replacement needed!'
        },
        'wifi_outage': {
          category: 'IT & Network',
          location: 'Main Library - 2nd Floor',
          title: 'Campus Wi-Fi & LMS Portal Connection Outage',
          description: 'Over 60 students in the 2nd floor reading room cannot connect to campus Wi-Fi or submit online lab assignments.'
        },
        'lost_id': {
          category: 'Lost Belongings',
          location: 'Student Union Food Court',
          title: 'Lost Leather Wallet with Student ID & Lab Keycard',
          description: 'Misplaced a brown leather wallet containing my ELOYCE University ID card and Engineering lab access fob near the Student Union espresso bar around 1:15 PM.'
        },
        'transcript': {
          category: 'Administrative',
          location: 'Administration Bldg - Registrar',
          title: 'Request Extra Copy of Academic Transcript',
          description: 'General inquiry to request an additional sealed copy of my Fall semester grade transcript for personal records.'
        }
      };
      const p = presets[key];
      if (!p) return;
      document.getElementById('req-category').value = p.category;
      document.getElementById('req-location').value = p.location;
      document.getElementById('req-title').value = p.title;
      document.getElementById('req-description').value = p.description;
      document.getElementById('req-auto-priority-toggle').checked = true;
      runLivePriorityRecommendation();
      showToast('Scenario Loaded', `AI Priority Engine analyzed "${p.title}" and set recommended priority & department.`, 'info');
    }

    // --- 3. NAVIGATION & VIEW SWITCHING ---
    function switchMainTab(tab) {
      appState.activeTab = tab;
      const views = ['portal', 'submit', 'myrequests', 'admin'];
      views.forEach(v => {
        const el = document.getElementById(`view-${v}`);
        const btn = document.getElementById(`nav-btn-${v}`);
        if (el) {
          if (v === tab) el.classList.remove('hidden');
          else el.classList.add('hidden');
        }
        if (btn) {
          if (v === tab) {
            btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 bg-white text-slate-900 shadow-sm';
          } else {
            btn.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-stone-200 hover:text-white hover:bg-white/10';
          }
        }
      });

      const mobileDrawer = document.getElementById('mobile-nav-drawer');
      if (mobileDrawer) mobileDrawer.classList.add('hidden');

      if (tab === 'portal') renderPortalView();
      if (tab === 'submit') runLivePriorityRecommendation();
      if (tab === 'myrequests') renderStudentRequestsView();
      if (tab === 'admin') {
        renderAdminDashboard();
        updateAdminCharts();
      }
    }

    function toggleMobileDrawer() {
      const el = document.getElementById('mobile-nav-drawer');
      if (el) el.classList.toggle('hidden');
    }

    function launchCategoryRequest(category) {
      switchMainTab('submit');
      const catSelect = document.getElementById('req-category');
      if (catSelect) {
        catSelect.value = category;
        runLivePriorityRecommendation();
      }
      const titleInput = document.getElementById('req-title');
      if (titleInput) titleInput.focus();
    }

    function reportClassroomIssue(room, defaultTitle) {
      switchMainTab('submit');
      document.getElementById('req-category').value = 'Classroom';
      document.getElementById('req-location').value = room;
      document.getElementById('req-title').value = defaultTitle;
      runLivePriorityRecommendation();
    }

    // --- 4. HERO CAROUSEL & PORTAL WIDGETS ---
    function changeHeroSlide(delta) {
      appState.heroSlideIdx = (appState.heroSlideIdx + delta + HERO_SLIDES.length) % HERO_SLIDES.length;
      const slide = HERO_SLIDES[appState.heroSlideIdx];
      document.getElementById('hero-slide-tag').textContent = slide.tag;
      document.getElementById('hero-slide-text').textContent = slide.text;
      document.getElementById('hero-slide-index').textContent = `${appState.heroSlideIdx + 1} of ${HERO_SLIDES.length}`;
      document.getElementById('hero-slide-cta').textContent = slide.cta;
    }

    function handleHeroSlideCTA() {
      const slide = HERO_SLIDES[appState.heroSlideIdx];
      switchMainTab(slide.targetTab || 'submit');
    }

    function toggleAddTodoRow() {
      const row = document.getElementById('todo-add-row');
      if (row) row.classList.toggle('hidden');
    }

    function addPortalTodo() {
      const inp = document.getElementById('todo-new-input');
      if (!inp || !inp.value.trim()) return;
      appState.todos.unshift({
        id: 'td-' + Date.now(),
        text: inp.value.trim(),
        due: 'Added Today',
        done: false
      });
      inp.value = '';
      document.getElementById('todo-add-row').classList.add('hidden');
      renderPortalTodos();
    }

    function toggleTodoItem(id) {
      const item = appState.todos.find(t => t.id === id);
      if (item) item.done = !item.done;
      renderPortalTodos();
    }

    function renderPortalTodos() {
      const list = document.getElementById('portal-todo-list');
      if (!list) return;
      list.innerHTML = appState.todos.map(t => `
        <li class="flex items-start justify-between gap-2 p-1.5 rounded hover:bg-stone-50">
          <label class="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTodoItem('${t.id}')" class="mt-0.5 rounded text-slate-900 focus:ring-amber-500" />
            <span class="${t.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}">${escapeHtml(t.text)}</span>
          </label>
          <span class="text-[10px] text-slate-400 whitespace-nowrap">${escapeHtml(t.due)}</span>
        </li>
      `).join('');
      const countEl = document.getElementById('todo-summary-count');
      if (countEl) {
        const remaining = appState.todos.filter(t => !t.done).length;
        countEl.textContent = `${remaining} pending of ${appState.todos.length}`;
      }
    }

    function selectScheduleDay(day) {
      appState.selectedScheduleDay = day;
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      days.forEach(d => {
        const btn = document.getElementById(`sched-day-${d}`);
        if (btn) {
          btn.className = d === day
            ? 'py-1 rounded bg-slate-900 text-white font-bold'
            : 'py-1 rounded text-slate-600 hover:bg-stone-100';
        }
      });
      const container = document.getElementById('schedule-slots-container');
      const items = SCHEDULE_BY_DAY[day] || [];
      if (container) {
        container.innerHTML = items.map(item => `
          <div class="p-2 rounded-lg bg-amber-50/70 border-l-4 border-amber-500 flex items-center justify-between">
            <div>
              <div class="text-[10px] font-bold text-amber-800">${escapeHtml(item.time)}</div>
              <div class="font-bold text-slate-800">${escapeHtml(item.course)}</div>
              <div class="text-[10px] text-slate-500">${escapeHtml(item.room)}</div>
            </div>
          </div>
        `).join('');
      }
      const footer = document.getElementById('schedule-day-footer');
      if (footer) footer.textContent = `${day} Schedule (${items.length} block${items.length === 1 ? '' : 's'})`;
    }

    function selectCampusZone(zone) {
      appState.selectedCampusZone = zone;
      const count = appState.requests.filter(r => r.location.toLowerCase().includes(zone.split(' ')[0].toLowerCase())).length;
      const readout = document.getElementById('campus-zone-readout');
      if (readout) {
        readout.innerHTML = `
          <span>Zone: <strong>${escapeHtml(zone)}</strong> (${count} active ticket${count === 1 ? '' : 's'})</span>
          <button type="button" onclick="reportZoneIssue()" class="text-amber-700 font-bold hover:underline">Report Here</button>
        `;
      }
    }

    function reportZoneIssue() {
      switchMainTab('submit');
      document.getElementById('req-location').value = appState.selectedCampusZone;
      runLivePriorityRecommendation();
    }

    function toggleCampusRadio() {
      appState.radioPlaying = !appState.radioPlaying;
      const pill = document.getElementById('radio-status-pill');
      const btn = document.getElementById('radio-play-btn');
      if (appState.radioPlaying) {
        if (pill) {
          pill.textContent = 'ON AIR • 82.3 FM';
          pill.className = 'text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold';
        }
        if (btn) btn.innerHTML = '<span>Stop Broadcast</span>';
        playCampusChime();
      } else {
        if (pill) {
          pill.textContent = 'Standby';
          pill.className = 'text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-stone-300';
        }
        if (btn) btn.innerHTML = '<span>Listen Chime</span>';
      }
    }

    function playCampusChime() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.14);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.14 + 0.45);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.14);
          osc.stop(ctx.currentTime + idx * 0.14 + 0.45);
        });
      } catch (e) {
        // Ignore audio context restrictions
      }
    }

    // --- 5. SUBMIT REQUEST HANDLER ---
    function handleRequestSubmit(e) {
      e.preventDefault();
      const studentName = document.getElementById('req-student-name').value.trim() || appState.currentUser.name;
      const studentId = document.getElementById('req-student-id').value.trim() || appState.currentUser.id;
      const category = document.getElementById('req-category').value;
      const location = document.getElementById('req-location').value.trim();
      const title = document.getElementById('req-title').value.trim();
      const description = document.getElementById('req-description').value.trim();
      const priority = document.getElementById('req-priority').value;
      const department = document.getElementById('req-department').value;

      const aiAnalysis = analyzeComplaintPriority(category, title, description, location);
      const newId = 'REQ-' + (1049 + appState.requests.length);

      const newTicket = {
        id: newId,
        title,
        category,
        location,
        studentName,
        studentId,
        priority,
        aiRecommendedPriority: aiAnalysis.priority,
        aiReason: aiAnalysis.reason,
        department,
        status: 'Submitted',
        createdAt: 'Just now',
        description,
        history: [
          {
            time: 'Just now',
            status: 'Submitted',
            note: `Submitted by ${studentName} (${studentId}). AI Priority Recommended: ${aiAnalysis.priority} (${aiAnalysis.confidence}% confidence). Routed to ${department}.`
          }
        ]
      };

      appState.requests.unshift(newTicket);
      pushNotification(
        newId,
        `Request Submitted (${newId})`,
        `Your ${category} request "${title}" has been logged with ${priority} priority and routed to ${department}.`
      );
      persistState();
      resetSubmitForm();
      updateAllCounters();
      switchMainTab('myrequests');
      showToast('Request Submitted!', `Ticket #${newId} created (${priority} Priority) and routed to ${department}.`, 'success');
    }

    function resetSubmitForm() {
      const titleEl = document.getElementById('req-title');
      const descEl = document.getElementById('req-description');
      if (titleEl) titleEl.value = '';
      if (descEl) descEl.value = '';
      runLivePriorityRecommendation();
    }

    // --- 6. RENDER PORTAL & STUDENT TRACKING VIEWS ---
    function getPriorityBadgeHtml(priority) {
      const map = {
        'Critical': 'bg-rose-100 text-rose-800 border border-rose-300',
        'High': 'bg-orange-100 text-orange-800 border border-orange-300',
        'Medium': 'bg-amber-100 text-amber-800 border border-amber-300',
        'Low': 'bg-emerald-100 text-emerald-800 border border-emerald-300'
      };
      return `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${map[priority] || map['Medium']}">${escapeHtml(priority)}</span>`;
    }

    function getStatusBadgeHtml(status) {
      const map = {
        'Submitted': 'bg-stone-200 text-slate-800',
        'Assigned': 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-amber-100 text-amber-900',
        'Resolved': 'bg-emerald-100 text-emerald-800',
        'Escalated': 'bg-rose-600 text-white'
      };
      return `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${map[status] || map['Submitted']}">${escapeHtml(status)}</span>`;
    }

    function buildStepProgressHtml(status) {
      const steps = ['Submitted', 'Assigned', 'In Progress', 'Resolved'];
      const currentIdx = status === 'Escalated' ? 2 : Math.max(0, steps.indexOf(status));
      return `
        <div class="grid grid-cols-4 gap-1.5 pt-2">
          ${steps.map((step, idx) => {
            const reached = idx <= currentIdx;
            const barClass = reached
              ? (status === 'Resolved' ? 'bg-emerald-500' : 'bg-amber-500')
              : 'bg-stone-200';
            const textClass = reached ? 'text-slate-800 font-bold' : 'text-slate-400';
            return `
              <div>
                <div class="h-1.5 rounded-full ${barClass}"></div>
                <div class="text-[10px] mt-1 ${textClass}">${step}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    function renderPortalView() {
      renderPortalTodos();
      selectScheduleDay(appState.selectedScheduleDay);
      selectCampusZone(appState.selectedCampusZone);

      const grid = document.getElementById('portal-recent-requests-grid');
      if (!grid) return;
      const topThree = appState.requests.slice(0, 3);
      grid.innerHTML = topThree.map(r => `
        <div class="p-4 rounded-xl border border-stone-200 hover:border-amber-400 bg-stone-50/60 hover:bg-white transition flex flex-col justify-between shadow-2xs">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="font-mono text-xs font-bold text-slate-700">#${escapeHtml(r.id)}</span>
              <div class="flex items-center gap-1.5">
                ${getPriorityBadgeHtml(r.priority)}
                ${getStatusBadgeHtml(r.status)}
              </div>
            </div>
            <h3 class="text-sm font-bold text-slate-900 line-clamp-1">${escapeHtml(r.title)}</h3>
            <p class="text-xs text-slate-500 mt-0.5">${escapeHtml(r.category)} • ${escapeHtml(r.location)}</p>
            <p class="text-[11px] text-amber-800 font-medium mt-1">Dept: ${escapeHtml(r.department)}</p>
          </div>
          <div class="mt-3">
            ${buildStepProgressHtml(r.status)}
            <div class="mt-3 pt-2 border-t border-stone-200/80 flex items-center justify-between text-xs">
              <span class="text-[11px] text-slate-400">${escapeHtml(r.createdAt)}</span>
              <button type="button" onclick="openTicketModal('${r.id}')" class="font-bold text-slate-900 hover:text-amber-700">
                Inspect / Update &rarr;
              </button>
            </div>
          </div>
        </div>
      `).join('');
      updateAllCounters();
    }

    function setStudentListScope(scope) {
      appState.studentScope = scope;
      const mineBtn = document.getElementById('student-scope-mine');
      const allBtn = document.getElementById('student-scope-all');
      if (mineBtn && allBtn) {
        mineBtn.className = scope === 'mine'
          ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white transition'
          : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 text-slate-700 hover:bg-stone-200 transition';
        allBtn.className = scope === 'all'
          ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white transition'
          : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 text-slate-700 hover:bg-stone-200 transition';
      }
      renderStudentRequestsView();
    }

    function renderStudentRequestsView() {
      const container = document.getElementById('student-requests-container');
      if (!container) return;

      const query = (document.getElementById('track-search-input')?.value || '').toLowerCase().trim();
      const catFilter = document.getElementById('track-filter-category')?.value || 'ALL';
      const statusFilter = document.getElementById('track-filter-status')?.value || 'ALL';
      const prioFilter = document.getElementById('track-filter-priority')?.value || 'ALL';

      const filtered = appState.requests.filter(r => {
        if (appState.studentScope === 'mine' && appState.currentUser.role === 'student') {
          if (r.studentId !== appState.currentUser.id && r.studentName.toLowerCase() !== appState.currentUser.name.toLowerCase()) {
            return false;
          }
        }
        if (catFilter !== 'ALL' && r.category !== catFilter) return false;
        if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
        if (prioFilter !== 'ALL' && r.priority !== prioFilter) return false;
        if (query) {
          const hay = `${r.id} ${r.title} ${r.description} ${r.location} ${r.studentName} ${r.department}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="text-center py-12 bg-stone-50 rounded-xl border border-stone-200">
            <div class="text-sm font-bold text-slate-700">No matching requests found</div>
            <p class="text-xs text-slate-500 mt-1">Try switching to "All Campus Tickets" or clearing your search filters.</p>
            <button type="button" onclick="setStudentListScope('all')" class="mt-3 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold">
              Show All Campus Tickets
            </button>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(r => `
        <div class="p-4 sm:p-5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 transition shadow-2xs">
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-stone-100 text-slate-900">#${escapeHtml(r.id)}</span>
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-slate-700">${escapeHtml(r.category)}</span>
                ${getPriorityBadgeHtml(r.priority)}
                ${getStatusBadgeHtml(r.status)}
              </div>
              <h3 class="text-base font-bold text-slate-900 mt-2">${escapeHtml(r.title)}</h3>
              <p class="text-xs text-slate-600 mt-1">${escapeHtml(r.description)}</p>
            </div>
            <button type="button" onclick="openTicketModal('${r.id}')" class="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition">
              Track &amp; Manage
            </button>
          </div>

          <div class="mt-4 pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500">
            <div><strong>Location:</strong> ${escapeHtml(r.location)}</div>
            <div><strong>Assigned Dept:</strong> <span class="text-amber-800 font-semibold">${escapeHtml(r.department)}</span></div>
            <div><strong>Student:</strong> ${escapeHtml(r.studentName)} (${escapeHtml(r.createdAt)})</div>
          </div>

          ${buildStepProgressHtml(r.status)}
        </div>
      `).join('');
    }

    // --- 7. ADMIN DASHBOARD, TABLE & CHARTS ---
    let categoryChartInstance = null;
    let priorityChartInstance = null;
    let deptChartInstance = null;

    function setAdminSortMode(mode) {
      appState.adminSortMode = mode;
      const pBtn = document.getElementById('admin-sort-priority');
      const nBtn = document.getElementById('admin-sort-newest');
      if (pBtn && nBtn) {
        pBtn.className = mode === 'priority'
          ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white transition'
          : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 text-slate-700 hover:bg-stone-200 transition';
        nBtn.className = mode === 'newest'
          ? 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white transition'
          : 'px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 text-slate-700 hover:bg-stone-200 transition';
      }
      renderAdminDashboard();
    }

    function renderAdminDashboard() {
      updateAllCounters();
      const tbody = document.getElementById('admin-requests-tbody');
      if (!tbody) return;

      const query = (document.getElementById('admin-search-input')?.value || '').toLowerCase().trim();
      const catFilter = document.getElementById('admin-filter-category')?.value || 'ALL';
      const prioFilter = document.getElementById('admin-filter-priority')?.value || 'ALL';
      const deptFilter = document.getElementById('admin-filter-dept')?.value || 'ALL';

      let rows = appState.requests.filter(r => {
        if (catFilter !== 'ALL' && r.category !== catFilter) return false;
        if (prioFilter !== 'ALL' && r.priority !== prioFilter) return false;
        if (deptFilter !== 'ALL' && r.department !== deptFilter) return false;
        if (query) {
          const hay = `${r.id} ${r.title} ${r.description} ${r.location} ${r.studentName} ${r.studentId}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });

      if (appState.adminSortMode === 'priority') {
        rows.sort((a, b) => (PRIORITY_WEIGHT[b.priority] || 0) - (PRIORITY_WEIGHT[a.priority] || 0));
      }

      const departments = [
        'Academic & Classroom Ops',
        'IT & Digital Services',
        'Facilities & Campus Maintenance',
        'Transport & Fleet Division',
        'Campus Security & Lost-Found',
        'Registrar & Student Admin'
      ];
      const statuses = ['Submitted', 'Assigned', 'In Progress', 'Resolved', 'Escalated'];
      const priorities = ['Critical', 'High', 'Medium', 'Low'];

      tbody.innerHTML = rows.map(r => `
        <tr class="hover:bg-stone-50/90 transition">
          <td class="py-3 px-3 align-top">
            <div class="font-mono font-bold text-slate-900">#${escapeHtml(r.id)}</div>
            <div class="text-[11px] font-medium text-slate-700">${escapeHtml(r.studentName)}</div>
            <div class="text-[10px] text-slate-400">${escapeHtml(r.studentId)}</div>
          </td>
          <td class="py-3 px-3 align-top max-w-xs">
            <div class="font-bold text-slate-900">${escapeHtml(r.title)}</div>
            <div class="text-[11px] text-slate-500 mt-0.5">${escapeHtml(r.location)} • ${escapeHtml(r.createdAt)}</div>
          </td>
          <td class="py-3 px-3 align-top">
            <span class="px-2 py-0.5 rounded bg-stone-100 text-slate-700 font-semibold text-[11px]">${escapeHtml(r.category)}</span>
          </td>
          <td class="py-3 px-3 align-top">
            <select onchange="inlineUpdatePriority('${r.id}', this.value)" class="rounded-lg border border-stone-300 px-2 py-1 text-xs font-bold bg-white">
              ${priorities.map(p => `<option value="${p}" ${r.priority === p ? 'selected' : ''}>${p}</option>`).join('')}
            </select>
            <div class="text-[10px] text-slate-400 mt-1">AI Rec: <strong>${escapeHtml(r.aiRecommendedPriority || r.priority)}</strong></div>
          </td>
          <td class="py-3 px-3 align-top">
            <select onchange="inlineUpdateDepartment('${r.id}', this.value)" class="rounded-lg border border-stone-300 px-2 py-1 text-xs bg-white max-w-[185px]">
              ${departments.map(d => `<option value="${d}" ${r.department === d ? 'selected' : ''}>${d}</option>`).join('')}
            </select>
          </td>
          <td class="py-3 px-3 align-top">
            <select onchange="inlineUpdateStatus('${r.id}', this.value)" class="rounded-lg border border-stone-300 px-2 py-1 text-xs font-bold bg-white">
              ${statuses.map(s => `<option value="${s}" ${r.status === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </td>
          <td class="py-3 px-3 align-top text-right">
            <button type="button" onclick="openTicketModal('${r.id}')" class="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-white text-[11px] font-semibold">
              Inspect
            </button>
          </td>
        </tr>
      `).join('');
    }

    function inlineUpdateStatus(ticketId, newStatus) {
      const t = appState.requests.find(r => r.id === ticketId);
      if (!t) return;
      const oldStatus = t.status;
      t.status = newStatus;
      t.history.push({
        time: 'Just now',
        status: newStatus,
        note: `Authority updated status from "${oldStatus}" to "${newStatus}".`
      });
      pushNotification(
        ticketId,
        `Status Changed: #${ticketId} → ${newStatus}`,
        `Your request "${t.title}" was updated from ${oldStatus} to ${newStatus} by ${t.department}.`
      );
      persistState();
      renderAdminDashboard();
      updateAdminCharts();
      showToast('Status Updated & Student Notified', `Ticket #${ticketId} is now "${newStatus}". Notification sent to ${t.studentName}.`, 'success');
    }

    function inlineUpdateDepartment(ticketId, newDept) {
      const t = appState.requests.find(r => r.id === ticketId);
      if (!t) return;
      t.department = newDept;
      if (t.status === 'Submitted') t.status = 'Assigned';
      t.history.push({
        time: 'Just now',
        status: t.status,
        note: `Request assigned to department: ${newDept}.`
      });
      pushNotification(
        ticketId,
        `Department Assigned: #${ticketId}`,
        `Ticket "${t.title}" has been assigned to ${newDept}.`
      );
      persistState();
      renderAdminDashboard();
      updateAdminCharts();
      showToast('Department Assigned', `Ticket #${ticketId} routed to ${newDept}.`, 'info');
    }

    function inlineUpdatePriority(ticketId, newPriority) {
      const t = appState.requests.find(r => r.id === ticketId);
      if (!t) return;
      t.priority = newPriority;
      t.history.push({
        time: 'Just now',
        status: t.status,
        note: `Priority adjusted to ${newPriority} by Authority.`
      });
      pushNotification(
        ticketId,
        `Priority Adjusted: #${ticketId} (${newPriority})`,
        `Priority level for "${t.title}" was updated to ${newPriority}.`
      );
      persistState();
      renderAdminDashboard();
      updateAdminCharts();
      showToast('Priority Updated', `Ticket #${ticketId} priority set to ${newPriority}.`, 'info');
    }

    function autoAssignAllUnassigned() {
      let count = 0;
      appState.requests.forEach(r => {
        const recommendedDept = CATEGORY_TO_DEPT[r.category] || 'Academic & Classroom Ops';
        if (r.status === 'Submitted') {
          r.status = 'Assigned';
          r.department = recommendedDept;
          r.history.push({
            time: 'Just now',
            status: 'Assigned',
            note: `Auto-assigned to ${recommendedDept} via Smart Campus Dispatcher.`
          });
          count++;
        }
      });
      persistState();
      renderAdminDashboard();
      updateAdminCharts();
      showToast('Smart Dispatcher Complete', count > 0 ? `${count} submitted ticket(s) transitioned to Assigned.` : 'All submitted tickets are already assigned to departments.', 'success');
    }

    function updateAdminCharts() {
      if (typeof Chart === 'undefined') return;

      const categories = ['Classroom', 'IT & Network', 'Maintenance', 'Transport', 'Lost Belongings', 'Academic Support', 'Administrative'];
      const catCounts = categories.map(c => appState.requests.filter(r => r.category === c).length);

      const priorities = ['Critical', 'High', 'Medium', 'Low'];
      const prioCounts = priorities.map(p => appState.requests.filter(r => r.priority === p).length);

      const depts = [
        'Academic & Classroom Ops',
        'IT & Digital Services',
        'Facilities & Campus Maintenance',
        'Transport & Fleet Division',
        'Campus Security & Lost-Found',
        'Registrar & Student Admin'
      ];
      const deptShort = ['Classroom Ops', 'IT Services', 'Facilities', 'Transport', 'Security/Lost', 'Registrar'];
      const deptCounts = depts.map(d => appState.requests.filter(r => r.department === d).length);

      const ctxCat = document.getElementById('chart-categories');
      if (ctxCat) {
        if (categoryChartInstance) categoryChartInstance.destroy();
        categoryChartInstance = new Chart(ctxCat, {
          type: 'bar',
          data: {
            labels: ['Classroom', 'IT/Wi-Fi', 'Maint.', 'Transport', 'Lost Item', 'Academic', 'Admin'],
            datasets: [{
              label: 'Requests',
              data: catCounts,
              backgroundColor: ['#f59e0b', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899', '#10b981', '#64748b'],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
          }
        });
      }

      const ctxPrio = document.getElementById('chart-priorities');
      if (ctxPrio) {
        if (priorityChartInstance) priorityChartInstance.destroy();
        priorityChartInstance = new Chart(ctxPrio, {
          type: 'doughnut',
          data: {
            labels: priorities,
            datasets: [{
              data: prioCounts,
              backgroundColor: ['#e11d48', '#f97316', '#f59e0b', '#10b981'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } } }
          }
        });
      }

      const ctxDept = document.getElementById('chart-departments');
      if (ctxDept) {
        if (deptChartInstance) deptChartInstance.destroy();
        deptChartInstance = new Chart(ctxDept, {
          type: 'bar',
          data: {
            labels: deptShort,
            datasets: [{
              label: 'Assigned Tickets',
              data: deptCounts,
              backgroundColor: '#1e293b',
              borderRadius: 6
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } }
          }
        });
      }
    }

    // --- 8. TICKET INSPECTOR MODAL & SIMULATION ---
    function openTicketModal(ticketId) {
      const t = appState.requests.find(r => r.id === ticketId);
      if (!t) return;
      appState.activeModalTicketId = ticketId;

      document.getElementById('modal-ticket-id').textContent = '#' + t.id;
      document.getElementById('modal-ticket-category').textContent = t.category;
      document.getElementById('modal-ticket-priority').textContent = t.priority + ' Priority';
      document.getElementById('modal-ticket-title').textContent = t.title;
      document.getElementById('modal-ticket-student').textContent = `${t.studentName} (${t.studentId})`;
      document.getElementById('modal-ticket-location').textContent = t.location;
      document.getElementById('modal-ticket-dept').textContent = t.department;
      document.getElementById('modal-ticket-desc').textContent = t.description;
      document.getElementById('modal-ai-reason').textContent = `AI Priority Recommendation (${t.aiRecommendedPriority || t.priority}): ${t.aiReason || 'Categorized automatically.'}`;

      document.getElementById('modal-update-status').value = t.status;
      document.getElementById('modal-update-priority').value = t.priority;
      document.getElementById('modal-update-dept').value = t.department;
      document.getElementById('modal-update-note').value = '';

      const steps = ['Submitted', 'Assigned', 'In Progress', 'Resolved'];
      const currIdx = t.status === 'Escalated' ? 2 : Math.max(0, steps.indexOf(t.status));
      const stepsEl = document.getElementById('modal-progress-steps');
      if (stepsEl) {
        stepsEl.innerHTML = steps.map((s, idx) => {
          const active = idx <= currIdx;
          return `
            <div class="p-2 rounded-lg border ${active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-stone-200'} text-center">
              <div class="text-[10px] font-bold uppercase">Step ${idx + 1}</div>
              <div class="text-xs font-extrabold mt-0.5">${s}</div>
            </div>
          `;
        }).join('');
      }

      const histEl = document.getElementById('modal-ticket-history');
      if (histEl) {
        histEl.innerHTML = (t.history || []).slice().reverse().map(h => `
          <div class="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-start justify-between gap-3">
            <div>
              <span class="font-bold text-slate-900">[${escapeHtml(h.status)}]</span>
              <span class="text-slate-700 ml-1">${escapeHtml(h.note)}</span>
            </div>
            <span class="text-[10px] text-slate-400 whitespace-nowrap">${escapeHtml(h.time)}</span>
          </div>
        `).join('');
      }

      const modal = document.getElementById('ticket-detail-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }

    function closeTicketModal() {
      const modal = document.getElementById('ticket-detail-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    function saveModalTicketUpdate() {
      const id = appState.activeModalTicketId;
      const t = appState.requests.find(r => r.id === id);
      if (!t) return;

      const newStatus = document.getElementById('modal-update-status').value;
      const newPriority = document.getElementById('modal-update-priority').value;
      const newDept = document.getElementById('modal-update-dept').value;
      const noteText = document.getElementById('modal-update-note').value.trim();

      t.status = newStatus;
      t.priority = newPriority;
      t.department = newDept;
      t.history.push({
        time: 'Just now',
        status: newStatus,
        note: noteText || `Status updated to ${newStatus} (${newPriority} Priority) by ${newDept}.`
      });

      pushNotification(
        t.id,
        `Ticket #${t.id} Updated → ${newStatus}`,
        noteText || `Your request "${t.title}" is now ${newStatus} under ${newDept}.`
      );
      persistState();
      openTicketModal(id);
      renderPortalView();
      renderStudentRequestsView();
      renderAdminDashboard();
      updateAdminCharts();
      showToast('Ticket Updated & Notified', `Ticket #${t.id} updated to ${newStatus}. Notification delivered.`, 'success');
    }

    function simulateAuthorityProgress() {
      const candidate = appState.requests.find(r => r.status !== 'Resolved') || appState.requests[0];
      if (!candidate) return;
      const nextMap = {
        'Submitted': 'Assigned',
        'Assigned': 'In Progress',
        'In Progress': 'Resolved',
        'Escalated': 'In Progress',
        'Resolved': 'In Progress'
      };
      const oldStatus = candidate.status;
      const nextStatus = nextMap[oldStatus] || 'In Progress';
      candidate.status = nextStatus;
      candidate.history.push({
        time: 'Just now',
        status: nextStatus,
        note: `Automated Authority Update: ${candidate.department} advanced ticket from ${oldStatus} to ${nextStatus}.`
      });

      pushNotification(
        candidate.id,
        `Live Status Alert: #${candidate.id} is ${nextStatus}`,
        `${candidate.department} moved "${candidate.title}" from ${oldStatus} to ${nextStatus}.`
      );
      persistState();
      renderPortalView();
      renderStudentRequestsView();
      renderAdminDashboard();
      if (appState.activeTab === 'admin') updateAdminCharts();
      showToast('Live Status Notification!', `Ticket #${candidate.id} ("${candidate.title.slice(0, 32)}...") moved from ${oldStatus} → ${nextStatus}!`, 'success');
    }

    // --- 9. NOTIFICATIONS & TOASTS ---
    function pushNotification(ticketId, title, message) {
      appState.notifications.unshift({
        id: 'notif-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
        ticketId,
        title,
        message,
        time: 'Just now',
        unread: true
      });
      updateAllCounters();
      renderNotificationList();
    }

    function toggleNotificationDrawer() {
      const drawer = document.getElementById('notification-drawer');
      const backdrop = document.getElementById('notification-drawer-backdrop');
      if (!drawer || !backdrop) return;
      const isHidden = drawer.classList.contains('hidden');
      if (isHidden) {
        renderNotificationList();
        drawer.classList.remove('hidden');
        drawer.classList.add('flex');
        backdrop.classList.remove('hidden');
      } else {
        drawer.classList.add('hidden');
        drawer.classList.remove('flex');
        backdrop.classList.add('hidden');
      }
    }

    function markAllNotificationsRead() {
      appState.notifications.forEach(n => { n.unread = false; });
      persistState();
      updateAllCounters();
      renderNotificationList();
    }

    function openNotificationTicket(notifId, ticketId) {
      const n = appState.notifications.find(x => x.id === notifId);
      if (n) n.unread = false;
      updateAllCounters();
      toggleNotificationDrawer();
      openTicketModal(ticketId);
    }

    function renderNotificationList() {
      const container = document.getElementById('notification-list-container');
      if (!container) return;
      if (appState.notifications.length === 0) {
        container.innerHTML = `<div class="text-center py-8 text-xs text-slate-400">No notifications yet.</div>`;
        return;
      }
      container.innerHTML = appState.notifications.map(n => `
        <div class="p-3.5 rounded-xl border ${n.unread ? 'bg-amber-50/70 border-amber-300' : 'bg-stone-50 border-stone-200'} space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-900">${escapeHtml(n.title)}</span>
            <span class="text-[10px] text-slate-400">${escapeHtml(n.time)}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(n.message)}</p>
          <div class="pt-1 flex justify-end">
            <button type="button" onclick="openNotificationTicket('${n.id}', '${n.ticketId}')" class="text-[11px] font-bold text-amber-800 hover:underline">
              Inspect Ticket #${escapeHtml(n.ticketId)} &rarr;
            </button>
          </div>
        </div>
      `).join('');
    }

    function showToast(title, message, type) {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      const borderColor = type === 'success' ? 'border-emerald-400' : 'border-amber-400';
      toast.className = `pointer-events-auto bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border-l-4 ${borderColor} flex items-start justify-between gap-3 transition-all duration-300`;
      toast.innerHTML = `
        <div>
          <div class="text-xs font-bold text-amber-300">${escapeHtml(title)}</div>
          <div class="text-[11px] text-stone-200 mt-0.5 leading-snug">${escapeHtml(message)}</div>
        </div>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 4200);
    }

    // --- 10. AUTHENTICATION & ROLE SWITCHING ---
    function openAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    }

    function closeAuthModal() {
      const modal = document.getElementById('auth-modal');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    }

    function switchAuthTab(tab) {
      const loginPanel = document.getElementById('auth-panel-login');
      const regPanel = document.getElementById('auth-panel-register');
      const loginTab = document.getElementById('auth-tab-login');
      const regTab = document.getElementById('auth-tab-register');
      if (tab === 'login') {
        loginPanel.classList.remove('hidden');
        regPanel.classList.add('hidden');
        loginTab.className = 'py-3 border-b-2 border-slate-900 text-slate-900 bg-white';
        regTab.className = 'py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800';
      } else {
        loginPanel.classList.add('hidden');
        regPanel.classList.remove('hidden');
        regTab.className = 'py-3 border-b-2 border-slate-900 text-slate-900 bg-white';
        loginTab.className = 'py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800';
      }
    }

    function selectPresetUser(name, id, department, role) {
      appState.currentUser = { name, id, department, role };
      syncUserHeaderUI();
      closeAuthModal();
      if (role === 'admin') {
        switchMainTab('admin');
      } else {
        renderPortalView();
        renderStudentRequestsView();
      }
      showToast('Signed In', `Active session switched to ${name} (${role === 'admin' ? 'University Authority' : 'Student'}).`, 'success');
    }

    function QuickSwitchRole(role) {
      if (role === 'admin') {
        selectPresetUser('Dr. Marcus Vance', 'ADMIN-OPS-01', 'Campus Operations Authority', 'admin');
      } else {
        selectPresetUser('Alex Rivera', 'ELU-2026-0419', 'Computer Science', 'student');
        if (appState.activeTab === 'admin') switchMainTab('portal');
      }
    }

    function handleLoginSubmit(e) {
      e.preventDefault();
      const idVal = document.getElementById('login-id-input').value.trim();
      if (idVal.toUpperCase().includes('ADMIN')) {
        selectPresetUser('Dr. Marcus Vance', idVal, 'Campus Operations Authority', 'admin');
      } else {
        selectPresetUser('Alex Rivera', idVal || 'ELU-2026-0419', 'Computer Science', 'student');
      }
    }

    function handleRegisterSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('reg-name-input').value.trim();
      const id = document.getElementById('reg-id-input').value.trim();
      const dept = document.getElementById('reg-dept-input').value.trim();
      if (!name || !id) return;
      selectPresetUser(name, id, dept || 'General Studies', 'student');
      showToast('Registration Complete!', `Welcome to ELOYCE University, ${name} (${id})!`, 'success');
    }

    function syncUserHeaderUI() {
      const u = appState.currentUser;
      const initials = u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      document.getElementById('header-user-avatar').textContent = initials;
      document.getElementById('header-user-name').textContent = u.name;
      document.getElementById('header-user-meta').textContent = `${u.id} • ${u.role === 'admin' ? 'Authority' : 'Student'}`;
      document.getElementById('ribbon-user-label').textContent = `${u.name} (${u.role === 'admin' ? 'Authority' : 'Student'} • ${u.department})`;

      const reqName = document.getElementById('req-student-name');
      const reqId = document.getElementById('req-student-id');
      if (reqName) reqName.value = u.name;
      if (reqId) reqId.value = u.id;

      const sPill = document.getElementById('role-pill-student');
      const aPill = document.getElementById('role-pill-admin');
      if (sPill && aPill) {
        if (u.role === 'admin') {
          aPill.className = 'px-2.5 py-1 rounded-md font-semibold bg-emerald-400 text-slate-950 transition';
          sPill.className = 'px-2.5 py-1 rounded-md font-semibold text-stone-300 hover:text-white transition';
        } else {
          sPill.className = 'px-2.5 py-1 rounded-md font-semibold bg-amber-500 text-slate-950 transition';
          aPill.className = 'px-2.5 py-1 rounded-md font-semibold text-stone-300 hover:text-white transition';
        }
      }
    }

    function updateAllCounters() {
      const total = appState.requests.length;
      const urgent = appState.requests.filter(r => r.priority === 'Critical' || r.priority === 'High').length;
      const active = appState.requests.filter(r => r.status !== 'Resolved').length;
      const resolved = appState.requests.filter(r => r.status === 'Resolved').length;
      const unread = appState.notifications.filter(n => n.unread).length;

      const setTxt = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
      };
      setTxt('nav-student-req-count', total);
      setTxt('hero-active-tickets-pill', `${active} Active Tickets`);
      setTxt('admin-kpi-total', total);
      setTxt('admin-kpi-urgent', urgent);
      setTxt('admin-kpi-active', active);
      setTxt('admin-kpi-resolved', resolved);
      setTxt('notif-unread-badge', unread);
    }

    function escapeHtml(str) {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // --- INITIALIZE ON LOAD ---
    window.addEventListener('DOMContentLoaded', () => {
      syncUserHeaderUI();
      renderPortalView();
      runLivePriorityRecommendation();
      renderStudentRequestsView();
      renderAdminDashboard();
    });
