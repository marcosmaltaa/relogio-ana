app = Vue.createApp({
    data(){
        return {
            hour: [],
            day: false,
            secToStart: 5,
            count: 0
        }
    },

    methods: {
        geraHorario(){
            const array = [];
            const quantity = !this.day ? 11 : 12;

            let currentDate = new Date();
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);

            for (let i = 0; i < quantity; i++) {
                array.push(new Date(currentDate));
                currentDate = new Date(currentDate.getTime() + (30 * 60 * 1000));
            }
            array.shift();
            currentDate = array.at(-2);
            array.splice(-2);
            for (let i = 0; i < 3; i++) {
                array.push(new Date(currentDate));
                currentDate = new Date(currentDate.getTime() + (15 * 60 * 1000));
            }
            this.hour = array;
        },

        startClock(){
            clearInterval(this.clockId);
            this.now = new Date();
            this.clockId = setInterval(() => {
                this.now = new Date();
            }, 1000);
        },

        passou(horario){
            return this.now >= horario;
        },

        count_seconds(){
            const sound = new Audio('src/Sheets/Sound/Tick.mp3');

            const timerId = setInterval(() => {
                sound.play();
                this.count++;
                if (this.count > this.secToStart) {
                    clearInterval(timerId);
                    this.count = 0;
                    this.geraHorario();
                    this.startClock();
                }
            }, 1000);
        }
    }

});

app.mount("#main-local")