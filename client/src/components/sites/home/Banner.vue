<template lang='pug'>
    div.container#banner
        div.nav-menu_show(@mouseover='mouseOverMenu()' @click='mouseOverMenu()' ref='menuShow')
                | Rozwiń
        nav.nav-menu(@mouseover='mouseOverMenu()' ref='menuScroller')
            div.nav-menu_logo
                a.nav-menu_logo(href='/')
                    img(src='../../../assets/logo.png')
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
                    a(href='#banner')
                        li
                            | start
                    a(href='#coaches')
                        li
                            | trenerzy
                    a(href='#club')
                        li
                            | klub
                    a(href='#sauna')
                        li
                            | sauna
                    a(href='#offer')
                        li
                            | oferta
                    a(href='#photos')
                        li
                            | galeria
        div.img-holder(v-for='key in imgHolder')
        section.banner-main
            div.banner-main_wrapper
                span.banner-main_title
                    | Powerbeck
                span.banner-main_subtitle
                    | Gym & Fitness
            div.banner-main_buttons
                button.button-medium(@click='$refs.LF.showContactForm()')
                    | KONTAKT
                button.button-medium-reverse(@click='$refs.LF.showLoginForm()')
                    | LOGOWANIE
            a(href='#coaches')
                i.banner-main_link(class='fas fa-chevron-down')
        <LoginForm ref='LF'/>
</template>
<script>
import Buttons from '../../pieces/Buttons.vue';
import LoginForm from '../../pieces/LoginForm.vue';

export default {
  name: 'Banner',
  components: {
      Buttons,
      LoginForm,
  },
  data() {
      return {
          interval: '',
          bannerTimeout: false,
          imgHolder: [
              'img/gym1.jpg',
              'img/gym2.jpg',
              'img/gym3.jpg',
          ],
          actualImg: '',
      };
  },
  methods: {
    // mobiles: show hamburger-menu
    showMenu() {
      const menu = this.$refs.myMenu;

      this.$refs.menuScroller.classList.add('menu-active');

      const on = 'menu-animation-on';
      const off = 'menu-animation-off';

      const li = document.querySelectorAll('.menu-list li');

      let time = 0.5;

      li.forEach((el) => {
        time += 0.2;

        el.classList.add('menu-li-anim');
        el.style.animationDuration = `${time}s`;
      });

      if (menu.classList.contains(off)) {
        menu.classList.remove(off);
      }
      this.$refs.menuButton.style.opacity = '0';
      menu.classList.add(on);
    },
    // mobiles: hide hamburger-menu
    hideMenu() {
      const menu = this.$refs.myMenu;
      const on = 'menu-animation-on';
      const off = 'menu-animation-off';

      this.$refs.menuScroller.classList.remove('menu-active');

      const li = document.querySelectorAll('.menu-list li');

      li.forEach((el) => {
        el.classList.remove('menu-li-anim');
      });

      this.$refs.menuButton.style.opacity = '1';

      menu.classList.remove(on);
      menu.classList.add(off);
    },
    // showing nav-menu
    mouseOverMenu() {
        const menu = this.$refs.menuScroller;
        const { menuShow } = this.$refs;

        menu.style.transform = 'translateY(0px)';
        menuShow.style.opacity = '0';
        menuShow.style.transform = 'translateY(-35px)';
    },
    // hiding nav-menu
    mouseLeaveMenu() {
        const menu = this.$refs.menuScroller;
        const { menuShow } = this.$refs;
        if (menu) {
            if (!menu.classList.contains('menu-active')) {
                menu.style.transform = 'translateY(-50px)';
                menuShow.style.opacity = '1';
                menuShow.style.transform = 'translateY(0px)';
            }
        }
    },
    // nav-menu showing/hiding onScroll
    scrollMenu() {
        const menu = this.$refs.menuScroller;
        if (window.scrollY !== 0) {
            menu.style.backgroundColor = 'rgba(0,0,0,.7)';

            const x = this.mouseOverMenu;
            const y = this.mouseLeaveMenu;

            x();
            if (this.bannerTimeout) { // avoiding timeout overlaying
                clearTimeout(this.bannerTimeout);
            }
            this.bannerTimeout = setTimeout(y, 3000);
        } else {
            menu.style.backgroundColor = '';
        }
    },
    bannerSetImg() {
        const img = document.querySelectorAll('.img-holder');
        const section = [];
        section.push(document.querySelector('.banner-main_wrapper'));
        section.push(document.querySelector('.banner-main_buttons'));
        section.push(document.querySelector('.banner-main_link'));
        // eslint-disable-next-line
        img.forEach((el, index) => el.style.backgroundImage = `url(${this.imgHolder[index]})`);
        let current = 0;
        img[current].style.opacity = 1;
        // eslint-disable-next-line
        section.forEach(el => el.style.transform = 'translateY(0)');
        current++;
        this.interval = setInterval(() => {
            this.bannerChangeImg(img, current, section);
            // eslint-disable-next-line
            (current === this.imgHolder.length - 1) ? current = 0 : current++;
        }, 5000);
    },
    bannerChangeImg(img, current, section) {
        img[current].style.opacity = 1;
        section.forEach((el) => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(50px)';
        });
        setTimeout(() => {
            section.forEach((el) => {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            });
            if (img[current - 1]) {
                img[current - 1].style.opacity = 0;
            } else {
                img[this.imgHolder.length - 1].style.opacity = 0;
            }
        }, 500);
    },
  },
  created() {
    window.addEventListener('scroll', this.scrollMenu);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollMenu);
    this.bannerTimeout = false;
    clearInterval(this.interval);
  },
  mounted() {
      this.bannerSetImg();
  },
};
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

        background-color: #262626;
        background-size: 450%;
        background-repeat: no-repeat;
        background-position: 60% 50%;
        position: relative;

        .img-holder{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 5;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            opacity: 0;
            transition: all .5s ease-in-out;
        }

    }

    .nav-menu_show{
            display: flex;

            position: fixed;
            left: 37%;
            top: -3px;

            z-index: 190;

            opacity: 0;
            transform: translateY(-35px);

            align-items: center;
            justify-content: center;
            flex-flow: row;

            font-size: 14px;
            line-height: .5;

            color: white;
            background-color: rgba(0,0,0,.7);

            border-radius: 5px;

            width: 100px;
            height: 30px;

            transition: all .3s ease-in-out;

            &::after{
                content: '\00bb';
                transform: rotate(90deg);

                margin: 5px;
                font-size: 2em;
            }
        }

    .nav-menu{
        display: flex;
        position: fixed;

        z-index: 200;

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

            z-index: 210;

            padding: 50px 0;

            width: 100vw;
            height: auto;

            background-color: rgba(0,0,0, .8);

            align-items: center;
            justify-content: center;

            .nav-menu_links__exit{
                position: absolute;
                top: 15px;
                right: 50px;
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

        z-index: 50;

        width: 100%;
        height: 100%;

        align-items: center;
        justify-content: center;

        .banner-main_wrapper{
            display: flex;
            flex-flow: column;

            z-index: 50;
            color: #fff;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;
            user-select: none;
            text-shadow: 2px 2px 8px #000;

            transition: opacity .3s ease-in-out, transform .3s ease-in-out;
            transform: translateY(50px);

            .banner-main_title{
                font-size: 3em;
            }

            .banner-main_subtitle{
                font-size: 2em;
            }
        }

        .banner-main_buttons{
            display: flex;

            z-index: 50;
            flex-flow: column;
            align-items: center;

            transition: opacity .3s ease-in-out, transform .3s ease-in-out;
            transform: translateY(50px);

            button:first-child{
                margin: 30px 0 20px 0;
            }
        }
            i{
                font-size: 2.5em;
                color: #fff;

                width: 120px;

                z-index: 50;
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
        .nav-menu{
            .nav-menu_menu{
                margin: 0 20px;
            }
        }
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
        .container{
            background-size: 200%;
        }
        .nav-menu_show{
            left: 45%;
        }
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

    @media (min-width: 1024px){
        .container{
            background-size: cover;
        }
        .nav-menu_show{
            left: 47%;
        }
    }

</style>
