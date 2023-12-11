# COMO RODAR OS TESTES
## Vídeo com a execução dos testes:
Dada a extensa configuração necessária para configurar e efetivamente executar os testes optamos por deixar como complemento o seguinte vídeo, que mostra a execução bem-sucedida de todos os 11 cenários escritos pelo grupo:
[Vídeo Demonstração](https://drive.google.com/file/d/1n0qHqnQAaQkkAL2oi0DDlJYPki4rONOz/view?usp=sharing)

## Fluxo de trabalho e organização do código
Enfrentamos uma série de dificuldades para escrever e rodar os testes nesse projeto. Toda a configuração e escrita dos testes foi feita na branch `feature/AcceptanceTesting`, contando com commits pequenos e objetivos que incrementalmente aumentaram nossa quantidade de cenários

O primeiro commit inclui uma série de pacotes e configurações necessárias para o funcionamento do cucumber, selenium e chrome driver. Os seguintes progressivamente adicionaram os cenários de teste. Houveram também commits visando melhorar a qualidade da organização do código de teste

##Configurando a execução dos testes
Os seguintes passos foram tomados para configurar e executar os testes:
1. Configurar e rodar projeto de acordo com instruções originais

2. Instalação e configuração do Cucumber seguindo a documentação oficial: [documentação cucumber](https://cucumber.io/docs/guides/10-minute-tutorial/?lang=javascript)

3. Instalação selenium-webdriver:  `npm install selenium-webdriver`

4. Instalação chai (biblioteca de verificações): `npm install chai`

5. Instalação Chromedriver: `npm install chromedriver`

Um dos problemas que enfrentamos foi a incompatibilidade do cucumber com a versão de node exigida pelo projeto Pauliceia. Para contorna-lo, foi necessário manter duas versões do node instaladas utilizando a ferramenta NVM. Utilizamos a versão 8.17.0 do node para rodar o projeto Pauliceia e 21.4.0 para rodar os testes com Cucumber. O processo de execução dos testes se deu da seguinte maneira: 

1. Alterar versão do node para compatível com Pauliceia: `nvm use 8.17.0`
2. Rodar projeto: `npm run dev`
3. Em outro terminal, alterar versão do node para compatível com Cucumber: `nvm use 21.4.0`
4. Rodar testes: `npm test`

#### Para que os testes funcionem adequadamente é necessário que a API esteja funcionando
Dada a grande dificuldade de executar o back-end da aplicação localmente, optamos por utilizar as urls de produção para obter dados para nossos testes. Apesar dessa solução estar longe de ser ideal, ela acaba não sendo prejudicial dado que os testes de aceitação aqui desenvolvidos não modificam nenhuma informação no banco de dados. Fizemos apenas chamadas para popular a interface front-end e viabilizar testes mais complexos. Em um cenário ideal, o correto seria utilizar estratégias de fabricação de dados para popular a interface front-end. Entretanto, dado a estrutura arquitetural na qual o projeto se encontra hoje, uma refatoração nesse sentido seria muito extensa e inviável para o escopo desse trabalho

Para conseguir que as chamadas  à API de produção funcionem foi necessário fazer as seguintes modificações no arquivo `dev.env.js`:
```
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // urlVGI: '"http://localhost:3001"',
  urlVGI: '"https://pauliceia.unifesp.br/api/vgi"',
  // urlGeoserverPauliceia: '"http://localhost:9021/geoserver/pauliceia"',
  urlGeoserverPauliceia: '"https://pauliceia.unifesp.br/geoserver/pauliceia"',
  urlGeoserveOther: '"https://pauliceia.unifesp.br/geoserver/other"',
  urlGeocoding: '"https://pauliceia.unifesp.br/api/geocoding"',
  keyCripto: '"keytest"'
})
```

Essas modificações não foram comitadas, uma vez que irão interferir em uma série de outras funcionalidades. 

# README ORIGINAL: 
# pauliceia front-end

Pauliceia 2.0 project front-end.


## Dependencies

Requires:

- Node: v8.17.0
- NPM: >=6.13.4 <=6.14.8

You can install the above versions globally on your machine or through [NVM](https://github.com/nvm-sh/nvm).


## Install

Create the `config/prod.env.js` file and install the dependencies:

```
$ cp config/prod.env.js.EXAMPLE config/prod.env.js
$ npm i
```

## Run

Run locally with hot reload by using one of the following commands:

```
$ npm start
$ npm run dev
```

Now you can access: http://localhost:8080

Or build for production with minification:

```
$ npm run build
```

Or build for production and view the bundle analyzer report

```
$ npm run build --report
```
