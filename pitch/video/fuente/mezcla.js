// Mezcla de audio de Brai: voz + música + sonidos, todo generado aquí (sin archivos de terceros).
// La usan herramientas/mezclar.html y el script con que se generaron los .wav.
// Entrada: OM_SCENES (duraciones), el plan (subtítulos, momentos y sonidos) y una función que carga cada voz.
(function () {
  var TAU = Math.PI * 2;
  var TAB = new Float32Array(8192);
  for (var i = 0; i < 8192; i++) TAB[i] = Math.sin(TAU * i / 8192);
  function sn(ph) { var x = ph - Math.floor(ph); return TAB[(x * 8192) | 0]; } // ph en ciclos

  function rng(seed) { var s = seed >>> 0 || 1; return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return (s / 4294967296) * 2 - 1; }; }

  function escenas(raw) {
    var s = typeof raw === 'string' ? JSON.parse(raw) : raw, t = 0, m = {}, orden = [];
    s.forEach(function (e) { m[e.name] = { inicio: t, dur: e.dur }; orden.push(e.name); t += e.dur; });
    return { m: m, orden: orden, total: Math.round(t * 1000) / 1000 };
  }

  function pega(dst, sr, t0, src, g) { var i0 = Math.round(t0 * sr); for (var i = 0; i < src.length; i++) { var k = i0 + i; if (k >= 0 && k < dst.length) dst[k] += src[i] * (g == null ? 1 : g); } }
  function hazlo(sr, len, fn) { var n = Math.round(len * sr), a = new Float32Array(n); for (var i = 0; i < n; i++) a[i] = fn(i / sr, i); return a; }
  function ataque(t, a) { return Math.min(1, t / a); }

  // Sonidos cortos, sintetizados
  var SFX = {
    vibracion: function (sr) {
      return hazlo(sr, 0.36, function (t) {
        var on = (t < 0.13) ? 1 : (t > 0.19 && t < 0.32) ? 1 : 0;
        var tt = t < 0.16 ? t : t - 0.19;
        var env = on * Math.min(1, tt / 0.006) * Math.min(1, Math.max(0, (0.13 - tt)) / 0.012);
        return Math.tanh(2.4 * sn(165 * t)) * (0.72 + 0.28 * sn(31 * t)) * env * 0.2;
      });
    },
    golpeGrave: function (sr) {
      return hazlo(sr, 1.5, function (t) {
        var ph = 44 * t + 52 * (1 - Math.exp(-7 * t)) / 7;
        return (sn(ph) + 0.22 * sn(2 * ph)) * Math.exp(-t * 3.0) * ataque(t, 0.004) * 0.55;
      });
    },
    golpeSuave: function (sr) {
      return hazlo(sr, 0.7, function (t) {
        var ph = 82 * t + 64 * (1 - Math.exp(-12 * t)) / 12;
        return (sn(ph) + 0.15 * sn(2 * ph)) * Math.exp(-t * 7.5) * ataque(t, 0.003) * 0.36;
      });
    },
    brillo: function (sr) {
      var notas = [[1174.66, 0], [1760, 0.085], [2349.32, 0.17]];
      return hazlo(sr, 2.8, function (t) {
        var s = 0;
        notas.forEach(function (n, j) {
          var tt = t - n[1]; if (tt < 0) return;
          var e = ataque(tt, 0.003);
          s += (sn(n[0] * tt) * Math.exp(-tt * 2.0) + 0.3 * sn(n[0] * 2.01 * tt) * Math.exp(-tt * 3.6) + 0.1 * sn(n[0] * 3 * tt) * Math.exp(-tt * 5)) * e * (j === 2 ? 0.55 : 1);
        });
        return s * 0.085;
      });
    },
    campanita: function (sr) { return SFX._campana(sr, 0.15); },
    campanitaSuave: function (sr) { return SFX._campana(sr, 0.075); },
    _campana: function (sr, g) {
      var f = 1567.98;
      return hazlo(sr, 2.6, function (t) {
        var e = ataque(t, 0.002);
        return (sn(f * t) * Math.exp(-t * 2.1) + 0.38 * sn(f * 2.76 * t) * Math.exp(-t * 4.2) + 0.14 * sn(f * 5.4 * t) * Math.exp(-t * 8)) * e * g;
      });
    },
    clic: function (sr) {
      var r = rng(7), prev = 0;
      return hazlo(sr, 0.06, function (t) {
        var n = r(), hp = n - prev; prev = n;
        return hp * Math.exp(-t * 380) * 0.16 + sn(1900 * t) * Math.exp(-t * 110) * 0.1;
      });
    },
    tic: function (sr) { return hazlo(sr, 0.05, function (t) { return sn(2300 * t) * Math.exp(-t * 85) * ataque(t, 0.001) * 0.1; }); },
    enfoque: function (sr) {
      return hazlo(sr, 0.16, function (t) {
        var s = 0;
        [[0, 2600], [0.09, 3100]].forEach(function (b) { var tt = t - b[0]; if (tt >= 0 && tt < 0.045) s += sn(b[1] * tt) * Math.sin(Math.PI * tt / 0.045); });
        return s * 0.065;
      });
    },
    desliza: function (sr) {
      var r = rng(11), y = 0, len = 0.55;
      return hazlo(sr, len, function (t) {
        var p = t / len, a = 0.015 + 0.12 * Math.sin(Math.PI * p);
        y += a * (r() - y);
        return y * Math.pow(Math.sin(Math.PI * p), 2) * 0.9;
      });
    },
    subida: function (sr, len) {
      len = len || 2; var ph = 0;
      return hazlo(sr, len, function (t) {
        var p = t / len, f = 300 * Math.pow(2, p * 0.9); ph += f / sr;
        return (sn(ph) + 0.3 * sn(ph * 2)) * Math.pow(Math.sin(Math.PI * p), 1.5) * 0.045;
      });
    },
    contador: function (sr, len) {
      len = len || 1.5; var a = new Float32Array(Math.round((len + 0.1) * sr)), tic = null;
      for (var k = 1; k <= 12; k++) {
        var at = (1 - Math.pow(1 - k / 12, 0.25)) * len, f = 1800 + 45 * k;
        var s = hazlo(sr, 0.04, function (t) { return sn(f * t) * Math.exp(-t * 95) * 0.065; });
        pega(a, sr, at, s);
      }
      return a;
    }
  };

  // Música: pad tranquilo en Re, con bajo y notas sueltas tipo piano
  var ACORDES = [
    { b: 73.42, p: [220, 277.18, 329.63, 369.99] },
    { b: 61.74, p: [185, 220, 277.18, 293.66] },
    { b: 98.0, p: [220, 246.94, 293.66, 369.99] },
    { b: 110.0, p: [220, 246.94, 277.18, 329.63] }
  ];
  var PATRON = [0, 2, -1, 1, 3, -1, 2, 0, -1, 3, 1, -1];
  function musica(sr, total) {
    var n = Math.round(total * sr), out = new Float32Array(n), L = 6, X = 2.5;
    var segs = Math.ceil(total / L) + 1;
    for (var s = 0; s < segs; s++) {
      var ac = ACORDES[s % 4], t0 = s * L - X / 2, t1 = t0 + L + X;
      var i0 = Math.max(0, Math.round(t0 * sr)), i1 = Math.min(n, Math.round(t1 * sr));
      for (var i = i0; i < i1; i++) {
        var t = i / sr, lt = t - t0, len = t1 - t0;
        var env = lt < X ? 0.5 - 0.5 * Math.cos(Math.PI * lt / X) : lt > len - X ? 0.5 - 0.5 * Math.cos(Math.PI * (len - lt) / X) : 1;
        var v = 0;
        for (var j = 0; j < 4; j++) { var f = ac.p[j]; v += sn(f * t) + 0.55 * sn(f * 1.0035 * t + 0.3 * j) + 0.14 * sn(2 * f * t); }
        v = v * 0.045 + (sn(ac.b * t) + 0.25 * sn(2 * ac.b * t)) * 0.08;
        out[i] += v * env * (0.86 + 0.14 * sn(0.07 * t));
      }
    }
    // notas sueltas
    var paso = 1.5, k = 0;
    for (var tn = 0.75; tn < total - 1; tn += paso, k++) {
      var idx = PATRON[k % PATRON.length]; if (idx < 0) continue;
      var a2 = ACORDES[Math.floor((tn + X / 2) / L) % 4], f2 = a2.p[idx] * 2;
      var nota = hazlo(sr, 3, function (t) { return (sn(f2 * t) * Math.exp(-t * 1.5) + 0.22 * sn(2 * f2 * t) * Math.exp(-t * 3.2) + 0.06 * sn(3 * f2 * t) * Math.exp(-t * 5)) * ataque(t, 0.008) * 0.05; });
      pega(out, sr, tn, nota);
    }
    return out;
  }

  function rms(a, i0, i1) { var s = 0, c = 0; for (var i = i0 || 0; i < (i1 || a.length); i++) { s += a[i] * a[i]; c++; } return Math.sqrt(s / Math.max(1, c)); }

  async function mezclar(op) {
    var sr = op.sr || 44100, E = escenas(op.scenes), plan = op.plan, vi = plan.voz_inicio || 0.6;
    var n = Math.round(E.total * sr);
    var voz = new Float32Array(n), sfx = new Float32Array(n), faltan = [];
    for (var q = 0; q < E.orden.length; q++) {
      var id = E.orden[q], es = plan.escenas[id], ini = E.m[id].inicio;
      if (!es) continue;
      if (es.voz) {
        var datos = await op.cargar(plan.carpeta + es.voz);
        if (datos) pega(voz, sr, ini + vi, datos); else faltan.push(es.voz);
      }
      (es.sfx || []).forEach(function (x) {
        var at = typeof x[1] === 'number' ? x[1] : es.b[x[1]];
        if (at == null || !SFX[x[0]]) return;
        pega(sfx, sr, ini + at, SFX[x[0]](sr, x[2]));
      });
    }
    // envolvente de la voz para bajar la música cuando hablan
    var envV = new Float32Array(n), e = 0, aA = 1 - Math.exp(-1 / (0.05 * sr)), aR = 1 - Math.exp(-1 / (0.5 * sr));
    for (var i = 0; i < n; i++) { var x = Math.abs(voz[i]); e += (x > e ? aA : aR) * (x - e); envV[i] = e; }
    var vozRms = 0, cnt = 0; for (i = 0; i < n; i += 64) if (envV[i] > 0.02) { vozRms += voz[i] * voz[i]; cnt++; }
    vozRms = Math.sqrt(vozRms / Math.max(1, cnt)) || 0.1;

    var mus = musica(sr, E.total), mRms = rms(mus) || 1, mObj = vozRms * 0.2;
    var mus0 = E.m[plan.musica.entra].inicio, fin = plan.musica.fundido_entrada || 2;
    var sube = E.m[plan.musica.sube_en].inicio, total = E.total;
    var out = new Float32Array(n), dk = 1;
    for (i = 0; i < n; i++) {
      var t = i / sr, g = 0;
      if (t >= mus0) g = Math.min(1, (t - mus0) / fin);
      if (t < mus0 + fin + 2.5 && t >= mus0) g *= 1 + 0.35 * Math.max(0, 1 - Math.max(0, t - mus0 - fin) / 2.5); // entra y baja
      if (t > sube + 0.6) g *= 1 + 0.7 * Math.min(1, (t - sube - 0.6) / 1.2); // sube al final
      if (t > total - 2.4) g *= Math.max(0, (total - t) / 2.4); // y se apaga
      var duck = 1 - 0.5 * Math.min(1, envV[i] / 0.05);
      dk += (duck - dk) * (duck < dk ? 0.0009 : 0.00012);
      var v = voz[i] + sfx[i] * (vozRms / 0.1) * 0.9 + mus[i] * (mObj / mRms) * g * dk;
      var a = Math.abs(v); if (a > 0.85) v = Math.sign(v) * (0.85 + 0.14 * Math.tanh((a - 0.85) / 0.14));
      out[i] = v;
    }
    var pico = 0; for (i = 0; i < n; i++) pico = Math.max(pico, Math.abs(out[i]));
    if (pico > 0) { var gN = 0.89 / pico; for (i = 0; i < n; i++) out[i] *= gN; } // pico a -1 dBFS
    return { datos: out, sr: sr, total: E.total, faltan: faltan, vozRms: vozRms };
  }

  function wav(datos, sr) {
    var n = datos.length, buf = new ArrayBuffer(44 + n * 2), d = new DataView(buf);
    function str(o, s) { for (var i = 0; i < s.length; i++) d.setUint8(o + i, s.charCodeAt(i)); }
    str(0, 'RIFF'); d.setUint32(4, 36 + n * 2, true); str(8, 'WAVE'); str(12, 'fmt ');
    d.setUint32(16, 16, true); d.setUint16(20, 1, true); d.setUint16(22, 1, true);
    d.setUint32(24, sr, true); d.setUint32(28, sr * 2, true); d.setUint16(32, 2, true); d.setUint16(34, 16, true);
    str(36, 'data'); d.setUint32(40, n * 2, true);
    for (var i = 0; i < n; i++) { var v = Math.max(-1, Math.min(1, datos[i])); d.setInt16(44 + i * 2, v < 0 ? v * 32768 : v * 32767, true); }
    return buf;
  }

  var raiz = typeof window !== 'undefined' ? window : globalThis;
  raiz.BraiMezcla = { mezclar: mezclar, wav: wav, escenas: escenas, SFX: SFX };
})();
