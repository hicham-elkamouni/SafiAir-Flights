module.exports = queries= {

    getFlights:(departureStation, arrivalStation, DATETIME, places)=>`SELECT * FROM flights, dates, escale where flights.flight_id = dates.flight_id_fk and flights.departureStation = '${departureStation}' and flights.arrivalStation = '${arrivalStation}' and dates.departDate >= '${DATETIME}' and '${places}' <= flights.places and flights.flight_id = dates.flight_id_fk`,

    insertClient:(fName, lName, email, tel, passport) => `INSERT INTO client(fName, lName, email, tel, passport) VALUES ('${fName}','${lName}','${email}','${tel}','${passport}')`,
    
    book:(client_id, flight_id)=>`INSERT INTO reservations (client_id_fk, flight_id_fk) VALUES('${client_id}','${flight_id}')`,
    
}