# 🐷 Planej.ai — Educador Financeiro Inteligente

Aplicação web desenvolvida com React, TypeScript e IA Generativa (Google Gemini) para simulações financeiras personalizadas. O projeto calcula orçamentos e gera diagnósticos dinâmicos com base nos dados do usuário.

---

## 🚀 O que o projeto faz

- **Simulação Guiada:** Formulário em etapas para captura de renda, custos fixos, dívidas e objetivos.
- **Insights com IA:** Diagnóstico financeiro completo gerado via Gemini API.
- **Histórico de Simulações (Desafio 1):** Página dedicada (`/historico`) para listar, consultar e excluir simulações salvas no `localStorage`.
- **Chat com Educador Financeiro (Desafio 2):** Chat interativo integrado ao resultado para tirar dúvidas com contexto e rolagem automática (auto-scroll).
- **Tema Claro / Escuro:** Suporte a Dark/Light mode com persistência de preferência.

---

## 🛠️ Tecnologias Utilizadas

- **React 18** + **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** (Estilização)
- **React Router DOM** (Roteamento)
- **Google Gemini API** (`@google/generative-ai` / REST API)
- **LocalStorage API** (Persistência)

---

## 💡 Melhores Implementadas (Desafios)

1. **Desafio 1 — Histórico Completo de Simulações:**
   - Criação da rota `/historico` com listagem em cards.
   - Exclusão individual de simulações.
   - Visualização de detalhes redirecionando para a rota `/resultado/:id`.
   - Estado vazio estilizado.

2. **Desafio 2 — Chat de Acompanhamento com IA:**
   - Campo de entrada de mensagem dentro da tela de diagnóstico.
   - Envio de perguntas contextuais sobre o resultado.
   - Rolagem automática (auto-scroll) a cada nova mensagem.
   - Persistência das conversas por simulação no `localStorage`.

---

## 🔧 Como Executar a Aplicação

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/SEU_USUARIO/planejai.git](https://github.com/SEU_USUARIO/planejai.git)
   cd planejai
