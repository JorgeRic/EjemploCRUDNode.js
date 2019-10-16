const express = require('express');
const router = express.Router();
const Peliculas = require('../models/Peliculas.js');

//Vemos el listado de peliculas
router.get('/', async (req, res, next) => {
  try{
    const peliculas = await Peliculas.find();
    res.render('films/listadoPeliculas', { peliculas });

  }
  catch(error){
    next(error)
  }
});

//Creamos nuevas peliculas
router.get('/crearPelicula', async(req, res, next)=>{
  try{
    res.render('films/crear');
  }
  catch(error){
    next(error)
  }
})

router.post('/', async(req, res, next) => {
  try{
    const nuevaPelic = req.body;
    await Peliculas.create(nuevaPelic);
    res.redirect('/peliculas');
  }
  catch(error){
    next(error)
  }
})

//Buscamos pelicula
router.get('/search', async(req, res, next) => {
  try{
    const titulo =  req.query.titulo;
    const peli = await Peliculas.findOne({titulo});
    res.render('films/filmDetail', peli );
  }
  catch(error){
    next(error)
  }
})

//Peliculas en detalle

router.get('/detail/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const peli = await Peliculas.findById(id);
      res.render('films/filmDetail', peli );
    }
    catch(error){
      next(error)
    }
  })
  
  //Modificar datos pelicula
  
  router.get('/detail/:id/edit', async (req, res, next) => {
  try{
    const id = req.params.id;
    const peli = await Peliculas.findById(id);
    res.render('films/edit', peli);
  }
  catch(error){
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const { titulo, director, anio, actores, genero } = req.body;
    const update = {
      titulo: titulo,
      director: director,
      genero: genero,
      actores: actores,
      anio: anio
    }
    await Peliculas.findByIdAndUpdate(id, update, {new: true});
    res.redirect('/peliculas');
  }
  catch(error){
    next(error)
  }
})

//Eliminar pelicula

router.get('/detail/:id/delete', async (req, res, next) => {
  try{
    const id = req.params.id;
    await Peliculas.findByIdAndDelete(id);
    res.redirect('/peliculas');
  }
  catch(error){
    next(error)
  }
})

module.exports = router;


