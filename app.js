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
  function situacao(o, m){
    if (o === null || o === undefined || m === null || m === undefined || !isFinite(o) || !isFinite(m)) return "—";
    return o >= m ? '<span class="ok">Atingiu</span>' : '<span class="abaixo">Abaixo</span>';
  }

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

  D.fontes.push({ titulo: "Divulgação IDEB 2025 por escola", site: "INEP", url: "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb/resultados/2005-2025" });
  $("#links-fontes").innerHTML = D.fontes.map(function(f){ return '<a href="' + f.url + '" target="_blank" rel="noopener">' + f.titulo + "<small>" + f.site + "</small></a>"; }).join("");
  $("#atualizado").textContent = D.atualizado;

  function desenharTudo(){
    desenharSeries();
    colunas($("#graf-avalia"), D.avaliaRJ);
    desenharColuna("AI");
    desenharColuna("AF");
    if (vistaEscola) desenharVistaEscola();
    if (vistaAvalia) desenharGraficoAvalia();
  }
  desenharTudo();
  var rz; window.addEventListener("resize", function(){ clearTimeout(rz); rz = setTimeout(desenharTudo, 150); });
  if (window.matchMedia) { var mq = window.matchMedia("(prefers-color-scheme: dark)"); if (mq.addEventListener) mq.addEventListener("change", desenharTudo); }

  /* Escolas: mesmos componentes do IDEB municipal, com os números do INEP. */
  var FONTE_INEP = "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb/resultados/2005-2025";
  var COLS_ESC = [
    { chave: "obs", nome: "IDEB" },
    { chave: "meta", nome: "Meta" },
    { chave: "aprend", nome: "Nota padronizada (SAEB)" },
    { chave: "fluxo", nome: "Fluxo / Rendimento" },
    { chave: "mt", nome: "Matemática" },
    { chave: "lp", nome: "Português" },
    { chave: "aprov", nome: "Aprovação", sufixo: "%" }
  ];
  var colSelEsc = { AI: null, AF: null };
  var serieEsc = { AI: null, AF: null };
  var vistaEscola = null;
  var buscaEscola = "";
  function semAcento(s){ return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
  function slugEscola(nome){ return semAcento(nome).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function idEscola(e){ return e.inep || slugEscola(e.nome); }
  function htmlEsc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function acharEscola(id){
    try { id = decodeURIComponent(id); } catch (err) {}
    var lista = window.ESCOLAS || [];
    for (var i = 0; i < lista.length; i++) if (idEscola(lista[i]) === id) return lista[i];
    return null;
  }
  function escolasOrdenadas(){
    return (window.ESCOLAS || []).slice().sort(function(a, b){ return a.nome.localeCompare(b.nome, "pt"); });
  }
  function blocoParaSerie(bloco){
    if (!bloco) return null;
    var anos = Object.keys(bloco).sort();
    function pegar(campo){
      return anos.map(function(a){
        var v = bloco[a][campo];
        return v === null || v === undefined || !isFinite(v) ? null : v;
      });
    }
    return { anos: anos, obs: pegar("ideb"), meta: pegar("meta"), aprend: pegar("nota_padronizada"), fluxo: pegar("rendimento"), mt: pegar("matematica"), lp: pegar("portugues"), aprov: pegar("aprovacao") };
  }
  function fmtCampo(chave, v){
    if (v === null || v === undefined || !isFinite(v)) return "—";
    if (chave === "obs" || chave === "meta" || chave === "aprov") return br(v, 1);
    return String(v).replace(".", ",");
  }
  function ultimoIdeb(bloco){
    if (!bloco) return null;
    var prev = null, last = null;
    Object.keys(bloco).sort().forEach(function(a){
      var v = bloco[a].ideb;
      if (v === null || v === undefined || !isFinite(v)) return;
      prev = last;
      last = { ano: a, v: v };
    });
    return last ? { atual: last, anterior: prev } : null;
  }
  function selosEscola(e){
    if (e.status === "sem resultados") return '<span class="selo vazio">Sem resultados</span>';
    var html = "";
    [["iniciais", "Iniciais"], ["finais", "Finais"]].forEach(function(par){
      var info = ultimoIdeb(e[par[0]]);
      if (info) html += '<span class="selo">' + par[1] + " " + br(info.atual.v, 1) + " · " + info.atual.ano + "</span>";
    });
    return html || '<span class="selo vazio">Sem resultados</span>';
  }
  function pintarLista(){
    var html = "";
    escolasOrdenadas().forEach(function(e){
      var id = idEscola(e);
      var busca = semAcento(e.nome + " " + (e.inep || ""));
      html += '<button type="button" class="escola" data-escola="' + htmlEsc(id) + '" data-busca="' + htmlEsc(busca) + '"><span class="nome">' + htmlEsc(e.nome) + '</span><span class="selos">' + selosEscola(e) + "</span></button>";
    });
    $("#lista-escolas").innerHTML = html;
    filtrarLista();
  }
  function filtrarLista(){
    var q = semAcento(buscaEscola.trim());
    var vis = 0, total = 0;
    document.querySelectorAll("#lista-escolas .escola").forEach(function(b){
      total++;
      var mostra = !q || b.getAttribute("data-busca").indexOf(q) !== -1;
      b.hidden = !mostra;
      if (mostra) vis++;
    });
    var cont = $("#contagem-escolas");
    if (cont) cont.textContent = q ? (vis + " de " + total + " escolas") : (total + " escolas");
  }
  function mostrarLista(){
    vistaEscola = null;
    $("#escolas-detalhe").hidden = true;
    $("#escolas-lista").hidden = false;
    if (!$("#lista-escolas").childElementCount) pintarLista();
    var campo = $("#busca-escola");
    if (campo && campo.value !== buscaEscola) campo.value = buscaEscola;
    filtrarLista();
  }
  function escalaIdeb(obs, meta){
    var vals = [];
    obs.concat(meta).forEach(function(v){ if (v !== null && v !== undefined && isFinite(v)) vals.push(v); });
    if (!vals.length) return null;
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals);
    if (lo >= 3 && hi <= 7) return [3, 7];
    return faixa(vals);
  }
  function montarTabelaEsc(et, serie){
    var nome = etapaNome(et);
    var h = "<thead><tr><th>Edição</th>";
    COLS_ESC.forEach(function(col){
      h += '<th data-col="' + col.chave + '"><button type="button" class="col-btn" data-col="' + col.chave + '" data-etapa="' + et + '" aria-pressed="false" aria-controls="graf-col-esc-' + et + '" aria-label="Ver gráfico de ' + col.nome + ", " + nome + '">' + ICO + "<span>" + col.nome + "</span></button></th>";
    });
    h += "<th>Situação</th></tr></thead><tbody>";
    serie.anos.forEach(function(a, i){
      h += "<tr><td>" + a + "</td>";
      COLS_ESC.forEach(function(col){
        var texto = fmtCampo(col.chave, serie[col.chave][i]);
        if (texto !== "—" && col.sufixo) texto += col.sufixo;
        h += '<td data-col="' + col.chave + '">' + texto + "</td>";
      });
      h += "<td>" + situacao(serie.obs[i], serie.meta[i]) + "</td></tr>";
    });
    $("#tab-esc-" + et).innerHTML = h + "</tbody>";
  }
  function desenharGraficoEsc(et){
    var serie = serieEsc[et];
    var alvo = document.querySelector('[data-grafico="esc-' + et + '"]');
    if (!alvo || !serie) return;
    var lim = escalaIdeb(serie.obs, serie.meta);
    if (!lim) { alvo.innerHTML = '<p class="legenda-sec">Sem IDEB ou meta publicados nesta etapa.</p>'; return; }
    linhas(alvo, serie.anos, [
      { nome: "IDEB observado", valores: serie.obs, cor: cssVar("--azul2") },
      { nome: "Meta", valores: serie.meta, cor: cssVar("--meta"), tracejado: true }
    ], lim[0], lim[1], function(v){ return br(v, 1); });
  }
  function desenharColunaEsc(et){
    var tabelaEl = $("#tab-esc-" + et), box = $("#graf-col-esc-" + et), chave = colSelEsc[et], serie = serieEsc[et];
    if (!tabelaEl || !box || !serie) return;
    tabelaEl.querySelectorAll("th, td").forEach(function(cell){
      var on = !!chave && cell.getAttribute("data-col") === chave;
      cell.classList.toggle("col-ativa", on);
      var b = cell.querySelector("button");
      if (b) b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    if (!chave) { box.hidden = true; box.innerHTML = ""; return; }
    var col = null;
    COLS_ESC.forEach(function(item){ if (item.chave === chave) col = item; });
    var anos = [], vals = [];
    serie.anos.forEach(function(a, i){
      var v = serie[chave][i];
      if (v === null || !isFinite(v)) return;
      anos.push(a); vals.push(v);
    });
    box.hidden = false;
    box.innerHTML = "<h3></h3><div class=\"alvo\"></div>";
    box.querySelector("h3").textContent = col.nome + " · " + etapaNome(et);
    if (!vals.length) { box.querySelector(".alvo").innerHTML = '<p class="legenda-sec">Sem valores publicados nesta coluna.</p>'; return; }
    var lim = faixa(vals);
    linhas(box.querySelector(".alvo"), anos, [
      { nome: col.nome, valores: vals, cor: et === "AF" ? cssVar("--teal") : cssVar("--azul2") }
    ], lim[0], lim[1], function(v){ var t = fmtCampo(chave, v); return t + (col.sufixo || ""); }, function(v){
      var a = Math.abs(v);
      return br(v, a >= 20 ? 0 : a >= 2 ? 1 : 2);
    });
  }
  function desenharVistaEscola(){
    if (!vistaEscola) return;
    desenharGraficoEsc("AI");
    desenharGraficoEsc("AF");
    desenharColunaEsc("AI");
    desenharColunaEsc("AF");
  }
  function secaoEtapa(et, bloco){
    if (!bloco) return "";
    var nome = etapaNome(et);
    var info = ultimoIdeb(bloco);
    var cards = "";
    if (info) {
      var det = info.anterior ? variacao(info.atual.v, info.anterior.v, 1) + " · " + br(info.anterior.v, 1) + " em " + info.anterior.ano : "Sem edição anterior";
      cards = '<div class="metricas"><div class="metrica"><div class="v">' + br(info.atual.v, 1) + '</div><div class="l">IDEB ' + nome + " (" + info.atual.ano + ')</div><div class="d">' + det + "</div></div></div>";
    }
    return "<h2>" + nome + "</h2>" + cards +
      '<div class="cartao"><h3>Evolução do IDEB</h3><div data-grafico="esc-' + et + '"></div></div>' +
      '<p class="legenda-sec">Toque o título de uma coluna numérica para ver a evolução. Toque de novo para fechar.</p>' +
      '<div class="tabela-wrap"><table id="tab-esc-' + et + '"></table></div>' +
      '<div class="cartao col-grafico" id="graf-col-esc-' + et + '" hidden></div>';
  }
  function pintarDetalhe(e){
    serieEsc.AI = blocoParaSerie(e.iniciais);
    serieEsc.AF = blocoParaSerie(e.finais);
    var corpo = secaoEtapa("AI", e.iniciais) + secaoEtapa("AF", e.finais);
    if (!corpo) corpo = '<p class="aviso">Sem resultados.</p><p>Não há IDEB publicado para esta escola na divulgação do INEP.</p>';
    var inep = e.inep ? '<p class="legenda-sec">Código INEP ' + htmlEsc(e.inep) + " · rede municipal</p>" : '<p class="legenda-sec">Rede municipal</p>';
    $("#escolas-detalhe").innerHTML =
      '<button type="button" class="voltar" id="btn-voltar-escolas">← Escolas</button>' +
      '<h2 class="primeiro">' + htmlEsc(e.nome) + "</h2>" + inep + corpo +
      '<p class="legenda-sec">Fonte: <a href="' + FONTE_INEP + '" target="_blank" rel="noopener">INEP, divulgação IDEB 2025 por escola</a>.</p>';
    if (serieEsc.AI) montarTabelaEsc("AI", serieEsc.AI);
    if (serieEsc.AF) montarTabelaEsc("AF", serieEsc.AF);
  }
  function abrirEscola(e){
    var mesmo = vistaEscola && idEscola(vistaEscola) === idEscola(e);
    vistaEscola = e;
    $("#escolas-lista").hidden = true;
    $("#escolas-detalhe").hidden = false;
    if (!mesmo || !$("#escolas-detalhe").querySelector("h2")) {
      colSelEsc.AI = null;
      colSelEsc.AF = null;
      pintarDetalhe(e);
    }
    desenharVistaEscola();
  }
  $("#ideb-escolas").addEventListener("click", function(ev){
    var t = ev.target;
    var col = t.closest ? t.closest("button[data-col]") : null;
    if (col) {
      var et = col.getAttribute("data-etapa");
      var chave = col.getAttribute("data-col");
      colSelEsc[et] = colSelEsc[et] === chave ? null : chave;
      desenharColunaEsc(et);
      if (colSelEsc[et]) $("#graf-col-esc-" + et).scrollIntoView({ block: "nearest", inline: "nearest" });
      return;
    }
    var escolaBtn = t.closest ? t.closest("button[data-escola]") : null;
    if (escolaBtn) { location.hash = "#ideb/escolas/" + escolaBtn.getAttribute("data-escola"); return; }
    if (t.closest && t.closest("#btn-voltar-escolas")) location.hash = "#ideb/escolas";
  });
  $("#busca-escola").addEventListener("input", function(){ buscaEscola = this.value; filtrarLista(); });

  /* Avalia RJ por escola. Anos fixos 2023–2025; 2023 ainda não tem dado por escola. */
  var ANOS_AV = ["2023", "2024", "2025"];
  var NOTA_AV = "Fonte: resultados por escola do Avalia RJ 2023, 2024 e 2025 (planilhas da rede municipal).";
  var vistaAvalia = null;
  var buscaAvalia = "";
  function idAvalia(e){ return e.inep || slugEscola(e.nome); }
  function acharAvalia(id){
    try { id = decodeURIComponent(id); } catch (err) {}
    var lista = window.AVALIA_ESCOLAS || [];
    for (var i = 0; i < lista.length; i++) if (idAvalia(lista[i]) === id) return lista[i];
    return null;
  }
  function avaliaOrdenadas(){
    return (window.AVALIA_ESCOLAS || []).slice().sort(function(a, b){ return a.nome.localeCompare(b.nome, "pt"); });
  }
  function pctEscolaAv(e, ano){
    if (!e || !e.pct || !Object.prototype.hasOwnProperty.call(e.pct, ano)) return null;
    var v = e.pct[ano];
    return v === null || v === undefined || !isFinite(v) ? null : v;
  }
  function pctRedeAv(ano){
    var v = null;
    D.avaliaRJ.forEach(function(x){ if (String(x.ano) === String(ano)) v = x.pct; });
    return v === null || v === undefined || !isFinite(v) ? null : v;
  }
  function fmtPctAv(v){
    if (v === null || v === undefined || !isFinite(v)) return "—";
    return br(v, 1) + "%";
  }
  function ultimoAvalia(e){
    var last = null;
    ANOS_AV.forEach(function(a){
      var v = pctEscolaAv(e, a);
      if (v !== null) last = { ano: a, v: v };
    });
    return last;
  }
  function pintarListaAvalia(){
    var html = "";
    avaliaOrdenadas().forEach(function(e){
      var id = idAvalia(e);
      var busca = semAcento(e.nome + " " + (e.inep || ""));
      var ult = e.status === "sem_resultados" ? null : ultimoAvalia(e);
      var selo = ult ? '<span class="selo">' + fmtPctAv(ult.v) + " · " + ult.ano + "</span>" : '<span class="selo vazio">Sem resultados</span>';
      html += '<button type="button" class="escola" data-avalia="' + htmlEsc(id) + '" data-busca="' + htmlEsc(busca) + '"><span class="nome">' + htmlEsc(e.nome) + '</span><span class="selos">' + selo + "</span></button>";
    });
    $("#lista-avalia").innerHTML = html;
    filtrarListaAvalia();
  }
  function filtrarListaAvalia(){
    var q = semAcento(buscaAvalia.trim());
    var vis = 0, total = 0;
    document.querySelectorAll("#lista-avalia .escola").forEach(function(b){
      total++;
      var mostra = !q || b.getAttribute("data-busca").indexOf(q) !== -1;
      b.hidden = !mostra;
      if (mostra) vis++;
    });
    var cont = $("#contagem-avalia");
    if (cont) cont.textContent = q ? (vis + " de " + total + " escolas") : (total + " escolas");
  }
  function mostrarListaAvalia(){
    vistaAvalia = null;
    $("#avalia-detalhe").hidden = true;
    $("#avalia-lista").hidden = false;
    if (!$("#lista-avalia").childElementCount) pintarListaAvalia();
    var campo = $("#busca-avalia-escola");
    if (campo && campo.value !== buscaAvalia) campo.value = buscaAvalia;
    filtrarListaAvalia();
  }
  function desenharGraficoAvalia(){
    if (!vistaAvalia || vistaAvalia.status === "sem_resultados") return;
    var alvo = $("#graf-avalia-escola");
    if (!alvo) return;
    var escola = ANOS_AV.map(function(a){ return pctEscolaAv(vistaAvalia, a); });
    var rede = ANOS_AV.map(function(a){ return pctRedeAv(a); });
    linhas(alvo, ANOS_AV, [
      { nome: "Escola", valores: escola, cor: cssVar("--azul2") },
      { nome: "Rede", valores: rede, cor: cssVar("--teal") }
    ], 0, 100, function(v){ return br(v, 1) + "%"; }, function(v){ return br(v, 0); });
  }
  function pintarDetalheAvalia(e){
    var inep = e.inep ? '<p class="legenda-sec">Código INEP ' + htmlEsc(e.inep) + " · rede municipal</p>" : '<p class="legenda-sec">Rede municipal</p>';
    var fonte = '<p class="legenda-sec">' + NOTA_AV + "</p>";
    var corpo;
    if (e.status === "sem_resultados") {
      corpo = '<p class="aviso">Sem resultados.</p>';
    } else {
      var cards = ANOS_AV.map(function(a){
        return '<div class="metrica"><div class="v">' + fmtPctAv(pctEscolaAv(e, a)) + '</div><div class="l">Alfabetizados (' + a + ')</div><div class="d">2º ano · ICA</div></div>';
      }).join("");
      corpo = '<div class="metricas">' + cards + "</div>" +
        '<div class="grade2"><div class="cartao"><h3>Alfabetizados por ano</h3><div id="graf-avalia-escola"></div></div>' +
        '<div class="cartao"><h3>Escola e rede</h3><div class="tabela-wrap"><table id="tab-avalia-escola"></table></div></div></div>';
    }
    $("#avalia-detalhe").innerHTML =
      '<button type="button" class="voltar" id="btn-voltar-avalia">← Escolas</button>' +
      '<h2 class="primeiro">' + htmlEsc(e.nome) + "</h2>" + inep + corpo + fonte;
    if (e.status !== "sem_resultados") {
      tabela($("#tab-avalia-escola"), ["Ano", "Escola", "Rede"], ANOS_AV.map(function(a){
        return [a, fmtPctAv(pctEscolaAv(e, a)), fmtPctAv(pctRedeAv(a))];
      }));
    }
  }
  function abrirAvalia(e){
    var mesmo = vistaAvalia && idAvalia(vistaAvalia) === idAvalia(e);
    vistaAvalia = e;
    $("#avalia-lista").hidden = true;
    $("#avalia-detalhe").hidden = false;
    if (!mesmo || !$("#avalia-detalhe").querySelector("h2")) pintarDetalheAvalia(e);
    desenharGraficoAvalia();
  }
  $("#avalia-escolas").addEventListener("click", function(ev){
    var t = ev.target;
    var escolaBtn = t.closest ? t.closest("button[data-avalia]") : null;
    if (escolaBtn) { location.hash = "#avalia/escolas/" + escolaBtn.getAttribute("data-avalia"); return; }
    if (t.closest && t.closest("#btn-voltar-avalia")) location.hash = "#avalia/escolas";
  });
  $("#busca-avalia-escola").addEventListener("input", function(){ buscaAvalia = this.value; filtrarListaAvalia(); });

  /* Abas e rotas #ideb/escolas/<inep ou slug> e #avalia/escolas/<inep ou slug> */
  var abas = document.querySelectorAll("#nav-principal button");
  function aplicarRota(rolar){
    var partes = (location.hash || "#geral").replace(/^#/, "").split("/");
    var id = partes[0] || "geral";
    if (!document.getElementById("aba-" + id)) { id = "geral"; partes = ["geral"]; }
    abas.forEach(function(b){ b.setAttribute("aria-selected", b.getAttribute("data-aba") === id ? "true" : "false"); });
    document.querySelectorAll(".aba").forEach(function(s){ s.hidden = s.id !== "aba-" + id; });
    var sub = $("#sub-ideb");
    if (sub) sub.hidden = id !== "ideb";
    var subAv = $("#sub-avalia");
    if (subAv) subAv.hidden = id !== "avalia";
    var escolas = id === "ideb" && partes[1] === "escolas";
    var escolasAv = id === "avalia" && partes[1] === "escolas";
    var rede = $("#ideb-rede"), painel = $("#ideb-escolas");
    if (rede) rede.hidden = escolas;
    if (painel) painel.hidden = !escolas;
    var redeAv = $("#avalia-rede"), painelAv = $("#avalia-escolas");
    if (redeAv) redeAv.hidden = escolasAv;
    if (painelAv) painelAv.hidden = !escolasAv;
    document.querySelectorAll("#sub-ideb button").forEach(function(b){
      var on = (escolas && b.getAttribute("data-vista") === "escolas") || (!escolas && b.getAttribute("data-vista") === "rede");
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.querySelectorAll("#sub-avalia button").forEach(function(b){
      var on = (escolasAv && b.getAttribute("data-vista") === "escolas") || (!escolasAv && b.getAttribute("data-vista") === "rede");
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (escolas) {
      var cod = partes.slice(2).join("/");
      if (cod) {
        var encontrada = acharEscola(cod);
        if (encontrada) abrirEscola(encontrada);
        else { mostrarLista(); var cont = $("#contagem-escolas"); if (cont) cont.textContent = "Escola não encontrada. " + cont.textContent; }
      } else mostrarLista();
    } else vistaEscola = null;
    if (escolasAv) {
      var codAv = partes.slice(2).join("/");
      if (codAv) {
        var encontradaAv = acharAvalia(codAv);
        if (encontradaAv) abrirAvalia(encontradaAv);
        else { mostrarListaAvalia(); var contAv = $("#contagem-avalia"); if (contAv) contAv.textContent = "Escola não encontrada. " + contAv.textContent; }
      } else mostrarListaAvalia();
    } else vistaAvalia = null;
    desenharTudo();
    if (rolar) window.scrollTo(0, 0);
  }
  abas.forEach(function(b){
    b.addEventListener("click", function(){
      var next = "#" + b.getAttribute("data-aba");
      if (location.hash !== next) location.hash = next;
      else aplicarRota(true);
    });
  });
  document.querySelectorAll("#sub-ideb button").forEach(function(b){
    b.addEventListener("click", function(){
      var next = b.getAttribute("data-vista") === "escolas" ? "#ideb/escolas" : "#ideb";
      if (location.hash !== next) location.hash = next;
      else aplicarRota(true);
    });
  });
  document.querySelectorAll("#sub-avalia button").forEach(function(b){
    b.addEventListener("click", function(){
      var next = b.getAttribute("data-vista") === "escolas" ? "#avalia/escolas" : "#avalia";
      if (location.hash !== next) location.hash = next;
      else aplicarRota(true);
    });
  });
  window.addEventListener("hashchange", function(){ aplicarRota(true); });
  aplicarRota(false);

  if ("serviceWorker" in navigator) { window.addEventListener("load", function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); }); }
})();
