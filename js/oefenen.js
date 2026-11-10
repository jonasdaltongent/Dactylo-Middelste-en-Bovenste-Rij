/* Dactylo · 4ORLO — oefenpagina. De oefeningen staan in js/oefeningen.js. */
(function () {
  'use strict';

  var CFG = window.OEFENEN;
  var OEF = CFG.oefeningen;

  var RIJEN = [
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm'],
    ['w', 'x', 'c', 'v', 'b', 'n']
  ];
  var VINGER = {
    a: 'lp', q: 'lp', w: 'lp', z: 'lr', s: 'lr', x: 'lr', e: 'lm', d: 'lm', c: 'lm',
    r: 'lw', t: 'lw', f: 'lw', g: 'lw', v: 'lw', b: 'lw',
    y: 'rw', u: 'rw', h: 'rw', j: 'rw', n: 'rw', i: 'rm', k: 'rm', o: 'rr', l: 'rr', p: 'rp', m: 'rp',
    ' ': 'duim'
  };
  var VINGERNAAM = {
    lp: 'linkerpink', lr: 'linker ringvinger', lm: 'linker middelvinger', lw: 'linker wijsvinger',
    rw: 'rechter wijsvinger', rm: 'rechter middelvinger', rr: 'rechter ringvinger', rp: 'rechterpink',
    duim: 'duim'
  };
  var ANKER = { f: true, j: true };

  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function el(tag, cls, tekst) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (tekst !== undefined) e.textContent = tekst;
    return e;
  }
  function toon(e, ja) { if (e) e.hidden = !ja; }
  function komma(x, dec) { return Number(x).toFixed(dec).replace('.', ','); }
  function puntVoor(w, drempels) {
    for (var i = 0; i < drempels.length; i++) if (w >= drempels[i][0]) return drempels[i][1];
    return 0;
  }

  // ---------- beste resultaat per oefening (alleen in deze browser) ----------
  var beste = {};
  try { beste = JSON.parse(localStorage.getItem(CFG.opslag) || '{}') || {}; } catch (e) { beste = {}; }
  function bewaarBeste(i, res) {
    var b = beste[i];
    if (b && (b.wpm > res.wpm || (b.wpm === res.wpm && b.acc >= res.acc))) return;
    beste[i] = { wpm: Math.round(res.wpm * 10) / 10, acc: Math.floor(res.acc) };
    try { localStorage.setItem(CFG.opslag, JSON.stringify(beste)); } catch (e) { /* privévenster */ }
  }
  function besteTekst(i) {
    var b = beste[i];
    return b ? 'beste: ' + komma(b.wpm, 1) + ' w/min · ' + b.acc + ' %' : '';
  }

  // ---------- de lijst bovenaan ----------
  var huidig = 0;
  try { huidig = Math.min(OEF.length - 1, Math.max(0, parseInt(sessionStorage.getItem(CFG.opslag + '_nu'), 10) || 0)); } catch (e) { huidig = 0; }

  function tekenLijst() {
    var box = $('#oef-lijst');
    box.innerHTML = '';
    OEF.forEach(function (o, i) {
      var b = el('button', 'oef-knop' + (o.test ? ' oef-test' : '') + (i === huidig ? ' actief' : ''));
      b.type = 'button';
      if (i === huidig) b.setAttribute('aria-current', 'step');
      b.appendChild(el('span', 'oef-nr', String(i + 1)));
      var t = el('span', 'oef-tekst');
      t.appendChild(el('span', 'oef-naam', o.titel));
      t.appendChild(el('span', 'oef-beste', besteTekst(i)));
      b.appendChild(t);
      b.addEventListener('click', function () { kies(i); this.blur(); });
      box.appendChild(b);
    });
  }

  // ---------- het toetsenbord ----------
  function tekenToetsenbord(o) {
    var box = $('#toetsenbord');
    box.innerHTML = '';
    RIJEN.forEach(function (rij, ri) {
      var r = el('div', 'kb-rij kb-rij-' + ri);
      rij.forEach(function (c) {
        var k = el('span', 'kb-toets v-' + VINGER[c], c);
        k.setAttribute('data-toets', c);
        if (o.toetsen.indexOf(c) < 0 && !ANKER[c]) k.classList.add('kb-uit');
        if (ANKER[c]) k.classList.add('kb-streep');
        r.appendChild(k);
      });
      box.appendChild(r);
    });
    var sp = el('div', 'kb-rij kb-rij-3');
    var spatie = el('span', 'kb-toets kb-spatie v-duim', 'spatie');
    spatie.setAttribute('data-toets', ' ');
    sp.appendChild(spatie);
    box.appendChild(sp);
  }
  function markeerToets(c) {
    $$('.kb-toets.kb-nu').forEach(function (k) { k.classList.remove('kb-nu'); });
    var v = $('#volgende');
    v.innerHTML = '';
    if (c === undefined) return;
    var k = document.querySelector('.kb-toets[data-toets="' + c + '"]');
    if (k) k.classList.add('kb-nu');
    v.appendChild(document.createTextNode('Volgende toets: '));
    v.appendChild(el('strong', '', c === ' ' ? 'spatie' : c));
    v.appendChild(document.createTextNode(' · ' + VINGERNAAM[VINGER[c]]));
  }

  // ---------- typen ----------
  var st = {};
  var tekens = [];
  var toetsenbordAan = true;

  function kies(i) {
    huidig = i;
    try { sessionStorage.setItem(CFG.opslag + '_nu', String(i)); } catch (e) { /* geen opslag */ }
    start();
  }

  function start() {
    clearInterval(st.timer);
    var o = OEF[huidig];
    st = {
      o: o, tekst: o.tekst.replace(/\s+/g, ' ').trim(), gestart: false, klaar: false,
      pos: 0, juist: 0, fout: 0, foutPerToets: {}, begin: 0, timer: null
    };
    tekenLijst();
    $('#oef-kicker').textContent = o.test ? 'Oefening ' + (huidig + 1) + ' · zo ziet de test eruit' : 'Oefening ' + (huidig + 1) + ' van ' + OEF.length;
    $('#oef-titel').textContent = o.titel;
    $('#oef-uitleg').textContent = o.uitleg;
    $('#klok-label').textContent = o.duur ? 'seconden over' : 'seconden';
    zetKlok(o.duur || 0, 0);
    toon($('#waarschuw-caps'), false);
    toon($('#uitslag'), false);
    toon($('#toetsenbord-blok'), toetsenbordAan);
    tekenToetsenbord(o);
    bouwTekst(st.tekst);
    var laatste = huidig === OEF.length - 1;
    $('#knop-volgende').hidden = laatste;
    markeerHuidig();
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  function bouwTekst(tekst) {
    var box = $('#tekst');
    box.innerHTML = '';
    box.scrollTop = 0;
    tekens = [];
    var woorden = tekst.split(' ');
    woorden.forEach(function (w, wi) {
      var ws = el('span', 'woord');
      for (var i = 0; i < w.length; i++) {
        var s = el('span', 'teken', w[i]);
        ws.appendChild(s);
        tekens.push(s);
      }
      box.appendChild(ws);
      if (wi < woorden.length - 1) {
        var sp = el('span', 'teken spatie', ' ');
        box.appendChild(sp);
        tekens.push(sp);
      }
    });
  }

  function markeerHuidig() {
    tekens.forEach(function (s) { s.classList.remove('nu'); });
    var s = tekens[st.pos];
    if (!s) { markeerToets(undefined); return; }
    s.classList.add('nu');
    markeerToets(st.tekst[st.pos]);
    var box = $('#tekst');
    var regel = parseFloat(getComputedStyle(box).lineHeight) || 48;
    box.scrollTop = Math.max(0, s.offsetTop - regel);
  }

  function zetKlok(sec, fractie) {
    $('#klok-tijd').textContent = st.o && st.o.duur ? Math.ceil(sec) : Math.floor(sec);
    $('#klok-balk').style.width = (Math.min(1, fractie) * 100) + '%';
  }

  function startKlok() {
    st.gestart = true;
    st.begin = performance.now();
    st.timer = setInterval(function () {
      var verstreken = (performance.now() - st.begin) / 1000;
      if (st.o.duur) {
        zetKlok(Math.max(0, st.o.duur - verstreken), verstreken / st.o.duur);
        if (verstreken >= st.o.duur) einde();
      } else {
        zetKlok(verstreken, st.pos / st.tekst.length);
      }
    }, 100);
  }

  function controleerIndeling(e) {
    if (!e.code) return;
    var k = e.key.toLowerCase();
    var qwerty = (e.code === 'KeyQ' && k === 'q') || (e.code === 'KeyA' && k === 'a') ||
                 (e.code === 'KeyW' && k === 'w') || (e.code === 'KeyZ' && k === 'z');
    var azerty = (e.code === 'KeyA' && k === 'q') || (e.code === 'KeyQ' && k === 'a') ||
                 (e.code === 'Semicolon' && k === 'm');
    if (qwerty) toon($('#waarschuw-qwerty'), true);
    if (azerty) toon($('#waarschuw-qwerty'), false);
  }

  function opToets(e) {
    if (st.klaar || !st.o) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;
    var doel = e.target;
    if (doel && (doel.tagName === 'INPUT' || doel.tagName === 'TEXTAREA')) return;
    e.preventDefault();
    var caps = e.getModifierState && e.getModifierState('CapsLock');
    toon($('#waarschuw-caps'), !!caps);
    if (caps) return;
    controleerIndeling(e);
    if (!st.gestart) startKlok();
    var verwacht = st.tekst[st.pos];
    var s = tekens[st.pos];
    if (e.key === verwacht) {
      s.classList.remove('fout');
      s.classList.add('ok');
      st.juist++;
      st.pos++;
      if (st.pos >= st.tekst.length) { einde(); return; }
      markeerHuidig();
    } else {
      st.fout++;
      st.foutPerToets[verwacht] = (st.foutPerToets[verwacht] || 0) + 1;
      s.classList.remove('fout');
      void s.offsetWidth;
      s.classList.add('fout');
    }
  }

  function statKaart(titel, waarde, onder, extra) {
    var k = el('div', 'stat');
    k.appendChild(el('p', 'stat-titel', titel));
    k.appendChild(el('p', 'stat-waarde', waarde));
    k.appendChild(el('p', 'stat-onder', onder));
    if (extra) k.appendChild(el('p', 'stat-punten', extra));
    return k;
  }

  function einde() {
    if (st.klaar) return;
    st.klaar = true;
    clearInterval(st.timer);
    var o = st.o;
    var duur = (performance.now() - st.begin) / 1000;
    if (o.duur) duur = Math.min(o.duur, duur);
    var aanslagen = st.juist + st.fout;
    var res = {
      wpm: duur > 0 ? (st.juist / 5) / (duur / 60) : 0,
      acc: aanslagen ? st.juist / aanslagen * 100 : 0
    };
    zetKlok(o.duur ? 0 : duur, 1);
    markeerToets(undefined);
    tekens.forEach(function (s) { s.classList.remove('nu'); });
    bewaarBeste(huidig, res);
    tekenLijst();

    var stats = $('#stats');
    stats.innerHTML = '';
    var test = OEF[OEF.length - 1];
    if (o.test) {
      var ps = puntVoor(res.wpm, o.snelheid);
      var pn = puntVoor(Math.floor(res.acc), o.nauwkeurigheid);
      stats.appendChild(statKaart('Snelheid', komma(res.wpm, 1), 'woorden per minuut',
        ps + ' / 4 punten · alle punten vanaf ' + o.snelheid[0][0]));
      stats.appendChild(statKaart('Nauwkeurigheid', Math.floor(res.acc) + ' %', st.juist + ' juist · ' + st.fout + ' fout',
        pn + ' / 4 punten · alle punten vanaf ' + o.nauwkeurigheid[0][0] + ' %'));
      stats.appendChild(statKaart('Samen', (ps + pn) + ' / 8', 'snelheid en nauwkeurigheid',
        st.pos >= st.tekst.length ? 'Tekst af in ' + Math.round(duur) + ' seconden' : 'Na ' + o.duur + ' seconden'));
    } else {
      stats.appendChild(statKaart('Snelheid', komma(res.wpm, 1), 'woorden per minuut',
        'Bij de test: alle punten vanaf ' + test.snelheid[0][0]));
      stats.appendChild(statKaart('Nauwkeurigheid', Math.floor(res.acc) + ' %', st.juist + ' juist · ' + st.fout + ' fout',
        'Bij de test: alle punten vanaf ' + test.nauwkeurigheid[0][0] + ' %'));
      stats.appendChild(statKaart('Tijd', Math.round(duur) + ' s', 'voor de hele tekst'));
    }

    var fouten = Object.keys(st.foutPerToets).map(function (k) { return [k, st.foutPerToets[k]]; })
      .sort(function (a, b) { return b[1] - a[1]; }).slice(0, 3);
    $('#probleemtoetsen').textContent = fouten.length
      ? 'Meeste fouten bij: ' + fouten.map(function (f) { return (f[0] === ' ' ? 'spatie' : f[0]) + ' (' + f[1] + '×, ' + VINGERNAAM[VINGER[f[0]]] + ')'; }).join(' · ')
      : 'Geen enkele fout. Knap!';

    var tech = $('#techniek');
    toon(tech, !!o.test);
    if (o.test) {
      var ul = $('#techniek-lijst');
      ul.innerHTML = '';
      o.techniek.forEach(function (v) { ul.appendChild(el('li', '', v)); });
    }
    toon($('#toetsenbord-blok'), false);
    toon($('#uitslag'), true);
  }

  // ---------- knoppen ----------
  $('#knop-opnieuw').addEventListener('click', function () { start(); });
  $('#knop-volgende').addEventListener('click', function () { if (huidig < OEF.length - 1) kies(huidig + 1); });
  $('#toon-toetsenbord').addEventListener('change', function () {
    toetsenbordAan = this.checked;
    if (!st.klaar) toon($('#toetsenbord-blok'), toetsenbordAan);
    this.blur();
  });
  document.addEventListener('keydown', function (e) {
    // spatie of Enter op een gefocuste knop mag de oefening niet storen
    if (document.activeElement && document.activeElement !== document.body && e.key === ' ') {
      document.activeElement.blur();
    }
    opToets(e);
  });

  start();
})();
