const DB = require("../db/local");
const routerGames = require("express").Router();

routerGames.get("/", (req, res) => {
  res.redirect("/games/");
});

// Listar todos os game
routerGames.get("/games", (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

// Listar um game pelo ID
routerGames.get("/game/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = DB.games.find((g) => g.id === id);

    if (game !== undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  }
});

// Cadastrar GAME
routerGames.post("/game", (req, res) => {
  let { title, price, year } = req.body;

  DB.games.push({
    id: 44,
    title,
    price,
    year,
  });

  res.sendStatus(200);
});

// Deletar um game pelo ID
routerGames.delete("/game/:id", (req, res) => {
  let id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let gameIndex = DB.games.findIndex((g) => g.id === id);

    if (gameIndex === -1) {
      res.sendStatus(404);
    } else {
      DB.games.splice(gameIndex, 1);
      res.sendStatus(200);
    }
  }
});

// Editar um game específico pelo ID
routerGames.put("/game/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let game = DB.games.find((g) => g.id === id);

    if (game !== undefined) {
      let { title, price, year } = req.body;

      if (title !== undefined) {
        game.title = title;
      }

      if (price !== undefined) {
        game.price = price;
      }

      if (year !== undefined) {
        game.year = year;
      }
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

module.exports = routerGames;
