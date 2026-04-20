<h1 align="center">💛 Vittalis</h1>

<p align="center">
  <em>Seguro de Vida Simplificado — simples, acessível e humano</em>
</p>

<p align="center">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img alt="TypeORM" src="https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logoColor=white"/>
  <img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>
  <img alt="Swagger" src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/>
  <img alt="Render" src="https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/>
  <img alt="Status" src="https://img.shields.io/badge/status-em%20produção-brightgreen?style=for-the-badge"/>
</p>

<p align="center">
  <a href="https://vittalis.onrender.com/swagger">
    <img src="https://img.shields.io/badge/🔗%20Acessar%20API%20Online-vittalis.onrender.com-FFD700?style=for-the-badge"/>
  </a>
</p>

---

## 📖 Sobre o Projeto

O **Vittalis** é uma plataforma digital que transforma a forma como as pessoas entendem e contratam seguros de vida.

Mais do que um sistema de gerenciamento, o Vittalis propõe uma nova experiência: **simples, acessível e humana** — guiando o usuário como um amigo em uma decisão importante.

> *"O Vittalis não começa com um contrato… começa com uma conversa."*

---

## 🧠 Problema & Solução

| Problema | Solução |
|----------|---------|
| 📋 Processos burocráticos | ✅ Fluxo simples e direto |
| 🗣️ Linguagem complexa | ✅ Comunicação clara e humana |
| 😕 Falta de clareza para o usuário | ✅ Experiência intuitiva e visual |
| 📉 Baixa adesão entre jovens | ✅ Foco em jovens adultos de 18–35 anos |

> O problema não está na falta de opções — está na **experiência do usuário**.

---

## 🎯 Público-Alvo

- Jovens adultos **(18–35 anos)**
- Pessoas que **nunca contrataram seguro**
- Usuários que buscam **praticidade e clareza**
- Pessoas que desejam **proteger quem amam**

---

## ✨ Funcionalidades

### 👤 Usuário
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/usuarios/cadastrar` | ❌ | Cadastrar usuário |
| `POST` | `/usuarios/logar` | ❌ | Login |
| `GET` | `/usuarios` | ✅ | Listar usuários |
| `GET` | `/usuarios/:id` | ✅ | Buscar por ID |
| `PUT` | `/usuarios` | ✅ | Atualizar usuário |
| `DELETE` | `/usuarios/:id` | ✅ | Excluir usuário |

### 📦 Plano
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/planos` | ✅ | Cadastrar plano |
| `GET` | `/planos` | ✅ | Listar planos |
| `GET` | `/planos/nome/:nome` | ✅ | Buscar por nome |
| `PUT` | `/planos` | ✅ | Atualizar plano |
| `DELETE` | `/planos/:id` | ✅ | Excluir plano |

### 📄 Apólice
| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/apolices` | ✅ | Contratar seguro |
| `GET` | `/apolices` | ✅ | Listar apólices |
| `GET` | `/apolices/:id` | ✅ | Buscar por ID |
| `PUT` | `/apolices` | ✅ | Atualizar apólice |
| `DELETE` | `/apolices/:id` | ✅ | Excluir apólice |

> ✅ = requer token JWT no header `Authorization: Bearer TOKEN`

---

## 🔐 Segurança

| Recurso | Descrição |
|---------|-----------|
| 🔑 **JWT** | Autenticação stateless por token |
| 🔒 **Bcrypt** | Criptografia de senhas |
| 🛡️ **Guards** | Proteção de rotas autenticadas |

---

## 🚧 Regras de Negócio

- ❌ Usuários **menores de 18 anos** não podem contratar seguros
- 📧 **E-mail único** por usuário
- 🔒 **Senhas sempre criptografadas** com Bcrypt

---

## 🏗️ Arquitetura

```
src/
├── auth/           → Autenticação JWT + Guards
├── usuario/        → Módulo de usuários
├── plano/          → Módulo de planos
├── apolice/        → Módulo de apólices
└── app.module.ts
```

> Estrutura modular seguindo o padrão **Controller → Service → Repository (TypeORM)**

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|-----------|
| **NestJS** | Framework backend |
| **TypeScript** | Linguagem de desenvolvimento |
| **MySQL** | Banco de dados relacional |
| **TypeORM** | Integração com o banco |
| **JWT** | Autenticação por token |
| **Bcrypt** | Criptografia de senhas |
| **Class Validator** | Validação de dados |
| **Swagger** | Documentação interativa |
| **Render** | Hospedagem em nuvem |

---

## 🌐 API em Produção

A API está disponível em produção e pode ser testada diretamente pelo Swagger:

🔗 **[https://vittalis.onrender.com/swagger](https://vittalis.onrender.com/swagger)**

Pelo Swagger é possível:
- Visualizar todos os endpoints
- Testar requisições em tempo real
- Validar funcionalidades do sistema

---

## 🧪 Testes Realizados

Testes executados com **Insomnia** e **Swagger**, cobrindo:

- ✅ Cadastro e autenticação de usuários
- ✅ Operações CRUD completas
- ✅ Validação de dados com class-validator
- ✅ Tratamento de erros e exceções
- ✅ Regras de negócio (idade mínima, e-mail único)

---

## 🔮 Visão de Futuro

- [ ] Interface conversacional (tipo chat)
- [ ] Recomendações personalizadas de planos
- [ ] Simulação de seguros
- [ ] Notificações inteligentes
- [ ] Aplicação frontend (web/mobile)

---

## 👥 Equipe

### 🧠 Product Owner

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/lohannab.png" width="100px;"/><br>
      <b>Lohanna Benjamim</b><br>
      <a href="https://github.com/lohannab">@lohannab</a>
    </td>
  </tr>
</table>

### 👩‍💻 Desenvolvimento

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/bruzuppini.png" width="100px;"/><br>
      <b>Bruna Zuppini</b><br>
      <a href="https://github.com/bruzuppini">@bruzuppini</a><br>
      <sub>Usuário</sub>
    </td>
    <td align="center">
      <img src="https://github.com/DougSan7.png" width="100px;"/><br>
      <b>Douglas Santos</b><br>
      <a href="https://github.com/DougSan7">@DougSan7</a><br>
      <sub>Apólice</sub>
    </td>
    <td align="center">
      <img src="https://github.com/kayanedvlsantos-create.png" width="100px;"/><br>
      <b>Kay Ira</b><br>
      <a href="https://github.com/kayanedvlsantos-create">@kayanedvlsantos-create</a><br>
      <sub>Plano</sub>
    </td>
  </tr>
</table>

### 🔐 Segurança

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/Dessxevy.png" width="100px;"/><br>
      <b>Andressa Andrade</b><br>
      <a href="https://github.com/Dessxevy">@Dessxevy</a>
    </td>
  </tr>
</table>

### ⚙️ Infraestrutura / Deploy

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/luhdias-png.png" width="100px;"/><br>
      <b>André Lucas</b><br>
      <a href="https://github.com/luhdias-png">@luhdias-png</a>
    </td>
  </tr>
</table>

### 🧪 Testes (QA)

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/gcoutinhoo.png" width="100px;"/><br>
      <b>Gabriel Coutinho</b><br>
      <a href="https://github.com/gcoutinhoo">@gcoutinhoo</a>
    </td>
  </tr>
</table>

---

## 💛 Propósito

Mais do que vender seguros, o Vittalis busca:

👉 Tornar o cuidado mais **acessível**  
👉 Ajudar pessoas a tomarem **decisões importantes**  
👉 Proteger o que realmente **importa**

> *"Cuidar de quem você ama… começa com uma escolha."*

---

<p align="center">
  <img src="https://img.shields.io/badge/🚀%20Status-Em%20Produção-brightgreen?style=for-the-badge"/>
  &nbsp;
  <a href="https://vittalis.onrender.com/swagger">
    <img src="https://img.shields.io/badge/🔗%20API%20Online-Acessar-FFD700?style=for-the-badge"/>
  </a>
</p>
