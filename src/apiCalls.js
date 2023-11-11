export function getTheaterKeys(){
    return fetch('https://teleology.foundation/movies/theaters')
    .then(response =>{
        if(!response.ok){
            throw new Error(`Unable to get theater info.`)
        }
       else {
        return  response.json()
       }
    })
}

// export function getTheaterShowtimes(id){
//     return fetch(`https://teleology.foundation/movies/${id}`)
//     .then(response =>{
//         if(!response.ok){
//             throw new Error(`Unable to get movies for ${id} theater.`)
//         }
//        else {
//         return  response.json()
//        }
//     })
// }