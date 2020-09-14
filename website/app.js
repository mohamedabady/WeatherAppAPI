/* Global Variables */
const apiKey = '6e832e606f220e244ecd51c5d1cac56b';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// create event listener for generate button
document.getElementById('generate').addEventListener('click', () => getWeatherData(apiKey));

// ----------------------- functions creations -----------------------
// Post data function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error)
    }
}

// Update UI 
const updateUI = async () => {
    const request = await fetch('/getData');
    try {
        const projectData = await request.json();
        document.getElementById('date').innerHTML = projectData.date;
        document.getElementById('temp').innerHTML = projectData.temperature;
        document.getElementById('content').innerHTML = projectData.userResponse;
    } catch (e) {
        console.log("error", error);
    }
}

// Create get function to get weather data 
const getWeatherData = async (apiKeyValue) => {
    let zipCodeValue = document.getElementById('zip').value;
    let userResponse = document.getElementById('feelings').value;

    if (zipCodeValue === null || zipCodeValue === '' || zipCodeValue === undefined) {
        alert('please enter correct zip code of city!!!');
    } else if (userResponse === null || userResponse === '' || userResponse === undefined) {
        alert('please enter what you are feeling correctly please!!!');
    } else {
        await fetch(`${baseUrl}?zip=${zipCodeValue}&appid=${apiKeyValue}`).then(async (response) => {
            const res = await response.json();

            const dataForPostReq = {
                temperature: res.main.temp,
                date: newDate,
                userResponse: userResponse
            };


            await postData('/postData', dataForPostReq).then(res => {
                updateUI();
            })
        }).catch(e => {
            console.log('error : ' + e)
        })
    }
}