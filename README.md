# VittaAgenda

Sistema de agendamento de consultas para clínicas e consultórios, desenvolvido como projeto acadêmico com deploy no **GitHub** e **Vercel**.  
O objetivo é demonstrar um sistema simples e funcional para gestão de atendimentos.

**Deploy no Vercel:** <br />
https://vittaagenda.vercel.app/

---

## ✅ Requisitos e Funcionalidades

O usuário solicitou que o sistema tivesse:

- **Cadastro de consultas** com informações básicas (data, hora, paciente, serviço e status).
- **Edição e exclusão** de consultas já cadastradas.
- **Filtros de busca** por texto, status e data.
- **Layout responsivo** para uso em diferentes dispositivos.
- **Página de contato** com formulário simples.
- Persistência de dados **no navegador** (localStorage).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5, CSS3 e JavaScript** (sem frameworks).
- **LocalStorage** para simular persistência de dados.
- **Git/GitHub** para versionamento.
- **Vercel** para deploy e hospedagem estática.

---

## 💻 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/alexvndre01/vittaagenda.git
   cd vittaagenda
   ```

2. Abra o arquivo `index.html` diretamente no navegador  
   ou execute um servidor local (exemplo em Python):
   ```bash
   python -m http.server 8080
   ```

3. Acesse `http://localhost:8080`.

---

## 🚫 Funcionalidades Não Implementadas

- **Banco de dados real**: não há backend, apenas localStorage.
- **Login de usuários**: sistema funciona apenas localmente.
- **Sincronização entre dispositivos**: os dados ficam apenas no navegador usado.

Motivo: o escopo do projeto foi limitado a tecnologias **client-side** para simplificação e foco no aprendizado.

---

## ⚡ Desafios Enfrentados

Durante o desenvolvimento, aprendemos:

- Criar **CRUD completo** em JavaScript utilizando LocalStorage.
- Implementar **filtros dinâmicos** e interação com DOM.
- Configuração de **deploy automático com GitHub + Vercel**.
- Ajustes de **responsividade** e usabilidade (UX).

---
