const app = require("./src/app");
const routerGames = require("./src/router/game");

app.use("/", routerGames);

app.listen(3000, () => {
  console.log("Servidor Rodando: http://localhost:3000");
});
