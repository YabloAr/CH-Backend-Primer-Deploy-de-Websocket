
import express from 'express'


const router = express.Router()

//de momento renderizamos solo la vista, sin pasarle ningun objeto.
router.get('/', (req, res) => {
    res.render('index', {
        style: 'index.css'
    })
})


export default router