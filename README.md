# 🛡️ Seguro de Vida API

API backend desenvolvida com **NestJS** para gerenciamento de seguros de vida, permitindo cadastro de usuários, planos e contratação de apólices com autenticação segura via JWT.

---

## 📖 Descrição do Projeto

O sistema tem como objetivo simular uma plataforma de **seguro de vida**, onde usuários podem se cadastrar, visualizar planos disponíveis e contratar seguros.

A aplicação segue o padrão REST e implementa operações completas de CRUD, além de autenticação e autorização com **JWT (JSON Web Token)**.

---

## 🎯 Funcionalidades

* 👤 Cadastro e autenticação de usuários
* 📦 Gerenciamento de planos de seguro
* 📄 Contratação de apólices
* 🔐 Segurança com autenticação JWT
* 📑 Documentação com Swagger
* 🚀 Deploy da aplicação

---

## 🧱 Estrutura do Projeto

O sistema é composto por três entidades principais:

### 👤 Usuário

Responsável por acessar o sistema e contratar seguros.

**Atributos:**

* id
* nome
* email
* senha
* foto
* idade

---

### 📦 Plano

Representa os tipos de seguro disponíveis.

**Atributos:**

* id
* descricao
* valorBase
* cobertura

---

### 📄 Apólice

Representa o seguro contratado pelo usuário.

**Atributos:**

* id
* dataContratacao
* status
* valorFinal
* usuarioId
* planoId

---

## 🔗 Relacionamentos

* Um usuário pode possuir várias apólices (1:N)
* Um plano pode estar vinculado a várias apólices (1:N)

---

## 🧠 Regra de Negócio

Para contratação de seguro de vida:

> Usuários com menos de 18 anos não são elegíveis para contratação.

Caso a regra não seja atendida, o sistema retorna a mensagem:

```
"Não elegível para este tipo de seguro."
```

---

## 🔐 Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação.

* Login com email e senha
* Geração de token
* Proteção de rotas privadas

---

## 🛠 Tecnologias Utilizadas

* Node.js
* NestJS
* TypeScript
* TypeORM
* MySQL
* JWT
* Bcrypt
* Swagger

---

## ▶️ Como executar o projeto

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>

# Entrar na pasta
cd seguro-vida-api

# Instalar dependências
npm install

# Rodar o projeto
npm run start:dev
```

---

## 🧪 Documentação da API

A documentação estará disponível via Swagger em:

```
http://localhost:3000/swagger
```

---

## 👥 Equipe

Projeto desenvolvido em grupo para o Desafio 3 – Projeto Integrador.

---

## 📌 Status do Projeto

🚧 Em desenvolvimento

---
