db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1940-03-04'
})


    docker exec -it c26eeda987dd mongo -u ericgomes -p 12345 authenticationDatabase heroes
    5c5239df0434

docker run \
 --name mongodb \
 -p 27017:27017 \
 -e MONGO_INITDB_ROOT_USERNAME=admin \
 -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
 -d \
 mongo:4

docker exec -it 151c67f3d1cd mongo -u admin -p senhaadmin --authenticationDatabase admin



db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNacimento: '1940-08-12'
})


for(let i = 0; i <= 10000; i++){
    db.herois.insert({
        nome: `Flash-${i}`,
        poder: 'Velocidade',
        dataNacimento: '1940-08-12'
    })
}

db.herois.findOne()
db.herois.find().limit(100).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0})

//create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNacimento: '1940-08-12'
})

//read
db.herois.find()

// update
db.herois.update({ _id:  ObjectId("653976e868a4e60086efd5f9") },
        {nome: 'Mulher maravilha'})

db.herois.update({ poder: 'Velocidade' }, 
        { $set: { poder: 'Super-força'}})


//guardar codigo

> db.herois.find({nome: 'Mulher maravilha'})

//delete
db.herois.remove({nome: 'Mulher maravilha'})





