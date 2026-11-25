<p align="right"><a href="README.md">English</a></p>

<p align="center"><picture><source media="(max-width: 600px)" srcset="assets/hero-pt-mobile.svg" /><img src="assets/hero-pt.svg" width="960" alt="Gustavo Rodrigues: construo IA segura, testada, auditável. Um banner escuro em estilo de console com um log de auditoria dos controles usados nos projetos abaixo." /></picture></p>

# Gustavo Rodrigues

**AI Builder · Governança de IA** · Brasília, Brasil

Construo com IA e me importo com o que acontece depois da demo: testes que barram saída ruim, controles de segurança, logs que alguém consegue auditar e limites claros do que o sistema pode fazer. Meu padrão: o LLM decide o que precisa mudar, código determinístico aplica a mudança e testes automatizados decidem se vai para produção. Governança (ISO/IEC 27001, LGPD, ISO/IEC 42001) é como torno isso confiável.

[Projetos](#projetos-selecionados) · [Ferramentas](#ferramentas-que-uso) · [Certificações](#certificações) · [Agora](#agora) · [Contato](#contato)

## Projetos selecionados

### 01 / Support Agent Governance Prototype

[![Support Agent Governance Prototype: um LLM tria chamados, regras são o guardrail, uma pessoa aprova. 0 de 21 auto-respostas inseguras.](assets/projects/support-agent-pt.svg)](https://github.com/gustavogg99-ctrl/support-agent-governance-prototype)

Um agente de triagem de chamados de TI: o Claude classifica cada chamado e rascunha uma resposta, regras determinísticas só podem deixar o resultado mais estrito, qualquer divergência vai para uma pessoa, e uma pessoa aprova toda resposta. Nada é realmente enviado.

- **Resultado:** em 30 chamados sintéticos rotulados com o prompt v2, 0 de 21 chamados que exigiam uma pessoa receberam resposta automática (só com as regras, 4 de 21 passavam). Em 10 chamados de prompt injection reservados para teste, o v2 sinalizou os 10 como incidentes de segurança.
- **Controles:** texto do chamado mascarado antes da chamada à API, tentativas de injection tratadas como incidentes de segurança, log de auditoria com valores sensíveis ocultados, 149 testes no CI que nunca chamam a API.
- **Stack:** Python, API da Anthropic, GitHub Actions.

**Status:** protótipo com dados sintéticos. Os limites estão listados no repositório.

<p><a href="https://github.com/gustavogg99-ctrl/support-agent-governance-prototype"><img src="assets/buttons/code-pt.svg" height="40" alt="Ver código" /></a> <a href="https://github.com/gustavogg99-ctrl/support-agent-governance-prototype#results"><img src="assets/buttons/results-pt.svg" height="40" alt="Resultados" /></a></p>

<details>
<summary>Veja rodando e como um chamado flui</summary>

![Replay em terminal de quatro comandos offline: a suíte de testes, as regras em um chamado, a linha de base só com regras e a tabela de resultados (em inglês).](assets/projects/support-agent-demo.gif)

![Fluxo de um chamado: regras e LLM classificam, o guardrail combina os dois, uma pessoa aprova toda resposta, tudo é registrado em log (em inglês).](assets/projects/support-agent-architecture.png)

</details>

### 02 / Autoria em Forma

[![Autoria em Forma: formatação ABNT de TCC em que a IA decide o que corrigir e o código aplica. 41 de 41 testes de regressão.](assets/projects/autoria-em-forma-pt.svg)](https://github.com/gustavogg99-ctrl/autoria-em-forma)

Um serviço de formatação e revisão de TCC de graduação no Brasil (ABNT), construído sobre um pipeline Python + Claude: o LLM lê o manual do curso e aponta correções, código determinístico as aplica no .docx, e verificações automatizadas barram a entrega se algo falhar.

- **Resultado:** 2 trabalhos reais entregues e aceitos pelos clientes (out e nov de 2026). Toda entrega vai com alterações controladas e comentários, então o texto continua comprovadamente do autor.
- **Controles:** 41 testes de regressão em documentos fictícios gerados a cada execução; texto do TCC tratado como dado, nunca como instrução; arquivos com macro rejeitados; nenhum arquivo de cliente no repositório (LGPD).
- **Stack:** Python, Claude, LibreOffice, Cloudflare Workers + D1.

**Status:** lançado e pausado após um teste de demanda sem tração orgânica. Código aberto sob MIT.

<p><a href="https://github.com/gustavogg99-ctrl/autoria-em-forma"><img src="assets/buttons/code-pt.svg" height="40" alt="Ver código" /></a> <a href="https://site.autoriaemforma.workers.dev"><img src="assets/buttons/live-pt.svg" height="40" alt="Site no ar" /></a></p>

<details>
<summary>Veja a página do serviço</summary>

![Card social da Autoria em Forma: formatação ABNT e revisão de TCC, toda correção explicada.](assets/projects/autoria-em-forma-site.png)

</details>

### 03 / Política Corporativa de Uso de IA

[![Política Corporativa de Uso de IA: um template de política adotável e um procedimento de risco de fornecedor. Inglês e português, versão 2.1, CC BY 4.0.](assets/projects/ai-policy-pt.svg)](https://github.com/gustavogg99-ctrl/ethical-ai-policy)

Um template original e adotável para governar o uso ético, seguro e em conformidade de IA, em inglês e português do Brasil. Mira a Shadow AI: ferramentas não aprovadas, dados pessoais digitados em prompts e decisões automatizadas sem revisão humana.

- **Inclui:** a política (Markdown e PDF), um procedimento de avaliação de risco de fornecedores de IA e sua matriz.
- **Alinhada a:** LGPD, ISO/IEC 42001, ISO/IEC 27001, Princípios de IA da OCDE e o Projeto de Lei 2.338/2023.

**Status:** template, versão 2.1 (setembro de 2026), CC BY 4.0. A versão 3.0 está no roadmap.

<p><a href="https://github.com/gustavogg99-ctrl/ethical-ai-policy/blob/main/policy/pt-br/politica-corporativa-ia-v2.1.md"><img src="assets/buttons/policy-pt.svg" height="40" alt="Ler a política" /></a> <a href="https://github.com/gustavogg99-ctrl/ethical-ai-policy"><img src="assets/buttons/code-pt.svg" height="40" alt="Ver repositório" /></a></p>

### 04 / Portfolio

[![Portfolio: Next.js na Vercel, construído parte a parte com decisões documentadas. 38 partes, um pull request cada.](assets/projects/portfolio-pt.svg)](https://gustavorodrigues.vercel.app)

Meu portfólio bilíngue (EN/PT). Foi construído em 38 partes, cada uma uma branch e um pull request que precisa passar em lint, typecheck, testes e build, com toda decisão registrada. Cada afirmação do site remete a uma fonte, e uma trava de afirmações derruba o build se aparecer um termo proibido.

- **Controles:** Content Security Policy e headers de segurança, analytics sem cookies, uma página de privacidade com base legal e direitos do titular.
- **Stack:** Next.js, TypeScript, Tailwind CSS, Vercel.

**Status:** no ar.

<p><a href="https://gustavorodrigues.vercel.app"><img src="assets/buttons/live-pt.svg" height="40" alt="Site no ar" /></a> <a href="https://github.com/gustavogg99-ctrl/Portfolio"><img src="assets/buttons/code-pt.svg" height="40" alt="Ver código" /></a></p>

## Ferramentas que uso

### IA aplicada

<p>
<img src="assets/tools/claude.svg" width="160" alt="Claude" />
<img src="assets/tools/openai.svg" width="160" alt="OpenAI API" />
<img src="assets/tools/copilot.svg" width="160" alt="Microsoft Copilot" />
<img src="assets/tools/copilot-studio.svg" width="160" alt="Copilot Studio" />
<img src="assets/tools/n8n.svg" width="160" alt="n8n" />
<img src="assets/tools/make.svg" width="160" alt="Make" />
<img src="assets/tools/power-automate.svg" width="160" alt="Power Automate" />
</p>

**Claude (API e conectores) · OpenAI API · Microsoft Copilot · Copilot Studio · n8n · Make · Power Automate**

Agentes, engenharia de prompts e avaliação de LLMs (acurácia e custo). Construí bots de atendimento no WhatsApp com Make e depois n8n, e desenvolvo com apoio de IA.

### Engenharia e ferramentas

<p>
<img src="assets/tools/python.svg" width="160" alt="Python" />
<img src="assets/tools/typescript.svg" width="160" alt="TypeScript" />
<img src="assets/tools/nextjs.svg" width="160" alt="Next.js" />
<img src="assets/tools/tailwindcss.svg" width="160" alt="Tailwind CSS" />
<img src="assets/tools/vercel.svg" width="160" alt="Vercel" />
<img src="assets/tools/cloudflare-workers.svg" width="160" alt="Cloudflare Workers" />
<img src="assets/tools/supabase.svg" width="160" alt="Supabase" />
<img src="assets/tools/github-actions.svg" width="160" alt="GitHub Actions" />
<img src="assets/tools/git.svg" width="160" alt="Git" />
<img src="assets/tools/github.svg" width="160" alt="GitHub" />
<img src="assets/tools/whatsapp.svg" width="160" alt="WhatsApp API" />
<img src="assets/tools/servicenow.svg" width="160" alt="ServiceNow" />
<img src="assets/tools/jira.svg" width="160" alt="Jira" />
<img src="assets/tools/microsoft-365.svg" width="160" alt="Microsoft 365" />
</p>

**Python · TypeScript · Next.js · Tailwind CSS · Vercel · Cloudflare Workers / D1 · Supabase · SQL · GitHub Actions · Git · GitHub · API do WhatsApp · ServiceNow · Jira · Microsoft 365**

Testes de regressão e CI em todos os projetos acima. ServiceNow: App Engine Studio, Flow Designer, Service Catalog e GlideAjax.

### Segurança e governança

<p>
<img src="assets/tools/iso-27001-pt.svg" width="160" alt="ISO/IEC 27001" />
<img src="assets/tools/iso-42001-pt.svg" width="160" alt="ISO/IEC 42001" />
<img src="assets/tools/lgpd-pt.svg" width="160" alt="LGPD" />
<img src="assets/tools/nist-ai-rmf-pt.svg" width="160" alt="NIST AI RMF" />
<img src="assets/tools/itil-4-pt.svg" width="160" alt="ITIL 4" />
<img src="assets/tools/cobit-pt.svg" width="160" alt="COBIT (conceitual)" />
<img src="assets/tools/eu-ai-act-pt.svg" width="160" alt="EU AI Act (conceitual)" />
</p>

**ISO/IEC 27001 · ISO/IEC 42001 · LGPD · NIST AI RMF · ITIL 4 · COBIT (conceitual) · EU AI Act (conceitual)**

Segurança de aplicações web e defesa contra prompt injection. "Conceitual" significa que conheço o framework, não que sou certificado nele.

<details>
<summary>De onde vêm os logos</summary>

Os logos pertencem aos seus donos e aparecem só para nomear a ferramenta. Fontes e licenças: [docs/ICONS.md](docs/ICONS.md).

</details>

## Certificações

Microsoft AB-731 (AI Transformation Leader) · ITIL 4 Foundation · ISO/IEC 27001, ISO/IEC 20000 e ISO 9001 Associate (SkillFront)

Em andamento: Microsoft SC-900 (Security, Compliance, and Identity Fundamentals) e Scrum Master.

## Formação

Estou concluindo as graduações em Análise e Desenvolvimento de Sistemas e em Jornalismo (previsão: julho de 2027). Cofundei a MerkurIA, consultoria de implementação de IA (2023–2026), e co-liderei uma equipe de suporte técnico de 16 pessoas na Teledata, atendendo cerca de 1.000 incidentes por mês.

## Agora

```text
gg@governance:~ / agora
├── trabalho → Contratado pela Aoop (empresa NTT DATA) como ServiceNow Technical Consultant - JR. Começo em dezembro de 2026.
├── estudo   → Microsoft SC-900 e Scrum Master
└── escrita  → ggblog99.wordpress.com, um diário público do que aprendo e construo (PT/EN)
```

## Contato

Aberto a conversar sobre produtos de IA, automação e governança de IA.

<p><a href="https://gustavorodrigues.vercel.app"><img src="assets/buttons/portfolio-pt.svg" height="40" alt="Portfólio" /></a> <a href="https://www.linkedin.com/in/gustavo99rodrigues/"><img src="assets/buttons/linkedin-pt.svg" height="40" alt="LinkedIn" /></a> <a href="mailto:gustavohfr2003@gmail.com"><img src="assets/buttons/email-pt.svg" height="40" alt="E-mail" /></a> <a href="https://ggblog99.wordpress.com"><img src="assets/buttons/blog-pt.svg" height="40" alt="Blog" /></a></p>

`gustavohfr2003@gmail.com` · [gustavorodrigues.vercel.app](https://gustavorodrigues.vercel.app)

<p align="center"><img src="assets/footer-pt.svg" width="960" alt="Entregue com evidência. Testes, controles e documentação, às claras." /></p>
