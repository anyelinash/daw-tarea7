const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cancion = require('./models/cancion');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://0.0.0.0:27017/tarea07', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB conectado!');
}).catch((error) => {
  console.error('Error de conexión a MongoDB:', error);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('formulario');
});

app.post('/guardar-cancion', (req, res) => {
  const nuevaCancion = new Cancion({
    titulo: req.body.titulo,
    artista: req.body.artista,
    genero: req.body.genero,
    anio: req.body.anio
  });
  nuevaCancion.save()
    .then(() => {
      res.redirect('/mostrardatos');
    })
    .catch(error => {
      console.error('Error al guardar la canción:', error);
      res.status(500).send('Error interno del servidor');
    });
});

app.get('/mostrardatos', (req, res) => {
  Cancion.find()
    .then(canciones => {
      res.render('datos', { canciones: canciones });
    })
    .catch(error => {
      console.error('Error al recuperar las canciones:', error);
      res.status(500).send('Error interno del servidor');
    });
});


app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
