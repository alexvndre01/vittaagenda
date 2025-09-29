// VittaAgenda — lógica de agenda com localStorage e CRUD
(function () {
  const STORAGE_KEY = 'vittaagenda.consultas.v1';

  const seed = [
    { id: 1, data: '2025-09-23', hora: '09:00', paciente: 'Ana Souza', servico: 'Clínico Geral', status: 'Confirmada' },
    { id: 2, data: '2025-09-23', hora: '10:30', paciente: 'Bruno Lima', servico: 'Odontologia', status: 'Pendente' },
    { id: 3, data: '2025-09-24', hora: '14:00', paciente: 'Carla Mendes', servico: 'Dermatologia', status: 'Cancelada' },
    { id: 4, data: '2025-09-25', hora: '11:00', paciente: 'Diego Alves', servico: 'Ortopedia', status: 'Confirmada' },
    { id: 5, data: '2025-09-26', hora: '15:30', paciente: 'Eduarda Nunes', servico: 'Ginecologia', status: 'Pendente' },
    { id: 6, data: '2025-09-27', hora: '08:30', paciente: 'Felipe Santos', servico: 'Cardiologia', status: 'Confirmada' }
  ];

  function load() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) return seed.slice();
      const arr = JSON.parse(v);
      return Array.isArray(arr) ? arr : seed.slice();
    } catch (e) {
      return seed.slice();
    }
  }

  function save(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  const consultas = load();
  let filters = { q: '', status: '', date: '' };

  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  function openModal(title = 'Nova consulta', item = null) {
    document.getElementById('modalTitle').textContent = title;
    const modal = document.getElementById('modal');
    const form = document.getElementById('formConsulta');
    form.reset();
    document.getElementById('id').value = item?.id || '';
    document.getElementById('data').value = item?.data || '';
    document.getElementById('hora').value = item?.hora || '';
    document.getElementById('paciente').value = item?.paciente || '';
    document.getElementById('servico').value = item?.servico || '';
    document.getElementById('statusInput').value = item?.status || 'Confirmada';
    modal.hidden = false;
  }

  function closeModal() {
    document.getElementById('modal').hidden = true;
  }

  function setFilter(key, value) {
    filters[key] = value;
    renderTable();
  }

  function clearFilters() {
    filters = { q: '', status: '', date: '' };
    const s = document.getElementById('search'); if (s) s.value = '';
    const st = document.getElementById('status'); if (st) st.value = '';
    const d = document.getElementById('date'); if (d) d.value = '';
    renderTable();
  }

  function match(c) {
    const q = filters.q.trim().toLowerCase();
    const hitQ = !q || [c.paciente, c.servico, c.status].join(' ').toLowerCase().includes(q);
    const hitS = !filters.status || c.status === filters.status;
    const hitD = !filters.date || c.data === filters.date;
    return hitQ && hitS && hitD;
  }

  function formatDate(iso) {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  }

  function renderTable() {
    const tbody = document.getElementById('tbody');
    const empty = document.getElementById('empty');
    if (!tbody) return;

    const rows = consultas.filter(match).sort((a,b)=> (a.data+a.hora).localeCompare(b.data+b.hora));
    tbody.innerHTML = rows.map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${formatDate(c.data)}</td>
        <td>${c.hora}</td>
        <td>${c.paciente}</td>
        <td>${c.servico}</td>
        <td><span class="badge ${c.status.toLowerCase()}">${c.status}</span></td>
        <td>
          <button class="icon" data-action="edit" data-id="${c.id}">Editar</button>
          <button class="icon" data-action="del" data-id="${c.id}">Excluir</button>
        </td>
      </tr>
    `).join('');

    if (empty) empty.hidden = rows.length > 0;
  }

  function nextId() {
    return consultas.length ? Math.max(...consultas.map(c => c.id)) + 1 : 1;
  }

  function upsertFromForm(e) {
    e.preventDefault();
    const id = document.getElementById('id').value;
    const obj = {
      id: id ? Number(id) : nextId(),
      data: document.getElementById('data').value,
      hora: document.getElementById('hora').value,
      paciente: document.getElementById('paciente').value.trim(),
      servico: document.getElementById('servico').value.trim(),
      status: document.getElementById('statusInput').value
    };
    if (!obj.data || !obj.hora || !obj.paciente || !obj.servico) return;

    const idx = consultas.findIndex(c => c.id === obj.id);
    if (idx >= 0) consultas[idx] = obj; else consultas.push(obj);
    save(consultas);
    closeModal();
    renderTable();
  }

  function removeById(id) {
    const i = consultas.findIndex(c => c.id === id);
    if (i >= 0) {
      consultas.splice(i, 1);
      save(consultas);
      renderTable();
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setYear();
    renderTable();

    const btnAdd = document.getElementById('btnAdd');
    if (btnAdd) btnAdd.addEventListener('click', () => openModal('Nova consulta'));

    const search = document.getElementById('search');
    if (search) search.addEventListener('input', e => setFilter('q', e.target.value));

    const status = document.getElementById('status');
    if (status) status.addEventListener('change', e => setFilter('status', e.target.value));

    const date = document.getElementById('date');
    if (date) date.addEventListener('change', e => setFilter('date', e.target.value));

    const btnClear = document.getElementById('btnClear');
    if (btnClear) btnClear.addEventListener('click', clearFilters);

    const tbody = document.getElementById('tbody');
    if (tbody) tbody.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      const action = t.getAttribute('data-action');
      const id = Number(t.getAttribute('data-id'));
      if (action === 'edit') {
        const item = consultas.find(c => c.id === id);
        if (item) openModal('Editar consulta', item);
      } else if (action === 'del') {
        if (confirm('Deseja excluir esta consulta?')) removeById(id);
      }
    });

    // Modal events
    const modal = document.getElementById('modal');
    const close = document.getElementById('modalClose');
    const cancel = document.getElementById('btnCancel');
    const form = document.getElementById('formConsulta');
    if (close) close.addEventListener('click', closeModal);
    if (cancel) cancel.addEventListener('click', closeModal);
    if (form) form.addEventListener('submit', upsertFromForm);

    // Close modal on outside click
    if (modal) modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  });

  window.VittaAgenda = { renderTable };
})();