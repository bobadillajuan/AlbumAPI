const { Router } = require("express")
const router = Router()
const { db } = require('../firebase')
const axios = require("axios")

router.get('/artistas', async (req, res) => {
    
    try{
    const artistas = await db.collection('artistas').get()
    const datos = artistas.docs.map((artista) => {
        return{

            id: artista.id,
            ...artista.data()
            
        }
    })
    res.send(datos)
    }
    catch(err){
        res.send('Ocurrió un error')
    }

})

router.get('/artistas/:id', async (req, res) => {
    const id = req.params.id
		const datos = await db.collection('artistas').doc(id).get()
		res.send(datos.data())
})



router.get('/albumes', async (req, res) => {
    try{
    const albumes = await db.collection('albumes').get()
    const datos = albumes.docs.map((album) => {
        return{
            id: album.id,
            ...album.data()
        }
    })
    res.send(datos)
    }
    catch(err){
        res.send('Ocurrió un error')
    }
})

router.get('/albumes/:id', async (req, res) => {
    const id = req.params.id
	const datos = await db.collection('albumes').doc(id).get()
	res.send(datos.data()) 
})

router.post('/agregarAlbum', async (req, res) => {
    const album = req.body
    await db.collection('albumes').add({
    nombre: album.nombre,
    genero: album.genero,
    artista: album.artista,
    canciones: album.canciones,
    año: album.año
    })
    res.send(album)
})

function addAlbum(nombre, genero, artista, año, canciones) {
  return db.collection("albumes").add({
    nombre: nombre,
    genero: genero,
    artista: artista,
    año: año,
    canciones: canciones
  });
}

// const songs = ["Hellfire", "Sugar/Tzu", "Eat Men Eat", "Welcome to Hell", "Still", "Half Time", "The Race Is About to Begin", "Dangerous Liaisons", "The Defence", "27 Questions"];

// addAlbum("Hellfire", "Experimental rock, progressive rock", "Black Midi", 2022, songs)
// .then(function() {
// console.log("Álbum agregado correctamente");
// })
// .catch(function(error) {
// console.error("Error al agregar álbum: ", error);
// });

// router.get('/album/:id', async (req, res) => {
//     const id = req.params.id
// const datos = await db.collection('album').doc(id).get()
// res.send(datos.data())
// })

// router.put('/album/:id', async (req, res) => {
//     try {
//       const id = req.params.id;
//       const nombre = req.body.nombre;
//       const genero = req.body.genero;
//       await db.collection('album').doc(id).update({
//         nombre: nombre,
//         genero: genero
//       });
//       res.send({ message: 'Álbum actualizado correctamente' });
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   });


module.exports = router