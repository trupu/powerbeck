<template lang="pug">
    div.gallery-container
        nav.nav-bar
            a(href='/')
                | Strona Główna
        div.gallery-wrapper
            div.anim-wrapper(v-if='loading')
                div.anim
                div.anim
                div.anim
            div.photo-wrapper(v-if='!loading' v-for='key in galleryArray')
                div.photo
                    img(:src='"img/gallery/"+key.img')
                div.photo-title
                    | {{ key.title }}
                div.photo-description
                    | {{ key.description }}
                div.photo-date
                    | {{ key.date }}
        <Footer />
</template>
<script>
import gal from '../../../mixins/gallery';
import Footer from '../home/Footer.vue';

export default {
    name: 'gallery',
    components: {
        Footer,
    },
    data() {
        return {
            galleryArray: [],
            loading: true,
        };
    },
    methods: {
        async loadData() {
            this.galleryArray = await gal.getData();
            this.loading = false;
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>
<style lang="scss">

@keyframes circle-anim{
    0%{
        transform: scale(0);
        opacity: 0;
    }
    50%{
        transform: scale(1);
        opacity: 1;
    }
    100%{
        transform: scale(0);
        opacity: 0;
    }
}

    $default_site_color: #9E0012;

#gallery{
    width: 100vw;
    height: auto;
}

    .gallery-container{
        width: 100%;
        height: 100vh;

        .nav-bar{
            height: 50px;
            width: 100%;
            background-color: rgba(0,0,0,.8);
            color: #fff;
            display: flex;
            flex-flow: row;
            justify-content: flex-end;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 150;

            a{
                color: #fff;
                text-decoration: none;
                margin: 0 20px;
                transition: all .3s ease-in-out;
                text-shadow: 2px 2px 3px #000;

                &:hover{
                    color: $default_site_color;
                }
            }
        }

        .gallery-wrapper {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 20px 0;

            padding: 70px 10px;

        background-image: url('../../../assets/section6_bg.png');
        background-position: 35% 20%;
        background-attachment: fixed;
        background-size: 300%;
        background-repeat: no-repeat;

            width: 100%;
            min-height: 100%;

            align-items: center;
            justify-content: center;
            justify-items: center;

            .anim-wrapper {
                display: flex;
                flex-flow: row;
                width: 100%;
                height: auto;

                align-items: center;
                justify-content: center;

                .anim{
                    background-color: $default_site_color;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin: 0 10px;
                    animation: circle-anim 1s both infinite ease-in-out;
                }

                @for $i from 1 to 4{
                    .anim:nth-child(#{$i}){
                        animation-delay: (10s*$i)/100;
                    }
                }
            }
            .photo-wrapper{
                display: flex;
                flex-flow: column;
                justify-content: space-between;

                width: 80%;
                min-height: 300px;
                color: #fff;
                font-size: 20px;
                text-align: center;
                background-color: rgba(0,0,0,.5);
                box-shadow: 0 0 5px 3px #000;

                .photo{
                    overflow: hidden;
                    width: 100%;
                    height: 200px;

                    img{
                        width: 100%;
                        min-height: 200px;
                        height: auto;
                        transition: all .3s ease-in-out;

                        &:hover{
                            transform: scale(1.1) rotate(5deg);
                        }
                    }
                }

                .photo-title{
                    font-size: 1em;
                }
                .photo-description{
                    font-size: .8em;
                }
                .photo-date{
                    font-size: .6em;
                }
            }
        }
    }

@media (min-width: 480px) {
    .gallery-container{
        .gallery-wrapper{
            width: 100%;
            background-size: 200%;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px 15px;
            .photo-wrapper{
                width: 100%;
                font-size: 16px;
            }
        }
    }
}

@media (min-width: 768px) {
    .gallery-container{
        .gallery-wrapper{
            background-position: 40% 10%;
            background-size: 150%;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 20px 10px;
        }
    }
}

@media (min-width: 1440px) {
    .gallery-container{
        .gallery-wrapper{
            background-size: 100%;
            background-position: center;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 20px 15px;
        }
    }
}
</style>
