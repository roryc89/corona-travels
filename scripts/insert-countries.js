const countries = require("./countries.json")
const { Client } = require('pg')
require('dotenv').config()

const client = new Client(process.env.DB_URL)

const go = async () => {
    await client.connect()

    const result =  await Promise.all(countries.map((country) => 

        client.query(`
            insert into countries
            (name, code)
            VALUES ($1, $2)
        
        `, [country.name, country.code])

    ))

    console.log('result', result);
    await client.end()
    
}

go();