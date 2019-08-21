<template lang="pug">
    div.admin-container
        nav.nav-bar
            a(href='/')
                | Strona Główna
            button.logout(@click='logout')
                | Wyloguj
        div.grid-wrapper(v-if='adminWrapper')
            div.admin-content(v-for='value in divs' @click='checkClicked(), buttonsClassNames()' :data-url='value.name')
                i(:class='value.icon')
                p.content
                    | {{ value.translated  }}
        div.content-container(v-if='!adminWrapper')
            <SiteContentChanger :data-clicked='clickedContainer'/>
</template>
<script>
import Buttons from '../../pieces/Buttons.vue';
import SiteContentChanger from './SiteContentChanger.vue';

export default {
    name: 'AdminPanel',
    components: {
        Buttons,
        SiteContentChanger,
    },
    data() {
        return {
            adminWrapper: true,
            clickedContainer: '',
            clickedTranslated: '',
            divs: {
                coach: {
                    name: 'coach',
                    translated: 'Trenerzy',
                    icon: 'fas fa-users',
                    formTitle: 'Trenera',
                },
                offer: {
                    name: 'offer',
                    translated: 'Oferta',
                    icon: 'far fa-newspaper',
                    formTitle: 'Ofertę',
                },
                gallery: {
                    name: 'gallery',
                    translated: 'Galeria',
                    icon: 'fas fa-camera',
                    formTitle: 'Zdjęcie',
                },
            },
        };
    },
    methods: {
        logout() {
            // eslint-disable-next-line
            console.log('Wylogowano!');
        },
        checkIsLogged() {
            // checking if admin is logged in
        },
        // checking which of divs was clicked
        checkClicked() {
            let ev = event.target;
            if (!ev.classList.contains('admin-content')) {
                ev = ev.closest('.admin-content');
            }
            this.adminWrapper = false;
            this.clickedContainer = ev.attributes['data-url'].value;
            this.clickedTranslated = this.divs[this.clickedContainer].translated;
        },
        // resizing buttons when user changes window width
        buttonsClassNames() {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const check = document.querySelector('.tochange');
                if (check) {
                    const change = document.querySelectorAll('.tochange');
                    if (window.innerWidth > 768) {
                        if (check.classList.contains('button-small')) {
                            change.forEach((el) => {
                                el.classList.remove('button-small');
                                el.classList.add('button-medium');
                            });
                        }
                    } else { // eslint-disable-next-line
                        if (!check.classList.contains('button-small')) {
                                change.forEach((el) => {
                                    el.classList.remove('button-medium');
                                    el.classList.add('button-small');
                            });
                        }
                    }
                }
            }, 500);
        },
    },
    created() {
        window.addEventListener('resize', this.buttonsClassNames);
    },
    mounted() {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    },
};
</script>
<style lang="scss">

$default_site_color: #9E0012;

    .admin-container{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        min-height: 100vh;

        background-image: url('../../../assets/banner_bg.jpg');
        background-repeat: no-repeat;
        background-size: 400%;
        background-position: 50% 50%;
        background-attachment: fixed;

        .nav-bar{
            position: fixed;
            top: 0;
            left: 0;

            display: flex;
            align-items: center;
            justify-content: flex-end;

            height: 50px;
            width: 100%;
            background-color: rgba(0,0,0,.5);

            a, .logout{
                text-decoration: none;
                background: none;
                border: none;
                padding: 10px;
                height: 40px;
                min-width: 120px;
                color: #fff;
                font-size: 16px;
                text-shadow: 1px 1px 5px #000;

                transition: all .3s ease-in-out;

                &:hover{
                    cursor: pointer;
                    color: $default_site_color;
                }
            }
        }
        .grid-wrapper{
            display: grid;
            align-items: center;
            justify-items: center;
            justify-content: center;

            width: 80%;
            height: 80%;
            background-attachment: fixed;
            grid-template-columns: 1fr;
            .admin-content{
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;

                box-shadow: 2px 2px 10px 3px #000;
                background-color: rgba(158,0,18,.9);
                height: 30vw;
                width: 80%;
                margin: 20px 0;

                align-self: end;

                transition: all .3s ease-in-out;

                &:hover{
                    cursor: pointer;
                    color: darken(#fff, 20%);
                }

                i{
                    font-size: 2em;
                }
                .content{
                    font-size: 1.5em;
                    margin: 10px 0;
                }
            }
        }

        .content-container{
            display: flex;
            flex-flow: column;
            position: relative;

            color: #fff;
            background-color: rgba(0,0,0,.8);
            width: 100vw;
            min-height: 300px;
            padding: 15px 10px;

            .exit-button{
                position: absolute;
                top: 15px;
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

@media (min-width: 480px){
    .admin-container{
        .grid-wrapper{
            .admin-content{
                width: 60%;
            }
        }
    }
}

@media (min-width: 768px){
    table{
        font-size: 24px;
    }
    .admin-container{
        background-size: 200%;
        .grid-wrapper{
            grid-template-columns: 1fr 1fr;
            .admin-content{
                width: 80%;
                height: 20vw;
            }
        }
    }
}

@media (min-width: 1024px){
    .admin-container{
        background-size: cover;
        .grid-wrapper{
            width: 100%;
            grid-template-columns: repeat(3, 1fr);
            .admin-content{
                font-size: 30px;
                width: 90%;
            }
        }
    }
}

</style>
