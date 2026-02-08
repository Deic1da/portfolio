function makeLevelScale({ base, mid, high }) {
  const levels = {};
  for (let i = 1; i <= 10; i++) {
    if (i <= 3) levels[i] = base;
    else if (i <= 7) levels[i] = mid;
    else levels[i] = high;
  }
  return levels;
}

export const SKILLS = [
  {
    id: "programacao",
    name: "Programação",
    level: 8,
    affinity: 10,
    levelDescriptions: makeLevelScale({
      base: "Base de programação: sintaxe, lógica, pequenos scripts, exercícios e leitura de código.",
      mid: "Constrói projetos pequenos com organização: funções, módulos, debug e boas práticas.",
      high: "Entrega projetos pequenos/médios com autonomia: integração, refatoração e padrão consistente."
    }),
    note: "Evidência acadêmica: notas fortes em Labs e Programação/POO."
  },
  {
    id: "poo",
    name: "POO / Design",
    level: 7,
    affinity: 8,
    levelDescriptions: makeLevelScale({
      base: "Classes, objetos, encapsulamento e uso básico de padrões.",
      mid: "Aplica POO com organização; entende responsabilidade, coesão e acoplamento.",
      high: "Aplica padrões com critério; melhora manutenibilidade; pensa em arquitetura."
    }),
    note: "Evidência acadêmica: nota alta em Programação Orientada a Objeto."
  },
  {
    id: "banco",
    name: "Banco de Dados",
    level: 6,
    affinity: 6,
    levelDescriptions: makeLevelScale({
      base: "Modelagem simples, SQL básico, CRUD.",
      mid: "Modelagem relacional boa e consultas mais complexas.",
      high: "Otimização, índices, transações e schema com consistência/performance."
    }),
    note: "Evidência mista: Projeto de BD foi bem; Lab de BD foi mais baixo."
  },
  {
    id: "web",
    name: "Web (front/back básico)",
    level: 6,
    affinity: 6,
    levelDescriptions: makeLevelScale({
      base: "HTML/CSS/JS, páginas simples e consumo básico de APIs.",
      mid: "Componentização, formulários, validações e integração com back-end.",
      high: "Arquitetura, autenticação, performance e deploy."
    }),
    note: "Você ainda vai ter 'Tecnologia Web para Negócios' no 7º."
  },
  {
    id: "redes",
    name: "Redes",
    level: 4,
    affinity: 4,
    levelDescriptions: makeLevelScale({
      base: "Conceitos (IP, DNS, HTTP), noções de camadas e roteamento.",
      mid: "Configurações práticas, troubleshooting básico e segurança básica.",
      high: "Gerência/monitoramento, hardening e diagnóstico avançado."
    }),
    note: "Evidência acadêmica: Redes passou com nota baixa; vai reforçar no 7º (Gerência de Redes)."
  },
  {
    id: "mat",
    name: "Matemática (geral)",
    level: 5,
    affinity: 4,
    levelDescriptions: makeLevelScale({
      base: "Base suficiente pra acompanhar disciplinas e resolver listas.",
      mid: "Aplica matemática em problemas de computação e entende modelos.",
      high: "Confortável com cálculo/estatística e aplicação em IA/otimização."
    }),
    note: "Evidência mista: bom em Lógica/Mat. Computacional; mais fraco em Cálculo/Prob-Estat."
  }
];
