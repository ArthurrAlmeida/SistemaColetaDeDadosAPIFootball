
# API de Futebol ⚽️

Sistema desenvolvido em **TypeScript** usando o framework **NestJS**. Ele fornece endpoints para consultar dados de futebol, como informações de partidas, times, ligas, entre outros. 
O projeto utiliza **PostgreSQL 16** como banco de dados e **TypeORM** para a camada de ORM. A documentação do sistema é gerada com **Swagger**.

API utilizada: https://apifootball.com/

## Desenho do projeto
![Desenho Projeto](https://github.com/user-attachments/assets/71c5d3e6-bb40-49e4-a80e-20cfd7b3c13e)


## Desenho do banco
![Desenho do BD](https://github.com/user-attachments/assets/dbd3e640-9c3f-4a73-9a11-5b694413c0e1)

Link para acesso do desenho e código: https://dbdiagram.io/d/Copy-of-Untitled-Diagram-67192de997a66db9a3086745

## Tecnologias e Dependências

- **TypeScript**
- **NestJS**
- **Swagger** (documentação da API)
- **PostgreSQL 16** (banco de dados)
- **TypeORM** (ORM)
- **Yarn** (gerenciador de pacotes)

### Pacotes Principais

- `@nestjs/axios` `^3.1.0`
- `@nestjs/common` `^10.0.0`
- `@nestjs/core` `^10.0.0`
- `@nestjs/platform-express` `^10.0.0`
- `@nestjs/schedule` `^4.1.1`
- `@nestjs/swagger` `^8.0.1`
- `@nestjs/typeorm` `^10.0.2`
- `axios` `^1.7.7`
- `pg` `^8.13.0`
- `postgres` `^3.4.4`
- `reflect-metadata` `^0.2.0`
- `rxjs` `^7.8.1`
- `swagger-ui-express` `^5.0.1`
- `typeorm` `^0.3.20`

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v16+)
- [Yarn](https://classic.yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v16)

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/sua-api-futebol.git
   cd sua-api-futebol
   ```

2. **Instale as dependências**:

   ```bash
   yarn install
   ```

3. **Configuração do Banco de Dados**:

   - Crie um banco de dados no PostgreSQL para a API.
   - Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente com os detalhes do banco de dados:

     ```env
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USERNAME=seu_usuario
     DATABASE_PASSWORD=sua_senha
     DATABASE_NAME=nome_do_banco
     ```

4. **Execute as Migrations** para criar as tabelas no banco de dados:

   ```bash
   yarn typeorm migration:run
   ```

## Executando a Aplicação

```bash
yarn start:dev
```

A aplicação estará rodando em `http://localhost:3000`.

## Documentação da API

A documentação da API está disponível no endpoint `/api-docs`. Para acessá-la, inicie a aplicação e visite:

```
http://localhost:3000/api-docs
```

## Estrutura do Projeto

```markdown
src
├── controllers/
│   ├── playerController.ts  # Arquivo de controller de jogadores
│   └── teamController.ts       # Arquivo de controller dos times
│
├── entities/
│   └── game.ts          # Entidade do jogo
│   └── index.ts          # Entidade central que liga todas as entidades
│   └── lineUp.ts          # Entidade das escalações
│   └── player.ts          # Entidade com todos os jogadores da liga
│   └── statistics.ts          # Entidade das estatisticas dos jogos
│   └── team.ts          # Entidade dos times da competição
│
├── repositories/
│   └── gameRepository.ts          # Repositório para a entidade de jogos
│   └── lineUpRepository.ts          # Repositório para a entidade de escalações
│   └── playerRepository.ts          # Repositório para a entidade de jogadores
│   └── statisticsRepository.ts          # Repositório para a entidade de estatisticas de jogos
│   └── teamRepository.ts          # Repositório para a entidade dos clubes da competição
│
├── useCases/
│   └── getGameDay.ts                       # Get para trazer os dados daquele dia
│   └── getGameService.ts                   # Get para recolher dados dos jogos em listas
│   └── getPlayerService.ts                   # Get para recolher dados dos jogadores em listas
│   └── getTeamService.ts                   # Get para recolher dados dos times em listas
│   └── listGameService.ts                   # List para armezenar os dados de jogos
│   └── listPlayerService.ts                   # List para armezenar os dados de jogadores
│   └── listTeamService.ts                   # List para armezenar os dados de times
│
├── users/
│   ├── users/                 # Swagger // Frontend

```

## Scripts

- **Iniciar a aplicação**: `yarn start`
- **Iniciar em modo desenvolvimento**: `yarn start:dev`
- **Executar testes**: `yarn test`
- **Executar migrations**: `yarn typeorm migration:run`
