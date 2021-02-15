let containers = document.querySelectorAll('.list-item');
let prevButton = document.querySelector('.left-button');
let nextButton = document.querySelector('.right-button');
console.log(containers);






function show_pokemon() {
    let pokemon_desc = document.querySelector('.main-section__black');
    let header_desc = pokemon_desc.querySelector('.screen__header');
    let main_screen = pokemon_desc.querySelector('.main-screen');

    containers.forEach((e) => {
        e.addEventListener("click", () => {
            let pointIndex = e.textContent.indexOf('.');
            let name = e.textContent.slice(pointIndex + 1);
            let id = e.textContent.slice(0, pointIndex);
            header_desc.querySelector('.poke-name').textContent = name;
            header_desc.querySelector('.poke-id').textContent = id;


            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                .then(function (response) {
                    if (response.status == 200) {
                        response.json()
                            .then(function (data) {
                                let pokemon_type = data.types[0].type.name;
                                console.log(pokemon_type);
                                main_screen.classList.remove('hide');
                                main_screen.classList.add(pokemon_type)
                            })
                    }
                })





        });
    })
}





// function createPokemons() {


//     fetch('https://pokeapi.co/api/v2/pokemon/')
//         .then(function (response) {
//             if (response.status == 200) {
//                 response.json()
//                     .then(function (data) {
//                         // console.log(data.results);
//                         // containers.forEach((e) => {

//                         // })
//                         let pokemon_tab = data.results;
//                         console.log(pokemon_tab);
//                         for (let i = 0; i < containers.length; i++) {
//                             const element = pokemon_tab[i];

//                             let id;
//                             let name;
//                             let pokemon_type;
//                             fetch(element.url)
//                                 .then(function (response) {
//                                     if (response.status == 200) {
//                                         response.json()
//                                             .then(function (data) {

//                                                 id = data.id;

//                                                 name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
//                                                 pokeName = `${id}. ${name}`;
//                                                 containers[i].innerHTML = pokeName;


//                                                 pokemon_type = data.types[0].type.name;
//                                                 show_pokemon(pokemon_type)
//                                             })
//                                     }
//                                 })




//                         }
//                     })
//             }
//         })
// }

// createPokemons()







class PokemonObject {
    constructor(product) {
        this.product = product;
    }

    createPokemons() {
        for (let i = 0; i < containers.length; i++) {
            const element = this.product[i];

            let id;
            let name;
            let pokemon_type;
            fetch(element.url)
                .then(function (response) {
                    if (response.status == 200) {
                        response.json()
                            .then(function (data) {

                                id = data.id;

                                name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
                                let pokeName = `${id}. ${name}`;
                                containers[i].innerHTML = pokeName;



                            })
                    }
                })




        }

    }
}











fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(function (response) {
        if (response.status == 200) {
            response.json()
                .then(function (data) {

                    let pokemon_tab = data.results;
                    let pokemonObj = new PokemonObject(pokemon_tab);
                    pokemonObj.createPokemons()
                    show_pokemon()

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })
    .catch(function (error) {
        console.log(error);
    })