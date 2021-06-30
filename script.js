/* eslint-disable */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';


    const select = document.getElementById('valuta');
    const sections = document.querySelectorAll('.block'),
        usdStr = 'Доллар США (USD)',
        eurStr = 'Евро Европа (EUR)';

    let current ="USD",
        currentValue;


    const getData = () => {
        return fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    };

    const changeText = (value) => {
        const labels = document.querySelectorAll('.change-text');
        labels.forEach(label => {
            label.textContent = value == "USD" ? usdStr : eurStr;
        });
    };

    select.addEventListener('change', (e) => {
        current = e.target.value;
        changeText(current);
        update(current);
    });

    sections.forEach(section => {
        const btn = section.querySelector('.btn');

        btn.addEventListener('click', () => {
            const input = section.querySelector('.write'),
            output = section.querySelector('.output');
            if (section.classList.contains('block-1')) {
                output.value = parseFloat(+input.value*currentValue).toFixed(2);
            }else{
                output.value = parseFloat(+input.value/currentValue).toFixed(2);
            }
        });

    });

    const update = (money)=>{
        getData()
        .then(response => {
            return response.json();
        })
        .then(data => {
            const arr = Object.values(data.Valute);
            currentValue = arr.filter(item => item.CharCode === money)[0].Value;
            return currentValue;
        })
        .catch(err => {
            console.error('!!!' + err);
        });
    };

    update(current);

});