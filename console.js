
document.addEventListener('DOMContentLoaded', function() {
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
        while (over() && lh > 13.8) { lh -= 0.2; set(11.5, lh); }          // phase 1: tighten line spacing
        if (!over()) return;
        let lo = 6.5, hi = 11.5;                                            // phase 2: largest font that fits
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
            d.innerHTML = '<textarea class="p3-text p3-b-text" placeholder="' + DOCS[id].body + '"></textarea><div class="p3-para-ctl">' + UP + '<button type="button" class="p3-x" title="Remove this text">&times;</button>' + DN + '</div>';
        } else if (type.indexOf('cap-') === 0) {
            d.className = 'p3-block p3-cap ' + type;
            d.innerHTML = '<div class="p3-cap-label-cell"><textarea class="p3-cap-label p3-b-title" rows="1" placeholder="Label"></textarea></div><div class="p3-cap-body"><textarea class="p3-cap-text p3-b-text" placeholder="' + DOCS[id].body + '"></textarea></div><div class="p3-cap-ctl">' + UP + '<button type="button" class="p3-x" title="Remove this row">&times;</button>' + DN + '</div>';
        } else {
            const cls = type === 'tan' ? ' alt' : (type === 'orange' ? ' orng' : '');
            d.className = 'p3-block';
            d.innerHTML = '<div class="p3-heading-row' + cls + '"><div class="p3-slate"><input type="text" class="p3-b-title" placeholder="' + DOCS[id].head + '"></div><div class="p3-yellow"></div><div class="p3-orange">' + UP + DN + '<button type="button" class="p3-x" title="Remove this header bar">&times;</button></div></div>';
        }
        const t = d.querySelector('.p3-b-title'), x = d.querySelector('.p3-b-text');
        if (t) t.value = title || '';
        if (x) x.value = text || '';
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
            blocks: Array.from(page(id).querySelectorAll('.p3-block')).map(b => ({
                tab: Number(b.parentElement.dataset.tab),
                type: b.dataset.type,
                title: (b.querySelector('.p3-b-title') || {}).value || '',
                text: (b.querySelector('.p3-b-text') || {}).value || '',
                rows: b.dataset.rows || ''
            }))
        };
    }
    function restore(id, d) {
        resetDoc(id);
        const blocks = d.blocks || [];
        const n = Math.max(1, d.sections || 1, ...blocks.map(b => Number(b.tab) || 1));
        for (let i = 2; i <= n; i++) addSection(id);
        blocks.forEach(b => {
            const tb = Number(b.tab) || 1;
            if (['blue', 'tan', 'orange'].includes(b.type) && b.text) { addBlock(id, tb, b.type, b.title, ''); addBlock(id, tb, 'para', '', b.text); }
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
    const tool = (bid, fn) => document.getElementById(bid).addEventListener('click', () => { const id = currentDoc(); if (id) fn(id); });
    tool('p3-add-blue', id => addBlock(id, activeSec(id), 'blue'));
    tool('p3-add-tan', id => addBlock(id, activeSec(id), 'tan'));
    tool('p3-add-orange', id => addBlock(id, activeSec(id), 'orange'));
    tool('p3-cap-tan', id => addBlock(id, activeSec(id), 'cap-tan'));
    tool('p3-cap-orange', id => addBlock(id, activeSec(id), 'cap-orange'));
    tool('p3-cap-slate', id => addBlock(id, activeSec(id), 'cap-slate'));
    tool('p3-cap-navy', id => addBlock(id, activeSec(id), 'cap-navy'));
    tool('p3-add-para', id => addBlock(id, activeSec(id), 'para'));
    tool('p3-add-lines', id => addBlock(id, activeSec(id), 'ruled', '', '', 5));
    tool('p3-add-line', id => addBlock(id, activeSec(id), 'ruled', '', '', 1));
    tool('p3-add-sec', id => { if (!addSection(id)) alert('Maximum of ' + MAX_SECTIONS + ' sections reached.'); });
    tool('p3-del-sec', removeLastSection);
    form.addEventListener('click', function(e) {
        if (e.target.classList.contains('p3-mv')) moveBlock(e.target.closest('.p3-block'), Number(e.target.dataset.dir));
        if (e.target.classList.contains('p3-x')) {
            const b = e.target.closest('.p3-block');
            const filled = Array.from(b.querySelectorAll('.p3-b-title, .p3-b-text')).some(x => x.value.trim());
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
        const isDoc = dp.classList.contains('doc-page');
        document.getElementById('p3-tools').style.display = isDoc ? 'flex' : 'none';
        if (isDoc) document.getElementById('p3-add-sec').textContent = DOCS[dp.dataset.doc].addLabel;
        if (n === '1') balance();
        growAll();
    }
    document.querySelectorAll('.btn-tab[data-page]').forEach(b => b.addEventListener('click', () => showPage(b.dataset.page)));

    // Portrait upload (Page 1) mirrors to all other pages
    document.getElementById('portrait-uploader').addEventListener('change', function(e) {
        if (!e.target.files[0]) return;
        const r = new FileReader();
        r.onload = ev => { setPortrait(ev.target.result); markDirty(); };
        r.readAsDataURL(e.target.files[0]);
    });

    // Save: one JSON bundle for all four pages
    const KEY = 'sta2e-autosave', UNS = 'sta2e-unsaved';
    let unsaved = false, autoTimer;
    try { unsaved = localStorage.getItem(UNS) === '1'; } catch (e) {}
    function setUnsaved(v) { unsaved = v; try { localStorage.setItem(UNS, v ? '1' : '0'); } catch (e) {} }
    function buildData(withPortrait) {
        const data = { _bundle: 'sta2e-unified-v3' };
        form.querySelectorAll('input[type="text"], textarea').forEach(el => { if (el.name) data[el.name] = el.value; });
        form.querySelectorAll('input[type="checkbox"]').forEach(el => { if (el.name) data[el.name] = el.checked; });
        data.docs = { p3: collect('p3'), p4: collect('p4') };
        const pi = document.getElementById('portrait-img');
        if (withPortrait !== false && pi && pi.src && pi.style.display === 'block') data['cached_portrait_data'] = pi.src;
        return data;
    }
    function autosave() {
        try { localStorage.setItem(KEY, JSON.stringify(buildData())); }
        catch (e) { try { localStorage.setItem(KEY, JSON.stringify(buildData(false))); } catch (e2) {} }
    }
    function markDirty() { setUnsaved(true); clearTimeout(autoTimer); autoTimer = setTimeout(autosave, 500); }
    function saveFile(prefix) {
        const blob = new Blob([JSON.stringify(buildData(), null, 2)], { type: 'application/json' });
        let name = fileId.value.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '_');
        if (!name) name = 'unnamed_personnel';
        const a = document.createElement('a');
        a.download = (prefix || '') + name + '_' + new Date().toLocaleDateString('en-CA') + '.json';
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
    }
    document.getElementById('utility-btn-save').addEventListener('click', function() { saveFile(''); setUnsaved(false); });
    const onEdit = e => { if (e.target.id !== 'utility-file-loader') markDirty(); };
    form.addEventListener('input', onEdit);
    form.addEventListener('change', onEdit);
    form.addEventListener('click', e => { if (e.target.closest('.p3-mv, .p3-x, #p3-tools button')) markDirty(); });
    window.addEventListener('beforeunload', e => { if (unsaved) { e.preventDefault(); e.returnValue = ''; } });

    // Load
    function applyData(d) {
        if (d.ledger_mission_directives === undefined && (d.ledger_mission_profile || d.ledger_active_directives)) d.ledger_mission_directives = [d.ledger_mission_profile, d.ledger_active_directives].filter(Boolean).join('\n');
        if (d.ledger_focuses && d.ledger_focus_1 === undefined) {
            const f = String(d.ledger_focuses).split(/\r?\n/).filter(x => x.trim());
            for (let i = 0; i < 6; i++) d['ledger_focus_' + (i + 1)] = i < 5 ? (f[i] || '') : f.slice(5).join('; ');
        }
        if (d.ledger_values && d.ledger_value_1 === undefined) String(d.ledger_values).split(/\r?\n/).slice(0, 4).forEach((t, i) => { d['ledger_value_' + (i + 1)] = t; });
        form.querySelectorAll('input[type="text"], textarea').forEach(el => { if (el.name && d[el.name] !== undefined) el.value = d[el.name]; });
        form.querySelectorAll('input[type="checkbox"]').forEach(el => { if (el.name && d[el.name] !== undefined) el.checked = d[el.name]; });
        follows.forEach(t => { if (d[t.name] !== undefined) t.dataset.touched = d[t.name] ? '1' : ''; });
        if (d.docs) Object.keys(DOCS).forEach(id => { if (d.docs[id]) restore(id, d.docs[id]); });
        else if (Array.isArray(d.p3_blocks)) restore('p3', { blocks: d.p3_blocks });
        if (d['cached_portrait_data']) setPortrait(d['cached_portrait_data']);
        sync(); growAll();
    }
    const loader = document.getElementById('utility-file-loader');
    document.getElementById('utility-btn-load').addEventListener('click', () => loader.click());
    loader.addEventListener('change', function(e) {
        const f = e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = function(ev) {
            try { applyData(JSON.parse(ev.target.result)); setUnsaved(false); autosave(); }
            catch (err) { alert('Terminal Error: Incompatible file format or data string corrupted.'); }
        };
        r.readAsText(f);
        loader.value = '';
    });

    // Clear
    document.getElementById('utility-btn-clear').addEventListener('click', function() {
        if (!confirm('Clear this station? A backup file will be downloaded first.')) return;
        saveFile('backup_');
        form.reset();
        follows.forEach(t => { t.dataset.touched = ''; });
        setPortrait('');
        fileId.value = DEFAULT_ID;
        Object.keys(DOCS).forEach(defaultDoc);
        try { localStorage.removeItem(KEY); } catch (e) {}
        setUnsaved(false);
        sync();
    });

    // Species Ability picker (list comes from species_abilities.js)
    const picker = document.getElementById('species-ability-picker');
    const list = Array.isArray(window.STA_SPECIES_ABILITIES) ? window.STA_SPECIES_ABILITIES : [];
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
        if (box.value.trim() && !confirm('Replace the current Species Ability text?')) { picker.value = ''; return; }
        box.value = e.name + (e.text ? ': ' + e.text : '');
        picker.value = '';
        growAll();
    });

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
            box.value = (box.value.trim() ? box.value.replace(/\s+$/, '') + '\n' : '') + lineOf(item);
            sel.value = '';
            growAll();
            if (after) { after(item); growAll(); }
        });
    }
    makeAppender('talent-picker', 'ledger_talents', window.STA_TALENTS, 'Add a talent...', e => e.category || 'Other', e => e.talent, e => e.talent + (e.text ? ': ' + e.text : ''));
    (function talentFilters() {
        const sel = document.getElementById('talent-picker'), q = document.getElementById('talent-search'), cat = document.getElementById('talent-cat');
        const items = Array.isArray(window.STA_TALENTS) ? window.STA_TALENTS : [];
        if (!sel || !items.length) return;
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
    makeAppender('equipment-picker', 'ledger_equipment', window.STA_EQUIPMENT, 'Add equipment...', e => e.type || 'Other', e => e.name, e => {
        const p = [e.type];
        if (e.severity && e.severity !== '0') p.push('Severity ' + e.severity);
        return e.name + ' (' + p.filter(Boolean).join(', ') + ')' + (e.qualities ? ': ' + e.qualities : '');
    }, e => {
        if (!/^Weapon/i.test(e.type || '')) return;
        for (let n = 1; n <= 5; n++) {
            const t = form.elements['attack_' + n + '_type'], q = form.elements['attack_' + n + '_qual'], sc = form.elements['attack_' + n + '_score'];
            if (t && !t.value.trim() && !q.value.trim() && !sc.value.trim()) { t.value = e.name; q.value = e.qualities || ''; sc.value = e.severity || ''; return; }
        }
        alert('All 5 attack rows are already in use.');
    });

    Object.keys(DOCS).forEach(defaultDoc);
    try { const saved = localStorage.getItem(KEY); if (saved) applyData(JSON.parse(saved)); } catch (e) {}
    sync();
    balance(); growAll();
    window.addEventListener('load', () => { balance(); growAll(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { balance(); growAll(); });
});
