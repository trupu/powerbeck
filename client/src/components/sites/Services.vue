<template lang="pug">
    div#sauna.services-container
        div.service
            div.service_content
                div.page-title
                    i(class='fas fa-users')
                    p
                        | Masaż
                p
                    | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum, libero eget ullamcorper molestie, dui magna efficitur metus, sed fringilla ligula eros et tellus. Integer maximus, odio vitae gravida rhoncus, eros nibh pulvinar diam, vitae blandit velit orci at lacus. Cras posuere dictum ultricies. Ut quis libero ipsum. Duis justo risus, tristique eu vulputate vel, vestibulum at justo. Maecenas sit amet vulputate elit. Ut blandit quam at sem condimentum interdum. Cras elit nisl, sodales quis facilisis vitae, fringilla elementum nisl.
                div.service_content__offer
                    div.offer
                        span
                            | Pakiet 1
                        span
                            | Cena: 10zł
                    div.offer
                        span
                            | Pakiet 2
                        span
                            | Cena: 20zł
                    div.offer
                        span
                            | Pakiet 3
                        span
                            | Cena: 30zł
            div.service_image
                img(src='../../assets/masage.jpg')
        div.service-reverse
            div.service_content
                div.page-title
                    i(class='fas fa-users')
                    p
                        | Sauna
                p
                    | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum, libero eget ullamcorper molestie, dui magna efficitur metus, sed fringilla ligula eros et tellus. Integer maximus, odio vitae gravida rhoncus, eros nibh pulvinar diam, vitae blandit velit orci at lacus. Cras posuere dictum ultricies. Ut quis libero ipsum. Duis justo risus, tristique eu vulputate vel, vestibulum at justo. Maecenas sit amet vulputate elit. Ut blandit quam at sem condimentum interdum. Cras elit nisl, sodales quis facilisis vitae, fringilla elementum nisl.
                div.service_content__offer
                    div.offer
                        span
                            | Pakiet 1
                        span
                            | Cena: 10zł
                    div.offer
                        span
                            | Pakiet 2
                        span
                            | Cena: 20zł
                    div.offer
                        span
                            | Pakiet 3
                        span
                            | Cena: 30zł
            div.service_image
                img(src='../../assets/sauna.jpg')
</template>
<script>
import PageTitle from '../pieces/PageTitle.vue';

export default {
    name: 'Services',
    components: {
        PageTitle,
    },
};
</script>
<style lang="scss">

.service, .service-reverse{
    display: grid;
    grid-template-columns: 1fr;

    align-items: center;

    margin: 0;
    padding: 0;

    .service_content{
        display: flex;
        flex-flow: column;
        text-align: center;

        margin: 10px 0;
        padding: 0;

        .service_content__offer{
            display: flex;
            flex-flow: row;
            width: 100%;

            align-items: center;
            justify-content: space-around;

            .offer{
                display: flex;
                flex-flow: column;

                max-width: 100px;
                padding: 5px;
                border: 1px solid #000;
            }
        }
    }

    .service_image{
        img{
            width: 100%;
            height: auto;
        }
    }
}

@media (min-width: 768px){
    .service{
        grid-template-columns: 4fr 6fr;
    }

    .service-reverse{
        grid-template-columns: 6fr 4fr;

        .service_content{
            grid-area: 1 / 2 / 1 / 2;
        }

        .service_image{
            grid-area: 1 / 1 / 1 / 1;
        }
    }

    .service, .service-reverse{
        .service_content{
            margin: 0 10px;
            padding: 0;
        }
        .service_image{
            height: 100%;

            img{
                height: 100%;
            }
        }
    }
}

</style>
