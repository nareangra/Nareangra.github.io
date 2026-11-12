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
          { grupo: "Matemática", titulo: "9º ano", arquivo: "provas/2023/3a-formativa/matematica-9ano.pdf", bytes: 1884539 }
        ] }
      ]
    },
    "2024": { itens: [] },
    "2025": { itens: [] }
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
