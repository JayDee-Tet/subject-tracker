//    id           — unique key, no spaces (e.g. 'softeng')
//    title        — subject name shown on card and modal
//    todo         — short task label
//    instructions — (optional) longer description below todo
//    links        — array of { label, url }; leave as [] if none
//    deadline     — new Date('YYYY-MM-DDTHH:MM:00'), or null if unknown
//    deadlineNote — (optional) extra note shown after the deadline date

const subjects = [
  {
    id:       'mcr',
    title:    'Research Methods in Computing',
    todo:     'Write Scope of Delimitation & Significance of the Study',
    links:     [],
    deadline:  new Date('2026-09-28T23:00:00'),
  },
  
  {
    id:           'fds',
    title:        'Fundamenals of Data Science',
    todo:         'System Creation',
    instructions: 'Develop a System of your choice using Python, MySQL, and the Tabulate library. The system should allow the user to manage the system through a simple menu-driven interface. Store all information in a MySQL database, and display retrieved records in a properly formatted table using the Tabulate library.The system must support the following major operations: /n (1.Add, 2.View, 3.Search(optional), 4.Update, 5.Delete, 6.Exit)',
    links:        [],
    deadline:     new Date('2026-09-28T23:00:00'),
  },
  {
    id:           'softeng',
    title:        'Software Engineering',
    todo:         'Proposals',
    instructions: 'Your project proposal will cover everything we have learned from research gathering to technical and methodologies. You may also begin researching your titles in which you can conduct a proposal on. Focus on system development project and with a specific location/agency.',
    links:        [],
    instructions: 'Also this, read this:',
    links:       [{label: 'Link', url: 'https://cdn.fbsbx.com/v/t59.2708-21/469478443_606745668360313_7157696517998484586_n.pdf/SE-Module-6s-Software-Design-Strategies-and-Interface-Design.pdf?_nc_cat=108&ccb=1-7&_nc_sid=2b0e22&_nc_eui2=AeE8i1wSzrqQfGHRzAYqTq1Cdqp1mQuoRkB2qnWZC6hGQPhNPbY-3mEXsZkipWFb7LOpIIZzNjDvRhIVpU-zInxz&_nc_ohc=utD7C9tH6qAQ7kNvwESrkCu&_nc_oc=AdoTUsT54dGx3yVKrA_iGOdpg7tBQJL3NUIQfBnlk0_GAd8Ik_p0_Egf5rUVRd0eLAo&_nc_ad=z-m&_nc_cid=0&_nc_zt=7&_nc_ht=cdn.fbsbx.com&_nc_gid=EBbHoCD0CFNiiHnUzaO8UA&_nc_ss=7a22e&oh=03_Q7cD6QG4yZK_mGbSy-50iOdIBzCJlbny6io8M7NSFSIdSw5_9g&oe=6AAECF25&dl=1'},],
    deadline:     null,
  },
  {
    id:           'mobile',
    title:        'Mobile Computing',
    todo:         'Idk.',
    links:         [],
    deadline:     null,
    deadlineNote: 'presumably next class',
  },
];

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

  // Empty boilerplate card
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

// ── Countdown
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


buildCards();
buildModals();
updateCountdowns();
setInterval(updateCountdowns, 1000);
