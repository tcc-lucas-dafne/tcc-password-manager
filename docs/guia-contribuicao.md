# Guia de contribuição

## 1. Introdução

Para contribuir com o projeto, siga as orientações deste guia de contribuição.

## 2. Diretrizes para contribuir

### 2.1 Politica de branches

#### Branchs de desenvolvimento e produção

Nos repositórios do código do projeto temos uma branch principal, a **main** e a branch de desenvolvimento, a **develop**. 

A branch mais estável, do ambiente em produção, é a branch  **main**. Essa branch está configurada para impedir commits diretos e requer que as novas funcionalidades sejam desenvolvidas por meio de Pull Requests (PRs).

#### Novas Branchs

As novas funcionalidades devem ser desenvolvidas em branches que derivam da branch "develop", seguindo o formato "x-nome-da-issue", onde "x" é o número correspondente à issue que será resolvida naquela branch, seguido pelo nome descritivo da issue.

Os Pull Requests devem ser abertos para a branch **develop**.

Para pequenas correções ou bugs, as branches com a resolução devem ser nomeadas seguindo o formato "FIX-x-problema-a-ser-resolvido", onde "x" representa o número da issue. Caso não haja issue relacionada, o padrão de nome para a branch deve ser "FIX-problema-a-ser-resolvido".

### 2.2 Política de Commit

#### Mensagens de Commits

Os commits devem aderir às diretrizes de mensagens estabelecidas pelo [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) [1]. As seguintes regras também se aplicam:

- A mensagem do commit deve ser escrita em Português;

- O commit deve referenciar a issue;

- Um commit deve representar uma unidade de trabalho. 

Exemplo: **Issue 1: Criar pipeline CI**

```
git commit -m "#1 feat: criado o pipeline CI"
```

#### Pareamento

Para pareamentos, os _commits_ devem conter autores e co-autores, seguindo o seguinte padrão:

```
Mensagem do commit

Signed-off-by: Nome do responsável <responsavel@email.com>
Co-authored-by: Nome do co-autor <coautor@email.com>
```

## 3. Referências

> [1] CONVENTIONAL COMMITS. Conventional Commits. Disponível em: https://www.conventionalcommits.org/en/v1.0.0/


## 4. Histórico de versão

|**Data**|**Descrição**|**Autor(es)**|
|--------|-------------|--------------|
| 01/04/2024 | Criação do Guia de Contribuição | Dafne Moretti |


