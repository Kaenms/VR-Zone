/* ===== ХРАНИЛИЩЕ ДАННЫХ ===== */
const STORAGE_KEY = 'vrzone_games';
const PASSWORD_KEY = 'vrzone_admin_password';
const DEFAULT_PASSWORD = 'admin123';

let games = [];
let editingId = null;

// Начальные демо-игры
const DEFAULT_GAMES = [
    {
        id: 'g1',
        title: 'Half-Life: Alyx',
        desc: 'Вершина VR-гейминга от Valve. Погрузитесь в детализированный мир City 17, сражайтесь с адскими тварями и решайте головоломки в невероятно реалистичной физической среде. Эта игра задаёт стандарт для всей индустрии виртуальной реальности.',
        genre: 'Шутер / Приключения',
        platform: 'SteamVR',
        year: 2020,
        rating: 9.8,
        media: [
            { type: 'image', Image: 'img/slid1.1.webp' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80' },
            { type: 'video', url: 'https://www.youtube.com/embed/O55xGj1kVbY' }
        ]
    },
    {
        id: 'g2',
        title: 'Beat Saber',
        desc: 'Ритмичная VR-игра, где вы разрубаете световые блоки под энергичную музыку. Простая механика, высокий порог мастерства и невероятный драйв. Идеально для активного отдыха и поддержания формы!',
        genre: 'Ритм-игра',
        platform: 'SteamVR, Oculus, PSVR2',
        year: 2019,
        rating: 9.5,
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1598550476439-9e2f7f0b8b0e?w=800&q=80' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1b6d?w=800&q=80' },
            { type: 'video', url: 'https://www.youtube.com/embed/9vL7yT2T5qI' }
        ]
    },
    {
        id: 'g3',
        title: 'Superhot VR',
        desc: 'Уникальный шутер, где время движется только когда двигаетесь вы. Каждое движение — продуманная тактика. Уклоняйтесь от пуль, разбивайте врагов голыми руками и чувствуйте себя героем боевика в замедленной съёмке.',
        genre: 'Шутер / Экшен',
        platform: 'SteamVR, Oculus',
        year: 2017,
        rating: 9.2,
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&q=80' },
            { type: 'video', url: 'https://www.youtube.com/embed/3jqo3IhFJqI' }
        ]
    },
    {
        id: 'g4',
        title: 'Boneworks',
        desc: 'Физический симулятор с передовой системой взаимодействия. Каждый предмет в игре имеет вес и физику. Пробивайте двери, карабкайтесь по стенам и сражайтесь с врагами используя полную свободу движений.',
        genre: 'Экшен / Симулятор',
        platform: 'SteamVR',
        year: 2019,
        rating: 8.8,
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&q=80' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80' },
            { type: 'video', url: 'https://www.youtube.com/embed/1W0Cz3Jw4zA' }
        ]
    },
    {
        id: 'g5',
        title: 'Resident Evil 4 VR',
        desc: 'Культовая игра в виртуальной реальности. Исследуйте мрачную испанскую деревню, сражайтесь с Лос-Иллюминадос и спасайте Эшли. Полное погружение в одну из лучших survival-horror игр всех времён.',
        genre: 'Хоррор / Экшен',
        platform: 'Oculus Quest 2/3',
        year: 2021,
        rating: 9.3,
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1626379953822-baec19c2acc8?w=800&q=80' },
            { type: 'video', url: 'https://www.youtube.com/embed/ID4Hw3x0sKg' }
        ]
    },
    {
        id: 'g6',
        title: 'Pistol Whip',
        desc: 'Ритмичный рельсовый шутер под энергичный саундтрек. Пробивайте врагов в такт музыке, уклоняйтесь от пуль и чувствуйте себя звездой боевика. Стилистика неонуара и отличный саундтрек создают незабываемую атмосферу.',
        genre: 'Ритм-шутер',
        platform: 'SteamVR, Oculus, PSVR2',
        year: 2019,
        rating: 8.7,
        media: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1598550476439-9e2f7f0b8b0e?w=800&q=80' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1b6d?w=800&q=80' },
            { type: 'video', url: 'https://www.youtube.com/embed/7Y4Uw5n7kqI' }
        ]
    }
];

/* ===== ПАРОЛЬ ===== */
function getAdminPassword() {
    const saved = localStorage.getItem(PASSWORD_KEY);
    if (saved) return saved;
    localStorage.setItem(PASSWORD_KEY, DEFAULT_PASSWORD);
    return DEFAULT_PASSWORD;
}

function setAdminPassword(newPassword) {
    localStorage.setItem(PASSWORD_KEY, newPassword);
}

/* ===== ЗАГРУЗКА И СОХРАНЕНИЕ ===== */
function loadGames() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            games = JSON.parse(saved);
        } else {
            games = DEFAULT_GAMES;
            saveGames();
        }
    } catch {
        games = DEFAULT_GAMES;
        saveGames();
    }
}

function saveGames() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

/* ===== РЕНДЕРИНГ КАТАЛОГА ===== */
function renderCatalog() {
    const grid = document.getElementById('catalogGrid');
    const countEl = document.getElementById('gamesCount');

    if (!games.length) {
        grid.innerHTML = `
            <div class="game-card__empty">
                <div class="game-card__empty-icon">📭</div>
                <p>Каталог пока пуст. Добавьте первую игру через панель администратора!</p>
            </div>
        `;
        if (countEl) countEl.textContent = '0';
        return;
    }

    if (countEl) countEl.textContent = games.length;

    grid.innerHTML = games.map(game => `
        <div class="game-card" data-id="${game.id}">
            <div class="game-card__slider" data-game-id="${game.id}">
                <div class="game-card__slides" id="slides-${game.id}">
                    ${game.media.map((m, i) => `
                        <div class="game-card__slide">
                            ${m.type === 'video'
                                ? `<iframe src="${m.url}" allowfullscreen loading="lazy"></iframe>`
                                : `<img src="${m.url}" alt="${game.title} — фото ${i + 1}" loading="lazy">`
                            }
                        </div>
                    `).join('')}
                </div>
                ${game.media.length > 1 ? `
                    <div class="game-card__controls">
                        <button class="game-card__btn" data-slide-prev="${game.id}">‹</button>
                        <button class="game-card__btn" data-slide-next="${game.id}">›</button>
                    </div>
                    <div class="game-card__dots" id="dots-${game.id}">
                        ${game.media.map((_, i) => `
                            <span class="game-card__dot ${i === 0 ? 'active' : ''}" data-dot="${game.id}" data-index="${i}"></span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="game-card__body">
                <h3 class="game-card__title">${escapeHtml(game.title)}</h3>
                <p class="game-card__desc">${escapeHtml(game.desc)}</p>
                <div class="game-card__meta">
                    <span class="game-card__tag">${escapeHtml(game.genre)}</span>
                    <span class="game-card__tag">${escapeHtml(game.platform)}</span>
                    <span class="game-card__tag">${game.year}</span>
                </div>
                <div class="game-card__rating">
                    <span class="game-card__rating-stars">${renderStars(game.rating)}</span>
                    ${game.rating}
                </div>
            </div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderStars(rating) {
    const full = Math.floor(rating / 2);
    const half = rating % 2 >= 1 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/* ===== СЛАЙДЕРЫ ===== */
let slideIndices = {};

function initSliders() {
    document.querySelectorAll('.game-card__slider').forEach(slider => {
        const gameId = slider.dataset.gameId;
        if (!slideIndices[gameId]) slideIndices[gameId] = 0;
    });
}

function goToSlide(gameId, index) {
    const slides = document.getElementById(`slides-${gameId}`);
    const dots = document.querySelectorAll(`[data-dot="${gameId}"]`);
    const total = slides ? slides.children.length : 0;
    if (!total) return;

    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    slideIndices[gameId] = index;

    if (slides) {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide(gameId) {
    const total = document.getElementById(`slides-${gameId}`)?.children.length || 0;
    if (!total) return;
    goToSlide(gameId, (slideIndices[gameId] || 0) + 1);
}

function prevSlide(gameId) {
    const total = document.getElementById(`slides-${gameId}`)?.children.length || 0;
    if (!total) return;
    goToSlide(gameId, (slideIndices[gameId] || 0) - 1);
}

// Делегирование событий для слайдеров
document.addEventListener('click', (e) => {
    const prevBtn = e.target.closest('[data-slide-prev]');
    const nextBtn = e.target.closest('[data-slide-next]');
    const dot = e.target.closest('[data-dot]');
    const card = e.target.closest('.game-card');

    if (prevBtn) {
        e.stopPropagation();
        prevSlide(prevBtn.dataset.slidePrev);
        return;
    }
    if (nextBtn) {
        e.stopPropagation();
        nextSlide(nextBtn.dataset.slideNext);
        return;
    }
    if (dot) {
        e.stopPropagation();
        goToSlide(dot.dataset.dot, parseInt(dot.dataset.index));
        return;
    }

    // Открытие модалки детального просмотра
    if (card && !e.target.closest('.game-card__btn') && !e.target.closest('.game-card__dot')) {
        const gameId = card.dataset.id;
        openGameDetail(gameId);
    }
});

/* ===== ДЕТАЛЬНЫЙ ПРОСМОТР ИГРЫ ===== */
function openGameDetail(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    document.getElementById('gameModalTitle').textContent = game.title;
    document.getElementById('gameDetailDesc').textContent = game.desc;
    document.getElementById('gameDetailGenre').textContent = game.genre;
    document.getElementById('gameDetailPlatform').textContent = game.platform;
    document.getElementById('gameDetailYear').textContent = game.year;
    document.getElementById('gameDetailRating').innerHTML = `
        <span style="color:#f59e0b;font-size:1.4rem;">${renderStars(game.rating)}</span>
        ${game.rating} / 10
    `;

    const slider = document.getElementById('gameDetailSlider');
    const detailSlideId = `detail-${game.id}`;
    slideIndices[detailSlideId] = 0;

    slider.innerHTML = `
        <div class="game-detail__slides" id="detailSlides-${game.id}">
            ${game.media.map((m, i) => `
                <div class="game-detail__slide">
                    ${m.type === 'video'
                        ? `<iframe src="${m.url}" allowfullscreen></iframe>`
                        : `<img src="${m.url}" alt="${game.title} — фото ${i + 1}">`
                    }
                </div>
            `).join('')}
        </div>
        ${game.media.length > 1 ? `
            <div class="game-detail__controls">
                <button class="game-detail__btn" data-detail-prev="${game.id}">‹</button>
                <button class="game-detail__btn" data-detail-next="${game.id}">›</button>
            </div>
            <div class="game-detail__dots" id="detailDots-${game.id}">
                ${game.media.map((_, i) => `
                    <span class="game-detail__dot ${i === 0 ? 'active' : ''}" data-detail-dot="${game.id}" data-index="${i}"></span>
                `).join('')}
            </div>
        ` : ''}
    `;

    document.getElementById('gameModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Делегирование для детального слайдера
document.addEventListener('click', (e) => {
    const prev = e.target.closest('[data-detail-prev]');
    const next = e.target.closest('[data-detail-next]');
    const dot = e.target.closest('[data-detail-dot]');

    if (prev) {
        e.stopPropagation();
        const id = `detail-${prev.dataset.detailPrev}`;
        const slides = document.getElementById(`detailSlides-${prev.dataset.detailPrev}`);
        const total = slides?.children.length || 0;
        if (!total) return;
        const idx = ((slideIndices[id] || 0) - 1 + total) % total;
        slideIndices[id] = idx;
        slides.style.transform = `translateX(-${idx * 100}%)`;
        document.querySelectorAll(`[data-detail-dot="${prev.dataset.detailPrev}"]`).forEach((d, i) => d.classList.toggle('active', i === idx));
        return;
    }
    if (next) {
        e.stopPropagation();
        const id = `detail-${next.dataset.detailNext}`;
        const slides = document.getElementById(`detailSlides-${next.dataset.detailNext}`);
        const total = slides?.children.length || 0;
        if (!total) return;
        const idx = ((slideIndices[id] || 0) + 1) % total;
        slideIndices[id] = idx;
        slides.style.transform = `translateX(-${idx * 100}%)`;
        document.querySelectorAll(`[data-detail-dot="${next.dataset.detailNext}"]`).forEach((d, i) => d.classList.toggle('active', i === idx));
        return;
    }
    if (dot) {
        e.stopPropagation();
        const id = `detail-${dot.dataset.detailDot}`;
        const slides = document.getElementById(`detailSlides-${dot.dataset.detailDot}`);
        const total = slides?.children.length || 0;
        if (!total) return;
        const idx = parseInt(dot.dataset.index);
        slideIndices[id] = idx;
        slides.style.transform = `translateX(-${idx * 100}%)`;
        document.querySelectorAll(`[data-detail-dot="${dot.dataset.detailDot}"]`).forEach((d, i) => d.classList.toggle('active', i === idx));
        return;
    }
});

/* ===== ПАРОЛЬНАЯ МОДАЛКА ===== */
function openPasswordModal() {
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordError').classList.remove('active');
    document.getElementById('passwordModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('passwordInput').focus(), 100);
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('adminBtn').addEventListener('click', () => {
    openPasswordModal();
});

document.getElementById('passwordForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('passwordInput').value;
    const currentPassword = getAdminPassword();

    if (input === currentPassword) {
        document.getElementById('passwordError').classList.remove('active');
        closePasswordModal();
        openAdminPanel();
    } else {
        document.getElementById('passwordError').classList.add('active');
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
    }
});

document.getElementById('passwordModalClose').addEventListener('click', closePasswordModal);
document.getElementById('passwordCancel').addEventListener('click', closePasswordModal);

document.getElementById('passwordModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closePasswordModal();
});

/* ===== СМЕНА ПАРОЛЯ ===== */
document.getElementById('changePasswordForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    const successEl = document.getElementById('changePasswordSuccess');
    const errorEl = document.getElementById('changePasswordError');

    successEl.classList.remove('active');
    errorEl.classList.remove('active');

    if (current !== getAdminPassword()) {
        errorEl.textContent = '❌ Неверный текущий пароль.';
        errorEl.classList.add('active');
        return;
    }

    if (newPass.length < 4) {
        errorEl.textContent = '❌ Новый пароль должен быть не менее 4 символов.';
        errorEl.classList.add('active');
        return;
    }

    if (newPass !== confirm) {
        errorEl.textContent = '❌ Новые пароли не совпадают.';
        errorEl.classList.add('active');
        return;
    }

    setAdminPassword(newPass);
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    successEl.classList.add('active');
    setTimeout(() => successEl.classList.remove('active'), 3000);
});

/* ===== МОДАЛЬНЫЕ ОКНА ===== */
document.getElementById('modalClose').addEventListener('click', closeAdminPanel);
document.getElementById('formCancel').addEventListener('click', closeAdminPanel);

document.getElementById('adminModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAdminPanel();
});

document.getElementById('gameModalClose').addEventListener('click', closeGameModal);
document.getElementById('gameModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeGameModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePasswordModal();
        closeAdminPanel();
        closeGameModal();
    }
});

function openAdminPanel() {
    editingId = null;
    document.getElementById('formTitle').textContent = 'Добавить новую игру';
    document.getElementById('formSubmit').textContent = 'Добавить игру';
    document.getElementById('gameForm').reset();
    resetMediaList();
    renderAdminGameList();
    // Сброс формы смены пароля
    document.getElementById('changePasswordForm').reset();
    document.getElementById('changePasswordSuccess').classList.remove('active');
    document.getElementById('changePasswordError').classList.remove('active');
    document.getElementById('adminModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAdminPanel() {
    document.getElementById('adminModal').classList.remove('active');
    document.body.style.overflow = '';
    editingId = null;
}

function closeGameModal() {
    document.getElementById('gameModal').classList.remove('active');
    document.body.style.overflow = '';
}

/* ===== УПРАВЛЕНИЕ МЕДИА-СПИСКОМ ===== */
function resetMediaList() {
    const list = document.getElementById('mediaList');
    list.innerHTML = `
        <div class="media-row">
            <select class="form-select media-type" data-index="0">
                <option value="image">🖼 Изображение</option>
                <option value="video">🎬 Видео (YouTube embed)</option>
            </select>
            <input class="form-input media-url" type="url" data-index="0" placeholder="https://example.com/image.jpg" required>
            <button type="button" class="btn-icon media-remove" data-index="0" title="Удалить">✕</button>
        </div>
    `;
}

document.getElementById('addMediaBtn').addEventListener('click', () => {
    const list = document.getElementById('mediaList');
    const idx = list.children.length;
    const row = document.createElement('div');
    row.className = 'media-row';
    row.innerHTML = `
        <select class="form-select media-type" data-index="${idx}">
            <option value="image">🖼 Изображение</option>
            <option value="video">🎬 Видео (YouTube embed)</option>
        </select>
        <input class="form-input media-url" type="url" data-index="${idx}" placeholder="https://example.com/image.jpg" required>
        <button type="button" class="btn-icon media-remove" data-index="${idx}" title="Удалить">✕</button>
    `;
    list.appendChild(row);
});

document.getElementById('mediaList').addEventListener('click', (e) => {
    if (e.target.classList.contains('media-remove')) {
        const rows = document.querySelectorAll('.media-row');
        if (rows.length <= 1) return;
        const row = e.target.closest('.media-row');
        if (row) row.remove();
        document.querySelectorAll('.media-row').forEach((r, i) => {
            r.querySelector('.media-type').dataset.index = i;
            r.querySelector('.media-url').dataset.index = i;
            r.querySelector('.media-remove').dataset.index = i;
        });
    }
});

/* ===== ФОРМА ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ ===== */
document.getElementById('gameForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('gameTitle').value.trim();
    const desc = document.getElementById('gameDesc').value.trim();
    const genre = document.getElementById('gameGenre').value.trim();
    const platform = document.getElementById('gamePlatform').value.trim();
    const year = parseInt(document.getElementById('gameYear').value);
    const rating = parseFloat(document.getElementById('gameRating').value);

    if (!title || !desc || !genre || !platform || !year || !rating) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const mediaRows = document.querySelectorAll('.media-row');
    const media = [];
    mediaRows.forEach(row => {
        const type = row.querySelector('.media-type').value;
        const url = row.querySelector('.media-url').value.trim();
        if (url) {
            media.push({ type, url });
        }
    });

    if (media.length === 0) {
        alert('Добавьте хотя бы один медиа-файл');
        return;
    }

    if (editingId) {
        const idx = games.findIndex(g => g.id === editingId);
        if (idx !== -1) {
            games[idx] = { ...games[idx], title, desc, genre, platform, year, rating, media };
        }
        editingId = null;
    } else {
        const newGame = {
            id: 'g' + Date.now() + Math.random().toString(36).slice(2, 6),
            title,
            desc,
            genre,
            platform,
            year,
            rating,
            media
        };
        games.push(newGame);
    }

    saveGames();
    renderCatalog();
    initSliders();
    renderAdminGameList();
    document.getElementById('gameForm').reset();
    resetMediaList();
    document.getElementById('formTitle').textContent = 'Добавить новую игру';
    document.getElementById('formSubmit').textContent = 'Добавить игру';
    alert(editingId ? 'Игра обновлена!' : 'Игра добавлена!');
});

/* ===== СПИСОК ИГР В АДМИНКЕ ===== */
function renderAdminGameList() {
    const container = document.getElementById('adminGameList');

    if (!games.length) {
        container.innerHTML = '<div class="admin-list__empty">Пока нет игр. Добавьте первую!</div>';
        return;
    }

    container.innerHTML = games.map(game => `
        <div class="admin-list__item">
            <div class="admin-list__item-info">
                <div class="admin-list__item-title">${escapeHtml(game.title)}</div>
                <div class="admin-list__item-meta">${game.genre} · ${game.media.length} медиа · ★ ${game.rating}</div>
            </div>
            <div class="admin-list__item-actions">
                <button class="btn btn--small btn--outline" data-edit="${game.id}">✏️</button>
                <button class="btn btn--small btn--danger" data-delete="${game.id}">🗑️</button>
            </div>
        </div>
    `).join('');
}

document.getElementById('adminGameList').addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-edit]');
    const deleteBtn = e.target.closest('[data-delete]');

    if (editBtn) {
        const gameId = editBtn.dataset.edit;
        editGame(gameId);
    }

    if (deleteBtn) {
        const gameId = deleteBtn.dataset.delete;
        deleteGame(gameId);
    }
});

function editGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    editingId = gameId;
    document.getElementById('formTitle').textContent = 'Редактировать игру';
    document.getElementById('formSubmit').textContent = 'Сохранить изменения';
    document.getElementById('gameTitle').value = game.title;
    document.getElementById('gameDesc').value = game.desc;
    document.getElementById('gameGenre').value = game.genre;
    document.getElementById('gamePlatform').value = game.platform;
    document.getElementById('gameYear').value = game.year;
    document.getElementById('gameRating').value = game.rating;

    const list = document.getElementById('mediaList');
    list.innerHTML = game.media.map((m, i) => `
        <div class="media-row">
            <select class="form-select media-type" data-index="${i}">
                <option value="image" ${m.type === 'image' ? 'selected' : ''}>🖼 Изображение</option>
                <option value="video" ${m.type === 'video' ? 'selected' : ''}>🎬 Видео (YouTube embed)</option>
            </select>
            <input class="form-input media-url" type="url" data-index="${i}" value="${escapeHtml(m.url)}" required>
            <button type="button" class="btn-icon media-remove" data-index="${i}" title="Удалить">✕</button>
        </div>
    `).join('');

    document.getElementById('gameForm').scrollIntoView({ behavior: 'smooth' });
}

function deleteGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    if (!confirm(`Удалить игру "${game.title}"? Это действие нельзя отменить.`)) return;

    games = games.filter(g => g.id !== gameId);
    saveGames();
    renderCatalog();
    renderAdminGameList();
    initSliders();
}

/* ===== ИНИЦИАЛИЗАЦИЯ ===== */
document.addEventListener('DOMContentLoaded', () => {
    loadGames();
    renderCatalog();
    initSliders();
});