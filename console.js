function initConsole() {
    const form = document.getElementById('unified-master-console-form');
    const fileId = document.getElementById('metadata-file-id');
    const DEFAULT_ID = '2376-[FILE_DEFAULT]';
    const MAX_SECTIONS = 8;
    const DOCS = {
        p3: { page: 'page-3', addLabel: '+ Add Chronicle Section', head: 'Section header', body: 'Enter narrative text' },
        p4: { page: 'page-4', addLabel: '+ Add Log Section', head: 'Stardate / log name', body: 'Enter log entry' }
    };
    const follows = Array.from(form.querySelectorAll('[data-follow]'));
    const imgs = () => document.querySelectorAll('#portrait-img, .mirror-portrait-img');
    const phs = () => document.querySelectorAll('#portrait-placeholder, .mirror-portrait-ph');
    const page = id => document.getElementById(DOCS[id].page);
    const view = id => page(id).querySelector('.p3-viewport');
    const views = id => Array.from(view(id).querySelectorAll('.dossier-tab-view'));
    const activeSec = id => { const a = views(id).find(v => v.classList.contains('active')); return a ? Number(a.dataset.tab) : 1; };
    const currentDoc = () => { const p = document.querySelector('.sheet-page.active.doc-page'); return p ? p.dataset.doc : null; };

    function setPortrait(src) {
        imgs().forEach(i => { i.src = src || ''; i.style.display = src ? 'block' : 'none'; });
        phs().forEach(p => { p.style.display = src ? 'none' : 'block'; });
    }
    function sync() {
        document.querySelectorAll('.mirror-file-id').forEach(s => { s.textContent = fileId.value; });
        document.querySelectorAll('[data-mirror]').forEach(s => {
            const f = form.elements[s.dataset.mirror];
            s.textContent = f ? f.value : '';
        });
        follows.forEach(t => {
            if (!t.dataset.touched) { const s = form.elements[t.dataset.follow]; t.value = s ? s.value : ''; }
        });
    }
    function fit(el) {
        if (el.offsetParent === null) return;
        el.style.fontSize = '';
        let size = parseFloat(getComputedStyle(el).fontSize);
        while (el.scrollWidth > el.clientWidth && size > 6.5) { size -= 0.5; el.style.fontSize = size + 'px'; }
    }
    function balance() {
        const w = Array.from(document.querySelectorAll('[data-balance]'));
        if (w.length !== 2 || w[0].offsetParent === null) return;
        const box = w[1].closest('.lcars-terminal-box');
        w.forEach(x => { x.style.flex = ''; x.style.height = ''; });
        box.style.flex = '1 1 0';
        const lines = Math.floor((w[0].getBoundingClientRect().height + w[1].getBoundingClientRect().height) / 16);
        w[0].style.flex = 'none'; w[0].style.height = ((Math.ceil(lines / 2) + 2) * 16) + 'px';
        w[1].style.flex = 'none'; w[1].style.height = (Math.max(1, Math.floor(lines / 2) - 2) * 16) + 'px';
        box.style.flex = 'none';
    }
    function fitBox(t) {
        if (t.offsetParent === null) return;
        const w = t.parentElement;
        const reset = () => { t.style.fontSize = ''; t.style.lineHeight = ''; t.style.paddingTop = ''; t.style.paddingBottom = ''; w.style.removeProperty('--lh'); };
        const set = (f, lh) => { w.style.setProperty('--lh', lh + 'px'); t.style.fontSize = f + 'px'; t.style.lineHeight = lh + 'px'; t.style.paddingTop = (lh * 0.125) + 'px'; t.style.paddingBottom = '0px'; };
        const over = () => t.scrollHeight > t.clientHeight + 1;
        reset();
        if (!over()) return;
        let lh = 16;
        while (over() && lh > 13.8) { lh -= 0.2; set(11.5, lh); }
        if (!over()) return;
        let lo = 6.5, hi = 11.5;
        for (let k = 0; k < 8; k++) { const m = (lo + hi) / 2; set(m, m * 1.2); if (over()) hi = m; else lo = m; }
        set(lo, lo * 1.2);
    }
    function grow(t) {
        if (t.offsetParent === null) return;
        const c = t.classList; const min = c.contains('p3-ruled') ? 20 * (Number(t.dataset.rows) || 1) : c.contains('p3-text') ? 20 : (c.contains('p3-cap-text') ? 30 : (c.contains('p3-cap-label') ? 15 : 17));
        t.style.height = 'auto';
        let h = Math.max(t.scrollHeight, min); if (c.contains('p3-ruled')) h = Math.ceil(h / 20) * 20; t.style.height = h + 'px';
    }
    function growAll() {
        document.querySelectorAll('.doc-page textarea').forEach(grow);
        document.querySelectorAll('.fit-text').forEach(fit);
        document.querySelectorAll('.fit-box').forEach(fitBox);
        Object.keys(DOCS).forEach(id => {
            const v = view(id);
            if (v.offsetParent === null) return;
            page(id).querySelector('.p3-warn').classList.toggle('on', v.scrollHeight > v.clientHeight + 1);
        });
    }
    form.addEventListener('input', function(e) {
        if (e.target.dataset && e.target.dataset.follow) e.target.dataset.touched = e.target.value ? '1' : '';
        sync();
        if (e.target.matches('.doc-page textarea')) grow(e.target);
        growAll();
    });

    // Sections (chronicle tabs / log tabs)
    function renderPag(id) {
        const n = views(id).length, cur = activeSec(id), pg = page(id);
        pg.querySelector('.p3-pagination').classList.toggle('single', n < 2);
        let h = '';
        for (let i = 1; i <= n; i++) h += '[<button type="button" class="bio-page-link' + (i === cur ? ' active' : '') + '" data-sub="' + i + '">' + i + '</button>]';
        pg.querySelector('.p3-pag-links').innerHTML = h;
    }
    function showSection(id, n) {
        views(id).forEach(v => v.classList.toggle('active', Number(v.dataset.tab) === n));
        renderPag(id);
        growAll();
    }
    function addSection(id) {
        const n = views(id).length + 1;
        if (n > MAX_SECTIONS) return 0;
        const v = document.createElement('div');
        v.className = 'dossier-tab-view';
        v.dataset.tab = n;
        v.innerHTML = '<div class="p3-blocks" data-tab="' + n + '"></div>';
        view(id).appendChild(v);
        showSection(id, n);
        return n;
    }
    function removeLastSection(id) {
        const vs = views(id);
        if (vs.length < 2) return;
        const last = vs[vs.length - 1];
        if (last.querySelector('.p3-block') && !confirm('Remove the last section and everything in it?')) return;
        const wasActive = last.classList.contains('active');
        last.remove();
        showSection(id, wasActive ? vs.length - 1 : activeSec(id));
    }

    // Header bars
    function addBlock(id, tab, type, title, text, rows) {
        type = type || 'blue';
        while (views(id).length < tab && views(id).length < MAX_SECTIONS) addSection(id);
        const host = view(id).querySelector('.p3-blocks[data-tab="' + tab + '"]');
        if (!host) return;
        const UP = '<button type="button" class="p3-mv" data-dir="-1" title="Move up">&#9650;</button>';
        const DN = '<button type="button" class="p3-mv" data-dir="1" title="Move down">&#9660;</button>';
        const d = document.createElement('div');
        d.dataset.type = type;
        if (type === 'ruled') {
            d.className = 'p3-block p3-para p3-ruledblk';
            d.dataset.rows = rows || 5;
            d.innerHTML = '<textarea class="p3-ruled p3-b-text" data-rows="' + d.dataset.rows + '" placeholder="' + DOCS[id].body + '"></textarea><div class="p3-para-ctl">' + UP + '<button type="button" class="p3-x" title="Remove these lines">&times;</button>' + DN + '</div>';
        } else if (type === 'para') {
            d.className = 'p3-block p3-para';
            d.innerHTML = '<div class="p3-text p3-b-text" contenteditable="true" data-placeholder="' + DOCS[id].body + '"></div><div class="p3-para-ctl">' + UP + '<button type="button" class="p3-x" title="Remove this text">&times;</button>' + DN + '</div>';
		} else if (type.indexOf('cap-') === 0) {
            d.className = 'p3-block p3-cap ' + type;
            d.innerHTML = '<div class="p3-cap-label-cell"><textarea class="p3-cap-label p3-b-title" rows="1" placeholder="Label"></textarea></div><div class="p3-cap-body"><textarea class="p3-cap-text p3-b-text" placeholder="' + DOCS[id].body + '"></textarea></div><div class="p3-cap-ctl">' + UP + '<button type="button" class="p3-x" title="Remove this row">&times;</button>' + DN + '</div>';
        } else {
            const cls = type === 'tan' ? ' alt' : (type === 'orange' ? ' orng' : (type === 'slate' ? ' slate-bar' : ''));
            d.className = 'p3-block';
            d.innerHTML = '<div class="p3-heading-row' + cls + '"><div class="p3-slate"><input type="text" class="p3-b-title" placeholder="' + DOCS[id].head + '"></div><div class="p3-yellow"></div><div class="p3-orange">' + UP + DN + '<button type="button" class="p3-x" title="Remove this header bar">&times;</button></div></div>';
        }
        const t = d.querySelector('.p3-b-title'), x = d.querySelector('.p3-b-text');
        if (t) t.value = title || '';
        if (x) {
            if (x.isContentEditable) {
                if (text && /<[a-z][\s\S]*>/i.test(text)) x.innerHTML = text;
                else x.textContent = text || '';
            } else {
                x.value = text || '';
            }
        }
        host.appendChild(d);
        growAll();
    }
    function resetDoc(id) {
        views(id).forEach(v => { if (Number(v.dataset.tab) > 1) v.remove(); });
        page(id).querySelectorAll('.p3-block').forEach(b => b.remove());
        showSection(id, 1);
    }
    function defaultDoc(id) { resetDoc(id); addBlock(id, 1, 'blue'); addBlock(id, 1, 'para'); }
    function collect(id) {
        return {
            sections: views(id).length,
            blocks: Array.from(page(id).querySelectorAll('.p3-block')).map(b => {
                const x = b.querySelector('.p3-b-text');
                return {
                    tab: Number(b.parentElement.dataset.tab),
                    type: b.dataset.type,
                    title: (b.querySelector('.p3-b-title') || {}).value || '',
                    text: x ? (x.isContentEditable ? x.innerHTML : x.value) : '',
                    rows: b.dataset.rows || ''
                };
            })
        };
    }
    function restore(id, d) {
        resetDoc(id);
        const blocks = d.blocks || [];
        const n = Math.max(1, d.sections || 1, ...blocks.map(b => Number(b.tab) || 1));
        for (let i = 2; i <= n; i++) addSection(id);
		blocks.forEach(b => {
            const tb = Number(b.tab) || 1;
            if (['blue', 'tan', 'orange', 'slate'].includes(b.type) && b.text) { addBlock(id, tb, b.type, b.title, ''); addBlock(id, tb, 'para', '', b.text); }
            else addBlock(id, tb, b.type, b.title, b.text, b.rows);
        });
        showSection(id, 1);
    }
    function moveBlock(b, dir) {
        const id = b.closest('.doc-page').dataset.doc, tab = Number(b.parentElement.dataset.tab);
        if (dir < 0 && b.previousElementSibling) b.parentNode.insertBefore(b, b.previousElementSibling);
        else if (dir > 0 && b.nextElementSibling) b.parentNode.insertBefore(b, b.nextElementSibling.nextSibling);
        else {
            const t = view(id).querySelector('.p3-blocks[data-tab="' + (tab + dir) + '"]');
            if (!t) return;
            if (dir < 0) t.appendChild(b); else t.insertBefore(b, t.firstChild);
            showSection(id, tab + dir);
        }
        growAll();
    }
    const tool = (bid, fn) => {
        const el = document.getElementById(bid);
        if (el) el.addEventListener('click', () => { const id = currentDoc(); if (id) fn(id); });
    };
	tool('p3-add-blue', id => addBlock(id, activeSec(id), 'blue'));
    tool('p3-add-tan', id => addBlock(id, activeSec(id), 'tan'));
    tool('p3-add-orange', id => addBlock(id, activeSec(id), 'orange'));
    tool('p3-add-slate', id => addBlock(id, activeSec(id), 'slate'));
    tool('p3-cap-tan', id => addBlock(id, activeSec(id), 'cap-tan'));
    tool('p3-cap-orange', id => addBlock(id, activeSec(id), 'cap-orange'));
    tool('p3-cap-slate', id => addBlock(id, activeSec(id), 'cap-slate'));
    tool('p3-cap-navy', id => addBlock(id, activeSec(id), 'cap-navy'));
    tool('p3-add-para', id => addBlock(id, activeSec(id), 'para'));
    tool('p3-add-lines', id => addBlock(id, activeSec(id), 'ruled', '', '', 5));
    tool('p3-add-line', id => addBlock(id, activeSec(id), 'ruled', '', '', 1));
    tool('p3-add-sec', id => { if (!addSection(id)) alert('Maximum of ' + MAX_SECTIONS + ' sections reached.'); });
    tool('p3-del-sec', removeLastSection);

    function runFormat(cmd, val) {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand(cmd, false, val || null);
        markDirty();
        growAll();
    }
    const fmtBtn = (id, fn) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('mousedown', e => e.preventDefault());
        btn.addEventListener('click', fn);
    };
    fmtBtn('p3-fmt-bold', () => runFormat('bold'));
    fmtBtn('p3-fmt-italic', () => runFormat('italic'));
    fmtBtn('p3-fmt-antonio', () => runFormat('fontName', 'Antonio'));
    fmtBtn('p3-fmt-arial', () => runFormat('fontName', 'Arial'));
    fmtBtn('p3-fmt-clear', () => runFormat('removeFormat'));
	
	// Stardate utility
    function getStardateVal() {
        const y = parseInt(document.getElementById('sd-year')?.value, 10) || 2376;
        const m = parseInt(document.getElementById('sd-month')?.value, 10) || 1;
        const d = parseInt(document.getElementById('sd-day')?.value, 10) || 1;
        const start = new Date(y, 0, 1);
        const cur = new Date(y, m - 1, d);
        const diff = Math.max(0, Math.floor((cur - start) / 86400000));
        return Math.floor((y - 2323) * 1000 + (diff / 365.25) * 1000);
    }
    function updateStardateDisplay() {
        const disp = document.getElementById('sd-display');
        if (disp) disp.textContent = 'STARDATE ' + getStardateVal();
    }
    ['sd-year', 'sd-month', 'sd-day'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateStardateDisplay);
    });
    (function initStardateDefaults() {
        const now = new Date();
        const m = document.getElementById('sd-month'), d = document.getElementById('sd-day');
        if (m) m.value = now.getMonth() + 1;
        if (d) d.value = now.getDate();
        const mId = fileId ? fileId.value.match(/^(\d{4})/) : null;
        const y = document.getElementById('sd-year');
        if (y && mId) y.value = mId[1];
        updateStardateDisplay();
    })();
    const sdHeaderBtn = document.getElementById('sd-btn-header');
    if (sdHeaderBtn) {
        sdHeaderBtn.addEventListener('click', () => {
            const id = currentDoc();
            if (!id) return;
            addBlock(id, activeSec(id), 'blue', 'Stardate ' + getStardateVal());
            markDirty();
        });
    }
    const sdInsertBtn = document.getElementById('sd-btn-insert');
    if (sdInsertBtn) {
        sdInsertBtn.addEventListener('mousedown', e => e.preventDefault());
        sdInsertBtn.addEventListener('click', () => {
            const text = 'Stardate ' + getStardateVal();
            const act = document.activeElement;
            if (act && (act.tagName === 'INPUT' || act.tagName === 'TEXTAREA')) {
                const s = act.selectionStart || 0, e = act.selectionEnd || 0;
                act.value = act.value.substring(0, s) + text + act.value.substring(e);
                act.selectionStart = act.selectionEnd = s + text.length;
                markDirty(); sync(); growAll();
            } else {
                document.execCommand('insertText', false, text);
                markDirty(); growAll();
            }
        });
    }

	form.addEventListener('paste', function(e) {
        if (e.target && e.target.classList && e.target.classList.contains('p3-text')) {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');
            document.execCommand('insertText', false, text);
        }
    });

    form.addEventListener('keydown', function(e) {
        if (!e.ctrlKey && !e.metaKey) return;
        if (!e.target || !e.target.isContentEditable) return;
        const k = e.key.toLowerCase();
        if (k === 'b') {
            e.preventDefault();
            runFormat('bold');
        } else if (k === 'i') {
            e.preventDefault();
            runFormat('italic');
        }
    });

    form.addEventListener('click', function(e) {
        if (e.target.classList.contains('p3-mv')) moveBlock(e.target.closest('.p3-block'), Number(e.target.dataset.dir));
        if (e.target.classList.contains('p3-x')) {
            const b = e.target.closest('.p3-block');
            const filled = Array.from(b.querySelectorAll('.p3-b-title, .p3-b-text')).some(x => (x.isContentEditable ? x.textContent : x.value).trim());
            if (filled && !confirm('Remove this item and its text?')) return;
            b.remove(); growAll();
        }
        if (e.target.classList.contains('bio-page-link')) showSection(e.target.closest('.doc-page').dataset.doc, Number(e.target.dataset.sub));
    });

    // Tier 1: master page tabs
    function showPage(n) {
        document.querySelectorAll('.sheet-page').forEach(p => p.classList.toggle('active', p.id === 'page-' + n));
        document.querySelectorAll('.btn-tab[data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === n));
        const dp = document.getElementById('page-' + n);
        if (!dp) return;
        const isDoc = dp.classList.contains('doc-page');
        const p3Tools = document.getElementById('p3-tools');
        if (p3Tools) p3Tools.style.display = isDoc ? 'flex' : 'none';
        const addSec = document.getElementById('p3-add-sec');
        if (isDoc && addSec && DOCS[dp.dataset.doc]) addSec.textContent = DOCS[dp.dataset.doc].addLabel;
        if (n === '1') balance();
        if (isFitWidth) updateSheetZoom();
        growAll();
    }
    document.querySelectorAll('.btn-tab[data-page]').forEach(b => b.addEventListener('click', () => showPage(b.dataset.page)));

    // Portrait upload (Page 1) mirrors to all other pages
    const portraitUploader = document.getElementById('portrait-uploader');
    if (portraitUploader) {
        portraitUploader.addEventListener('change', function(e) {
            if (!e.target.files[0]) return;
            const r = new FileReader();
            r.onload = ev => { setPortrait(ev.target.result); markDirty(); };
            r.readAsDataURL(e.target.files[0]);
        });
    }

    // ===== Slot manager: characters + starships (up to 5 each, browser localStorage) =====
    const KEY = 'sta2e-autosave'; // legacy single-autosave key (migrated once)
    const MAX_SLOTS = 5;
    let quotaState = 0;
    function lsSet(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } }
    function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function lsJSON(k) { try { return JSON.parse(lsGet(k)); } catch (e) { return null; } }
    function warnQuota(level) {
        if (level <= quotaState) return;
        quotaState = level;
        alert(level === 1 ? 'Browser storage is full. Images were left out of the autosave. Use Save As File to keep them.' : 'Browser storage is full. Autosave FAILED. Use Save As File now.');
    }
    function showChoice(head, body, btns, cb) {
        const old = document.getElementById('choice-modal'); if (old) old.remove();
        const dlg = document.createElement('div');
        dlg.id = 'choice-modal'; dlg.className = 'no-print';
        dlg.innerHTML = '<div class="row-modal-backdrop"><div class="row-modal-box"><div class="row-modal-header"></div><div class="row-modal-body"></div><div class="row-modal-btn-row"></div></div></div>';
        dlg.querySelector('.row-modal-header').textContent = head;
        dlg.querySelector('.row-modal-body').textContent = body;
        const row = dlg.querySelector('.row-modal-btn-row');
        const close = v => { dlg.remove(); cb(v); };
        btns.forEach(b => {
            const x = document.createElement('button');
            x.type = 'button'; x.className = 'lcars-utility-btn'; x.style.backgroundColor = b.color || '#2c3a4d'; x.textContent = b.label;
            x.addEventListener('click', () => close(b.val));
            row.appendChild(x);
        });
        dlg.querySelector('.row-modal-backdrop').addEventListener('click', e => { if (e.target === e.currentTarget) close('cancel'); });
        document.body.appendChild(dlg);
    }
    function blankChar() {
        const own = el => el.name && el.name.indexOf('ship_') !== 0;
        form.querySelectorAll('input[type="text"], textarea').forEach(el => { if (own(el)) el.value = el.defaultValue; });
        form.querySelectorAll('input[type="checkbox"]').forEach(el => { if (own(el)) el.checked = false; });
        follows.forEach(t => { if (own(t)) t.dataset.touched = ''; });
        document.querySelectorAll('.val-row').forEach(r => r.classList.remove('challenged'));
        setPortrait('');
        baseEquipment = null;
        setPlayMode(false);
        Object.keys(DOCS).forEach(defaultDoc);
        updateModColors();
    }
    function blankShip() {
        const own = el => el.name && el.name.indexOf('ship_') === 0;
        form.querySelectorAll('input[type="text"], textarea').forEach(el => { if (own(el)) el.value = el.defaultValue; });
        form.querySelectorAll('input[type="checkbox"]').forEach(el => { if (own(el)) el.checked = false; });
        follows.forEach(t => { if (own(t)) t.dataset.touched = ''; });
        setShipGraphic('');
    }
    function makeSlots(c) {
        let cur = null, wired = false;
        const idxRead = () => { const a = lsJSON(c.idxKey); return (Array.isArray(a) && a.length) ? a : null; };
        const idxWrite = a => lsSet(c.idxKey, JSON.stringify(a));
        const selEl = () => document.getElementById(c.ui + 'selector');
        const find = () => (idxRead() || []).find(x => x.id === cur);
        function fill() {
            const s = selEl(); if (!s) return;
            s.innerHTML = '';
            (idxRead() || []).forEach(x => {
                const o = document.createElement('option');
                o.value = x.id; o.textContent = x.name; o.selected = (x.id === cur);
                s.appendChild(o);
            });
        }
        function go(id) {
            cur = id; lsSet(c.activeKey, id);
            const d = lsJSON(c.dataKey + id);
            c.blank();
            if (d) c.apply(d);
            c.after();
            fill();
        }
        function save() {
            if (!cur) return true;
            let ok = lsSet(c.dataKey + cur, JSON.stringify(c.build(true)));
            if (!ok) { ok = lsSet(c.dataKey + cur, JSON.stringify(c.build(false))); warnQuota(ok ? 1 : 2); }
            const a = idxRead(), s = a && a.find(x => x.id === cur);
            if (s && !s.custom) {
                const nm = c.autoName();
                if (nm && nm !== s.name) {
                    s.name = nm; idxWrite(a);
                    const se = selEl(), o = se && se.querySelector('option[value="' + cur + '"]');
                    if (o) o.textContent = nm;
                }
            }
            return ok;
        }
        const count = () => (idxRead() || []).length;
        function full() {
            if (count() >= MAX_SLOTS) { alert('Maximum of ' + MAX_SLOTS + ' ' + c.plural + ' reached.'); return true; }
            return false;
        }
        function create() {
            if (full()) return false;
            save();
            const a = idxRead() || [], id = c.prefix + Date.now();
            a.push({ id: id, name: c.defName + ' ' + (a.length + 1) });
            idxWrite(a); go(id); save();
            return true;
        }
        function duplicate() {
            if (full()) return;
            save();
            const a = idxRead() || [], s = find(), id = c.prefix + Date.now();
            if (!lsSet(c.dataKey + id, JSON.stringify(c.build(true)))) lsSet(c.dataKey + id, JSON.stringify(c.build(false)));
            a.push({ id: id, name: (s ? s.name : c.defName) + ' (copy)', custom: true });
            idxWrite(a); go(id);
        }
        function rename() {
            const a = idxRead() || [], s = a.find(x => x.id === cur);
            if (!s) return;
            const v = prompt('Slot name (leave blank for automatic naming):', s.name);
            if (v === null) return;
            const t = v.trim();
            if (t) { s.name = t; s.custom = true; } else { delete s.custom; s.name = c.autoName() || s.name; }
            idxWrite(a); fill();
        }
        function remove() {
            const a = idxRead() || [], i = a.findIndex(x => x.id === cur);
            if (i < 0) return;
            const msg = a.length === 1
                ? 'This is the last ' + c.noun + ' slot. Delete "' + a[i].name + '" and start a blank one?'
                : 'Permanently delete ' + c.noun + ' slot "' + a[i].name + '" from browser memory?';
            if (!confirm(msg)) return;
            if (c.onRemove) c.onRemove(snapshot());
            try { localStorage.removeItem(c.dataKey + cur); } catch (e) {}
            a.splice(i, 1);
            let next;
            if (!a.length) { next = { id: c.prefix + Date.now(), name: c.defName + ' 1' }; a.push(next); }
            else next = a[Math.max(0, i - 1)];
            idxWrite(a); go(next.id); save();
        }
        function snapshot() {
            save();
            const s = find() || {};
            return { id: cur, name: s.name || c.defName, custom: !!s.custom, data: c.build(true) };
        }
        function restore(en) {
            const a = idxRead() || [];
            if (!a.some(x => x.id === en.id)) {
                if (a.length >= MAX_SLOTS) { alert('No free ' + c.noun + ' slot to restore into. Delete one first.'); return false; }
                a.push(en.custom ? { id: en.id, name: en.name, custom: true } : { id: en.id, name: en.name });
                idxWrite(a);
            }
            if (cur && cur !== en.id) save();
            lsSet(c.dataKey + en.id, JSON.stringify(en.data));
            go(en.id);
            return true;
        }
        function exportAll() {
            save();
            const a = idxRead() || [], data = {};
            a.forEach(x => { data[x.id] = lsJSON(c.dataKey + x.id); });
            return { index: a, active: cur, data: data };
        }
        function importAll(o) {
            (idxRead() || []).forEach(x => { try { localStorage.removeItem(c.dataKey + x.id); } catch (e) {} });
            const src = (o && o.data) || {};
            const a = ((o && o.index) || []).filter(x => x && src[x.id]).slice(0, MAX_SLOTS);
            if (!a.length) a.push({ id: c.prefix + Date.now(), name: c.defName + ' 1' });
            a.forEach(x => { if (src[x.id]) lsSet(c.dataKey + x.id, JSON.stringify(src[x.id])); });
            idxWrite(a);
            go(a.some(x => x.id === (o && o.active)) ? o.active : a[0].id);
        }
        function init() {
            let a = idxRead();
            if (!a) { a = (c.seed && c.seed()) || [{ id: c.prefix + '1', name: c.defName + ' 1' }]; idxWrite(a); }
            const want = lsGet(c.activeKey);
            go(a.some(x => x.id === want) ? want : a[0].id);
            if (wired) return;
            wired = true;
            const s = selEl();
            if (s) s.addEventListener('change', () => { save(); go(s.value); });
            const on = (id, fn) => { const el = document.getElementById(c.ui + id); if (el) el.addEventListener('click', fn); };
            on('btn-new', create); on('btn-dup', duplicate); on('btn-ren', rename); on('btn-del', remove);
        }
        return { init: init, save: save, count: count, create: create, snapshot: snapshot, restore: restore, exportAll: exportAll, importAll: importAll, name: () => { const s = find(); return s ? s.name : ''; } };
    }
    const charSlots = makeSlots({
        ui: 'slot-', idxKey: 'sta2e_storage_slots_index', dataKey: 'sta2e_slot_data_', activeKey: 'sta2e_active_slot',
        prefix: 'slot_', defName: 'Personnel File', noun: 'character', plural: 'character slots',
        build: img => buildData(img, false),
        onRemove: s => setUndo('Delete slot', [Object.assign({ type: 'char' }, s)]),
        apply: d => applyData(d, 'char'),
        blank: blankChar,
        after: () => { sync(); updateModColors(); balance(); growAll(); },
        autoName: () => { const f = form.elements['bio_name']; return f ? f.value.trim() : ''; },
        seed: () => {
            const old = lsGet(KEY);
            if (old && !lsGet('sta2e_slot_data_slot_1')) lsSet('sta2e_slot_data_slot_1', old);
            return null;
        }
    });
    const shipSlots = makeSlots({
        ui: 'ship-slot-', idxKey: 'sta2e_ship_slots_index', dataKey: 'sta2e_ship_data_', activeKey: 'sta2e_active_ship',
        prefix: 'ship_', defName: 'Starship', noun: 'starship', plural: 'ship slots',
        build: img => buildShipData(img),
        onRemove: s => setUndo('Delete ship slot', [Object.assign({ type: 'ship' }, s)]),
        apply: d => applyData(d, 'ship'),
        blank: blankShip,
        after: () => { sync(); growAll(); },
        autoName: () => {
            const n = form.elements['ship_name'], r = form.elements['ship_registry'];
            return (n && n.value.trim()) || (r && r.value.trim()) || '';
        },
        seed: () => {
            // one-time: pull any ship data embedded in older character slots into ship slots
            const out = [], seen = new Set();
            (lsJSON('sta2e_storage_slots_index') || []).forEach(s => {
                if (out.length >= MAX_SLOTS) return;
                const d = lsJSON('sta2e_slot_data_' + s.id);
                if (!d) return;
                const sd = { _bundle: 'sta2e-starship-v1' };
                let has = false;
                Object.keys(d).forEach(k => {
                    if (k.indexOf('ship_') === 0 || k === 'cached_ship_ortho_data') {
                        sd[k] = d[k];
                        if (d[k] && d[k] !== 'NCC-80106-[PHOBOS_DEFAULT]') has = true;
                    }
                });
                const sig = JSON.stringify(sd);
                if (!has || seen.has(sig)) return;
                seen.add(sig);
                const id = 'ship_' + (out.length + 1);
                lsSet('sta2e_ship_data_' + id, sig);
                out.push({ id: id, name: sd.ship_name || sd.ship_registry || ('Starship ' + (out.length + 1)) });
            });
            return out.length ? out : null;
        }
    });
    function offerShip(d) {
        if (shipSlots.count() >= MAX_SLOTS) return;
        showChoice('Starship Data Found', 'This file also contains a starship ("' + (d.ship_name || d.ship_registry || 'unnamed') + '"). Add it as a new ship slot?',
            [{ label: 'Add Ship Slot', val: 'add', color: '#d96b27' }, { label: 'Skip', val: 'skip' }], v => {
                if (v !== 'add' || !shipSlots.create()) return;
                applyData(d, 'ship'); shipSlots.save(); setUnsaved(false);
            });
    }

    // ===== Undo (1 step, session only), Backup All, Reset Ship, Quick Note, Theme, Wake Lock =====
    let undoStack = null;
    function updateUndoBtn() {
        const b = document.getElementById('btn-undo');
        if (!b) return;
        b.disabled = !undoStack;
        b.title = undoStack ? 'Undo: ' + undoStack.label : 'Nothing to undo';
    }
    function setUndo(label, entries) { undoStack = { label: label, entries: entries }; updateUndoBtn(); }
    const snapChar = () => Object.assign({ type: 'char' }, charSlots.snapshot());
    const snapShip = () => Object.assign({ type: 'ship' }, shipSlots.snapshot());
    function doUndo() {
        if (!undoStack) return;
        const u = undoStack;
        const ok = u.entries.every(en => (en.type === 'ship' ? shipSlots : charSlots).restore(en));
        if (!ok) return;
        undoStack = null; updateUndoBtn();
        autosave();
    }
    function downloadJSON(name, obj) {
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
        const a = document.createElement('a');
        a.download = name; a.href = URL.createObjectURL(blob);
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    function backupAll(prefix) {
        downloadJSON((prefix || '') + 'sta2e_backup_all_' + new Date().toLocaleDateString('en-CA') + '.json',
            { _bundle: 'sta2e-backup-v1', created: new Date().toISOString(), characters: charSlots.exportAll(), ships: shipSlots.exportAll() });
    }
    const onBtn = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
    onBtn('btn-undo', doUndo);
    onBtn('btn-backup-all', () => backupAll(''));
    const bkLoader = document.getElementById('utility-backup-loader');
    onBtn('btn-restore-all', () => { if (bkLoader) bkLoader.click(); });
    if (bkLoader) {
        bkLoader.addEventListener('change', function(e) {
            const f = e.target.files[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = function(ev) {
                let d;
                try { d = JSON.parse(ev.target.result); if (!d || d._bundle !== 'sta2e-backup-v1' || !d.characters || !d.ships) throw 0; }
                catch (err) { alert('Terminal Error: Not a valid Backup All file.'); return; }
                const nc = (d.characters.index || []).length, ns = (d.ships.index || []).length;
                showChoice('Restore All // Replace Everything', 'This replaces ALL character and ship slots in browser memory with the backup (' + nc + ' characters, ' + ns + ' ships). A backup of the current state downloads first.',
                    [{ label: 'Replace All', val: 'go', color: '#bd4b4b' }, { label: 'Cancel', val: 'cancel' }], v => {
                        if (v !== 'go') return;
                        backupAll('before_restore_');
                        undoStack = null; updateUndoBtn();
                        charSlots.importAll(d.characters); shipSlots.importAll(d.ships);
                        setUnsaved(false);
                    });
            };
            r.readAsText(f);
            bkLoader.value = '';
        });
    }
    onBtn('btn-reset-ship', () => {
        if (!confirm('Reset Ship damage?\n\n\u2022 Clears all Shield boxes\n\u2022 Clears all System Breach boxes\n(Stats, attacks and talents are kept)')) return;
        setUndo('Reset Ship', [snapShip()]);
        form.querySelectorAll('input[type="checkbox"]').forEach(el => { if (/^ship_(shield_\d+|sys_[a-z]+_b\d+)$/.test(el.name)) el.checked = false; });
        markDirty();
    });
    onBtn('btn-quick-note', () => {
        const t = prompt('Quick note (added to Page 4 Logs with the current stardate):');
        if (!t || !t.trim()) return;
        addBlock('p4', activeSec('p4'), 'cap-tan', 'Stardate ' + getStardateVal(), t.trim());
        markDirty();
    });
    let darkPlay = lsGet('sta2e_dark_play') !== '0';
    function applyTheme() {
        document.body.classList.toggle('dark-play', darkPlay);
        const b = document.getElementById('btn-theme');
        if (b) b.textContent = 'Theme: ' + (darkPlay ? 'Dark' : 'Light');
    }
    onBtn('btn-theme', () => { darkPlay = !darkPlay; lsSet('sta2e_dark_play', darkPlay ? '1' : '0'); applyTheme(); });
    applyTheme(); updateUndoBtn();
    let wakeLock = null;
    async function setWake(on) {
        try {
            if (on && 'wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
            else if (wakeLock) { await wakeLock.release(); wakeLock = null; }
        } catch (e) {}
    }
    document.addEventListener('visibilitychange', () => { if (document.fullscreenElement && document.visibilityState === 'visible') setWake(true); });

    // ===== User Manual overlay (text from readme.js: window.STA_README) =====
    function mdInline(s) {
        return s.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    }
    function mdToHtml(md) {
        const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const out = [];
        let list = null;
        const close = () => { if (list) { out.push('</' + list + '>'); list = null; } };
        String(md).split(/\r?\n/).forEach(raw => {
            const line = esc(raw);
            let m;
            if (!line.trim()) { close(); return; }
            if ((m = line.match(/^(#{1,3})\s+(.*)$/))) { close(); out.push('<h' + m[1].length + '>' + mdInline(m[2]) + '</h' + m[1].length + '>'); return; }
            if (/^---+$/.test(line.trim())) { close(); out.push('<hr>'); return; }
            if ((m = line.match(/^\s*[-*]\s+(.*)$/))) { if (list !== 'ul') { close(); out.push('<ul>'); list = 'ul'; } out.push('<li>' + mdInline(m[1]) + '</li>'); return; }
            if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) { if (list !== 'ol') { close(); out.push('<ol>'); list = 'ol'; } out.push('<li>' + mdInline(m[1]) + '</li>'); return; }
            close();
            out.push('<p>' + mdInline(line) + '</p>');
        });
        close();
        return out.join('');
    }
    function closeManual() { const o = document.getElementById('manual-overlay'); if (o) o.style.display = 'none'; }
    function openManual() {
        let o = document.getElementById('manual-overlay');
        if (!o) {
            o = document.createElement('div');
            o.id = 'manual-overlay'; o.className = 'no-print';
            o.innerHTML = '<div class="manual-backdrop"><div class="manual-box"><div class="manual-head"><div class="manual-head-cap"></div><div class="manual-head-title">User Manual // Console Guide</div><div class="manual-head-yellow"></div><button type="button" class="manual-close" title="Close (Esc)">Close &times;</button></div><div class="manual-body"></div></div></div>';
            o.querySelector('.manual-body').innerHTML = mdToHtml(window.STA_README || '# Manual not loaded\n\nreadme.js was not found next to index.html.');
            o.addEventListener('click', e => { if (e.target.classList.contains('manual-backdrop') || e.target.closest('.manual-close')) closeManual(); });
            document.body.appendChild(o);
        }
        o.style.display = 'block';
    }
    onBtn('btn-manual', openManual);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeManual(); });

    const UNS = 'sta2e-unsaved';
    let unsaved = false, autoTimer;
    try { unsaved = localStorage.getItem(UNS) === '1'; } catch (e) {}
    function updateAutosaveUI(state) {
        document.querySelectorAll('.autosave-indicator').forEach(dot => {
            dot.className = 'autosave-indicator ' + state + (dot.classList.contains('no-print') ? ' no-print' : '');
            dot.title = state === 'saved' ? 'Autosave: Synchronized (Click to force save)' : 'Autosave: Changes pending...';
        });
    }
    function setUnsaved(v) {
        unsaved = v;
        try { localStorage.setItem(UNS, v ? '1' : '0'); } catch (e) {}
        updateAutosaveUI(v ? 'pending' : 'saved');
    }
    function buildData(withImages, includeShip) {
        const data = { _bundle: 'sta2e-unified-v3' };
        const keep = el => el.name && (includeShip || el.name.indexOf('ship_') !== 0);
        form.querySelectorAll('input[type="text"], textarea').forEach(el => { if (keep(el)) data[el.name] = el.value; });
        form.querySelectorAll('input[type="checkbox"]').forEach(el => { if (keep(el)) data[el.name] = el.checked; });
        data.docs = { p3: collect('p3'), p4: collect('p4') };
        const eq = form.elements['ledger_equipment'];
        data.base_equipment = (isPlayMode && baseEquipment !== null) ? baseEquipment : (eq ? eq.value : '');
        data._play_mode = isPlayMode;
        data.challenged_values = Array.from(form.querySelectorAll('.val-row'))
            .map((r, i) => r.classList.contains('challenged') ? (i + 1) : null)
            .filter(Boolean);
        const pi = document.getElementById('portrait-img');
        if (withImages !== false && pi && pi.src && pi.style.display === 'block') data['cached_portrait_data'] = pi.src;
        const si = document.getElementById('ship-ortho-img');
        if (includeShip && withImages !== false && si && si.src && si.style.display === 'block') data['cached_ship_ortho_data'] = si.src;
        return data;
    }
    function buildShipData(withImages) {
        const d = { _bundle: 'sta2e-starship-v1' };
        form.querySelectorAll('input, textarea').forEach(el => {
            if (el.name && el.name.indexOf('ship_') === 0) d[el.name] = (el.type === 'checkbox') ? el.checked : el.value;
        });
        const si = document.getElementById('ship-ortho-img');
        if (withImages !== false && si && si.src && si.style.display === 'block') d['cached_ship_ortho_data'] = si.src;
        return d;
    }
    function autosave() {
        clearTimeout(autoTimer);
        const a = charSlots.save(), b = shipSlots.save();
        setUnsaved(!(a && b));
    }
    function markDirty() {
        setUnsaved(true);
        clearTimeout(autoTimer);
        autoTimer = setTimeout(autosave, 500);
    }
    document.addEventListener('click', e => {
        if (e.target.classList.contains('autosave-indicator')) {
            autosave();
        }
    });
    function saveFile(prefix) {
        const blob = new Blob([JSON.stringify(buildData(true, true), null, 2)], { type: 'application/json' });
        let name = fileId.value.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '_');
        if (!name) name = 'unnamed_personnel';
        const a = document.createElement('a');
        a.download = (prefix || '') + name + '_' + new Date().toLocaleDateString('en-CA') + '.json';
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    const saveBtn = document.getElementById('utility-btn-save');
    if (saveBtn) saveBtn.addEventListener('click', function() { saveFile(''); setUnsaved(false); });
    const onEdit = e => { const t = e.target; if (t.matches && t.matches('#slot-selector, #ship-slot-selector, #utility-file-loader, #utility-ship-loader, #utility-backup-loader, [id$="-search"], #talent-cat')) return; markDirty(); };
    form.addEventListener('input', onEdit);
    form.addEventListener('change', onEdit);
    form.addEventListener('click', e => { if (e.target.closest('.p3-mv, .p3-x, #p3-tools button')) markDirty(); });
    window.addEventListener('beforeunload', e => { if (unsaved) autosave(); if (unsaved) { e.preventDefault(); e.returnValue = ''; } });

    // Load
    function applyData(d, scope) {
        const wantChar = scope !== 'ship', wantShip = scope !== 'char';
        const mine = el => (el.name.indexOf('ship_') === 0) ? wantShip : wantChar;
        if (wantChar) {
            if (d.ledger_mission_directives === undefined && (d.ledger_mission_profile || d.ledger_active_directives)) d.ledger_mission_directives = [d.ledger_mission_profile, d.ledger_active_directives].filter(Boolean).join('\n');
            if (d.ledger_focuses && d.ledger_focus_1 === undefined) {
                const f = String(d.ledger_focuses).split(/\r?\n/).filter(x => x.trim());
                for (let i = 0; i < 6; i++) d['ledger_focus_' + (i + 1)] = i < 5 ? (f[i] || '') : f.slice(5).join('; ');
            }
            if (d.ledger_values && d.ledger_value_1 === undefined) String(d.ledger_values).split(/\r?\n/).slice(0, 4).forEach((t, i) => { d['ledger_value_' + (i + 1)] = t; });
        }
        form.querySelectorAll('input[type="text"], textarea').forEach(el => { if (el.name && mine(el) && d[el.name] !== undefined) el.value = d[el.name]; });
        form.querySelectorAll('input[type="checkbox"]').forEach(el => { if (el.name && mine(el) && d[el.name] !== undefined) el.checked = d[el.name]; });
        follows.forEach(t => {
            if (mine(t) && d[t.name] !== undefined) {
                const baseVal = d[t.dataset.follow] || '';
                t.dataset.touched = (d[t.name] && d[t.name] !== baseVal) ? '1' : '';
            }
        });
        if (wantChar) {
            if (d.docs) Object.keys(DOCS).forEach(id => { if (d.docs[id]) restore(id, d.docs[id]); });
            else if (Array.isArray(d.p3_blocks)) restore('p3', { blocks: d.p3_blocks });
            setPortrait(d['cached_portrait_data'] || '');
            baseEquipment = (d._play_mode && d.base_equipment !== undefined) ? d.base_equipment : null;
            if (d._play_mode !== undefined) setPlayMode(!!d._play_mode, true);
            const ch = Array.isArray(d.challenged_values) ? d.challenged_values : [];
            form.querySelectorAll('.val-row').forEach((r, i) => { r.classList.toggle('challenged', ch.includes(i + 1)); });
        }
        if (wantShip) setShipGraphic(d['cached_ship_ortho_data'] || '');
        sync(); updateModColors(); growAll();
    }
    const loader = document.getElementById('utility-file-loader');
    const loadBtn = document.getElementById('utility-btn-load');
    if (loadBtn && loader) loadBtn.addEventListener('click', () => loader.click());
    if (loader) {
        loader.addEventListener('change', function(e) {
            const f = e.target.files[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = function(ev) {
                let d;
                try { d = JSON.parse(ev.target.result); if (!d || typeof d !== 'object') throw 0; }
                catch (err) { alert('Terminal Error: Incompatible file format or data string corrupted.'); return; }
                const btns = [];
                if (charSlots.count() < MAX_SLOTS) btns.push({ label: 'New Slot', val: 'new', color: '#d96b27' });
                btns.push({ label: 'Replace Current', val: 'replace', color: '#bd4b4b' }, { label: 'Cancel', val: 'cancel' });
                showChoice('Load File // Select Target', 'Load this file into a new slot, or replace "' + charSlots.name() + '"?', btns, v => {
                    if (v !== 'new' && v !== 'replace') return;
                    if (v === 'new') { if (!charSlots.create()) return; } else { setUndo('Replace with file', [snapChar()]); blankChar(); }
                    applyData(d, 'char'); balance();
                    charSlots.save(); setUnsaved(false);
                    if (d.ship_name || d.ship_registry || d.cached_ship_ortho_data) offerShip(d);
                });
            };
            r.readAsText(f);
            loader.value = '';
        });
    }

    // Clear (active character slot only; starships untouched)
    const clearBtn = document.getElementById('utility-btn-clear');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (!confirm('Clear character "' + charSlots.name() + '"? A backup file will be downloaded first. (Starships are not affected.)')) return;
            saveFile('backup_'); setUndo('Clear Form', [snapChar()]);
            blankChar(); sync(); balance(); growAll();
            charSlots.save(); setUnsaved(false);
        });
    }

    function setShipGraphic(src) {
        const img = document.getElementById('ship-ortho-img');
        const ph = document.getElementById('ship-ortho-ph');
        if (img) { img.src = src || ''; img.style.display = src ? 'block' : 'none'; }
        if (ph) { ph.style.display = src ? 'none' : 'block'; }
    }
    const shipUploader = document.getElementById('ship-img-uploader');
    if (shipUploader) {
        shipUploader.addEventListener('change', function(e) {
            if (!e.target.files[0]) return;
            const r = new FileReader();
            r.onload = ev => { setShipGraphic(ev.target.result); markDirty(); };
            r.readAsDataURL(e.target.files[0]);
        });
    }

    function exportShipFile() {
        const shipData = buildShipData();
        const shipFileId = document.getElementById('ship-metadata-file-id');
        let name = (shipFileId ? shipFileId.value : '').trim().toLowerCase().replace(/[^a-z0-9\-]/gi, '_');
        if (!name) name = 'starship_vessel';
        const filename = name + '_' + new Date().toLocaleDateString('en-CA') + '.json';
        const blob = new Blob([JSON.stringify(shipData, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.download = filename.toLowerCase();
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    const shipExportBtn = document.getElementById('utility-btn-ship-export');
    if (shipExportBtn) shipExportBtn.addEventListener('click', exportShipFile);

    const shipLoader = document.getElementById('utility-ship-loader');
    const shipImportBtn = document.getElementById('utility-btn-ship-import');
    if (shipImportBtn && shipLoader) shipImportBtn.addEventListener('click', () => shipLoader.click());
    if (shipLoader) {
        shipLoader.addEventListener('change', function(e) {
            const f = e.target.files[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = function(ev) {
                let d;
                try { d = JSON.parse(ev.target.result); if (!d || typeof d !== 'object') throw 0; }
                catch (err) { alert('Terminal Error: Unable to parse starship registry file.'); return; }
                const btns = [];
                if (shipSlots.count() < MAX_SLOTS) btns.push({ label: 'New Ship Slot', val: 'new', color: '#d96b27' });
                btns.push({ label: 'Replace Current', val: 'replace', color: '#bd4b4b' }, { label: 'Cancel', val: 'cancel' });
                showChoice('Import Ship // Select Target', 'Import into a new ship slot, or replace "' + shipSlots.name() + '"?', btns, v => {
                    if (v !== 'new' && v !== 'replace') return;
                    if (v === 'new') { if (!shipSlots.create()) return; } else { setUndo('Replace ship', [snapShip()]); blankShip(); }
                    applyData(d, 'ship');
                    shipSlots.save(); setUnsaved(false);
                });
            };
            r.readAsText(f);
            shipLoader.value = '';
        });
    }

    function printFullDossier() {
        const old = document.getElementById('print-all-container');
        if (old) old.remove();

        const container = document.createElement('div');
        container.id = 'print-all-container';

        function cloneWithValues(el) {
            const copy = el.cloneNode(true);
            const origs = el.querySelectorAll('input, textarea, select');
            const copies = copy.querySelectorAll('input, textarea, select');
            origs.forEach((orig, i) => {
                if (orig.type === 'checkbox') copies[i].checked = orig.checked;
                else copies[i].value = orig.value;
            });
            return copy;
        }

        // Page 1
        const p1 = document.querySelector('#page-1 .printable-page-area');
        if (p1) {
            const wrap = document.createElement('div');
            wrap.className = 'sheet-page active screen-only-view-padding print-page-break';
            wrap.appendChild(cloneWithValues(p1));
            container.appendChild(wrap);
        }

        // Page 2 (needs #page-2 ID for scoped CSS)
        const p2 = document.querySelector('#page-2 .printable-page-area');
        if (p2) {
            const origP2 = document.getElementById('page-2');
            if (origP2) origP2.id = 'page-2-orig';
            const wrap = document.createElement('div');
            wrap.id = 'page-2';
            wrap.className = 'sheet-page active screen-only-view-padding print-page-break';
            wrap.appendChild(cloneWithValues(p2));
            container.appendChild(wrap);
        }

        // Pages 3 & 4 (need .doc-page class for scoped CSS)
        ['p3', 'p4'].forEach(docId => {
            const pg = page(docId);
            if (!pg) return;
            const area = pg.querySelector('.printable-page-area');
            if (!area) return;
            const vs = views(docId);
            for (let t = 1; t <= vs.length; t++) {
                const clonedArea = cloneWithValues(area);
                clonedArea.querySelectorAll('.dossier-tab-view').forEach(v => {
                    v.classList.toggle('active', Number(v.dataset.tab) === t);
                });
                clonedArea.querySelectorAll('.bio-page-link').forEach(btn => {
                    btn.classList.toggle('active', Number(btn.dataset.sub) === t);
                });
                const wrap = document.createElement('div');
                wrap.className = 'sheet-page active doc-page screen-only-view-padding print-page-break';
                wrap.dataset.doc = docId;
                wrap.appendChild(clonedArea);
                container.appendChild(wrap);
            }
        });

        // Page 5
        const p5 = document.querySelector('#page-5 .printable-page-area');
        if (p5) {
            const wrap = document.createElement('div');
            wrap.className = 'sheet-page active screen-only-view-padding print-page-break';
            wrap.appendChild(cloneWithValues(p5));
            container.appendChild(wrap);
        }

        document.body.appendChild(container);
        document.body.classList.add('printing-all');
        window.print();
    }
    const printBtn = document.getElementById('utility-btn-print-all');
    if (printBtn) printBtn.addEventListener('click', printFullDossier);

	window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing-all');
        const origP2 = document.getElementById('page-2-orig');
        if (origP2) origP2.id = 'page-2';
        const c = document.getElementById('print-all-container');
        if (c) c.remove();
    });

    // Species Ability picker (list comes from species_abilities.js)
    const picker = document.getElementById('species-ability-picker');
    const list = Array.isArray(window.STA_SPECIES_ABILITIES) ? window.STA_SPECIES_ABILITIES : [];
    if (picker) {
        (function fillPicker() {
            const first = document.createElement('option');
            first.value = '';
            first.textContent = list.length ? '\u25BE Choose species ability...' : '\u25BE No list loaded (species_abilities.js)';
            picker.appendChild(first);
            const groups = {};
            list.forEach((e, i) => { (groups[e.species] = groups[e.species] || []).push([e, i]); });
            Object.keys(groups).sort().forEach(sp => {
                const g = document.createElement('optgroup');
                g.label = sp;
                groups[sp].forEach(([e, i]) => { const o = document.createElement('option'); o.value = i; o.textContent = e.name; g.appendChild(o); });
                picker.appendChild(g);
            });
        })();
        picker.addEventListener('change', function() {
            if (picker.value === '') return;
            const e = list[Number(picker.value)];
            const box = form.elements['ledger_species_ability'];
            if (box && box.value.trim() && !confirm('Replace the current Species Ability text?')) { picker.value = ''; return; }
            if (box) box.value = e.name + (e.text ? ': ' + e.text : '');
            picker.value = '';
            growAll();
        });
    }

    // Talents / Equipment pickers: every pick is added as a new line
    function makeAppender(selId, boxName, list, label, groupOf, nameOf, lineOf, after) {
        const sel = document.getElementById(selId);
        if (!sel) return;
        const items = Array.isArray(list) ? list : [];
        const first = document.createElement('option');
        first.value = '';
        first.textContent = items.length ? '\u25BE ' + label : '\u25BE No list loaded';
        sel.appendChild(first);
        const groups = {};
        items.forEach((e, i) => { (groups[groupOf(e)] = groups[groupOf(e)] || []).push([e, i]); });
        Object.keys(groups).sort().forEach(g => {
            const og = document.createElement('optgroup');
            og.label = g;
            groups[g].sort((a, b) => nameOf(a[0]).localeCompare(nameOf(b[0]))).forEach(([e, i]) => {
                const o = document.createElement('option'); o.value = i; o.textContent = nameOf(e); og.appendChild(o);
            });
            sel.appendChild(og);
        });
        sel.addEventListener('change', function() {
            if (sel.value === '') return;
            const box = form.elements[boxName];
            const item = items[Number(sel.value)];
            if (box) box.value = (box.value.trim() ? box.value.replace(/\s+$/, '') + '\n' : '') + lineOf(item);
            sel.value = '';
            growAll();
            if (after) { after(item); growAll(); }
        });
    }
    const allTalents = Array.isArray(window.STA_TALENTS) ? window.STA_TALENTS : [];
    const charTalents = allTalents.filter(e => !/starship/i.test(e.category || ''));

    makeAppender('talent-picker', 'ledger_talents', charTalents, 'Add a talent...', e => e.category || 'Other', e => e.talent, e => e.talent + (e.text ? ': ' + e.text : ''));
    (function talentFilters() {
        const sel = document.getElementById('talent-picker'), q = document.getElementById('talent-search'), cat = document.getElementById('talent-cat');
        const items = charTalents;
        if (!sel || !items.length || !q || !cat) return;
        const spp = new Set((Array.isArray(window.STA_SPECIES_ABILITIES) ? window.STA_SPECIES_ABILITIES : []).map(e => String(e.species).trim().toLowerCase()));
        const catOf = e => { const c = String(e.category || 'Other').trim(); return (spp.has(c.toLowerCase()) || /species/i.test(c)) ? 'Species' : c; };
        Array.from(new Set(items.map(catOf))).sort().forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; cat.appendChild(o); });
        function refill() {
            const term = q.value.trim().toLowerCase(), c = cat.value;
            const hits = items.map((e, i) => [e, i]).filter(([e]) => (!c || catOf(e) === c) && (!term || (e.talent + ' ' + (e.text || '')).toLowerCase().includes(term)));
            while (sel.children.length > 1) sel.removeChild(sel.lastChild);
            sel.options[0].textContent = '\u25BE ' + (hits.length === items.length ? 'Add a talent...' : hits.length + (hits.length === 1 ? ' match' : ' matches') + '...');
            const groups = {};
            hits.forEach(h => { (groups[catOf(h[0])] = groups[catOf(h[0])] || []).push(h); });
            Object.keys(groups).sort().forEach(g => {
                const og = document.createElement('optgroup'); og.label = g;
                groups[g].sort((a, b) => a[0].talent.localeCompare(b[0].talent)).forEach(([e, i]) => { const o = document.createElement('option'); o.value = i; o.textContent = e.talent; og.appendChild(o); });
                sel.appendChild(og);
            });
        }
        q.addEventListener('input', refill);
        q.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
        cat.addEventListener('change', refill);
    form.addEventListener('reset', () => setTimeout(refill, 0));
    refill();
})();

// Starship Talents Picker & Search
const shipTalents = allTalents.filter(e => /starship/i.test(e.category || ''));
const shipBoxName = form.elements['ledger_ship_talents'] ? 'ledger_ship_talents' : (form.elements['ship_talents'] ? 'ship_talents' : 'starship_talents');

makeAppender('ship-talent-picker', shipBoxName, shipTalents, 'Add a ship talent...', e => e.source || 'Starship', e => e.talent, e => e.talent + (e.text ? ': ' + e.text : ''));

(function shipTalentFilters() {
    const sel = document.getElementById('ship-talent-picker'), q = document.getElementById('ship-talent-search');
    if (!sel || !shipTalents.length || !q) return;
    function refill() {
        const term = q.value.trim().toLowerCase();
        const hits = shipTalents.map((e, i) => [e, i]).filter(([e]) => !term || (e.talent + ' ' + (e.text || '')).toLowerCase().includes(term));
        while (sel.children.length > 1) sel.removeChild(sel.lastChild);
        sel.options[0].textContent = '\u25BE ' + (hits.length === shipTalents.length ? 'Add a ship talent...' : hits.length + (hits.length === 1 ? ' match' : ' matches') + '...');
        const groups = {};
        hits.forEach(h => { (groups[h[0].source || 'Starship'] = groups[h[0].source || 'Starship'] || []).push(h); });
        Object.keys(groups).sort().forEach(g => {
            const og = document.createElement('optgroup'); og.label = g;
            groups[g].sort((a, b) => a[0].talent.localeCompare(b[0].talent)).forEach(([e, i]) => {
                const o = document.createElement('option'); o.value = i; o.textContent = e.talent; og.appendChild(o);
            });
            sel.appendChild(og);
        });
    }
    q.addEventListener('input', refill);
    q.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
    form.addEventListener('reset', () => setTimeout(refill, 0));
    refill();
})();

const allEquip = Array.isArray(window.STA_EQUIPMENT) ? window.STA_EQUIPMENT : [];
    const gearList = allEquip.filter(e => !/weapon/i.test(e.type || ''));
    const weaponList = allEquip.filter(e => /weapon/i.test(e.type || '') && !/ship weapon/i.test(e.type || ''));
    const shipWeaponList = allEquip.filter(e => /ship weapon/i.test(e.type || ''));

    function updateTotalOpportunityCost() {
        const base = parseInt(form.elements['logistics_base_cost']?.value, 10) || 0;
        const mission = parseInt(form.elements['logistics_mission_cost']?.value, 10) || 0;
        const totalInput = form.elements['logistics_total_cost'];
        if (totalInput) totalInput.value = (base + mission > 0) ? (base + mission) : '';
    }
    form.addEventListener('input', e => {
        if (e.target && (e.target.name === 'logistics_base_cost' || e.target.name === 'logistics_mission_cost')) {
            updateTotalOpportunityCost();
        }
    });

makeAppender('equipment-picker', 'ledger_equipment', gearList, 'Add equipment...', e => e.type || 'Other', e => {
        const isStandard = e.standard_issue === true || String(e.standard_issue).toLowerCase() === 'true';
        const cost = (e.opportunity_cost !== undefined && e.opportunity_cost !== null && e.opportunity_cost !== '') ? e.opportunity_cost : '?';
        const costLabel = isStandard ? 'Standard Issue' : 'Cost: ' + cost;
        return e.name + ' [' + costLabel + ']';
    }, e => {
        return e.name + (e.qualities ? ': ' + e.qualities : '');
    }, item => {
        const isStandard = item.standard_issue === true || String(item.standard_issue).toLowerCase() === 'true';
        const itemCost = isStandard ? 0 : (parseInt(item.opportunity_cost, 10) || 0);
        if (itemCost > 0) {
            const targetField = isPlayMode ? 'logistics_mission_cost' : 'logistics_base_cost';
            const f = form.elements[targetField];
            if (f) {
                const cur = parseInt(f.value, 10) || 0;
                f.value = cur + itemCost;
                updateTotalOpportunityCost();
            }
        }
    });

    (function equipmentFilters() {
        const sel = document.getElementById('equipment-picker'), q = document.getElementById('equipment-search');
        if (!sel || !gearList.length || !q) return;
        function refill() {
            const term = q.value.trim().toLowerCase();
            const hits = gearList.map((e, i) => [e, i]).filter(([e]) => !term || (e.name + ' ' + (e.qualities || '') + ' ' + (e.type || '')).toLowerCase().includes(term));
            while (sel.children.length > 1) sel.removeChild(sel.lastChild);
            sel.options[0].textContent = '\u25BE ' + (hits.length === gearList.length ? 'Add equipment...' : hits.length + (hits.length === 1 ? ' match' : ' matches') + '...');
            const groups = {};
            hits.forEach(h => { (groups[h[0].type || 'Other'] = groups[h[0].type || 'Other'] || []).push(h); });
            Object.keys(groups).sort().forEach(g => {
                const og = document.createElement('optgroup'); og.label = g;
                groups[g].sort((a, b) => a[0].name.localeCompare(b[0].name)).forEach(([e, i]) => {
                    const isStandard = e.standard_issue === true || String(e.standard_issue).toLowerCase() === 'true';
                    const cost = (e.opportunity_cost !== undefined && e.opportunity_cost !== null && e.opportunity_cost !== '') ? e.opportunity_cost : '?';
                    const costLabel = isStandard ? 'Standard Issue' : 'Cost: ' + cost;
                    const o = document.createElement('option');
                    o.value = i;
                    o.textContent = e.name + ' [' + costLabel + ']';
                    og.appendChild(o);
                });
                sel.appendChild(og);
            });
        }
        q.addEventListener('input', refill);
        q.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
        form.addEventListener('reset', () => setTimeout(refill, 0));
    })();

    (function initWeaponPicker() {
        const wSel = document.getElementById('weapon-picker'), wQ = document.getElementById('weapon-search');
        if (!wSel) return;
        function refill() {
            const term = wQ ? wQ.value.trim().toLowerCase() : '';
            const hits = weaponList.map((e, i) => [e, i]).filter(([e]) => !term || (e.name + ' ' + (e.qualities || '') + ' ' + (e.type || '')).toLowerCase().includes(term));
            while (wSel.children.length > 1) wSel.removeChild(wSel.lastChild);
            wSel.options[0].textContent = '\u25BE ' + (hits.length === weaponList.length ? (weaponList.length ? 'Add weapon...' : 'No weapons loaded') : hits.length + (hits.length === 1 ? ' match' : ' matches') + '...');
            const groups = {};
            hits.forEach(h => { (groups[h[0].type || 'Weapons'] = groups[h[0].type || 'Weapons'] || []).push(h); });
            Object.keys(groups).sort().forEach(g => {
                const og = document.createElement('optgroup');
                og.label = g;
                groups[g].sort((a, b) => a[0].name.localeCompare(b[0].name)).forEach(([e, i]) => {
                    const isStandard = e.standard_issue === true || String(e.standard_issue).toLowerCase() === 'true';
                    const cost = (e.opportunity_cost !== undefined && e.opportunity_cost !== null && e.opportunity_cost !== '') ? e.opportunity_cost : '?';
                    const costLabel = isStandard ? 'Standard Issue' : 'Cost: ' + cost;
                    const o = document.createElement('option');
                    o.value = i;
                    o.textContent = e.name + ' [' + costLabel + ']';
                    og.appendChild(o);
                });
                wSel.appendChild(og);
            });
        }
        const first = document.createElement('option');
        first.value = '';
        first.textContent = weaponList.length ? '\u25BE Add weapon...' : '\u25BE No weapons loaded';
        wSel.appendChild(first);
        refill();
        if (wQ) {
            wQ.addEventListener('input', refill);
            wQ.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
            form.addEventListener('reset', () => setTimeout(refill, 0));
        }
        wSel.addEventListener('change', function() {
            if (wSel.value === '') return;
            const w = weaponList[Number(wSel.value)];
            let filled = false;
            for (let n = 1; n <= 7; n++) {
                const t = form.elements['attack_' + n + '_type'], q = form.elements['attack_' + n + '_qual'], sc = form.elements['attack_' + n + '_score'];
                if (t && !t.value.trim() && !q.value.trim() && !sc.value.trim()) {
                    t.value = w.name;
                    q.value = w.qualities || '';
                    sc.value = w.severity || '';
                    filled = true;
                    break;
                }
            }
            if (!filled) alert('All 7 attack rows are already in use.');
            wSel.value = '';
            markDirty(); sync(); growAll();
        });
    })();

    // Starship Weapons Picker & Search (Page 5)
    (function initShipWeaponPicker() {
        const swSel = document.getElementById('ship-weapon-picker'), swQ = document.getElementById('ship-weapon-search');
        if (!swSel) return;
        function refill() {
            const term = swQ ? swQ.value.trim().toLowerCase() : '';
            const hits = shipWeaponList.map((e, i) => [e, i]).filter(([e]) => !term || (e.name + ' ' + (e.qualities || '') + ' ' + (e.type || '')).toLowerCase().includes(term));
            while (swSel.children.length > 1) swSel.removeChild(swSel.lastChild);
            swSel.options[0].textContent = '\u25BE ' + (hits.length === shipWeaponList.length ? (shipWeaponList.length ? 'Add ship weapon...' : 'No weapons loaded') : hits.length + (hits.length === 1 ? ' match' : ' matches') + '...');
            const groups = {};
            hits.forEach(h => { (groups[h[0].type || 'Ship Weapons'] = groups[h[0].type || 'Ship Weapons'] || []).push(h); });
            Object.keys(groups).sort().forEach(g => {
                const og = document.createElement('optgroup'); og.label = g;
                groups[g].sort((a, b) => a[0].name.localeCompare(b[0].name)).forEach(([e, i]) => {
                    const o = document.createElement('option');
                    o.value = i;
                    o.textContent = e.name;
                    og.appendChild(o);
                });
                swSel.appendChild(og);
            });
        }
        const first = document.createElement('option');
        first.value = '';
        first.textContent = shipWeaponList.length ? '\u25BE Add ship weapon...' : '\u25BE No ship weapons loaded';
        swSel.appendChild(first);
        refill();
        if (swQ) {
            swQ.addEventListener('input', refill);
            swQ.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
            form.addEventListener('reset', () => setTimeout(refill, 0));
        }
        swSel.addEventListener('change', function() {
            if (swSel.value === '') return;
            const w = shipWeaponList[Number(swSel.value)];
            let filled = false;
            for (let n = 1; n <= 5; n++) {
                const t = form.elements['ship_attack_' + n + '_type'], q = form.elements['ship_attack_' + n + '_qual'], sc = form.elements['ship_attack_' + n + '_score'];
                if (t && !t.value.trim() && !q.value.trim() && !sc.value.trim()) {
                    t.value = w.name;
                    q.value = w.qualities || '';
                    sc.value = w.severity || '';
                    filled = true;
                    break;
                }
            }
            if (!filled) alert('All 5 starship attack rows are already in use.');
            swSel.value = '';
            markDirty(); sync(); growAll();
        });
    })();
	// Row controls: Attack, Ship Attack, and Roster slot shift & clear
    function getAttack(i, isShip) {
        const p = isShip ? 'ship_attack_' : 'attack_';
        return {
            type: form.elements[p + i + '_type'] ? form.elements[p + i + '_type'].value : '',
            qual: form.elements[p + i + '_qual'] ? form.elements[p + i + '_qual'].value : '',
            score: form.elements[p + i + '_score'] ? form.elements[p + i + '_score'].value : ''
        };
    }
    function setAttack(i, d, isShip) {
        const p = isShip ? 'ship_attack_' : 'attack_';
        if (form.elements[p + i + '_type']) form.elements[p + i + '_type'].value = d.type;
        if (form.elements[p + i + '_qual']) form.elements[p + i + '_qual'].value = d.qual;
        if (form.elements[p + i + '_score']) form.elements[p + i + '_score'].value = d.score;
    }
    function getRoster(i) {
        return {
            name: form.elements['roster_' + i + '_name'] ? form.elements['roster_' + i + '_name'].value : '',
            stat: form.elements['roster_' + i + '_stat'] ? form.elements['roster_' + i + '_stat'].value : '',
            note: form.elements['roster_' + i + '_note'] ? form.elements['roster_' + i + '_note'].value : ''
        };
    }
    function setRoster(i, d) {
        if (form.elements['roster_' + i + '_name']) form.elements['roster_' + i + '_name'].value = d.name;
        if (form.elements['roster_' + i + '_stat']) form.elements['roster_' + i + '_stat'].value = d.stat;
        if (form.elements['roster_' + i + '_note']) form.elements['roster_' + i + '_note'].value = d.note;
    }
    function shiftRow(type, idx, dir) {
        const max = type === 'attack' ? 7 : (type === 'ship_attack' ? 5 : 6);
        const target = idx + dir;
        if (target < 1 || target > max) return;
        if (type === 'attack' || type === 'ship_attack') {
            const isShip = (type === 'ship_attack');
            const a = getAttack(idx, isShip), b = getAttack(target, isShip);
            setAttack(idx, b, isShip); setAttack(target, a, isShip);
        } else {
            const a = getRoster(idx), b = getRoster(target);
            setRoster(idx, b); setRoster(target, a);
        }
        markDirty(); sync(); growAll();
    }
    function showRowDeletePrompt(callback) {
        let dialog = document.getElementById('row-action-modal');
        if (!dialog) {
            dialog = document.createElement('div');
            dialog.id = 'row-action-modal';
            dialog.className = 'no-print';
            dialog.innerHTML = '<div class="row-modal-backdrop"><div class="row-modal-box">' +
                '<div class="row-modal-header">CLEAR ROW // SELECT ACTION</div>' +
                '<div class="row-modal-body">How would you like to clear this entry?</div>' +
                '<div class="row-modal-btn-row">' +
                '<button type="button" class="lcars-utility-btn" id="rm-btn-shift" style="background-color: #d96b27;">Clear &amp; Shift Up</button>' +
                '<button type="button" class="lcars-utility-btn" id="rm-btn-noshift" style="background-color: #708699;">Don\'t Shift Up</button>' +
                '<button type="button" class="lcars-utility-btn" id="rm-btn-cancel" style="background-color: #2c3a4d;">Cancel</button>' +
                '</div></div></div>';
            document.body.appendChild(dialog);
            dialog.querySelector('.row-modal-backdrop').addEventListener('click', e => {
                if (e.target === e.currentTarget) clean();
            });
        }
        dialog.style.display = 'block';

        const bShift = document.getElementById('rm-btn-shift');
        const bNoShift = document.getElementById('rm-btn-noshift');
        const bCancel = document.getElementById('rm-btn-cancel');

        function clean() {
            dialog.style.display = 'none';
            bShift.onclick = null;
            bNoShift.onclick = null;
            bCancel.onclick = null;
        }

        bShift.onclick = () => { clean(); callback('shift'); };
        bNoShift.onclick = () => { clean(); callback('noshift'); };
        bCancel.onclick = () => { clean(); callback('cancel'); };
    }

    function deleteAndShiftRow(type, idx) {
        const max = type === 'attack' ? 7 : (type === 'ship_attack' ? 5 : 6);
        const isShip = (type === 'ship_attack');
        const cur = (type === 'attack' || type === 'ship_attack') ? getAttack(idx, isShip) : getRoster(idx);
        const hasData = Object.values(cur).some(v => String(v).trim() !== '');

        if (!hasData) {
            if (confirm('Shift remaining rows up to fill this empty slot?')) {
                for (let k = idx; k < max; k++) {
                    if (type === 'attack' || type === 'ship_attack') setAttack(k, getAttack(k + 1, isShip), isShip);
                    else setRoster(k, getRoster(k + 1));
                }
                if (type === 'attack' || type === 'ship_attack') setAttack(max, { type: '', qual: '', score: '' }, isShip);
                else setRoster(max, { name: '', stat: '', note: '' });
                markDirty(); sync(); growAll();
            }
            return;
        }

        showRowDeletePrompt(action => {
            if (action === 'cancel') return;
            if (action === 'shift') {
                for (let k = idx; k < max; k++) {
                    if (type === 'attack' || type === 'ship_attack') setAttack(k, getAttack(k + 1, isShip), isShip);
                    else setRoster(k, getRoster(k + 1));
                }
                if (type === 'attack' || type === 'ship_attack') setAttack(max, { type: '', qual: '', score: '' }, isShip);
                else setRoster(max, { name: '', stat: '', note: '' });
            } else if (action === 'noshift') {
                if (type === 'attack' || type === 'ship_attack') setAttack(idx, { type: '', qual: '', score: '' }, isShip);
                else setRoster(idx, { name: '', stat: '', note: '' });
            }
            markDirty(); sync(); growAll();
        });
    }
    (function initRowControls() {
        const ctlHtml = (t, i) => '<button type="button" class="row-btn-up" data-type="' + t + '" data-idx="' + i + '" title="Move Up">&#9650;</button><button type="button" class="row-btn-down" data-type="' + t + '" data-idx="' + i + '" title="Move Down">&#9660;</button><button type="button" class="row-btn-del" data-type="' + t + '" data-idx="' + i + '" title="Clear row (with optional shift)">&times;</button>';
        document.querySelectorAll('#page-2 .lcars-attack-row-capsule').forEach((r, i) => {
            const d = document.createElement('div'); d.className = 'row-quick-ctl no-print';
            d.innerHTML = ctlHtml('attack', i + 1); r.appendChild(d);
        });
        document.querySelectorAll('#page-5 .lcars-attack-row-capsule').forEach((r, i) => {
            const d = document.createElement('div'); d.className = 'row-quick-ctl no-print';
            d.innerHTML = ctlHtml('ship_attack', i + 1); r.appendChild(d);
        });
        document.querySelectorAll('#page-2 .roster-row-capsule').forEach((r, i) => {
            const d = document.createElement('div'); d.className = 'row-quick-ctl no-print';
            d.innerHTML = ctlHtml('roster', i + 1); r.appendChild(d);
        });
        ['page-2', 'page-5'].forEach(pid => {
            const p = document.getElementById(pid);
            if (p) {
                p.addEventListener('click', function(e) {
                    const b = e.target.closest('.row-btn-up, .row-btn-down, .row-btn-del');
                    if (!b) return;
                    const t = b.dataset.type, idx = Number(b.dataset.idx);
                    if (b.classList.contains('row-btn-up')) shiftRow(t, idx, -1);
                    else if (b.classList.contains('row-btn-down')) shiftRow(t, idx, 1);
                    else if (b.classList.contains('row-btn-del')) deleteAndShiftRow(t, idx);
                });
            }
        });
    })();
    // Value Challenge toggle (Play Mode only)
    form.addEventListener('click', e => {
        if (!isPlayMode) return;
        const num = e.target.closest('.val-num');
        if (!num) return;
        const row = num.closest('.val-row');
        if (row) {
            row.classList.toggle('challenged');
            markDirty();
        }
    });

    // Stat modifier dynamic coloring
    function updateModColors() {
        document.querySelectorAll('.mod-input').forEach(input => {
            const val = input.value.trim();
            input.classList.toggle('pos', val.startsWith('+'));
            input.classList.toggle('neg', val.startsWith('-'));
        });
    }
    form.addEventListener('input', e => {
        if (e.target && e.target.classList.contains('mod-input')) updateModColors();
    });

    // Play Mode & Mission Baseline logic
    let isPlayMode = false;
    let baseEquipment = null;

    function setPlayMode(active, restoring) {
        isPlayMode = active;
        document.body.classList.toggle('play-mode-active', isPlayMode);
        document.querySelectorAll('.val-num').forEach(el => {
            el.title = isPlayMode ? 'Click to Challenge/Restore this Value' : '';
        });
        const toggleBtn = document.getElementById('btn-mode-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = isPlayMode ? 'Mode: Play 🔒' : 'Mode: Edit 🔓';
            toggleBtn.style.backgroundColor = isPlayMode ? '#d96b27' : '#2c3a4d';
        }
        if (!isPlayMode) baseEquipment = null;
        if (isPlayMode && form.elements['ledger_equipment']) {
            if (!restoring || baseEquipment === null) baseEquipment = form.elements['ledger_equipment'].value;
        }
        const lockNames = [
            'bio_rank', 'bio_name', 'bio_pronouns', 'bio_species', 'bio_reputation',
            'bio_environment', 'bio_upbringing', 'bio_career_path', 'bio_career_event_1', 'bio_career_event_2',
            'bio_assignment', 'bio_traits', 'attr_control', 'attr_fitness', 'attr_daring', 'attr_insight',
            'attr_presence', 'attr_reason', 'dept_command', 'dept_conn', 'dept_engineering', 'dept_security',
            'dept_medicine', 'dept_science', 'ledger_species_ability', 'ledger_value_1', 'ledger_value_2',
            'ledger_value_3', 'ledger_value_4', 'ledger_focus_1', 'ledger_focus_2', 'ledger_focus_3',
            'ledger_focus_4', 'ledger_focus_5', 'ledger_focus_6', 'ledger_talents', 'ledger_background_notes'
        ];
        for (let i = 1; i <= 7; i++) {
            lockNames.push('attack_' + i + '_type', 'attack_' + i + '_qual', 'attack_' + i + '_score');
        }
        lockNames.push('logistics_base_cost');
        lockNames.forEach(name => {
            const el = form.elements[name];
            if (el) el.readOnly = isPlayMode;
        });
    }

    const modeBtn = document.getElementById('btn-mode-toggle');
    if (modeBtn) modeBtn.addEventListener('click', () => { setPlayMode(!isPlayMode); markDirty(); });

    const resetMissionBtn = document.getElementById('btn-reset-mission');
    if (resetMissionBtn) {
        resetMissionBtn.addEventListener('click', () => {
            if (!confirm('Reset Mission Status?\n\n• Archives Active Directives to Page 4 Logs\n• Clears Stress Track\n• Clears Stat Modifiers (±)\n• Clears Mission Requisitions & Restores Baseline Equipment')) return;

            setUndo('Reset Mission', [snapChar()]);
            const dirBox = form.elements['ledger_mission_directives'];
            const dirText = dirBox ? dirBox.value.trim() : '';
            if (dirText) {
                const sd = typeof getStardateVal === 'function' ? getStardateVal() : 'ARCHIVE';
                addBlock('p4', activeSec('p4'), 'orange', 'Mission Debrief: Stardate ' + sd);
                addBlock('p4', activeSec('p4'), 'para', '', dirText);
                dirBox.value = '';
            }

            for (let i = 1; i <= 16; i++) {
                if (form.elements['stress_' + i]) form.elements['stress_' + i].checked = false;
            }

            for (let i = 1; i <= 6; i++) {
                if (form.elements['combat_momentum_' + i]) form.elements['combat_momentum_' + i].checked = false;
            }
            if (form.elements['ext_task_magnitude']) form.elements['ext_task_magnitude'].value = '';
            for (let i = 1; i <= 15; i++) {
                if (form.elements['ext_task_work_' + i]) form.elements['ext_task_work_' + i].checked = false;
            }
            for (let i = 1; i <= 5; i++) {
                if (form.elements['ext_task_bt_' + i]) form.elements['ext_task_bt_' + i].checked = false;
            }

            document.querySelectorAll('.mod-input').forEach(m => { m.value = ''; });
            updateModColors();

            if (baseEquipment !== null && form.elements['ledger_equipment']) {
                form.elements['ledger_equipment'].value = baseEquipment;
            }

            const missionCostInput = form.elements['logistics_mission_cost'];
            if (missionCostInput) missionCostInput.value = '';
            updateTotalOpportunityCost();

            markDirty(); sync(); growAll();
        });
    }

	// Fullscreen PADD mode toggle
    const fsBtn = document.getElementById('btn-fullscreen-toggle');
    if (fsBtn) {
        fsBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
            }
        });
        document.addEventListener('fullscreenchange', () => {
            const isFs = !!document.fullscreenElement;
            fsBtn.textContent = isFs ? 'Exit PADD ✕' : 'PADD ⛶';
            setWake(isFs);
            fsBtn.style.backgroundColor = isFs ? '#d96b27' : '#708699';
        });
    }

    // Zoom: Scale sheet to fit tablet screen width
    let isFitWidth = false;
    function updateSheetZoom() {
        const pages = document.querySelectorAll('.printable-page-area');
        const paddings = document.querySelectorAll('.screen-only-view-padding');
        if (!isFitWidth) {
            pages.forEach(p => { p.style.zoom = ''; p.style.transform = ''; p.style.transformOrigin = ''; });
            paddings.forEach(w => { w.style.height = ''; });
            return;
        }
        const avail = window.innerWidth - 16;
        const scale = Math.max(0.5, avail / 768);
        const useZoom = 'zoom' in document.documentElement.style;
        pages.forEach(p => {
            if (useZoom) {
                p.style.zoom = scale;
            } else {
                p.style.transform = `scale(${scale})`;
                p.style.transformOrigin = 'top center';
                const w = p.closest('.screen-only-view-padding');
                if (w) w.style.height = ((p.offsetHeight * scale) + 40) + 'px';
            }
        });
    }
    const fitBtn = document.getElementById('btn-fit-width');
    if (fitBtn) {
        fitBtn.addEventListener('click', () => {
            isFitWidth = !isFitWidth;
            fitBtn.style.backgroundColor = isFitWidth ? '#d96b27' : '#708699';
            updateSheetZoom();
        });
        window.addEventListener('resize', () => { if (isFitWidth) updateSheetZoom(); });
    }

	// Unified LCARS popover tap/click listener for touchscreens (Play Mode only)
    document.addEventListener('click', e => {
        const trigger = e.target.closest('.help-trigger, .det-info-trigger, .injury-info-trigger');
        if (trigger && isPlayMode) {
            e.stopPropagation();
            const wrap = trigger.closest('.has-popover, .vital-box-panel-fullwidth, .stress-panel-header-row');
            if (wrap) {
                const wasOpen = wrap.classList.contains('popover-open');
                document.querySelectorAll('.popover-open').forEach(el => el.classList.remove('popover-open'));
                wrap.classList.toggle('popover-open', !wasOpen);
            }
            return;
        }
        document.querySelectorAll('.popover-open').forEach(el => el.classList.remove('popover-open'));
    });
    Object.keys(DOCS).forEach(defaultDoc);
		charSlots.init(); shipSlots.init();
		sync();
		balance(); growAll();
		window.addEventListener('load', () => { balance(); growAll(); });
		if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { balance(); growAll(); });
	}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsole);
} else {
    initConsole();
}