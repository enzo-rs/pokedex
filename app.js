let containers = document.querySelectorAll('.list-item');
let prevButton = document.querySelector('.left-button');
let nextButton = document.querySelector('.right-button');
let prev;
let next;

function show_pokemon(def_front, def_back) {
    let pokemon_desc = document.querySelector('.main-section__black');
    let header_desc = pokemon_desc.querySelector('.screen__header');
    let main_screen = pokemon_desc.querySelector('.main-screen');
    let stats = pokemon_desc.querySelector('.screen__stats');
    let stats_weight = stats.querySelector('.stats__weight');
    let stats_height = stats.querySelector('.stats__height');
    let type_one = pokemon_desc.querySelector('.poke-type-one');
    let type_two = pokemon_desc.querySelector('.poke-type-two');

    let old_type;
    let new_type;
    containers.forEach((e) => {
        e.addEventListener("click", () => {
            let pointIndex = e.textContent.indexOf('.');
            let name = e.textContent.slice(pointIndex + 1);
            let id = e.textContent.slice(0, pointIndex);
            const finalId = idShape(id);
            header_desc.querySelector('.poke-name').textContent = name;
            header_desc.querySelector('.poke-id').textContent = finalId;
            main_screen.classList.remove('hide');


            // Modify background color start
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                .then(function (response) {
                    if (response.status == 200) {
                        response.json()
                            .then(function (data) {

                                let pokemon_type = data.types[0].type.name;
                                old_type = new_type;
                                new_type = pokemon_type;


                                if (new_type !== old_type) {
                                    main_screen.classList.add(new_type);
                                    main_screen.classList.remove(old_type);
                                }
                                // Modify background color end

                                // Add weight and height start
                                let weight = data.weight;
                                let height = data.height;
                                stats_weight.querySelector('.poke-weight').innerHTML = `${weight}`
                                stats_height.querySelector('.poke-height').innerHTML = `${height}`
                                // Add weight and height end


                                // Add types start
                                if (type_two.classList.contains('hide')) {
                                    type_two.classList.remove('hide')
                                }
                                let typea = data.types[0].type.name;
                                type_one.textContent = typea;


                                if (data.types.length === 2) {
                                    let typeb = data.types[1].type.name;
                                    type_two.textContent = typeb;
                                } else {
                                    type_two.classList.add('hide')
                                }
                                // Add types end


                                // Add images start
                                let image_container = pokemon_desc.querySelector('.screen__image');
                                let back_image = data.sprites[`${def_front}`];
                                let front_image = data.sprites[`${def_back}`];

                                image_container.querySelector('.poke-front-image').setAttribute('src', front_image);
                                image_container.querySelector('.poke-back-image').setAttribute('src', back_image);
                                // Add images end

                            })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        });
    })
}


function idShape(id) {
    let shape = "#000";
    let idStr = id.toString()
    let finalID = shape.slice(0, 4 - idStr.length) + id;
    return finalID;
}

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

// Next and Prev Buttons end

function printPokemons(url) {
    fetch(url)
        .then(function (response) {
            if (response.status == 200) {
                response.json()
                    .then(function (data) {
                        let pokemon_tab = data.results;
                        let pokemonObj = new PokemonObject(pokemon_tab);
                        pokemonObj.createPokemons()
                        prev = data.previous;
                        next = data.next;
                        let old_prev;
                        let old_next;


                        show_pokemon("front_default", "back_default");
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}




prevButton.addEventListener('click', () => {
    if (prev !== null) {
        printPokemons(prev);
    }
});


nextButton.addEventListener('click', () => {
    if (next !== null) {
        printPokemons(next);
    }
});


printPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');