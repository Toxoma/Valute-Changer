/* eslint-disable */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const filterData = (data) => {
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {
                    brand,
                    model,
                    price
                } = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
            }
        });
    };

    const promise = new Promise((resolve, reject) => {
        select.addEventListener('change', () => {

            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject('Произошла ошибка');
                }
            });

            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
        });
    });

    promise.then(filterData).catch(err => console.error(err));
});