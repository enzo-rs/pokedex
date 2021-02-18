let code = "rAtlBlAb";


// KONAMI code start

let str = [];
let elements = document.querySelectorAll('div.btn');

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

function konamiCode(key) {
    str.push(key);
    console.log(str);
    if (str.join('') === code) {
        changeColor()
    } 

    if (str.length >= code.length) {
        str.splice(0, 1)
    } 
}

elements.forEach((e) => {
    e.addEventListener('click', () => {
        let key = e.getAttribute('data-key');
        konamiCode(key);
    })
})


// KONAMI code end






