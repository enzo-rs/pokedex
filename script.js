let box = document.querySelector('.controllers__d-pad')
let bottom_button = box.querySelector('div.bottom');
let left_button = box.querySelector('div.left');
let right_button = box.querySelector('div.right');
let top_button = box.querySelector('div.top');
containers = document.querySelectorAll('.list-item');
let buttonA = document.querySelector('.controllers__buttons .buttons__button:last-child')
let code = "rAtlBlAb";
let second_code = "bAlBltAr";

// KONAMI code start


let str = [];
let elements = box.querySelectorAll('.d-pad__cell');
let buttons_el = document.querySelectorAll('.buttons__button');


function changeColor() {
    let right_container = document.querySelector('.right-container');
    let left_container = document.querySelector('.left-container');
    let left_el = document.querySelectorAll('.left-container__hinge');


    right_container.classList.add('gold');
    left_container.classList.add('gold');
    left_el.forEach((e) => {
        e.classList.add('gold_gradient');
    })

}


function toShiny(key) {
    str.push(key);
    console.log(str);
    if (str.join('') === code) {
        changeColor()
    } else if (str.join('') === second_code) {
        show_pokemon("front_shiny", "back_shiny")
    } else {
        show_pokemon("front_default", "back_default")
    }

    if (str.length >= code.length) {
        str.splice(0, 1)
    }
}

elements.forEach((e) => {
    e.addEventListener('click', () => {
        let key = e.getAttribute('data-key');
        toShiny(key);
    })
})

buttons_el.forEach((e) => {
    e.addEventListener('click', () => {
        let key = e.textContent;
        toShiny(key);
    })
})




let count = 0;

bottom_button.addEventListener('click', () => {
    count++;
    
    selectItem()
})

top_button.addEventListener('click', () => {
    count--;
    
    selectItem()
})

right_button.addEventListener('click', () => {
    count += 10;
    
    selectItem()
})

left_button.addEventListener('click', () => {
    count -= 10;
    
    selectItem()
})

// KONAMI code end




buttonA.addEventListener('click', () => {
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
        if (e.classList.contains('selection')) {




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
                                main_screen.className = '';
                                main_screen.classList.add("main-screen", pokemon_type)


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
                                let back_image = data.sprites[`back_default`];
                                let front_image = data.sprites[`front_default`];

                                image_container.querySelector('.poke-front-image').setAttribute('src', front_image);
                                image_container.querySelector('.poke-back-image').setAttribute('src', back_image);
                                // Add images end

                            })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })


})

function selectItem() {
    for (let i = 0; i < containers.length; i++) {
        const element = containers[i];

        if (count === i) {
            element.classList.add('selection')
        } else if (element.classList.contains('selection')) {
            element.classList.remove('selection')
        }
    }
}



function test(def_front, def_back) {
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
}