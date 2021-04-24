const App = {

    HTMLTemp: document.querySelector('#temp'),
    HTMLCity: document.querySelector('#city'),
    HTMLFeelsLike: document.querySelector('.feels-like h2'),
    HTMLDay: document.querySelector('.right_container p'),
    daysWeek: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
    data: {},

    getPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            let urlAPI
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
    
            urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=d5e44813f8485c536660b40a402abb7c`
    
            this.fetchAPI(urlAPI)
        })
    },

    fetchAPI(url) {
        fetch(url)
            .then(data => data.json())
            .then(data => {
    
                let city = data.name
                let temp = ((5 / 9) * (data.main.temp - 32)).toFixed(0);
                let feels_like = ((5 / 9) * (data.main.feels_like - 32)).toFixed(0)

                App.setTemp(city, temp, feels_like)
            })
            .catch(error => console.error(error))
    },  

    getDate() {
        const date = new Date()
    
        let indexDay = date.getDay()
        let day = this.daysWeek[indexDay - 1]
    
        let hour = date.getHours()
        let minute = date.getMinutes()
        minute <= 9 ? minute = '0' + minute : minute
        
        let fullHour = hour + ':' + minute

        this.setPosition(day, fullHour)
        
    },

    setTemp(city, temp, feels_like) {
        this.HTMLCity.innerText = city
        this.HTMLTemp.innerText = temp + ' °C'
        this.HTMLFeelsLike.innerText = feels_like  + ' °C'
    },

    setPosition(day, fullHour) {
        this.HTMLDay.innerText = day + ', ' + fullHour
    },

    init() {
        this.getDate()
        this.getPosition()
        this.setTemp()
    }
}

App.init()
