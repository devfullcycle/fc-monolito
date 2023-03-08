## Projeto Migrations:

---

## Migrations:

Podemos relacionar o conceito de `Migrations` com o de controle de versão `(Git)`, podemos gerenciar as alterações do banco de dados utilizando `Migrations`.

Com as migrações podemos transferir o banco de dados atual para outro estado e vice-versa, quando realizamos esta transição de estado elas ficam salvas em um arquivo de migração, que irá descrever como chegar ao novo estado ou caso precise como reverter para retornar ao estado antigo.

---

## Motivação:

### Esta `Branch` foi criada como demonstração de como podemos ter duas `Models` diferentes apontando para a mesma tabela do banco de dados.

### Usamos `Typescript`, `Sequelize`, `Sqlite` e para realizar as `Migrations` utilizamos o `Umzug` que é uma `lib` mantida pela equipe de `sequelize`.

### Podemos reparar neste exemplo que as colunas de cada `model` são praticamente idênticas, apenas a última coluna que se diferencia pois a `model` de `productResgistration` temos o `purchasePrice` e na `model` `product` temos o `salePrice`.

### Com isso precisamos apontar para a mesma tabela `products` mas as duas colunas diferentes precisam ser incluídas nesta tabela.

### Quando realizamos o `up` com o `migration` do `Umzug` ele cria a tabela com base em um arquivo previamente configurado com as colunas necessárias, então ao realizarmos os testes nas duas `models` temos a tabela com todas as colunas.

---

## Executando: 

Faça o clone:

`git clone: https://github.com/devfullcycle/fc-monolito.git`

Altere para a Branch migrations:

`git checkout migrations`

Vá até a pasta do projeto:

`cd fc-monolito`

Instalando as dependências:

`npm install`

Rode os testes:

`npm test`