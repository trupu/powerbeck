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
                    div.offer.massage(v-for='key in massage' :data-about='key.about' :data-name='key.name' :data-price='key.price' @click='showBox()')
                        span
                            | {{ key.name }}
                        span
                            | {{ key.price+"zł" }}
            div.service_image
                img(src='../../../assets/masage.jpg')
        div.service-reverse
            div.service_content
                div.page-title
                    i(class='fas fa-users')
                    p
                        | Sauna
                p
                    | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque bibendum, libero eget ullamcorper molestie, dui magna efficitur metus, sed fringilla ligula eros et tellus. Integer maximus, odio vitae gravida rhoncus, eros nibh pulvinar diam, vitae blandit velit orci at lacus. Cras posuere dictum ultricies. Ut quis libero ipsum. Duis justo risus, tristique eu vulputate vel, vestibulum at justo. Maecenas sit amet vulputate elit. Ut blandit quam at sem condimentum interdum. Cras elit nisl, sodales quis facilisis vitae, fringilla elementum nisl.
                div.service_content__offer
                    div.offer.sauna(v-for='key in sauna' :data-about='key.about' :data-name='key.name' :data-price='key.price' @click='showBox()')
                        span
                            | {{ key.name }}
                        span
                            | {{ key.price+"zł" }}
            div.service_image
                img(src='../../../assets/sauna.jpg')
        div.service-box_container(v-if='actualShow')
            div.service-box_wrapper
                p.name
                    | {{ actualName }}
                p.price
                    | Cena: {{ actualPrice+"zł" }}
                p.about
                    | {{ actualAbout }}
                i(class='fas fa-times exit-button' @click='actualShow=false')

</template>
<script>
import PageTitle from '../../pieces/PageTitle.vue';

export default {
    name: 'Services',
    components: {
        PageTitle,
    },
    data() {
        return {
            actualName: '',
            actualPrice: '',
            actualAbout: '',
            actualShow: false,
            massage: [
                {
                    name: 'Pakiet 1',
                    price: 10,
                    about: 'Masaż standardowy',
                },
                {
                    name: 'Pakiet 2',
                    price: 20,
                    about: 'Masaż v2',
                },
                {
                    name: 'Pakiet 3',
                    price: 30,
                    about: 'Masaż v3',
                },
            ],
            sauna: [
                {
                    name: 'Pakiet 1',
                    price: 10,
                    about: 'Sauna v1',
                },
                {
                    name: 'Pakiet 2',
                    price: 20,
                    about: 'Sauna v2',
                },
                {
                    name: 'Pakiet 3',
                    price: 30,
                    about: 'Sauna v3',
                },
            ],
        };
    },
    methods: {
        // showing content box
        showBox() {
            const ev = event.target.closest('.offer');
            this.actualName = ev.attributes['data-name'].value;
            this.actualPrice = ev.attributes['data-price'].value;
            this.actualAbout = ev.attributes['data-about'].value;
            this.actualShow = true;
        },
    },
};
</script>
<style lang="scss">

$default_site_color: #9E0012;

.services-container{
    .service-box_container{
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.5);
        display: flex;
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: center;
        z-index: 200;

        .service-box_wrapper{
            display: flex;
            flex-flow: column;
            width: 100%;
            height: 80%;
            position: relative;
            color: #fff;
            background-color: rgba(0,0,0,.8);
            box-shadow: 0 0 5px 3px #000;
            font-size: 20px;
            padding: 10px 20px;
            z-index: 300;

            p{
                width: 100%;
                margin: 20px 0;
            }

            .name{
                font-size: 1.2em;
                font-weight: 700;
                text-align: center;
            }

            .price{
                font-size: 1em;
            }

            .about{
                font-size: 1em;
            }

            .exit-button{
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 1.5em;
                transition: all .3s ease-in-out;

                &:hover{
                    cursor: pointer;
                    color: $default_site_color;
                }
            }
        }
    }
}

.service, .service-reverse{
    display: grid;
    grid-template-columns: 1fr;

    align-items: center;

    margin: 0;

    .service_content{
        display: flex;
        flex-flow: column;
        text-align: center;

        margin: 10px 0;
        padding: 5px;

        .service_content__offer{
            display: flex;
            flex-flow: row;
            width: 100%;

            align-items: center;
            justify-content: space-around;

            .offer{
                display: flex;
                flex-flow: column;

                width: 100px;
                height: 100px;

                align-items: center;
                justify-content: center;

                padding: 5px;
                border: 1px solid #000;
                border-radius: 50%;
                transition: all .3s ease-in-out;

                span{
                    transition: all .3s ease-in-out;
                }

                &:hover{
                    cursor: pointer;
                    transform: rotate(45deg);
                    border-color: $default_site_color;

                    span{
                        transform: rotate(-45deg);
                    }
                }
            }
        }
    }

    .service_image{
        display: flex;
        img{
            height: auto;
            width: 100%;
            object-fit: cover;
        }
    }
}

@media (min-width: 768px){

    .services-container{
        .service-box_container{
            .service-box_wrapper{
                width: 80%;
                min-height: 40%;
            }
        }
    }

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
