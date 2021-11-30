# Boas vindas ao WebChat!

<img align="center" alt="Mari-WebChat" src="http://cdn.onlinewebfonts.com/svg/img_518618.png" height="200" width="250"/>

# Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação do Projeto](#instalação-do-projeto)
- [Desenvolvedora do Projeto](#desenvolvedora-do-projeto)
- [Links para a criação do README](#links-para-a-criação-do-readme)
- [Visite o WebChat](#visite-o-webchat)

---

## Descrição do Projeto

O projeto WebChat consiste em uma aplicação de chat feita em `Node.js`, utilizando o `Socket.io` para emitir eventos e atualizar os estados do servidor e do cliente em tempo real.

Através do cliente será possível enviar e receber mensagens, trocar seu nome, ver usuários online.

A aplicação usa o formato de camadas MVC (_Model, View e Controller_), sendo usado para renderizar as mensagens do histórico e usuários online, com ambos vindo direto do servidor.

A inteface de Back-End foi construída utillizando Node.js com conexão com o banco de dados MongoDB, construindo uma API de *mensagens* para ser integrada com o Front-End, montado com _view engine_ `ejs`.

---

## Tecnologias Utilizadas

<div>
  <img align="center" alt="Mari-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Mari-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg">
  <img align="center" alt="Mari-Socket.io" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original-wordmark.svg">
  <img align="center" alt="Mari-NodeJS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain-wordmark.svg">
  <img align="center" alt="Mari-MongoDB" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg">
</div>

---

## Instalação do Projeto:

1. Comece clonando este repositório digitando o seguinte comando em seu terminal:

  ```
  git clone git@github.com:MarianaSavoldi/WebChat.git
  ```

  - Entre na pasta onde foi criado o repositório:

    ```
    cd WebChat
    ```
    
2. Instale as dependências do projeto:

```
npm install
```

#### Inicialização do Projeto:

1. Primeiro crie um arquivo <code>.env</code> com o seguinte template:

    ```
    DB_URL=mongodb://localhost:27017/nomeDoBanco/
    DB_NAME=nomeDoBanco

    PORT=numeroDaPorta
    ```

    Em seguida certifique-se de que seu banco de dados está ativo:

    ```
    sudo service mongod status
    ```
    
    Se não estiver ativo, rode o seguinte comando:

    ```
    sudo service mongod start
    ```

2. Para iniciar o projeto rode os seguintes comandos no terminal:

    ```    
    npm start
    ```

    - Se quiser iniciar a aplicação utilizando o <code>nodemon</code>, utilize o comando:
      
      ```
      npm run dev
      ```

---

## Desenvolvedora do Projeto

[<img src="https://avatars.githubusercontent.com/u/78616965?v=4" width=110> <br> <sub> Mari Savoldi </sub>](https://github.com/MarianaSavoldi)
| :---: |
<a href="https://www.linkedin.com/in/mariana-savoldi-pereira-76501b197/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>


### Links para a criação do README

  - [Markdown Guide](https://www.markdownguide.org/basic-syntax/);
  - [README.md GitHub](https://dev.to/reginadiana/como-escrever-um-readme-md-sensacional-no-github-4509);
  - [Estrutura do README](https://app.betrybe.com/course/career/personal_portfolio/github/ea1e5823-b988-4c8b-9034-84f522b4108f/readme-de-repositorio/0121f8b1-dabf-4561-864e-78abaa9ebf37/estruturando-seus-readme-de-projetos/98c838f4-f746-49b2-a712-5bf0795bcd5c?use_case=side_bar)

