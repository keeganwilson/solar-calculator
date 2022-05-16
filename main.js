/*jslint browser:true */
"use strict";

const addMonths = (elem) => {
    let annualUseKw = 0;
    let dailyUseKw = 0;
    let months = document.getElementById('mpc').getElementsByTagName('input');

    for (let i = 0; i < months.length; i++) {
        let x = Number(months[i].value);
        annualUseKw += x;
    }
    dailyUseKw = annualUseKw / 365;
    return dailyUseKw;
}

const sunHours = () => {
    let hrs = 0;
    let theZone = document.forms.solarForm.zone.selectedIndex + 1;
    switch(theZone) {
        case 1:
            hrs = 6;
            break;
        case 2: 
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4: 
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6: 
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    }
    return hrs;
};

const calculatePanel = () => {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value
    let panel = panelOptions[userChoice].text
    let x = [power, panel];
    return x
}

const calculateSolar = () => {
    let dailyUseKw = addMonths('mpc');
//    console.log(dailyUseKw)

    let sunHoursPerDay = sunHours();
//    console.log(sunHoursPerDay)

    let minKwNeeds = dailyUseKw / sunHoursPerDay;
//    console.log(minKwNeeds);

    let realKwNeeds = minKwNeeds * 1.25;
//    console.log(realKwNeeds)

    let realWattNeeds = realKwNeeds * 1000;

    let panelInfo = calculatePanel()
    let panelOutput = panelInfo[0];
    let panelName = panelInfo[1];

    let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
//    console.log(panelsNeeded);

    let feedback = ``;
    feedback += `<p>Based on your avereage daily use of ${Math.round(dailyUseKw)} kWh, you will need to purchase ${panelsNeeded} ${panelName} solar panels to offset 100% of your electricity bill.</p>`;
    feedback += `<h2>Additional Details</h2>`;
    feedback += `<p>Your average daily electricity consumption: ${Math.round(dailyUseKw)} Kwh per day.</p>`;
    feedback += `<p>Average sunshine hours per day: ${sunHoursPerDay} hours</p>`;
    feedback += `<p>Realistic watts needed per hour: ${Math.round(realWattNeeds)} watts/hr.</p>`;
    feedback += `<p>The ${panelName} panel you selected generates about ${panelOutput} watts/hour.</p>`;

    document.getElementById('feedback').innerHTML = feedback;
}