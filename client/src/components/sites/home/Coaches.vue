<template lang='pug' v-if="CoachesArray">
    div#coaches
        div.page-title
            i(class='fas fa-users')
            p
                | Trenerzy
        div.coaches-content(ref='coachesContent')
        div.coaches-slider
            div.coaches-slider_circle(ref='sliderCircle' v-for='n in this.array.CoachesArray.length' @click='slider(0, 5000)')


</template>
<script>
import PageTitle from '../../pieces/PageTitle.vue';
import CoachesArray from '../../../mixins/coaches';

export default {
  name: 'Coaches',
  components: {
      PageTitle,
  },
  data() {
      return {
          array: CoachesArray,
          interval: '',
      };
  },
  methods: {
        // DYNAMICALLY CREATING CONTENT - SLIDER
    createCoachBox(array, index) {
            const main = this.$refs.coachesContent;
            const circle = this.$refs.sliderCircle;

            main.innerHTML = '';

            const ci = document.createElement('div');
            ci.classList.add('coach-image');
            main.appendChild(ci);

            const img = document.createElement('img');
            img.src = array[index].url; // img
            ci.appendChild(img);

            const ch = document.createElement('div');
            ch.classList.add('coach-header');
            main.appendChild(ch);

            const ch_n = document.createElement('div');
            ch_n.classList.add('coach-header_name');
            ch.appendChild(ch_n);

            const ch_3 = document.createElement('h3');
            ch_3.innerHTML = array[index].name; // name
            ch_n.appendChild(ch_3);

            const ch_4 = document.createElement('h4');
            ch_4.innerHTML = array[index].description; // description
            ch_n.appendChild(ch_4);

            const ch_p = document.createElement('p');
            ch_p.classList.add('coach-header_quotation');
            ch_p.innerHTML = array[index].quotation; // quotation
            ch.appendChild(ch_p);

            const ca = document.createElement('div');
            ca.classList.add('coach-about');
            main.appendChild(ca);

            const ca_p = document.createElement('p');
            ca_p.innerHTML = array[index].about; // about
            ca.appendChild(ca_p);

            const d = circle.find(el => el.classList.contains('circle-active'));

            if (d) {
                d.classList.remove('circle-active');
                d.style.background = 'none';
            }
            circle[index].style.backgroundColor = '#000';
            circle[index].classList.add('circle-active');
            index === circle.length ? index = 0 : index++;  // eslint-disable-line
    },
        // SLIDE ANIMATION
    slideEffect(array, index) {
        const main = this.$refs.coachesContent;

        main.style.opacity = 0;
        main.style.transform = 'translateX(-300px)';

        setTimeout(() => {
            this.createCoachBox(array, index);
        }, 500);

        setTimeout(() => {
            main.style = '';
        }, (500));
    },
        // EVENT WRAPPER
    slider(index, time, pom = 0) {
        if (event) {
            const ev = event.target;

            let id = this.$refs.sliderCircle.indexOf(ev);

            clearInterval(this.interval);

            const main = this.$refs.coachesContent;
            main.style = '';

            this.slideEffect(this.array.CoachesArray, id);
            (id === (this.array.CoachesArray.length - 1)) ? id = 0 : id++;  // eslint-disable-line

            this.interval = setInterval(() => {
                this.slideEffect(this.array.CoachesArray, id);
                (id === (this.array.CoachesArray.length - 1)) ? id = 0 : id++;  // eslint-disable-line
            }, time);

            return;
        }
        this.slideEffect(this.array.CoachesArray, pom);
        (pom === (this.array.CoachesArray.length - 1)) ? pom = 0 : pom++;   // eslint-disable-line

        this.interval = setInterval(() => {
            this.slideEffect(this.array.CoachesArray, pom);
            (pom === (this.array.CoachesArray.length - 1)) ? pom = 0 : pom++;   // eslint-disable-line
        }, time);
    },
  },
  mounted() {
      this.slider(0, 5000);
  },
  created() {
  },
  destroyed() {

  },
};
</script>
<style lang='scss'>

.coaches-content{
    display: grid;

    grid-template-columns: 1fr 2fr;

    margin: 5px;

    transform: translateX(0px);
    opacity: 1;

    transition: all .5s ease-in-out;

    height: 300px;
    width: 100%;

    .coach-image{

        align-items: center;
        justify-content: flex-start;

        grid-area: 1 / 1 / 1 / 1;

        align-items: center;
        justify-content: center;

        img{
            width: 100px;
            height: 100px;

            border-radius: 50%;
        }
    }

    .coach-header{
        grid-area: 1 / 2 / 1 / span 2;

        margin: 10px 5px;
        padding: 0 20px;

        .coach-header_name{
            position: relative;
            h3{
                font-size: 1.5em;
                font-weight: 400;
                padding: 0;
                margin: 0;
            }
            h4{
                font-size: 1em;
                font-weight: 300;
                padding: 0;
                margin: 0;
            }
            &::after{
                content: '';
                position: absolute;
                margin: 5px;

                width: 100%;
                height: 1px;

                background-color: #000;
            }
        }
         .coach-header_quotation{
            font-size: .8em;
            font-weight: 300;
            text-align: center;
        }
    }

    .coach-about{
            grid-area: 2 / 1 / 2 / span 3;

            max-width: 100%;
            margin: 5px;
            p{
                text-align: center;
                padding: 0 5px;
                font-size: 1em;
                font-weight: 400;
            }
        }
}

.coaches-slider{

        width: 100%;
        height: auto;

        display: flex;
        flex-flow: row;

        align-items: center;
        justify-content: center;

        margin: 10px 0;

        .coaches-slider_circle{
            width: 15px;
            height: 15px;

            border-radius: 50%;
            margin-left: 10px;

            background: none;
            border: 2px solid #000;

            transition: all .15s ease-in-out;
            &:hover{
                background-color: #000;
                cursor: pointer;
            }
        }
    }

.slider-before{
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin: 5px;
    width: 100%;

    transition: all .5s ease-in-out;
}

@media (max-width: 768px){
    .coach-image{
        display: flex;

        align-items: center;
        justify-content: flex-end;
    }
}

@media (min-width: 768px){
    #coaches{
        background-image: url('../../../assets/s2_bg.png');
        background-size: 25%;
        background-repeat: no-repeat;
        background-position: 5% 10%;
    }
    .coaches-content{
        margin: 20px 0;

        position: relative;
        left: 35%;
        width: 60%;

        grid-template-columns: 1fr 2fr;
        .coach-image{
            grid-area: 1 / 1 / 1 / span 2;
            img{
                width: 150px;
                height: auto;
            }
        }
        .coach-header{
            grid-area: 1 / 2 / 1 / span 2;

            .coach-header_quotation{
              grid-area: 3 / 1 / 3 / 1;

              font-size: 1em;
              font-weight: 400;
            }
        }

        .coach-about{
            grid-area: 2 / 1 / span 2 / span 3;
        }
    }
}

@media (min-width: 1024px){
    .coaches-content{
        .coach-image{
            img{
                width: 200px;
            }
        }
    }
}
</style>
