export function getTheaterShowtimes(key){
    return fetch(`https://teleology.foundation/movies/${key}`)
    .then(response =>{
        if(!response.ok){
            throw new Error(`Unable to get movies for ${key} theater.`)
        }
       else {
        return  response.json()
       }
    })
}
