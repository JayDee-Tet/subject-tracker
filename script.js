// ═══════════════════════════════════════════════════════
//  SUBJECTS — this is the only part you ever need to edit
//
//  Fields:
//    id           — unique key, no spaces (e.g. 'softeng')
//    title        — subject name shown on card and modal
//    todo         — short task label
//    instructions — (optional) longer description below todo
//    links        — array of { label, url }; leave as [] if none
//    deadline     — new Date('YYYY-MM-DDTHH:MM:00'), or null if unknown
//    deadlineNote — (optional) extra note shown after the deadline date
// ═══════════════════════════════════════════════════════
const subjects = [
  {
    id:       'automata',
    title:    'Automata Theory & Formal Language',
    todo:     'Watch tutorials and read the PDF.',
    links: [
      { label: 'Open Drive Folder', url: 'https://drive.google.com/drive/folders/141R_Z9nFQBEBMRj67OcotndZXpBxiCTR?usp=sharing' },
      { label: 'Open PPTX File',    url: 'https://docs.google.com/presentation/d/1hXrwqnPUX2FMKzDUir1ZSZju4N0pVI7a/edit?usp=drive_link&ouid=100852468563598346141&rtpof=true&sd=true' },
    ],
    deadline: new Date('2026-09-09T23:59:00'),
  },
  {
    id:    'arch',
    title: 'Architecture & Organization',
    todo:  'Read the PDF.',
    links: [
      { label: 'Open Drive Folder', url: 'https://drive.google.com/drive/folders/1qUFjcMu5_HGboLVOVrCGlvOXWKVDB3Yj?usp=drive_link' },
    ],
    deadline: null,
  },
  {
    id:           'mobile',
    title:        'Mobile Computing',
    todo:         'Watch YouTube video.',
    links: [
      { label: 'Watch on YouTube', url: 'https://youtu.be/lWvLhwS3FAM' },
    ],
    deadline:     new Date('2026-09-10T23:59:00'),
    deadlineNote: 'presumably next class',
  },
  {
    id:           'softeng',
    title:        'Software Engineering',
    todo:         'Proposals',
    instructions: 'Your project proposal will cover everything we have learned from research gathering to technical and methodologies. You may also begin researching your titles in which you can conduct a proposal on. Focus on system development project and with a specific location/agency.',
    links:        [],
    deadline:     null,
  },
    id:           'fds',
    title:        'Fundamenals of Data Science',
    todo:         'Topic 8 Activity',
    instructions: 'Read and execute all the codes in the file that I will send po for our asynchronous class today po and for your quiz next meeting.',
    links:        [],
    deadline:     new Date('2026-09-09T23:59:00'),
  }
];


// ═══════════════════════════════════════════════════════
//  Everything below builds and runs the site automatically.
//  No need to edit anything past this point.
// ═══════════════════════════════════════════════════════

// ── Build cards ───────────────────────────────────────
function buildCards() {
  const grid = document.getElementById('grid');

  subjects.forEach(s => {
    const deadlineText = s.deadline
      ? s.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';

    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', s.title);
    card.innerHTML = `
      <div class="card-tag">Subject</div>
      <div class="card-title">${s.title}</div>
      <div class="card-deadline">Due ${deadlineText}</div>
      <div class="card-countdown" id="card-countdown-${s.id}">—</div>
      <span class="card-hint">tap to open ↗</span>
    `;
    card.addEventListener('click', () => openModal(s.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(s.id);
    });
    grid.appendChild(card);
  });

  // Empty boilerplate card — always last
  const empty = document.createElement('div');
  empty.className = 'card empty';
  empty.setAttribute('aria-label', 'Empty card placeholder');
  empty.innerHTML = `
    <div class="card-tag">Subject</div>
    <div class="card-title">Subject Name Here</div>
    <div class="card-deadline">Due —</div>
  `;
  grid.appendChild(empty);
}

// ── Build modals ──────────────────────────────────────
function buildModals() {
  const overlay = document.getElementById('overlay');

  subjects.forEach(s => {
    const deadlineText = s.deadline
      ? s.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';

    const deadlineNote   = s.deadlineNote ? ` (${s.deadlineNote})` : '';
    const linksHTML      = s.links.length
      ? s.links.map(l => `<div class="modal-value"><a href="${l.url}" target="_blank" rel="noopener">${l.label} ↗</a></div>`).join('')
      : '<div class="modal-value">N/A</div>';
    const instructHTML   = s.instructions
      ? `<div class="modal-section">
           <div class="modal-label">Instructions</div>
           <div class="modal-value">${s.instructions}</div>
         </div>`
      : '';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = `modal-${s.id}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', `title-${s.id}`);
    modal.style.display = 'none';
    modal.innerHTML = `
      <button class="modal-close" aria-label="Close">✕</button>
      <div class="modal-tag">Subject</div>
      <div class="modal-title" id="title-${s.id}">${s.title}</div>
      <div class="modal-section">
        <div class="modal-label">To Do</div>
        <div class="modal-value">${s.todo}</div>
      </div>
      ${instructHTML}
      <div class="modal-section">
        <div class="modal-label">Resources</div>
        ${linksHTML}
      </div>
      <hr class="divider" />
      <div class="modal-deadline-row">
        <span class="dot" id="modal-dot-${s.id}"></span>
        Deadline: <strong>${deadlineText}</strong>${deadlineNote}
        <span class="modal-countdown" id="modal-countdown-${s.id}">—</span>
      </div>
    `;
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    overlay.appendChild(modal);
  });
}

// ── Countdown ─────────────────────────────────────────
function formatCountdown(deadline) {
  if (!deadline) return '—';
  const diff = deadline - new Date();
  if (diff <= 0) return '0d 0h left';
  if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / 60000)}m left`;
  }
  const totalHours = Math.floor(diff / 3600000);
  return `${Math.floor(totalHours / 24)}d ${totalHours % 24}h left`;
}

function isUrgent(deadline) {
  if (!deadline) return false;
  const diff = deadline - new Date();
  return diff > 0 && diff < 12 * 3600000;
}

function updateCountdowns() {
  subjects.forEach(s => {
    const text   = formatCountdown(s.deadline);
    const urgent = isUrgent(s.deadline);

    const cardEl  = document.getElementById(`card-countdown-${s.id}`);
    const modalEl = document.getElementById(`modal-countdown-${s.id}`);
    const dotEl   = document.getElementById(`modal-dot-${s.id}`);

    if (cardEl)  { cardEl.textContent  = text; cardEl.classList.toggle('countdown-urgent', urgent); }
    if (modalEl) { modalEl.textContent = text; modalEl.classList.toggle('countdown-urgent', urgent); }
    if (dotEl)   { dotEl.classList.toggle('countdown-urgent', urgent); }
  });
}

// ── Modal controls ────────────────────────────────────
let activeModal = null;

function openModal(id) {
  const target = document.getElementById(`modal-${id}`);
  if (!target) return;
  if (activeModal) document.getElementById(`modal-${activeModal}`).style.display = 'none';
  target.style.display = 'block';
  document.getElementById('overlay').classList.add('active');
  activeModal = id;
  target.querySelector('.modal-close').focus();
}

function closeModal() {
  if (!activeModal) return;
  document.getElementById(`modal-${activeModal}`).style.display = 'none';
  document.getElementById('overlay').classList.remove('active');
  activeModal = null;
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── Init ──────────────────────────────────────────────
buildCards();
buildModals();
updateCountdowns();
setInterval(updateCountdowns, 1000);
