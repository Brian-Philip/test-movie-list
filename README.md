
# Teste Golden Raspberry Awards

Esta API possibilita a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards. 


## Requisitos
Antes de executar este projeto, certifique-se de ter o seguinte instalado:

- Node.js: https://nodejs.org/ (v18.19.0)

- Package manager: npm (v9.5.0)


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Brian-Philip/test-movie-list
```

Entre no diretório do projeto

```bash
  cd test-movie-list
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```



## Uso/Exemplos

```cURL
curl --location 'localhost:3000/producer/getIntervalWinners'
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```