(function(){
  "use strict";
  var D = window.DADOS;
  var br = function(v, d){ if (v === null || v === undefined || !isFinite(v)) return "—"; return v.toFixed(d === undefined ? 1 : d).replace(".", ","); };
  var $ = function(s){ return document.querySelector(s); };
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, txt){ var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (txt !== undefined) e.textContent = txt; return e; }
  function cssVar(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }

  /* Gráfico de linhas em SVG. series: [{nome, valores, cor, tracejado}] ; valores null = lacuna.
     A série contínua recebe o valor em todos os pontos. fmtEixo (opcional) formata o eixo. */
  function linhas(alvo, rotulos, series, min, max, fmt, fmtEixo){
    alvo.innerHTML = "";
    var eixo = fmtEixo || fmt;
    var leg = document.createElement("div"); leg.className = "leg";
    series.forEach(function(s){ var sp = document.createElement("span"); var i = document.createElement("i"); if (s.tracejado) i.className = "tr"; else i.style.background = s.cor; sp.appendChild(i); sp.appendChild(document.createTextNode(s.nome)); leg.appendChild(sp); });
    alvo.appendChild(leg);
    var W = Math.max(300, Math.min(700, alvo.clientWidth || 560));
    var H = Math.round(Math.max(228, Math.min(290, W * 0.62)));
    var L = 42, R = 16, T = 28, B = 34;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": series.map(function(s){return s.nome;}).join(" e ") });
    var n = rotulos.length, x = function(i){ return L + (n === 1 ? 0 : i * (W - L - R) / (n - 1)); }, y = function(v){ return T + (max - v) * (H - T - B) / (max - min); };
    var tx2 = cssVar("--texto2"), bd = cssVar("--borda"), papel = cssVar("--papel") || "#fff";
    var passo = (max - min) / 4;
    for (var k = 0; k <= 4; k++){ var gv = min + k * passo; svg.appendChild(el("line", { x1: L, x2: W - R, y1: y(gv), y2: y(gv), stroke: bd, "stroke-width": 1 })); svg.appendChild(el("text", { x: L - 6, y: y(gv) + 4, "text-anchor": "end", "font-size": 11, fill: tx2 }, eixo(gv))); }
    var fsAno = W < 480 ? 10 : 11;
    var espaco = n <= 1 ? W : (W - L - R) / (n - 1);
    /* Anos completos só cabem quando o vão entre pontos é maior que o texto "2007". */
    var mostrar = (n <= 6 || espaco >= 38) ? function(){ return true; } : function(i){ var p = espaco >= 28 ? 2 : 3; return i === n - 1 || (i % p === 0 && n - 1 - i >= p); };
    rotulos.forEach(function(r, i){ if (mostrar(i)) svg.appendChild(el("text", { x: x(i), y: H - 10, "text-anchor": i === 0 ? "start" : (i === n - 1 ? "end" : "middle"), "font-size": fsAno, fill: tx2 }, r)); });
    var metaS = null;
    series.forEach(function(s){ if (s.tracejado) metaS = s; });
    series.forEach(function(s){
      var d = "", pen = false;
      s.valores.forEach(function(v, i){ if (v === null || !isFinite(v)) { pen = false; return; } d += (pen ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); pen = true; });
      svg.appendChild(el("path", { d: d, fill: "none", stroke: s.cor, "stroke-width": s.tracejado ? 2 : 3, "stroke-dasharray": s.tracejado ? "6 5" : "none", "stroke-linejoin": "round", "stroke-linecap": "round" }));
      if (!s.tracejado) s.valores.forEach(function(v, i){
        if (v === null || !isFinite(v)) return;
        var c = el("circle", { cx: x(i), cy: y(v), r: 3.5, fill: s.cor }); c.appendChild(el("title", {}, rotulos[i] + ": " + fmt(v))); svg.appendChild(c);
      });
    });
    alvo.appendChild(svg);
    var fs = W < 420 ? 9 : (W < 600 ? 10 : 11);
    var boxes = [];
    function hit(b){
      for (var i = 0; i < boxes.length; i++){
        var o = boxes[i];
        if (!(b.x2 < o.x1 || b.x1 > o.x2 || b.y2 < o.y1 || b.y1 > o.y2)) return true;
      }
      return false;
    }
    function cruzaMeta(b){
      if (!metaS) return false;
      var vals = metaS.valores;
      for (var i = 0; i < vals.length; i++){
        var v = vals[i];
        if (v === null || !isFinite(v)) continue;
        var px = x(i), py = y(v);
        if (px >= b.x1 - 3 && px <= b.x2 + 3 && py >= b.y1 - 4 && py <= b.y2 + 4) return true;
        var v2 = i + 1 < vals.length ? vals[i + 1] : null;
        if (v2 === null || !isFinite(v2)) continue;
        var qx = x(i + 1), qy = y(v2);
        for (var t = 1; t <= 8; t++){
          var sx = px + (qx - px) * t / 9, sy = py + (qy - py) * t / 9;
          if (sx >= b.x1 - 2 && sx <= b.x2 + 2 && sy >= b.y1 - 3 && sy <= b.y2 + 3) return true;
        }
      }
      return false;
    }
    function cruzaEixo(b){
      for (var t = 0; t <= 4; t++){
        var yy = y(min + t * passo);
        if (!(b.x2 < 0 || b.x1 > L - 2 || b.y2 < yy - 9 || b.y1 > yy + 5)) return true;
      }
      return false;
    }
    series.forEach(function(s){
      if (s.tracejado) return;
      s.valores.forEach(function(v, i){
        if (v === null || !isFinite(v)) return;
        var texto = fmt(v);
        var metaV = metaS ? metaS.valores[i] : null;
        var metaAcima = metaV !== null && metaV !== undefined && isFinite(metaV) && metaV > v;
        var node = el("text", { "font-size": fs, "font-weight": 700, fill: s.cor }, texto);
        svg.appendChild(node);
        var len = 0;
        try { len = node.getComputedTextLength(); } catch (err) { len = 0; }
        if (!len) len = texto.length * fs * 0.62;
        var espacoPts = n <= 1 ? W : (W - L - R) / Math.max(1, n - 1);
        var apertado = len + 8 > espacoPts;
        var acima = -(fs + 6), abaixo = fs + 12;
        var preferAbaixo = metaAcima || (apertado && i % 2 === 1);
        var cands = [];
        function add(dy, anchor, dx){ cands.push({ dy: dy, anchor: anchor, dx: dx || 0 }); }
        if (i === 0) { add(preferAbaixo ? abaixo : acima, "start", 6); add(preferAbaixo ? acima : abaixo, "start", 6); }
        else if (i === n - 1) { add(preferAbaixo ? abaixo : acima, "end", -6); add(preferAbaixo ? acima : abaixo, "end", -6); }
        if (preferAbaixo) { add(abaixo, "middle"); add(acima, "middle"); }
        else { add(acima, "middle"); add(abaixo, "middle"); }
        add(preferAbaixo ? abaixo + fs + 6 : acima - (fs + 4), "middle");
        add(preferAbaixo ? acima - (fs + 4) : abaixo + fs + 6, "middle");
        if (i !== 0 && i !== n - 1) { add(acima, "end", -8); add(acima, "start", 8); add(abaixo, "end", -8); add(abaixo, "start", 8); }
        var th = fs + 3;
        var chosen = null;
        for (var c = 0; c < cands.length; c++){
          var cd = cands[c];
          var cx = x(i) + cd.dx, cy = y(v) + cd.dy;
          var x1 = cd.anchor === "start" ? cx : cd.anchor === "end" ? cx - len : cx - len / 2;
          var b = { x1: x1 - 3, y1: cy - th, x2: x1 + len + 3, y2: cy + 3 };
          if (b.x1 < 1 || b.x2 > W - 1 || b.y1 < 1 || b.y2 > H - 20) continue;
          if (hit(b) || cruzaMeta(b) || cruzaEixo(b)) continue;
          if (x(i) >= b.x1 && x(i) <= b.x2 && y(v) >= b.y1 && y(v) <= b.y2) continue;
          chosen = { cx: cx, cy: cy, anchor: cd.anchor, b: b };
          break;
        }
        if (!chosen) {
          var fb = cands[0];
          var cx2 = x(i) + fb.dx, cy2 = Math.min(H - 22, Math.max(th + 1, y(v) + fb.dy));
          var x1b = fb.anchor === "start" ? cx2 : fb.anchor === "end" ? cx2 - len : cx2 - len / 2;
          chosen = { cx: cx2, cy: cy2, anchor: fb.anchor, b: { x1: x1b - 3, y1: cy2 - th, x2: x1b + len + 3, y2: cy2 + 3 } };
        }
        node.setAttribute("x", chosen.cx);
        node.setAttribute("y", chosen.cy);
        node.setAttribute("text-anchor", chosen.anchor);
        var halo = node.cloneNode(true);
        halo.setAttribute("fill", papel);
        halo.setAttribute("stroke", papel);
        halo.setAttribute("stroke-width", "4");
        halo.setAttribute("stroke-linejoin", "round");
        halo.setAttribute("aria-hidden", "true");
        svg.insertBefore(halo, node);
        boxes.push(chosen.b);
      });
    });
  }

  function colunas(alvo, itens){
    alvo.innerHTML = "";
    var W = Math.max(280, Math.min(520, alvo.clientWidth || 360)), H = 220, T = 24, B = 28, max = 100, cor = cssVar("--teal"), cor2 = cssVar("--azul2"), tx2 = cssVar("--texto2"), tx = cssVar("--texto");
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": "Percentual de alfabetizados por ano" });
    var bw = 56, gap = (W - itens.length * bw) / (itens.length + 1);
    itens.forEach(function(it, i){
      var h = (it.pct / max) * (H - T - B), xx = gap + i * (bw + gap), yy = H - B - h;
      svg.appendChild(el("rect", { x: xx, y: yy, width: bw, height: h, rx: 6, fill: i === itens.length - 1 ? cor2 : cor, opacity: i === itens.length - 1 ? 1 : 0.55 }));
      svg.appendChild(el("text", { x: xx + bw / 2, y: yy - 6, "text-anchor": "middle", "font-size": 13, "font-weight": 700, fill: tx }, br(it.pct) + "%"));
      svg.appendChild(el("text", { x: xx + bw / 2, y: H - 8, "text-anchor": "middle", "font-size": 12, fill: tx2 }, it.ano));
    });
    alvo.appendChild(svg);
  }

  function tabela(t, cab, linhasT){
    var h = "<thead><tr>" + cab.map(function(c){ return "<th>" + c + "</th>"; }).join("") + "</tr></thead><tbody>";
    linhasT.forEach(function(l){ h += "<tr>" + l.map(function(c){ return "<td>" + c + "</td>"; }).join("") + "</tr>"; });
    t.innerHTML = h + "</tbody>";
  }

  var I = D.ideb;
  function situacao(o, m){ if (m === null) return "—"; return o >= m ? '<span class="ok">Atingiu</span>' : '<span class="abaixo">Abaixo</span>'; }

  function desenharSeries(){
    document.querySelectorAll("[data-grafico]").forEach(function(g){
      var partes = g.getAttribute("data-grafico").split("-");
      var tipo = partes[0], et = partes[1];
      if (tipo === "ideb") {
        linhas(g, I.anos, [
          { nome: "IDEB observado", valores: I[et].obs, cor: cssVar("--azul2") },
          { nome: "Meta", valores: I[et].meta, cor: cssVar("--meta"), tracejado: true }
        ], 3, 7, function(v){ return br(v); });
      } else if (tipo === "idear") {
        linhas(g, D.idear.anos, [
          { nome: et === "AF" ? "Anos Finais" : "Anos Iniciais", valores: D.idear[et], cor: et === "AF" ? cssVar("--teal") : cssVar("--azul2") }
        ], 2, 8, function(v){ return br(v, 2); }, function(v){ return br(v, 1); });
      }
    });
  }

  /* Métricas: valor mais recente, ano e variação em relação à edição anterior */
  function variacao(atual, anterior, casas){
    var fator = Math.pow(10, casas);
    var d = Math.round((atual - anterior) * fator) / fator;
    return (d > 0 ? "+" : "") + br(d, casas);
  }
  var ult = I.anos.length - 1, av = D.avaliaRJ[D.avaliaRJ.length - 1], avAnt = D.avaliaRJ[D.avaliaRJ.length - 2], ia = D.idear.anos.length - 1;
  var mets = [
    [br(I.AI.obs[ult]), "IDEB Anos Iniciais (" + I.anos[ult] + ")", variacao(I.AI.obs[ult], I.AI.obs[ult - 1], 1) + " · " + br(I.AI.obs[ult - 1]) + " em " + I.anos[ult - 1]],
    [br(I.AF.obs[ult]), "IDEB Anos Finais (" + I.anos[ult] + ")", variacao(I.AF.obs[ult], I.AF.obs[ult - 1], 1) + " · " + br(I.AF.obs[ult - 1]) + " em " + I.anos[ult - 1]],
    [br(av.pct, 0) + "%", "Avalia RJ (" + av.ano + ")", variacao(av.pct, avAnt.pct, 1) + " p.p. · " + br(avAnt.pct) + "% em " + avAnt.ano],
    [br(D.idear.AI[ia], 2), "IDEAR Anos Iniciais (" + D.idear.anos[ia] + ")", variacao(D.idear.AI[ia], D.idear.AI[ia - 1], 2) + " · " + br(D.idear.AI[ia - 1], 2) + " em " + D.idear.anos[ia - 1]],
    [br(D.idear.AF[ia], 2), "IDEAR Anos Finais (" + D.idear.anos[ia] + ")", variacao(D.idear.AF[ia], D.idear.AF[ia - 1], 2) + " · " + br(D.idear.AF[ia - 1], 2) + " em " + D.idear.anos[ia - 1]]
  ];
  $("#metricas").innerHTML = mets.map(function(m){ return '<div class="metrica"><div class="v">' + m[0] + '</div><div class="l">' + m[1] + '</div><div class="d">' + m[2] + "</div></div>"; }).join("");

  /* Colunas numéricas já presentes em data.js. Situação não é série numérica. */
  var COLS = [
    { chave: "obs", nome: "IDEB", casas: 1 },
    { chave: "meta", nome: "Meta", casas: 1 },
    { chave: "aprend", nome: "Nota padronizada (SAEB)", casas: 2 },
    { chave: "fluxo", nome: "Fluxo / Rendimento", casas: 2 },
    { chave: "mt", nome: "Matemática", casas: 1 },
    { chave: "lp", nome: "Português", casas: 1 },
    { chave: "aprov", nome: "Aprovação", casas: 1, sufixo: "%" }
  ];
  var ICO = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M1.5 12.5h13M3 10.2l3.2-3.1 2.4 2.1L13 4.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var colSel = { AI: null, AF: null };
  function etapaNome(et){ return et === "AF" ? "Anos Finais" : "Anos Iniciais"; }
  function fmtCol(v, col){ return br(v, col.casas) + (col.sufixo || ""); }
  function faixa(vals){
    var lo = vals[0], hi = vals[0];
    vals.forEach(function(v){ if (v < lo) lo = v; if (v > hi) hi = v; });
    var span = hi - lo;
    if (!(span > 1e-9)) span = Math.abs(hi) > 1 ? Math.abs(hi) * 0.08 : 0.5;
    var pad = span * 0.22;
    return [lo - pad, hi + pad];
  }
  function montarTabela(et){
    var c = I[et], nome = etapaNome(et);
    var h = "<thead><tr><th>Edição</th>";
    COLS.forEach(function(col){
      h += '<th data-col="' + col.chave + '"><button type="button" class="col-btn" data-col="' + col.chave + '" aria-pressed="false" aria-controls="graf-col-' + et + '" aria-label="Ver gráfico de ' + col.nome + ', ' + nome + '">' + ICO + "<span>" + col.nome + "</span></button></th>";
    });
    h += '<th>Situação</th></tr></thead><tbody>';
    I.anos.forEach(function(a, i){
      h += "<tr><td>" + a + "</td>";
      COLS.forEach(function(col){
        h += '<td data-col="' + col.chave + '">' + fmtCol(c[col.chave][i], col) + "</td>";
      });
      h += "<td>" + situacao(c.obs[i], c.meta[i]) + "</td></tr>";
    });
    $("#tab-" + et).innerHTML = h + "</tbody>";
  }
  function desenharColuna(et){
    var tabelaEl = $("#tab-" + et), box = $("#graf-col-" + et), chave = colSel[et];
    tabelaEl.querySelectorAll("th, td").forEach(function(cell){
      var on = !!chave && cell.getAttribute("data-col") === chave;
      cell.classList.toggle("col-ativa", on);
      var b = cell.querySelector("button");
      if (b) b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (!chave) { box.hidden = true; box.innerHTML = ""; return; }
    var col = null;
    COLS.forEach(function(item){ if (item.chave === chave) col = item; });
    var anos = [], vals = [];
    I.anos.forEach(function(a, i){
      var v = I[et][chave][i];
      if (v === null || !isFinite(v)) return;
      anos.push(a); vals.push(v);
    });
    box.hidden = false;
    box.innerHTML = "<h3></h3><div class=\"alvo\"></div>";
    box.querySelector("h3").textContent = col.nome + " · " + etapaNome(et);
    if (!vals.length) return;
    var lim = faixa(vals);
    linhas(box.querySelector(".alvo"), anos, [
      { nome: col.nome, valores: vals, cor: et === "AF" ? cssVar("--teal") : cssVar("--azul2") }
    ], lim[0], lim[1], function(v){ return fmtCol(v, col); }, function(v){ return br(v, col.casas > 1 ? 2 : (col.chave === "mt" || col.chave === "lp" || col.chave === "aprov" ? 0 : col.casas)); });
  }
  ["AI", "AF"].forEach(function(et){
    montarTabela(et);
    $("#tab-" + et).addEventListener("click", function(ev){
      var btn = ev.target.closest ? ev.target.closest("button[data-col]") : null;
      if (!btn) return;
      var chave = btn.getAttribute("data-col");
      colSel[et] = colSel[et] === chave ? null : chave;
      desenharColuna(et);
      if (colSel[et]) $("#graf-col-" + et).scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  });

  tabela($("#tab-avalia"), ["Ano", "Alfabetizados", "Meta", "Participação", "Alunos"],
    D.avaliaRJ.map(function(x){ return [x.ano, br(x.pct) + "%", x.meta === null ? "Sem meta" : br(x.meta) + "%", br(x.part) + "%", x.alunos.toLocaleString("pt-BR")]; }));

  $("#props-idear").innerHTML = D.idear.metas2025.map(function(p){ return "<dt>" + p[0] + "</dt><dd>" + p[1] + "</dd>"; }).join("");

  $("#links-fontes").innerHTML = D.fontes.map(function(f){ return '<a href="' + f.url + '" target="_blank" rel="noopener">' + f.titulo + "<small>" + f.site + "</small></a>"; }).join("");
  $("#atualizado").textContent = D.atualizado;

  function desenharTudo(){
    desenharSeries();
    colunas($("#graf-avalia"), D.avaliaRJ);
    desenharColuna("AI");
    desenharColuna("AF");
  }
  desenharTudo();
  var rz; window.addEventListener("resize", function(){ clearTimeout(rz); rz = setTimeout(desenharTudo, 150); });
  if (window.matchMedia) { var mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", desenharTudo); }

  /* Abas (com #hash para links diretos) */
  var abas = document.querySelectorAll(".abas button");
  function abrir(id, rolar){
    if (!document.getElementById("aba-" + id)) id = "geral";
    abas.forEach(function(b){ b.setAttribute("aria-selected", b.getAttribute("data-aba") === id ? "true" : "false"); });
    document.querySelectorAll(".aba").forEach(function(s){ s.hidden = s.id !== "aba-" + id; });
    desenharTudo();
    if (rolar) window.scrollTo(0, 0);
  }
  abas.forEach(function(b){ b.addEventListener("click", function(){ var id = b.getAttribute("data-aba"); history.replaceState(null, "", "#" + id); abrir(id, true); }); });
  abrir((location.hash || "#geral").slice(1), false);

  if ("serviceWorker" in navigator) { window.addEventListener("load", function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); }); }
})();
