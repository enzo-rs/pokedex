const list_item = document.querySelectorAll('.list-item'); 
const name_box  = document.querySelector('.poke-name');
const id_box    = document.querySelector('.poke-id');
const main_screen = document.querySelector('.main-screen');
const poke_weight = document.querySelector('.poke-weight');
const poke_height = document.querySelector('.poke-height');
const poke_type_one  = document.querySelector('.poke-type-one');
const poke_type_two  = document.querySelector('.poke-type-two');
const poke_front_img = document.querySelector('.poke-front-image');
const poke_back_img  = document.querySelector('.poke-back-image');
const prev_button    = document.querySelector('.left-button');
const next_button    = document.querySelector('.right-button');
let prev;
let next;



async function getPokemon(url) {

    if (url == "")
        throw new Error('url manquant');
    else {
        try {
            const response = await fetch(url);
            const data     = await response.json();
            const pokemon_tab = data.results; // Récupérer le tableau de pokemon
            data_prev     = data.previous;
            data_next     = data.next;
          
            if (!pokemon_tab) {
                const pokemon_name = data.name
                const pokemon_id   = data.id;
                const weight       = data.weight;
                const height       = data.height;
                const types        = data.types;
                const images       = data.sprites;
                return [pokemon_name, pokemon_id, types, weight, height, images];
            }
            return [pokemon_tab, data, data_prev, data_next];
        } catch (err) {
            throw new Error(err)
        }
    }
}


function toUpperCase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function idShape(id) {
    let shape = "#000";
    let idStr = id.toString()
    return shape.slice(0, 4 - idStr.length) + id;
}


async function show_poke_info(data_info, item) {
    item.addEventListener('click', () => {
        const pokemon_name   = data_info[0];
        const pokemon_id     = data_info[1];
        const pokemon_types  = data_info[2];
        const pokemon_weight = data_info[3];
        const pokemon_height = data_info[4];
        const pokemon_images = data_info[5];    


        name_box.innerHTML = toUpperCase(pokemon_name);
        id_box.innerHTML   = idShape(pokemon_id);
        

        // Type info start
        let type_one = pokemon_types[0].type.name;
        poke_type_one.innerHTML = type_one
        if (pokemon_types.length == 2) {
            poke_type_two.classList.remove('hide');
            let type_two = pokemon_types[1].type.name;
            poke_type_two.innerHTML = type_two;
        } else {
            poke_type_two.classList.add('hide')
        }
        // Type info end

        // change background color start
        main_screen.className = '';
        main_screen.classList.add('main-screen', type_one)
        // change background color end

        poke_weight.innerHTML = pokemon_weight;
        poke_height.innerHTML = pokemon_height;


        // Pokemon images start
        const back_image  = pokemon_images["back_default"];
        const front_image = pokemon_images["front_default"];

        poke_front_img.setAttribute('src', front_image);
        poke_back_img.setAttribute('src', back_image);                                      
        // Pokemon images end


    })
}




async function show_pokemons(url = 'https://pokeapi.co/api/v2/pokemon/') {
    const poke_data = await getPokemon(url);
    
    const pokemon_tab = poke_data[0];
    const data = poke_data[1];
    prev = poke_data[2];
    next = poke_data[3];
    for (let i = 0; i < pokemon_tab.length; i++) {
        const element = pokemon_tab[i];
        
        const poke_data_info = await getPokemon(element.url);
        let poke_name = `${poke_data_info[1]}. ${toUpperCase(element.name)}`;
        list_item[i].innerHTML = poke_name; // On affiche le nom et l'id de nos pokemons

        show_poke_info(poke_data_info, list_item[i]);

    }
};


function previousPage() {
    if (prev) {
        show_pokemons(prev);
    }
}
function nextPage() {
    if (next) {
        show_pokemons(next);
    }
}

prev_button.addEventListener('click', previousPage);
next_button.addEventListener('click', nextPage);

show_pokemons();

