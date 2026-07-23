# Portfólio — Melquisedeque Gomes

Portfólio pessoal de página única, com foco em back-end, modelagem de dados e
desenvolvimento de software. Estudante de Sistemas de Informação no CESMAC e
estagiário na SEFAZ AL.

🔗 **Contato:** [melquigms@gmail.com](mailto:melquigms@gmail.com) ·
[GitHub](https://github.com/Deic1da) ·
[LinkedIn](https://www.linkedin.com/in/melquisedequegomes/)

## Sobre o projeto

Site estático de uma única página (`index.html`), sem build e sem dependências
de runtime. O layout foi desenhado no [Claude Design](https://claude.ai/design)
e implementado à mão como HTML/CSS autocontido.

### Seções

- **Hero** — apresentação, status atual e foto de perfil.
- **Sobre** — bio e uma tabela de fatos (curso, instituição, período, etc.).
- **Stack** — áreas de conhecimento agrupadas por nível de domínio, mais a
  lista de ferramentas.
- **Contato** — chamada para contato com e-mail, GitHub e LinkedIn.

Os níveis da seção Stack seguem três categorias, sinalizadas por cor:

| Nível        | Cor       | Significado                          |
|--------------|-----------|--------------------------------------|
| Sólido       | `#e8b04b` | Base firme, usado em projetos.       |
| Praticando   | `#cfc8bb` | Em uso, ainda ganhando fluência.     |
| Aprendendo   | `#8a8478` | Em estudo, conhecimento inicial.     |

## Estrutura de pastas

```
.
├── index.html   # Página completa (HTML + CSS inline em <style>)
├── img/
│   └── Perfil.png
├── docs/
│   └── Melquisedeque Gomes da Silva Santos.pdf   # Currículo
└── README.md
```

Todo o CSS mora dentro do `<style>` no `<head>` do `index.html`; não há folhas
de estilo, scripts externos ou etapa de compilação. O único JavaScript é um
trecho inline que atualiza o ano no rodapé.

## Tecnologias

- HTML5 e CSS3 (Flexbox, Grid, `clamp()`, variáveis de cor inline)
- Fontes via Google Fonts: **Instrument Serif**, **Space Grotesk** e
  **JetBrains Mono**
- Sem frameworks, sem bundler, sem dependências instaláveis

## Como rodar localmente

Por ser um site estático, basta abrir o arquivo no navegador:

```bash
# Opção 1 — abrir direto
xdg-open index.html      # Linux
open index.html          # macOS

# Opção 2 — servir com um servidor local simples
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Personalização

Os dados exibidos ficam diretamente no `index.html`. Para atualizar:

- **Links** (GitHub, LinkedIn, e-mail): busque pelos `href` no topo e no rodapé.
- **Bio e fatos**: seções `#sobre` (parágrafos e blocos `.fact`).
- **Stack**: cada card `.stack-card` na seção `#stack`; ajuste o nível trocando
  o texto e a cor (`color` / `background` do `.dot`) conforme a tabela acima.
- **Ferramentas**: itens `.tool` no fim da seção `#stack`.
- **Foto**: substitua `img/Perfil.png`.
- **Currículo**: substitua o PDF em `docs/`.

## Design

O layout de referência foi criado no Claude Design e implementado como HTML
estático — os efeitos de hover do design original foram convertidos em regras
CSS `:hover` reais.

---

Feito à mão · Maceió, AL
