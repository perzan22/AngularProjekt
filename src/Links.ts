//przechowanie adresów dla różnych rodzajów zapytań

const Links = {
    postInsert: "http://localhost:3001/apiPostInsert",                // zapytanie Insert z parametrami
    postSelectParams: "http://localhost:3001/apiPostSelectParams",    // zapytanie Select z parametrami
    get: "http://localhost:3001/apiGET",                              // zapytanie Get
    postSelect: "http://localhost:3001/apiPostSelect"                 // zapytanie Select bez parametrów
  };
  
  export default Links;