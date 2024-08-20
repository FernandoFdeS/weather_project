
# WeatherAPP
Projeto de aplicação para consulta e comparação de clima em diferentes localidades. 
(gif)
### Frameworks e Tecnologias Utilizadas
- **React** (18.3.1)
- **Laravel** (11)
- **Boostrap** 5

### Estrutura do projeto
- **Front-end**
	- Segui uma abordagem de estrutura visando a quebra das páginas em componentes *(src/components)* menores, seguindo a ideia do React.
	-  As *views* *(/react/src/views)* então, são montadas a partir de seus respectivos componentes.
	-  O *Router* *(/react/src/Router.tsx)* então renderiza as views de acordo com a url atual. Temos apenas duas URLs:
		- / = Página principal, onde é possível pesquisar as cidades.
		- /favorites = Onde são listadas as cidades marcadas como favoritas e também é possível comparar essas cidades.
	- Utilizei alguns *packages* para melhorar a experiência do usuário com ícones expressivos e feedback das ações, como por exemplo: *Weather Icons React*, *Hero Icons* e o *Toastify*.
	- Foi utilizado o *Axios* como *client* de requisições.
	- Para a parte visual utilizei o *Bootstrap*, mas a grande maioria dos estilos foi feito usando *CSS* puro. Em relação a nomenclatura das classes eu tentei seguir a padronização BEM (block,element,modifier).

- **Back-end**
	- Foi desenvolvido em Laravel, conta apenas com um Model, uma Controller e 4 rotas:
		- api/locations (get)
		- api/locations/{location} (get)
		- api/locations (post)
		- api/locations/{id} (delete)
	- Além disso foi criada uma *Request* personalizada para validação no caso de uma requisição de cadastro de localização *(app/Http/Requests/LocationRequest)*, para garantir que o dado não seja nulo e que seja único.

- **Banco de Dados**
	- A estrutura do banco também é relativamente simples, possui apenas uma tabela, *Location*, que salva as localizações/cidades que foram favoritadas.
	(img)

### Configuração
Antes de configurar o projeto é necessário fazer a instalação do [React](https://pt-br.react.dev/learn/start-a-new-react-project) , do [PHP](https://www.php.net/manual/en/install.php) e do [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos).
Com tudo já instalado é necessário rodas os comandos abaixo para instalar as dependências:
`composer install`
`cd react && npm install`

Também é necessário configurar os arquivo de ambiente:
- /react/.env
	- Usar o *.env.example* como exemplo.
	- É necessário colocar uma chave valida da **API** do [Weatherstack](https://weatherstack.com/) para a aplicação funcionar corretamente.
	
### Rodando a aplicação
Para executar o back-end:
	- `php artisan serve`
	
Para executar o front-end:
	- `cd react && npm run dev`

### Outras considerações
Poderia ter estruturado melhor o projeto, acredito que existem algumas partes que podem ser quebradas em componentes menores ainda.

Na parte dos estilos, como citado anteriormente, tentei seguir o padrão de nomenclatura de classes *BEM*, mas, com o perdão do trocadilho, acho que não segui tão bem assim.

A parte do back-end é relativamente pequena, fiquei até com a impressão de ter esquecido de algo.

Para um projeto simples assim talvez o uso do Laravel pareça um exagero, mas em um cenário onde o projeto aumenta de tamanho/complexidade o Laravel conseguiria lidar muito bem com a situação. 
