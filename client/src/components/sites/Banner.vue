<template lang='pug'>
    div.container
        nav.nav-menu(ref='menuScroller')
            div.nav-menu_logo
                a.nav-menu_logo(href='/')
                    img(src='../../assets/logo.png')
                    span.nav-menu_logo__title
                        | powerbeck
            div.nav-menu_menu(@click='showMenu()' ref='menuButton')
                span
                    | menu
                i(class='fas fa-bars')
            div.nav-menu_links(ref='myMenu')
                div.nav-menu_links__exit(@click='hideMenu()' ref='exitButton')
                    i(class='fas fa-times')
                ul(class='menu-list')
                    a(href='/')
                        li
                            | start
                    a(href='#coaches')
                        li
                            | trenerzy
                    a(href='#club')
                        li
                            | klub
                    a(href='#')
                        li
                            | wideo
                    a(href='#sauna')
                        li
                            | sauna
                    a(href='#offer')
                        li
                            | oferta


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
            a(href='#coaches')
                i(class='fas fa-chevron-down')
                
</template>
<script>
import Buttons from "../pieces/Buttons";

export default {
    name:'Banner',
    methods: {
        showMenu(){
            const menu = this.$refs.myMenu;

            this.$refs.menuScroller.classList.add('menu-active');

            const on = 'menu-animation-on';
            const off = 'menu-animation-off';

            const li = document.querySelectorAll('.menu-list li');

            let time = 0.5;

            li.forEach((el,index) => {
                time+=0.2;

                el.classList.add('menu-li-anim');
                el.style.animationDuration = `${time}s`;
            });

            if(menu.classList.contains(off)){
                menu.classList.remove(off);
            }
            this.$refs.menuButton.style.opacity='0';
            menu.classList.add(on);
        },
        hideMenu(){
            const menu = this.$refs.myMenu;
            const on = 'menu-animation-on';
            const off = 'menu-animation-off';

            this.$refs.menuScroller.classList.remove('menu-active');

            const li = document.querySelectorAll('.menu-list li');

            li.forEach((el,index) => {
                el.classList.remove('menu-li-anim');
            });

            this.$refs.menuButton.style.opacity='1';

            menu.classList.remove(on);
            menu.classList.add(off);
        },
        scrollMenu(){
            const menu = this.$refs.menuScroller;
            if(window.scrollY != 0){
                    menu.style.backgroundColor = 'rgba(0,0,0,.7)';

                }else{
                    menu.style.backgroundColor = '';
                }
            if(this.$refs.menuScroller.classList.contains('menu-active')){
                
            }else{
                menu.style.transform = 'translateY(0)';

                if(window.scrollY != 0){
                    menu.style.backgroundColor = 'rgba(0,0,0,.7)';

                    setTimeout(() => {
                        menu.style.transform = 'translateY(-45px)';
                    }, 5000);
                }else{
                    menu.style.backgroundColor = '';
                }
            }
        }
    },
    created () {
        window.addEventListener('scroll', this.scrollMenu);
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollMenu);
    },
}
</script>
<style lang='scss' scoped>
    
    $default_site_color: #9e0012;

    @keyframes menu-anim{
        from{
            top: -500px;
        }
        to{
            top: 0;
        }
    }

    @keyframes menu-anim-off{
        from{
            transform: translateY(500px);
        }
        to{
            transform: translateY(0);
        }
    }

    @keyframes menu-li{
        from{
            transform: translateX(-50px);
            opacity: 0;
        }
        to{
            transform: translateX(0);
            opacity: 1;
        }
    }

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

        z-index: 140;

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

        transition: background .3s ease-in-out, transform .3s ease-in-out;

        .nav-menu_logo{
            display: flex;
            align-items: center;

            user-select: none;
            flex-flow: row;

            text-decoration: none;

            img{
                max-height: 50px;
                width: auto;
            }

            span{
                color: #fff;
                text-shadow: 2px 2px 8px #000;
                font-size: 1.2em;

                transition: all .3s ease-in-out;

                &:hover{
                    color: $default_site_color;
                }
            }
        }

        .nav-menu_menu{
            display: flex;
            align-items: center;
            flex-flow: row;
            
            user-select: none;
            transition: all .3s ease-in-out;

            span{
                text-shadow: 2px 2px 8px #000;
                font-size: 1.2em;
                margin: 0 3px;
            }

            i{
                font-size: 1.3em;
            }

            &:hover{
                cursor: pointer;
                color: $default_site_color;
            }
        }
        .nav-menu_links{
            display: flex;
            position: absolute;
            top: -500px;
            left: 0;

            z-index: 150;

            padding: 50px 0;

            width: 100vw;
            height: auto;

            background-color: rgba(0,0,0, .8);

            align-items: center;
            justify-content: center;

            .nav-menu_links__exit{
                position: absolute;
                top: 15px;
                right: 30px;
                font-size: 1.5em;

                color: #fff;

                transition: all .3s ease-in-out;

                &:hover{
                    cursor: pointer;
                    color: $default_site_color;
                }
            }

            ul{

                width: 100%;

                list-style-type: none;
                padding: 0;
                margin: 0;

                a{
                    font-size: 2em;
                    text-decoration: none;


                    li{
                        line-height: 1.5;
                        text-align: center;
                        color: #fff;

                        width: 100%;
                        height: auto;

                        transition: all .3s ease-in-out;

                        &:hover{
                            color: $default_site_color;
                            background-color: rgba(255,255,255, .1);

                            transform: translateX(-5px);
                        }

                        &::after{
                            content: '\00bb';
                            position: absolute;
                            margin: 0 10px;

                            opacity: 0;

                            transition: margin .3s ease-in-out, opacity .3s ease-in-out;
            
                        }

                        &:hover::after{
                            opacity: 1;
                            margin: 0 5px;
                        }
                    }
                }
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
        }
        i{
                font-size: 2.5em;
                color: #fff;
                
                width: 120px;

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

                &::after{
                    content: 'Czytaj Dalej';
                    font-size: 16px;
                    font-weight: 300;
                    text-transform: uppercase;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    opacity: 0;

                    transition: opacity .3s ease-in-out, transform .3s ease-in-out;
                }

                &:hover::after{
                    opacity:1;
                    transform: translateY(-15px);
                }
            }
    }

    @media (max-width:768px){
    
        .menu-li-anim{
            animation: menu-li both;
        }

        .menu-animation-on{
            animation: menu-anim .7s forwards;
        }

        .menu-animation-off{
            animation: menu-anim-off .7s forwards;
        }
    }

    @media (min-width: 768px){
        .nav-menu{
            .nav-menu_menu{
                display: none;
            }

            .nav-menu_links__exit{
                display: none;
            }

            .nav-menu_links{
                top: 0;
                background: none;

                ul{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    position: fixed;

                    top: 0;
                    right: 10%;
                    width: 60%;
                    height: 50px;

                    a{

                        li{
                            font-size: 20px;
                            text-shadow: 2px 2px 8px #000;

                            &:hover{
                                background: none;
                            }
                        }
                    }
                }
            }
        }

        .banner-main{
            .banner-main_wrapper{
                .banner-main_title{
                    font-size: 5em;
                }
                .banner-main_subtitle{
                    font-size: 3em;
                }
            }
            .banner-main_buttons{
                display: flex;
                flex-flow: row;
                align-items: center;
                justify-content: space-between;

                button:first-child{
                    margin: 0;
                }

                button{
                    margin: 30px 20px;
                }
            }
            i{
                width: 150px;
                &::after{
                    font-size: 20px;
                }

                &:hover::after{
                    transform: translateY(-20px);
                }
            }
        }
    }

</style>
