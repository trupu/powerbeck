<template lang="pug">
    section#photos.photos-container
        div.page-title
                    i(class='fas fa-images')
                    p
                        | Galeria
        div.photos-container_wrapper
            div.content-wrapper-img(v-for='key in galleryArray')
                div.photo
                    img(:src='imgUrl+"/gallery/"+key.img')
                p.photo-title
                    | {{ key.title }}
                p.photo-description
                    | {{ key.description }}
                p.photo-date
                    | {{ key.date }}
        div.photos-container_content
            div.content_flex-wrapper
                p.content
                    | Przejdź do galerii
                a(@click='goToGallery()').anim
                    i(class='fas fa-arrow-right')
</template>
<script>
import PageTitle from '../../pieces/PageTitle.vue';
import gallery from '../../../mixins/gallery';
import address from '../../../config/address';

export default {
    name: 'Photos',
    components: {
        PageTitle,
    },
    data() {
        return {
            galleryArray: [],
            imgUrl: address.img,
        };
    },
    methods: {
        async loadData() {
            const tempGallery = await gallery.getData();
            for (let i = tempGallery.length; i >= tempGallery.length - 3; i--) {
                if (tempGallery[i]) this.galleryArray.push(tempGallery[i]);
            }
        },
        goToGallery() {
            this.$router.push('/gallery');
        },
    },
    created() {
        this.loadData();
    },
};
</script>
<style lang="scss">

    $default_site_color: #9E0012;

.photos-container{
    background-image: url('../../../assets/section6_bg.png');
    background-size: 150%;
    background-repeat: no-repeat;

    color: #fff;

    width: 100%;
    min-height: 300px;

    text-align: center;

    p{
        margin: 3px 0;
    }

    .photos-container_wrapper{
        display: none;
    }

    .photos-container_content{
        display: flex;

        width: 100%;
        height: 200px;

        flex-flow: column;
        align-items: center;
        justify-content: center;

        .content{
            font-size: 2em;
            margin: 20px 0;
        }

        .anim{
            margin: 0;
            font-size: 2em;

            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;

            transform: translateX(-20px);

            transition: all .3s ease-in-out;

            text-decoration: none;
            color: #fff;
        }

        .anim::before{
            content:'Przejdź';
            font-size: .5em;
            transition: opacity .3s ease-in-out, margin .3s ease-in-out;
            opacity: 0;
        }

        .content_flex-wrapper{
            &:hover{
                cursor: pointer;
                .anim{
                    transform: translateX(0);
                    color: $default_site_color;

                    &::before{
                        margin: 0 10px;
                        opacity: 1;
                    }
                }
            }
        }
    }
}

@media (min-width: 480px) {
    .photos-container{
        background-size: 100%;
    }
}

@media (min-width: 768px){
    .photos-container{
        .photos-container_wrapper{

            width: 100%;
            margin: 20px 0;
            padding: 0 10px;

            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 0 10px;
            .content-wrapper-img{
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: space-between;

                width: 100%;
                min-height: 300px;
                position: relative;

                background-color: rgba(0,0,0,.5);
                box-shadow: 0 0 5px 2px #000;
                margin: 0 5px;

                .photo{
                    width: 100%;
                    height: 200px;

                    overflow: hidden;

                    img{
                        width: 100%;
                        height: auto;
                        min-height: 200px;

                        transition: all .3s ease-in-out;
                    }

                    &:hover{
                        img{
                            transform: scale(1.1) rotate(3deg);
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
}
</style>
