/* Dados do painel – edite aqui para atualizar o app.
   null = sem dado. Fonte IDEB: QEdu (dados oficiais do INEP), rede municipal de Angra dos Reis (IBGE 3300100). */
window.DADOS = {
  atualizado: "novembro de 2026",
  ideb: {
    anos: ["2007","2009","2011","2013","2015","2017","2019","2021","2023","2025"],
    AI: {
      nome: "Anos Iniciais (1º ao 5º ano)",
      obs:   [4.4,4.2,5.1,5.1,4.9,5.1,5.1,5.5,5.7,6.1],
      meta:  [3.7,4.0,4.4,4.7,5.0,5.3,5.6,5.9,null,null],
      aprend:[5.25,5.37,5.74,5.76,5.62,5.78,5.74,5.53,5.81,6.22],
      fluxo: [0.84,0.79,0.89,0.88,0.87,0.88,0.89,0.99,0.97,0.98],
      mt:    [204.71,206.99,217.75,217.82,210.55,212.54,214.44,208.09,217.17,229.11],
      lp:    [186.13,189.99,199.05,200.03,200.13,206.77,202.85,197.49,203.57,213.43],
      aprov: [83.4,79.1,88.8,88.1,87.3,87.3,88.7,99.3,97.5,98.1]
    },
    AF: {
      nome: "Anos Finais (6º ao 9º ano)",
      obs:   [3.4,3.3,3.9,3.5,3.6,3.4,3.8,4.5,4.5,4.7],
      meta:  [3.3,3.5,3.8,4.2,4.5,4.8,5.1,5.3,null,null],
      aprend:[4.38,4.68,4.98,4.62,4.49,4.43,4.66,4.70,4.83,4.95],
      fluxo: [0.77,0.70,0.78,0.75,0.79,0.76,0.81,0.97,0.93,0.96],
      mt:    [230.5,237.06,247.06,238.88,236.86,231.78,238.23,238.01,239.56,245.2],
      lp:    [232.46,243.59,251.84,238.28,232.45,233.96,241.16,243.87,250.28,251.91],
      aprov: [75.8,68.8,76.7,73.9,78.1,75.9,80.1,96.8,92.9,96.0]
    }
  },
  /* Avalia RJ – Indicador Criança Alfabetizada (ICA), 2º ano, rede municipal (QEdu) */
  avaliaRJ: [
    { ano: "2023", pct: 57.0, meta: null,  part: 84.85, alunos: 2084 },
    { ano: "2024", pct: 60.8, meta: 60.82, part: 85.64, alunos: 2115 },
    { ano: "2025", pct: 64.0, meta: 65.0,  part: 91.79, alunos: 2139 }
  ],
  /* IDEAR – médias da rede (Prefeitura de Angra dos Reis, 06/03/2026) */
  idear: {
    anos: ["2022","2023","2024","2025"],
    AI: [4.8,6.25,6.52,6.81],
    AF: [3.8,4.07,3.94,4.16],
    metas2025: [
      ["Escolas que atingiram a meta","63 unidades"],
      ["Educação Infantil","28 escolas"],
      ["Anos Iniciais","29 escolas"],
      ["Anos Finais","3 escolas"],
      ["Educação Especial","2 escolas"],
      ["EJA","1 escola"]
    ]
  },
  /* Metas da aba IDEAR → Metas. anos vazio = a tela mostra "Em breve".
     Para publicar, preencha metas.anos. Cada ano pode ter:
       rede: [ { etapa: "Anos Iniciais", valor: 7.0, unidade: "nota" } ]
       escolas: [ { nome: "EM Exemplo", inep: "33000000", metas: [ { etapa: "Anos Iniciais", valor: 6.8, unidade: "nota" } ] } ]
       bimestres: { "1-bimestre": { rede: [ ... ], escolas: [ ... ] }, "2-bimestre": ..., "3-bimestre": ..., "4-bimestre": ... }
     unidade: "nota" (padrão, duas casas), "pct" (percentual) ou omitida. valor null aparece como "—". */
  metas: {
    anos: {}
  },
  fontes: [
    { titulo: "IDEB de Angra dos Reis", site: "QEdu", url: "https://qedu.org.br/municipio/3300100-angra-dos-reis/ideb" },
    { titulo: "Alfabetização (ICA/Avalia RJ) nos municípios do RJ", site: "QEdu", url: "https://qedu.org.br/uf/33-rio-de-janeiro/explore?aba=alfabetizacao&cidade=angra-dos-reis" },
    { titulo: "Resultados oficiais do IDEB", site: "INEP", url: "https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/ideb/resultados" },
    { titulo: "Metas da educação 2026 e resultados do IDEAR 2025", site: "angra.rj.gov.br · 06/03/2026", url: "https://angra.rj.gov.br/noticias/06-03-2026/angra-entrega-metas-da-educacao-para-escolas-municipais-em-2026-e-lanca-idear-alfa" }
  ],
  /* Ano com secoes (id, titulo, itens) ou só itens. Itens vazios = aviso "Em breve". */
  provas: {
    "2023": {
      secoes: [
        { id: "2a-formativa", titulo: "2ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2023/2a-formativa/matematica-2ano-estudante.pdf", bytes: 3705367 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2023/2a-formativa/matematica-2ano-aplicador.pdf", bytes: 3855516 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2023/2a-formativa/matematica-3ano-estudante.pdf", bytes: 6105666 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2023/2a-formativa/matematica-3ano-aplicador.pdf", bytes: 6281805 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2023/2a-formativa/matematica-4ano.pdf", bytes: 2602578 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2023/2a-formativa/matematica-5ano.pdf", bytes: 983698 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2023/2a-formativa/matematica-6ano.pdf", bytes: 1194793 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2023/2a-formativa/matematica-7ano.pdf", bytes: 826638 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2023/2a-formativa/matematica-8ano.pdf", bytes: 792866 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2023/2a-formativa/matematica-9ano.pdf", bytes: 876180 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2023/2a-formativa/portugues-2ano-estudante.pdf", bytes: 4062318 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2023/2a-formativa/portugues-2ano-aplicador.pdf", bytes: 4275191 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2023/2a-formativa/portugues-3ano-estudante.pdf", bytes: 2778019 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2023/2a-formativa/portugues-3ano-aplicador.pdf", bytes: 2989531 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2023/2a-formativa/portugues-4ano.pdf", bytes: 2006415 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2023/2a-formativa/portugues-5ano.pdf", bytes: 963618 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2023/2a-formativa/portugues-6ano.pdf", bytes: 1661077 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2023/2a-formativa/portugues-7ano.pdf", bytes: 1666340 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2023/2a-formativa/portugues-8ano.pdf", bytes: 1459141 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2023/2a-formativa/portugues-9ano.pdf", bytes: 1876347 }
        ] },
        { id: "3a-formativa", titulo: "3ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2023/3a-formativa/matematica-2ano-estudante.pdf", bytes: 6375916 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2023/3a-formativa/matematica-2ano-aplicador.pdf", bytes: 6476469 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2023/3a-formativa/matematica-3ano-estudante.pdf", bytes: 2595916 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2023/3a-formativa/matematica-3ano-aplicador.pdf", bytes: 2728073 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2023/3a-formativa/matematica-4ano.pdf", bytes: 3231788 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2023/3a-formativa/matematica-5ano.pdf", bytes: 1923399 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2023/3a-formativa/matematica-6ano.pdf", bytes: 1998127 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2023/3a-formativa/matematica-7ano.pdf", bytes: 2146643 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2023/3a-formativa/matematica-8ano.pdf", bytes: 1849945 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2023/3a-formativa/matematica-9ano.pdf", bytes: 1884539 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2023/3a-formativa/portugues-2ano-estudante.pdf", bytes: 5341630 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2023/3a-formativa/portugues-2ano-aplicador.pdf", bytes: 5401409 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2023/3a-formativa/portugues-3ano-estudante.pdf", bytes: 2474777 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2023/3a-formativa/portugues-3ano-aplicador.pdf", bytes: 2534384 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2023/3a-formativa/portugues-4ano.pdf", bytes: 2344355 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2023/3a-formativa/portugues-5ano.pdf", bytes: 2120440 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2023/3a-formativa/portugues-6ano.pdf", bytes: 2868547 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2023/3a-formativa/portugues-7ano.pdf", bytes: 3909969 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2023/3a-formativa/portugues-8ano.pdf", bytes: 2936054 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2023/3a-formativa/portugues-9ano.pdf", bytes: 3757269 }
        ] }
      ]
    },
    "2024": {
      secoes: [
        { id: "1a-formativa", titulo: "1ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2024/1a-formativa/matematica-2ano-estudante.pdf", bytes: 5501856 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2024/1a-formativa/matematica-2ano-aplicador.pdf", bytes: 5735203 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2024/1a-formativa/matematica-3ano-estudante.pdf", bytes: 3430738 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2024/1a-formativa/matematica-3ano-aplicador.pdf", bytes: 3682870 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2024/1a-formativa/matematica-4ano.pdf", bytes: 910084 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2024/1a-formativa/matematica-5ano.pdf", bytes: 965779 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2024/1a-formativa/matematica-6ano.pdf", bytes: 880671 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2024/1a-formativa/matematica-7ano.pdf", bytes: 805612 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2024/1a-formativa/matematica-8ano.pdf", bytes: 748718 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2024/1a-formativa/matematica-9ano.pdf", bytes: 798479 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2024/1a-formativa/portugues-2ano-estudante.pdf", bytes: 2662984 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2024/1a-formativa/portugues-2ano-aplicador.pdf", bytes: 2941826 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2024/1a-formativa/portugues-3ano-estudante.pdf", bytes: 1723954 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2024/1a-formativa/portugues-3ano-aplicador.pdf", bytes: 2010729 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2024/1a-formativa/portugues-4ano.pdf", bytes: 1965733 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2024/1a-formativa/portugues-5ano.pdf", bytes: 1778878 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2024/1a-formativa/portugues-6ano.pdf", bytes: 1416410 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2024/1a-formativa/portugues-7ano.pdf", bytes: 2237541 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2024/1a-formativa/portugues-8ano.pdf", bytes: 1952277 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2024/1a-formativa/portugues-9ano.pdf", bytes: 2340239 }
        ] },
        { id: "2a-formativa", titulo: "2ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2024/2a-formativa/matematica-2ano-estudante.pdf", bytes: 2395198 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2024/2a-formativa/matematica-2ano-aplicador.pdf", bytes: 2650304 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2024/2a-formativa/matematica-3ano-estudante.pdf", bytes: 4065537 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2024/2a-formativa/matematica-3ano-aplicador.pdf", bytes: 4321101 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2024/2a-formativa/matematica-4ano.pdf", bytes: 999279 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2024/2a-formativa/matematica-5ano.pdf", bytes: 1103268 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2024/2a-formativa/matematica-6ano.pdf", bytes: 1042527 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2024/2a-formativa/matematica-7ano.pdf", bytes: 732701 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2024/2a-formativa/matematica-8ano.pdf", bytes: 756466 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2024/2a-formativa/matematica-9ano.pdf", bytes: 747710 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2024/2a-formativa/portugues-2ano-estudante.pdf", bytes: 2022425 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2024/2a-formativa/portugues-2ano-aplicador.pdf", bytes: 2305545 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2024/2a-formativa/portugues-3ano-estudante.pdf", bytes: 1001352 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2024/2a-formativa/portugues-3ano-aplicador.pdf", bytes: 1291325 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2024/2a-formativa/portugues-4ano.pdf", bytes: 1518276 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2024/2a-formativa/portugues-5ano.pdf", bytes: 1402930 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2024/2a-formativa/portugues-6ano.pdf", bytes: 1185707 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2024/2a-formativa/portugues-7ano.pdf", bytes: 1748798 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2024/2a-formativa/portugues-8ano.pdf", bytes: 2494378 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2024/2a-formativa/portugues-9ano.pdf", bytes: 2352611 }
        ] }
      ]
    },
    "2025": {
      secoes: [
        { id: "1a-formativa", titulo: "1ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2025/1a-formativa/matematica-2ano-estudante.pdf", bytes: 1711325 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2025/1a-formativa/matematica-2ano-aplicador.pdf", bytes: 1969210 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2025/1a-formativa/matematica-3ano-estudante.pdf", bytes: 1405872 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2025/1a-formativa/matematica-3ano-aplicador.pdf", bytes: 1659132 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2025/1a-formativa/matematica-4ano.pdf", bytes: 1036247 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2025/1a-formativa/matematica-5ano.pdf", bytes: 1105998 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2025/1a-formativa/matematica-6ano.pdf", bytes: 810718 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2025/1a-formativa/matematica-7ano.pdf", bytes: 733662 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2025/1a-formativa/matematica-8ano.pdf", bytes: 706712 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2025/1a-formativa/matematica-9ano.pdf", bytes: 762674 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2025/1a-formativa/portugues-2ano-estudante.pdf", bytes: 1782546 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2025/1a-formativa/portugues-2ano-aplicador.pdf", bytes: 2065880 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2025/1a-formativa/portugues-3ano-estudante.pdf", bytes: 2009739 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2025/1a-formativa/portugues-3ano-aplicador.pdf", bytes: 2295987 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2025/1a-formativa/portugues-4ano.pdf", bytes: 1336908 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2025/1a-formativa/portugues-5ano.pdf", bytes: 1475598 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2025/1a-formativa/portugues-6ano.pdf", bytes: 2207698 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2025/1a-formativa/portugues-7ano.pdf", bytes: 1480856 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2025/1a-formativa/portugues-8ano.pdf", bytes: 1917108 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2025/1a-formativa/portugues-9ano.pdf", bytes: 1038466 },
        ] },
        { id: "2a-formativa", titulo: "2ª Formativa", itens: [
          { grupo: "Matemática", titulo: "1º ano – Caderno do estudante", arquivo: "provas/2025/2a-formativa/matematica-1ano-estudante.pdf", bytes: 4146621 },
          { grupo: "Matemática", titulo: "1º ano – Caderno do aplicador", arquivo: "provas/2025/2a-formativa/matematica-1ano-aplicador.pdf", bytes: 4397187 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2025/2a-formativa/matematica-2ano-estudante.pdf", bytes: 2008462 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2025/2a-formativa/matematica-2ano-aplicador.pdf", bytes: 3003449 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2025/2a-formativa/matematica-3ano-estudante.pdf", bytes: 2149265 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2025/2a-formativa/matematica-3ano-aplicador.pdf", bytes: 2261880 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2025/2a-formativa/matematica-4ano.pdf", bytes: 990636 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2025/2a-formativa/matematica-5ano.pdf", bytes: 1308995 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2025/2a-formativa/matematica-6ano.pdf", bytes: 1099387 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2025/2a-formativa/matematica-7ano.pdf", bytes: 766326 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2025/2a-formativa/matematica-8ano.pdf", bytes: 724101 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2025/2a-formativa/matematica-9ano.pdf", bytes: 840470 },
          { grupo: "Língua Portuguesa", titulo: "1º ano – Caderno do estudante", arquivo: "provas/2025/2a-formativa/portugues-1ano-estudante.pdf", bytes: 2468610 },
          { grupo: "Língua Portuguesa", titulo: "1º ano – Caderno do aplicador", arquivo: "provas/2025/2a-formativa/portugues-1ano-aplicador.pdf", bytes: 2757463 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2025/2a-formativa/portugues-2ano-estudante.pdf", bytes: 2069451 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2025/2a-formativa/portugues-2ano-aplicador.pdf", bytes: 2359469 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2025/2a-formativa/portugues-3ano-estudante.pdf", bytes: 1285971 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2025/2a-formativa/portugues-3ano-aplicador.pdf", bytes: 1576251 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2025/2a-formativa/portugues-4ano.pdf", bytes: 1619123 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2025/2a-formativa/portugues-5ano.pdf", bytes: 2015200 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2025/2a-formativa/portugues-6ano.pdf", bytes: 1684900 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2025/2a-formativa/portugues-7ano.pdf", bytes: 1929116 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2025/2a-formativa/portugues-8ano.pdf", bytes: 1892880 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2025/2a-formativa/portugues-9ano.pdf", bytes: 1927369 },
        ] },
        { id: "3a-formativa", titulo: "3ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2025/3a-formativa/matematica-2ano-estudante.pdf", bytes: 2765991 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2025/3a-formativa/matematica-2ano-aplicador.pdf", bytes: 3021308 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2025/3a-formativa/matematica-3ano-estudante.pdf", bytes: 1491523 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2025/3a-formativa/matematica-3ano-aplicador.pdf", bytes: 1746106 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2025/3a-formativa/matematica-4ano.pdf", bytes: 1618417 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2025/3a-formativa/matematica-5ano.pdf", bytes: 1433488 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2025/3a-formativa/matematica-6ano.pdf", bytes: 1355963 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2025/3a-formativa/matematica-7ano.pdf", bytes: 977563 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2025/3a-formativa/matematica-8ano.pdf", bytes: 795139 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2025/3a-formativa/matematica-9ano.pdf", bytes: 772460 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2025/3a-formativa/portugues-2ano-estudante.pdf", bytes: 1910105 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2025/3a-formativa/portugues-2ano-aplicador.pdf", bytes: 2196515 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2025/3a-formativa/portugues-3ano-estudante.pdf", bytes: 1150341 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2025/3a-formativa/portugues-3ano-aplicador.pdf", bytes: 1435397 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2025/3a-formativa/portugues-4ano.pdf", bytes: 1503386 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2025/3a-formativa/portugues-5ano.pdf", bytes: 1296956 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2025/3a-formativa/portugues-6ano.pdf", bytes: 2594090 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2025/3a-formativa/portugues-7ano.pdf", bytes: 1604524 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2025/3a-formativa/portugues-8ano.pdf", bytes: 1943379 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2025/3a-formativa/portugues-9ano.pdf", bytes: 1498760 },
        ] }
      ]
    },
    "2026": {
      secoes: [
        { id: "1a-formativa", titulo: "1ª Formativa", itens: [
          { grupo: "Matemática", titulo: "1º ano – Caderno do estudante", arquivo: "provas/2026/1a-formativa/matematica-1ano-estudante.pdf", bytes: 3965794 },
          { grupo: "Matemática", titulo: "1º ano – Caderno do aplicador", arquivo: "provas/2026/1a-formativa/matematica-1ano-aplicador.pdf", bytes: 4182262 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2026/1a-formativa/matematica-2ano-estudante.pdf", bytes: 2418297 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2026/1a-formativa/matematica-2ano-aplicador.pdf", bytes: 2673042 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2026/1a-formativa/matematica-3ano-estudante.pdf", bytes: 2277560 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2026/1a-formativa/matematica-3ano-aplicador.pdf", bytes: 2529250 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2026/1a-formativa/matematica-4ano.pdf", bytes: 1238947 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2026/1a-formativa/matematica-5ano.pdf", bytes: 989345 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2026/1a-formativa/matematica-6ano.pdf", bytes: 1230120 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2026/1a-formativa/matematica-7ano.pdf", bytes: 792912 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2026/1a-formativa/matematica-8ano.pdf", bytes: 810850 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2026/1a-formativa/matematica-9ano.pdf", bytes: 1057034 },
          { grupo: "Língua Portuguesa", titulo: "1º ano – Caderno do estudante", arquivo: "provas/2026/1a-formativa/portugues-1ano-estudante.pdf", bytes: 1699035 },
          { grupo: "Língua Portuguesa", titulo: "1º ano – Caderno do aplicador", arquivo: "provas/2026/1a-formativa/portugues-1ano-aplicador.pdf", bytes: 1972110 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2026/1a-formativa/portugues-2ano-estudante.pdf", bytes: 1628225 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2026/1a-formativa/portugues-2ano-aplicador.pdf", bytes: 1915872 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2026/1a-formativa/portugues-3ano-estudante.pdf", bytes: 1796892 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2026/1a-formativa/portugues-3ano-aplicador.pdf", bytes: 2084110 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2026/1a-formativa/portugues-4ano.pdf", bytes: 1958616 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2026/1a-formativa/portugues-5ano.pdf", bytes: 1407915 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2026/1a-formativa/portugues-6ano.pdf", bytes: 2696282 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2026/1a-formativa/portugues-7ano.pdf", bytes: 2035186 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2026/1a-formativa/portugues-8ano.pdf", bytes: 1647200 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2026/1a-formativa/portugues-9ano.pdf", bytes: 1573649 },
        ] },
        { id: "2a-formativa", titulo: "2ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2026/2a-formativa/matematica-2ano-estudante.pdf", bytes: 2321365 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2026/2a-formativa/matematica-2ano-aplicador.pdf", bytes: 2533939 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2026/2a-formativa/matematica-3ano-estudante.pdf", bytes: 2472318 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2026/2a-formativa/matematica-3ano-aplicador.pdf", bytes: 2691227 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2026/2a-formativa/matematica-4ano.pdf", bytes: 917033 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2026/2a-formativa/matematica-5ano.pdf", bytes: 833626 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2026/2a-formativa/matematica-6ano.pdf", bytes: 1046050 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2026/2a-formativa/matematica-7ano.pdf", bytes: 741082 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2026/2a-formativa/matematica-8ano.pdf", bytes: 714187 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2026/2a-formativa/matematica-9ano.pdf", bytes: 770661 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2026/2a-formativa/portugues-2ano-estudante.pdf", bytes: 2585671 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2026/2a-formativa/portugues-2ano-aplicador.pdf", bytes: 2683444 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2026/2a-formativa/portugues-3ano-estudante.pdf", bytes: 2170071 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2026/2a-formativa/portugues-3ano-aplicador.pdf", bytes: 2267119 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2026/2a-formativa/portugues-4ano.pdf", bytes: 2018242 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2026/2a-formativa/portugues-5ano.pdf", bytes: 2341697 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2026/2a-formativa/portugues-6ano.pdf", bytes: 2076208 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2026/2a-formativa/portugues-7ano.pdf", bytes: 1344428 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2026/2a-formativa/portugues-8ano.pdf", bytes: 3441868 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2026/2a-formativa/portugues-9ano.pdf", bytes: 2169497 },
        ] },
        { id: "3a-formativa", titulo: "3ª Formativa", itens: [
          { grupo: "Matemática", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2026/3a-formativa/matematica-2ano-estudante.pdf", bytes: 2520574 },
          { grupo: "Matemática", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2026/3a-formativa/matematica-2ano-aplicador.pdf", bytes: 2782499 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2026/3a-formativa/matematica-3ano-estudante.pdf", bytes: 989461 },
          { grupo: "Matemática", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2026/3a-formativa/matematica-3ano-aplicador.pdf", bytes: 1245741 },
          { grupo: "Matemática", titulo: "4º ano", arquivo: "provas/2026/3a-formativa/matematica-4ano.pdf", bytes: 695718 },
          { grupo: "Matemática", titulo: "5º ano", arquivo: "provas/2026/3a-formativa/matematica-5ano.pdf", bytes: 737290 },
          { grupo: "Matemática", titulo: "6º ano", arquivo: "provas/2026/3a-formativa/matematica-6ano.pdf", bytes: 850886 },
          { grupo: "Matemática", titulo: "7º ano", arquivo: "provas/2026/3a-formativa/matematica-7ano.pdf", bytes: 928788 },
          { grupo: "Matemática", titulo: "8º ano", arquivo: "provas/2026/3a-formativa/matematica-8ano.pdf", bytes: 971890 },
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2026/3a-formativa/matematica-9ano.pdf", bytes: 805501 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2026/3a-formativa/portugues-2ano-estudante.pdf", bytes: 1859128 },
          { grupo: "Língua Portuguesa", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2026/3a-formativa/portugues-2ano-aplicador.pdf", bytes: 2152871 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2026/3a-formativa/portugues-3ano-estudante.pdf", bytes: 1461013 },
          { grupo: "Língua Portuguesa", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2026/3a-formativa/portugues-3ano-aplicador.pdf", bytes: 1747830 },
          { grupo: "Língua Portuguesa", titulo: "4º ano", arquivo: "provas/2026/3a-formativa/portugues-4ano.pdf", bytes: 1424931 },
          { grupo: "Língua Portuguesa", titulo: "5º ano", arquivo: "provas/2026/3a-formativa/portugues-5ano.pdf", bytes: 1219078 },
          { grupo: "Língua Portuguesa", titulo: "6º ano", arquivo: "provas/2026/3a-formativa/portugues-6ano.pdf", bytes: 1511825 },
          { grupo: "Língua Portuguesa", titulo: "7º ano", arquivo: "provas/2026/3a-formativa/portugues-7ano.pdf", bytes: 1270901 },
          { grupo: "Língua Portuguesa", titulo: "8º ano", arquivo: "provas/2026/3a-formativa/portugues-8ano.pdf", bytes: 2059805 },
          { grupo: "Língua Portuguesa", titulo: "9º ano", arquivo: "provas/2026/3a-formativa/portugues-9ano.pdf", bytes: 2451852 },
        ] },
        { id: "fluencia", titulo: "Fluência", itens: [
          { grupo: "Fluência em Leitura", titulo: "2º ano – Caderno do estudante", arquivo: "provas/2026/fluencia/fluencia-2ano-estudante.pdf", bytes: 1362786 },
          { grupo: "Fluência em Leitura", titulo: "2º ano – Caderno do aplicador", arquivo: "provas/2026/fluencia/fluencia-2ano-aplicador.pdf", bytes: 1541220 },
          { grupo: "Fluência em Leitura", titulo: "3º ano – Caderno do estudante", arquivo: "provas/2026/fluencia/fluencia-3ano-estudante.pdf", bytes: 1370400 },
          { grupo: "Fluência em Leitura", titulo: "3º ano – Caderno do aplicador", arquivo: "provas/2026/fluencia/fluencia-3ano-aplicador.pdf", bytes: 1614975 },
          { grupo: "Fluência em Leitura", titulo: "4º ano – Caderno do estudante", arquivo: "provas/2026/fluencia/fluencia-4ano-estudante.pdf", bytes: 1371847 },
          { grupo: "Fluência em Leitura", titulo: "4º ano – Caderno do aplicador", arquivo: "provas/2026/fluencia/fluencia-4ano-aplicador.pdf", bytes: 1542676 },
          { grupo: "Fluência em Leitura", titulo: "5º ano – Caderno do estudante", arquivo: "provas/2026/fluencia/fluencia-5ano-estudante.pdf", bytes: 1374893 },
          { grupo: "Fluência em Leitura", titulo: "5º ano – Caderno do aplicador", arquivo: "provas/2026/fluencia/fluencia-5ano-aplicador.pdf", bytes: 1540706 },
          { grupo: "Materiais de apoio", titulo: "Apresentação", arquivo: "provas/2026/fluencia/fluencia-apresentacao.pdf", bytes: 9924921 },
          { grupo: "Materiais de apoio", titulo: "Folha de orientações – Aplicador", arquivo: "provas/2026/fluencia/fluencia-orientacoes-aplicador.pdf", bytes: 158297 },
          { grupo: "Materiais de apoio", titulo: "Folha de orientações – Escola", arquivo: "provas/2026/fluencia/fluencia-orientacoes-escola.pdf", bytes: 184533 },
        ] }
      ]
    }
  },
  /* Texto antigo da aba Provas, guardado e não exibido. */
  provasExemplo: {
    titulo: "Exemplos de provas",
    texto: "Esta área vai reunir exemplos de provas e itens das avaliações acompanhadas pelo painel, para que famílias, estudantes e professores conheçam o formato de cada uma.",
    passos: [
      { titulo: "Seleção do material", texto: "A Secretaria escolhe provas e itens já liberados para divulgação." },
      { titulo: "Organização por avaliação", texto: "Os exemplos ficam separados por SAEB/IDEB, Avalia RJ e AVALIAR/IDEAR, e por ano escolar." },
      { titulo: "Publicação no painel", texto: "Cada exemplo traz a habilidade avaliada e o link para o material completo." }
    ]
  }
};
