'use strict';

const firstPromise = new Promise((resolve, reject) => {

    document.addEventListener('click', (ev) => {
        if (ev.button === 0) {
            resolve('First promise was resolved');
        } 
        
    });
    
    setTimeout(() => {
        reject('First promise was rejected');
    }, 3000);

})

const secondPromise = new Promise((resolve) => {
    document.addEventListener('contextmenu', (ev) => {

        ev.preventDefault();

       if (ev.button === -1) {
        resolve('Second promise was resolved');
       }
    })
})

function successHandler(message) {
    const notification = document.createElement('div');
    notification.dataset.qa = 'notification';
    notification.classList.add('success');
    notification.innerHTML = `${message}`

    document.body.appendChild(notification);

}

function errorHandler(message) {
    const notification = document.createElement('div');
    notification.dataset.qa = 'notification';
    notification.classList.add('error');
    notification.innerHTML = `${message}`

    document.body.appendChild(notification);
}


const thirdPromise = new Promise((resolve) => {
    let clickedLeft = false;
    let clickedRight = false;
    
    document.addEventListener('click', (ev) => {
        if (ev.button === 0) {
            clickedLeft = true;
        }

        document.addEventListener('contextmenu', e => {
            if(e.button === -1) {
                clickedRight = true
            }

            if (clickedLeft && clickedRight) {
                setTimeout(() => {
                    resolve('Third promise was resolved');
                }, 500);
            }
        })

    });
});

firstPromise
.then(successHandler)
.catch(errorHandler);

secondPromise
.then(successHandler);


thirdPromise
.then(successHandler);

