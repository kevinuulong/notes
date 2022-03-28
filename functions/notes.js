require('dotenv').config();
import fetch from "node-fetch";

const handler = async (event) => {
    try {
        const payload = JSON.parse(event.body);
        let accessCode = payload.accessCode;

        const records = await fetch(`https://api.airtable.com/v0/${process.env.BASE}/Shared%20Notes?view=Grid%20view&filterByFormula=SEARCH("${accessCode}",{Access%20Code})`, {
            method: 'GET',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
            }
        })
            .then(res => res.json())
            .then(result => result.records)

        let notes = records;

        return {
            statusCode: 200,
            body: JSON.stringify(notes),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }