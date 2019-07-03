<template lang='pug'>
    div#coaches
        div.page-title
            i(class='fas fa-users')
            p
                | Trenerzy
        div.content(ref='coachContent')
            div.coach-image(ref='coachImage')
                img(src='../../assets/trener1.jpg')
            div.coach-header
                div.coach-header_name(ref='coachName')
                    h3
                        | Jennifer Lawrence
                    h4
                        | Trener Personalny
                p.coach-header_quotation(ref='coachQuotation')
                    | "Tu znajduje się jakiś cytat"
            div.coach-about(ref='coachAbout')
                p
                    | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget turpis massa. Cras vitae leo sodales, malesuada leo in, ultrices sapien. Morbi semper nibh tortor, a gravida nulla porttitor at. Curabitur tortor libero, rutrum sed elit vel, iaculis sagittis lectus. Maecenas ornare a velit quis tempus. 
            div.coach-slider(ref='coachSlider')
</template>
<script>
import PageTitle from '../pieces/PageTitle.vue';

export default {
    name: 'Coaches',
}
</script>
<style lang='scss' scoped>

.content{
    display: grid;
    
    grid-template-columns: 1fr 2fr;

    margin: 5px;

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

@media (max-width: 768px){
    .coach-image{
        display: flex;

        align-items: center;
        justify-content: flex-end;
    }
}

@media (min-width: 768px){
    #coaches{
        background-image: url('../../assets/s2_bg.png');
        background-size: 25%;
        background-repeat: no-repeat;
        background-position: 5% 10%;
    }
    .content{
        margin: 20px 0;

        position: relative;
        left: 35%;
        width: 60%;

        grid-template-columns: 1fr 2fr;
        grid-template-rows: repeat(3, 1fr);
        .coach-image{
            grid-area: 1 / 1 / 1 / span 2;
            img{
                width: 200px;
                height: auto;
            }
        }
        .coach-header{
            grid-area: 1 / 2 / 1 / span 2;

            .coach-header_quotation{
              grid-area: 3 / 1 / 3 / 1;

              font-size: 2em;
              font-weight: 400;
            }
        }

        .coach-about{
            grid-area: 2 / 1 / span 2 / span 3;
        }
    }
}

</style>

