<template lang='pug'>
    div.container
        nav.nav-menu
            div.nav-menu_logo
                img(src='../../assets/logo.png')
                span.nav-menu_logo__title
                    | powerbeck
            div.nav-menu_menu 
                span
                    | menu
                i(class='fas fa-bars')

        section.banner-main
            div.banner-main_wrapper
                span.banner-main_title
                    | Powerbeck
                span.banner-main_subtitle
                    | Gym & Fitness
            div.banner-main_buttons
                button.button-medium
                    | OFERTA
                button.button-medium-reverse
                    | LOGOWANIE
                i(class='fas fa-chevron-down')
                
</template>
<script>
    import Buttons from "../pieces/Buttons";

export default {
    name:'Banner',
}
</script>
<style lang='scss' scoped>
    
    $default_site_color: #9e0012;

    .container{
        width:100vw;
        height: 100vh;
        
        background-image: url('../../assets/banner_bg.jpg');
        background-size: 450%;
        background-repeat: no-repeat;
        background-position: 60% 50%;

    }

    .nav-menu{
        display: flex;
        position: fixed;

        top: 0;
        left: 0;
        
        width: 100vw;
        height: 50px;

        flex-flow: row;
        align-items: center;
        justify-content: space-between;

        color: #fff;
        text-transform: uppercase;

        padding: 0 5px;

        .nav-menu_logo{
            display: flex;
            align-items: center;

            flex-flow: row;

            img{
                max-height: 50px;
                width: auto;
            }

            span{
                font-size: 1.2em;
            }
        }

        .nav-menu_menu{
            display: flex;
            align-items: center;
            flex-flow: row;

            span{
                font-size: 1.2em;
                margin: 0 3px;
            }

            i{
                font-size: 1.3em;
            }
        }
    }

    .banner-main{
        display: flex;

        flex-flow: column;

        width: 100%;
        height: 100%;

        align-items: center;
        justify-content: center;

        .banner-main_wrapper{
            display: flex;

            flex-flow: column;

            color: #fff;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            user-select: none;
            text-shadow: 2px 2px 8px #000;

            .banner-main_title{
                font-size: 3em;
            }

            .banner-main_subtitle{
                font-size: 2em;
            }
        }

        .banner-main_buttons{
            display: flex;

            flex-flow: column;
            align-items: center;

            button:first-child{
                margin: 30px 0 20px 0;
            }

            i{
                font-size: 2.5em;
                color: #fff;
                
                width: 100px;

                text-align: center;

                position: relative;
                top: 30px;
                
                transition: all .3s ease-in-out;
                color: $default_site_color;

                &:hover{
                    transform: translateY(30px);
                    cursor: pointer;
                    color: lighten($default_site_color, 30%);
                }
            }
        }
    }
</style>
