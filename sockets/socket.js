const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();


bands.addBand(new Band('Queen 2'))
bands.addBand(new Band('Bon Jovi'))
bands.addBand(new Band('Heroes del silencio'))
bands.addBand(new Band('Metallica'))

console.log(bands)
io.on('connection', client =>{
    
    console.log('cliente conectado')

    client.emit('active-bands',bands.getBands())
    
    client.on('disconnect', () =>{
        console.log('cliente desconectado')
    })


    client.on('mensaje', (payload) =>{
        console.log(payload)

        io.emit('mensaje', {admin: 'nuevo mensaje'})

    })


    client.on('emitir-mensaje', (payload) =>{
        console.log(payoad)

        client.broadcast.emit('nuevo-mensaje', payload);

    })

    client.on('vote-band', payload =>{
        //console.log(payload)

        bands.voteBand(payload.id);

        io.emit('active-bands',bands.getBands())
    })


    client.on('add-band', payload =>{
        console.log(payload)
        bands.addBand(new Band(payload.name))
        io.emit('active-bands',bands.getBands())
    })


    client.on('remove-band', payload =>{
        //console.log(payload)

        bands.deleteBand(payload.id);

        io.emit('active-bands',bands.getBands())
    })


    


})