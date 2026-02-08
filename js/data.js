import { SKILLS } from "./skills.catalog.js";
export { SKILLS };

export const PROFILE = {
  name: "Melqui",
  title: "Melqui — Portfólio",
  subtitle: "Skills, atributos, passivas, projetos e timeline acadêmica.",
  course: {
    institution: "CESMAC",
    program: "Sistemas de Informação",
    totalPeriods: 8,
    completedPeriods: 4,
    currentPeriod: 5,
    totals: {
      chCurso: 3400,
      chIntegralizada: 1500,
      obrigatoriasTotal: 54,
      obrigatoriasConcluidas: 27,
      obrigatoriasPendentes: 27
    }
  },
  links: {
    cvUrl: "#",          // <- link do PDF do CV
    githubUser: "eicida", // <- MUDE se seu user for outro
    githubUrl: "https://github.com/eicida",
    linkedinUrl: "#",     // <- seu LinkedIn
    email: "mailto:seuemail@exemplo.com"
  }
};

export const ATTRIBUTES = [
  { id: "aprendizado", name: "Velocidade de aprendizado", value: 7 },
  { id: "consistencia", name: "Consistência", value: 6 },
  { id: "curiosidade", name: "Curiosidade técnica", value: 8 },
  { id: "comunicacao", name: "Comunicação", value: 6 }
];

export const PASSIVES = [
  { id: "maoNaMassa", name: "Mão na massa", desc: "Aprende fazendo: transforma conteúdo em prática e projeto pequeno pra consolidar." },
  { id: "autodidato", name: "Autodidatismo", desc: "Quando falta recurso/estrutura, busca solução sozinho e testa até funcionar." },
  { id: "consistenciaReal", name: "Constância > hype", desc: "Prefere evolução constante e incremental do que prometer demais." },
  { id: "organiza", name: "Organização", desc: "Gosta de dividir, modularizar e deixar o projeto fácil de manter." }
];

/**
 * Timeline acadêmica (com notas reais onde existem)
 * status: "done" | "doing" | "planned"
 */
export const ACADEMIC_TIMELINE = [
  {
    period: 1,
    title: "1º Período",
    status: "done",
    term: "20241",
    courses: [
      { name: "Arte e Cultura na Contemporaneidade", status: "APR", grade: 8.33, ch: 20 },
      { name: "Bases Científicas I", status: "APR", grade: 9.0, ch: 40 },
      { name: "Laboratório de Informática Básica", status: "APR", grade: 6.0, ch: 80, absences: 4 },
      { name: "Laboratório de Programação I", status: "APR", grade: 9.5, ch: 40 },
      { name: "Lógica Matemática", status: "APR", grade: 8.5, ch: 80, absences: 4 },
      { name: "Princípios de Sistemas de Informação", status: "APR", grade: 9.33, ch: 60 },
      { name: "Programação I", status: "APR", grade: 8.66, ch: 40 },
      { name: "Projeto Integrador", status: "APR", grade: 7.83, ch: 20 }
    ]
  },
  {
    period: 2,
    title: "2º Período",
    status: "done",
    term: "20242",
    courses: [
      { name: "Bases Científicas II", status: "APR", grade: 6.66, ch: 40 },
      { name: "Cálculo I", status: "APR", grade: 6.5, ch: 60, absences: 5 },
      { name: "Inglês Instrumental", status: "APR", grade: 6.0, ch: 40 },
      { name: "Laboratório de Programação II", status: "APR", grade: 9.66, ch: 80, absences: 2 },
      { name: "Programação II", status: "APR", grade: 7.5, ch: 40 },
      { name: "Projeto de Banco de Dados", status: "APR", grade: 8.16, ch: 80, absences: 2 },
      { name: "Sociedade, Meio Ambiente e Desenvolvimento Local", status: "APR", grade: 7.33, ch: 40 }
    ]
  },
  {
    period: 3,
    title: "3º Período",
    status: "done",
    term: "20251",
    courses: [
      { name: "Arquitetura e Organização de Computadores", status: "APR", grade: 8.0, ch: 40, absences: 2 },
      { name: "Empreendedorismo em TI", status: "APR", grade: 7.33, ch: 80, absences: 10 },
      { name: "Estrutura de Dados", status: "APR", grade: 7.33, ch: 80, absences: 6 },
      { name: "Laboratório de Programação III", status: "APR", grade: 10.0, ch: 40 },
      { name: "Língua Brasileira de Sinais (LIBRAS)", status: "APR", grade: 6.33, ch: 40 },
      { name: "Probabilidade e Estatística", status: "APR", grade: 6.33, ch: 60, absences: 3 }
    ]
  },
  {
    period: 4,
    title: "4º Período",
    status: "done",
    term: "20252",
    courses: [
      { name: "Engenharia de Software", status: "APR", grade: 7.16, ch: 80, absences: 8 },
      { name: "Gestão do Conhecimento", status: "APR", grade: 9.66, ch: 40 },
      { name: "Laboratório de Banco de Dados", status: "APR", grade: 6.83, ch: 80, absences: 12 },
      { name: "Matemática Computacional", status: "APR", grade: 9.66, ch: 40, absences: 4 },
      { name: "Programação Orientada a Objeto", status: "APR", grade: 9.83, ch: 80 },
      { name: "Redes de Computadores", status: "APR", grade: 6.0, ch: 80, absences: 4 }
    ]
  },
  {
    period: 5,
    title: "5º Período",
    status: "doing",
    term: "20261",
    courses: [
      { name: "Análise e Projeto de Sistemas", status: "CDO", ch: 80 },
      { name: "Gestão, Liderança, Empreendedorismo e Empregabilidade", status: "CDO", ch: 40 },
      { name: "Inteligência Artificial", status: "CDO", ch: 80 },
      { name: "Laboratório de Programação IV", status: "CDO", ch: 80 },
      { name: "Sistemas Embarcados", status: "CDO", ch: 40 },
      { name: "Sistemas Operacionais", status: "CDO", ch: 80 }
    ]
  },
  {
    period: 6,
    title: "6º Período",
    status: "planned",
    courses: [
      { name: "Inovação, Tecnologia e Criatividade", ch: 40 },
      { name: "Laboratório de Programação V", ch: 80 },
      { name: "Metodologia de Desenvolvimento de Sistemas", ch: 40 },
      { name: "Sistemas de Multimídia", ch: 80 },
      { name: "Sistemas Inteligentes Aplicados", ch: 80 },
      { name: "Tópicos Especiais em Sistemas de Informação I", ch: 40 }
    ]
  },
  {
    period: 7,
    title: "7º Período",
    status: "planned",
    courses: [
      { name: "Gerência de Redes de Computadores", ch: 40 },
      { name: "Gestão de Projetos I", ch: 40 },
      { name: "Gestão Estratégica Organizacional", ch: 40 },
      { name: "Laboratório de Programação VI", ch: 80 },
      { name: "Legislação Aplicada à Informática", ch: 40 },
      { name: "Projeto de Pesquisa em Informática", ch: 40 },
      { name: "Tecnologia Web para Negócios", ch: 80 },
      { name: "Tópicos Especiais em Sistemas de Informação II", ch: 40 }
    ]
  },
  {
    period: 8,
    title: "8º Período",
    status: "planned",
    courses: [
      { name: "Atividades Complementares", ch: 100 },
      { name: "Atividades Extensionistas", ch: 340 },
      { name: "Auditoria e Segurança de Sistemas de Informação", ch: 40 },
      { name: "Estágio Supervisionado Obrigatório", ch: 140 },
      { name: "Gestão de Projetos II", ch: 40 },
      { name: "Padrões de Projetos", ch: 40 },
      { name: "Trabalho de Conclusão de Curso", ch: 40 }
    ]
  }
];
