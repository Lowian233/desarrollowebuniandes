// app.js — consumo de API con async/await y manejo de errores
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const cards = document.getElementById('cards');
const loading = document.getElementById('loading');
const message = document.getElementById('message');
const reloadBtn = document.getElementById('reload');

reloadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loadUsers();
});

function userCard(u) {
  const el = document.createElement('article');
  el.className = 'card';
  el.innerHTML = `
    <h3>${u.name}</h3>
    <div class="meta"><strong>Email:</strong> <a href="mailto:${u.email}">${u.email}</a></div>
    <div class="meta"><strong>Ciudad:</strong> ${u.address?.city ?? 'N/D'}</div>
    <div class="meta"><strong>Compañía:</strong> ${u.company?.name ?? 'N/D'}</div>
    <span class="tag">Usuario #${u.id}</span>
  `;
  return el;
}

// Utilidad: fetch con timeout (para mostrar manejo de errores)
async function fetchWithTimeout(url, ms = 12000, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function loadUsers() {
  // estados
  message.textContent = '';
  message.className = 'message';
  loading.hidden = false;
  cards.hidden = true;
  cards.innerHTML = '';

  try {
    const res = await fetchWithTimeout(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} — ${res.statusText}`);
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      message.textContent = 'No se encontraron usuarios.';
      return;
    }
    data.forEach(u => cards.appendChild(userCard(u)));
    cards.hidden = false;
  } catch (err) {
    message.textContent = `Error al cargar usuarios: ${err.message}`;
    message.classList.add('error');
  } finally {
    loading.hidden = true;
  }
}

// Cargar al inicio
loadUsers();
