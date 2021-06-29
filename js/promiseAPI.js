/* eslint-disable */
"use strict";

const output = document.getElementById('output');

const getData = (url) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else {
                reject(request.statusText);
            }
        });
        request.send();
    });
};

const outputPhotos = (data) => {
    data.forEach(element => {
        output.insertAdjacentHTML('beforebegin', `<h4>${element.title}</h4>
        <img src="${element.thumbnailUrl}" alt="${element.title}">`);
    });
};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
    twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

Promise.all([oneImg, twoImg]).then(outputPhotos).catch(err => console.error(err));