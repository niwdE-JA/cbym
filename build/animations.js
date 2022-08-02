function leftSlide (){
    let element = document.getElementsByClassName('slide-left')
    let numArray = element.length

    for( let i=0 ; i < numArray ; i++ ){
        let bound = element[i].getBoundingClientRect()

        if ( window.innerHeight - bound.top >= bound.height *(3/5) && bound.bottom <= (window.innerHeight) + ( element[i].offsetHeight)) {

            element[i].style.animation = '.8s ease 0s 1 normal none running slide-left'
            element[i].style.opacity = 1
        }
        if( bound.bottom < bound.height*(1/2) ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
        if ( bound.top > window.innerHeight ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
    }
}

function rightSlide (){
    let element = document.getElementsByClassName('slide-right')
    let numArray = element.length

    for( let i=0 ; i < numArray ; i++ ){
        let bound = element[i].getBoundingClientRect()

        if ( window.innerHeight - bound.top >= bound.height *(3/5) && bound.bottom <= (window.innerHeight) + ( element[i].offsetHeight)) {

            element[i].style.animation = '.8s ease 0s 1 normal none running slide-right'
            element[i].style.opacity = 1
        }
        if( bound.bottom < bound.height*(1/2) ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
        if ( bound.top > window.innerHeight ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
    }
}

function fadeIn (a){
    let element = document.getElementsByClassName(`fade-in-${a*100}`)
    let numArray = element.length

    for( let i=0 ; i < numArray ; i++ ){
        let bound = element[i].getBoundingClientRect()

        if ( window.innerHeight - bound.top >= bound.height *(3/5) && bound.bottom <= (window.innerHeight) + (element[i].offsetHeight) ) {

            element[i].style.animation = `1s ease 1s 1 normal none running fade-in`
            element[i].style.opacity = 1

        }
        if( bound.bottom < bound.height*(1/2) ){
            element[i].style.animation = `1.5s ease 1s 1 normal none running null`
            element[i].style.opacity = 0
        }
        if ( bound.top > window.innerHeight ){
            element[i].style.animation = `1.5s ease 1s 1 normal none running null`
            element[i].style.opacity = 0
        }
    }
}

function upSlide (){
    let element = document.getElementsByClassName('slide-up')
    let numArray = element.length

    for( let i=0 ; i < numArray ; i++ ){
        let bound = element[i].getBoundingClientRect()

        if ( window.innerHeight - bound.top >= bound.height *(3/5) && bound.bottom <= (window.innerHeight) + ( element[i].offsetHeight)) {

            element[i].style.animation = '1.5s ease 0s 1 normal none running slide-up'
            element[i].style.opacity = 1
        }
        if ( bound.bottom < bound.height*(1/2) ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
        if ( bound.top > window.innerHeight ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
    }
}

function zoomIn (){
    let element = document.getElementsByClassName('zoom-in')
    let numArray = element.length

    for( let i=0 ; i < numArray ; i++ ){
        let bound = element[i].getBoundingClientRect()

        if ( window.innerHeight - bound.top >= bound.height *(3/5) && bound.bottom <= (window.innerHeight) + ( element[i].offsetHeight)) {

            element[i].style.animation = '1.5s ease 0s 1 normal none running zoom-in'
            element[i].style.opacity = 1
        }
        if( bound.bottom < bound.height*(1/2) ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
        if ( bound.top > window.innerHeight ){
            element[i].style.animation = '1.5s ease 0s 1 normal none running null'
            element[i].style.opacity = 0
        }
    }
}

function rotateAboutX () {
    let element = document.getElementsByClassName('marker')[0]
    let image1 = document.getElementsByClassName('phone')[0]
    let image2 = document.getElementsByClassName('mobile')[0]
    let image3 = document.getElementsByClassName('desktop')[0]    
    let bound = element.getBoundingClientRect()
    let scalar = (window.innerHeight - bound.top) / bound.height


    image1.style.transform = `rotate3d(-1, 0, 0, ${ -(100*(1 - scalar)) }deg )`

    image2.style.transform = `translateX(${ -70*(1 - scalar) }%)`
    image2.style.opacity = `${scalar}`

    image3.style.transform = `translateX(${ 70*(1 - scalar) }%)`
    image3.style.opacity = `${scalar}`
}


// STICKY NAVBAR

function stickNavbar () {
    let navbar = document.getElementsByClassName('navbar')[0]
    let bound = window.pageYOffset

    if ( bound > 70 ){
        navbar.style.position = 'fixed'
        navbar.style.backgroundColor = '#000000e8'
    }
    else{
        navbar.style.position = 'initial'
        navbar.style.backgroundColor = 'transparent'
    }
}

function animationTrigger () {
    // rightSlide()
    // leftSlide()
    // upSlide()
    fadeIn(0.3)
    // zoomIn()

    stickNavbar()
    // rotateAboutX()
}


window.addEventListener( 'scroll', animationTrigger )


