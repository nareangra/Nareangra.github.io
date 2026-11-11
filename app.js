(function(){
  "use strict";
  var D = window.DADOS;
  var br = function(v, d){ if (v === null || v === undefined || !isFinite(v)) return "—"; return v.toFixed(d === undefined ? 1 : d).replace(".", ","); };
  var $ = function(s){ return document.querySelector(s); };
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, attrs, txt){ var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (txt !== undefined) e.textContent = txt; return e; }
  function cssVar(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }

  /* Gráfico de linhas em SVG. series: [{nome, valores, cor, tracejado}] ; valores null = lacuna */
  function linhas(alvo, rotulos, series, min, max, fmt){
    alvo.innerHTML = "";
    var leg = document.createElement("div"); leg.className = "leg";
    series.forEach(function(s){ var sp = document.createElement("span"); var i = document.createElement("i"); if (s.tracejado) i.className = "tr"; else i.style.background = s.cor; sp.appendChild(i); sp.appendChild(document.createTextNode(s.nome)); leg.appendChild(sp); });
    alvo.appendChild(leg);
    var W = Math.max(300, Math.min(700, alvo.clientWidth || 560)), H = Math.round(Math.max(200, Math.min(260, W * 0.55))), L = 34, R = 14, T = 16, B = 30;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, role: "img", "aria-label": series.map(function(s){return s.nome;}).join(" e ") });
    var n = rotulos.length, x = function(i){ return L + (n === 1 ? 0 : i * (W - L - R) / (n - 1)); }, y = function(v){ return T + (max - v) * (H - T - B) / (max - min); };
    var tx2 = cssVar("--texto2"), bd = cssVar("--borda");
    var passo = (max - min) / 4;
    for (var k = 0; k <= 4; k++){ var v = min + k * passo; svg.appendChild(el("line", { x1: L, x2: W - R, y1: y(v), y2: y(v), stroke: bd, "stroke-width": 1 })); svg.appendChild(el("text", { x: L - 6, y: y(v) + 4, "text-anchor": "end", "font-size": 11, fill: tx2 }, fmt(v))); }
    var mostrar = n <= 6 ? function(){ return true; } : function(i){ var p = W < 480 ? 3 : 2; return i === n - 1 || (i % p === 0 && n - 1 - i >= p); };
    rotulos.forEach(function(r, i){ if (mostrar(i)) svg.appendChild(el("text", { x: x(i), y: H - 8, "text-anchor": i === 0 ? "start" : (i === n - 1 ? "end" : "middle"), "font-size": 11, fill: tx2 }, r)); });
    series.forEach(function(s){
      var d = "", pen = false;
      s.valores.forEach(function(v, i){ if (v === null || !isFinite(v)) { pen = false; return; } d += (pen ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); pen = true; });
      svg.appendChild(el("path", { d: d, fill: "none", stroke: s.cor, "stroke-width": s.tracejado ? 2 : 3, "stroke-dasharray": s.tracejado ? "6 5" : "none", "stroke-linejoin": "round", "stroke-linecap": "round" }));
      if (!s.tracejado) s.valores.forEach(function(v, i){
        if (v === null) return;
        var c = el("circle", { cx: x(i), cy: y(v), r: 4, fill: s.cor }); c.appendChild(el("title", {}, rotulos[i] + ": " + fmt(v))); svg.appendChild(c);
        if (i === s.valores.length - 1) svg.appendChild(el("text", { x: x(i) - 8, y: y(v) - 9, "text-anchor": "end", "font-size": 12, "font-weight": 700, fill: s.cor }, fmt(v)));
      });
    });
    alvo.appendChild(svg);
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

  function desenharIdeb(){
    document.querySelectorAll("[data-grafico]").forEach(function(g){
      var et = g.getAttribute("data-grafico").split("-")[1];
      linhas(g, I.anos, [
        { nome: "IDEB observado", valores: I[et].obs, cor: cssVar("--azul2") },
        { nome: "Meta", valores: I[et].meta, cor: cssVar("--meta"), tracejado: true }
      ], 3, 7, function(v){ return br(v); });
    });
  }

  /* Métricas */
  var ult = I.anos.length - 1, av = D.avaliaRJ[D.avaliaRJ.length - 1], avAnt = D.avaliaRJ[D.avaliaRJ.length - 2], ia = D.idear.anos.length - 1;
  var mets = [
    [br(I.AI.obs[ult]), "IDEB Anos Iniciais (" + I.anos[ult] + ")", br(I.AI.obs[ult - 1]) + " em " + I.anos[ult - 1] + " · meta de 2021: " + br(I.AI.meta[7])],
    [br(I.AF.obs[ult]), "IDEB Anos Finais (" + I.anos[ult] + ")", br(I.AF.obs[ult - 1]) + " em " + I.anos[ult - 1] + " · meta de 2021: " + br(I.AF.meta[7])],
    [br(av.pct, 0) + "%", "Crianças alfabetizadas – Avalia RJ (" + av.ano + ")", "Meta: " + br(av.meta, 0) + "% · " + avAnt.ano + ": " + br(avAnt.pct) + "%"],
    [br(D.idear.AI[ia], 2), "IDEAR Anos Iniciais (" + D.idear.anos[ia] + ")", "Anos Finais: " + br(D.idear.AF[ia], 2)]
  ];
  $("#metricas").innerHTML = mets.map(function(m){ return '<div class="metrica"><div class="v">' + m[0] + '</div><div class="l">' + m[1] + '</div><div class="d">' + m[2] + "</div></div>"; }).join("");

  tabela($("#tab-ideb"), ["Edição", "Iniciais", "Meta", "Situação", "Finais", "Meta", "Situação"],
    I.anos.map(function(a, i){ return [a, br(I.AI.obs[i]), br(I.AI.meta[i]), situacao(I.AI.obs[i], I.AI.meta[i]), br(I.AF.obs[i]), br(I.AF.meta[i]), situacao(I.AF.obs[i], I.AF.meta[i])]; }));

  function comp(et){
    var c = I[et];
    tabela($("#tab-comp"), ["Edição", "Nota padronizada", "Fluxo", "Matemática", "Português", "Aprovação"],
      I.anos.map(function(a, i){ return [a, br(c.aprend[i], 2), br(c.fluxo[i], 2), br(c.mt[i], 1), br(c.lp[i], 1), br(c.aprov[i], 1) + "%"]; }));
    document.querySelectorAll("#seg-comp button").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-etapa") === et ? "true" : "false"); });
  }
  document.querySelectorAll("#seg-comp button").forEach(function(b){ b.addEventListener("click", function(){ comp(b.getAttribute("data-etapa")); }); });
  comp("AI");

  tabela($("#tab-avalia"), ["Ano", "Alfabetizados", "Meta", "Participação", "Alunos"],
    D.avaliaRJ.map(function(x){ return [x.ano, br(x.pct) + "%", x.meta === null ? "Sem meta" : br(x.meta) + "%", br(x.part) + "%", x.alunos.toLocaleString("pt-BR")]; }));

  $("#props-idear").innerHTML = D.idear.metas2025.map(function(p){ return "<dt>" + p[0] + "</dt><dd>" + p[1] + "</dd>"; }).join("");

  $("#links-fontes").innerHTML = D.fontes.map(function(f){ return '<a href="' + f.url + '" target="_blank" rel="noopener">' + f.titulo + "<small>" + f.site + "</small></a>"; }).join("");
  $("#atualizado").textContent = D.atualizado;

  function desenharTudo(){
    desenharIdeb();
    colunas($("#graf-avalia"), D.avaliaRJ);
    linhas($("#graf-idear"), D.idear.anos, [
      { nome: "Anos Iniciais", valores: D.idear.AI, cor: cssVar("--azul2") },
      { nome: "Anos Finais", valores: D.idear.AF, cor: cssVar("--teal") }
    ], 2, 8, function(v){ return br(v); });
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
