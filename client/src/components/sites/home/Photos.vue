<template lang="pug">
    section#photos.photos-container
        div.page-title
                    i(class='fas fa-images')
                    p
                        | Galeria
        div.photos-container_wrapper
            div.photo(v-for='key in templatePhotos')
                img(:src='key')
        div.photos-container_content
            div.content_flex-wrapper
                p.content
                    | Przejdź do galerii
                a(href='/photos').anim
                    i(class='fas fa-arrow-right')
</template>
<script>
import PageTitle from '../../pieces/PageTitle.vue';
import galleryArray from '../../../mixins/gallery';

export default {
    name: 'Photos',
    components: {
        PageTitle,
    },
    data() {
        return galleryArray;
    },
};
</script>
<style lang="scss">

    $default_site_color: #9E0012;

.photos-container{
    background-image: url('../../../assets/section6_bg.jpg');
    background-size: 300%;
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

@media (min-width: 768px){
    .photos-container{
        .photos-container_wrapper{
            margin: 20px 0;

            display: grid;

            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            justify-items: center;

            .photo{
                display: flex;
                align-items: center;
                justify-content: center;

                width: 80%;
                height: auto;
                object-fit: cover;

                overflow: hidden;

               box-shadow: 0 0 15px #000;

                img{
                    width: 100%;
                    height: auto;
                    max-height: 200px;

                    transition: all .3s ease-in-out;
                }

                &:hover{
                    img{
                        transform: scale(1.2) rotate(5deg);
                    }
                }
            }
        }
    }
}
</style>
