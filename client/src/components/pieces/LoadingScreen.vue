<template lang='pug'>
    div.loading-screen
        div.loading-screen_flex-wrapper
            div.logo
                p.logo-main
                    |   Powerbeck
                p.logo-substitute
                    | Gym & Fitness
            div.anim-wrapper
                div.anim
                div.anim
                div.anim
</template>
<script>
import { setTimeout } from 'timers';

export default {
    name: 'LoadingScreen',
    methods: {
        // Hiding loading screen
        hideLoadingScreen(time) {
            const ls = document.querySelector('.loading-screen');
            setTimeout(() => {
                ls.parentNode.removeChild(ls);
            }, (time * 2));
        },
        // Scrolling to the top
        scrollController(time) {
            return setTimeout(() => {
                window.scrollTo(0, 0);
            }, time);
        },
    },
    data() {
        return {
            time: 2500,
        };
    },
    mounted() {
        this.scrollController(this.time);
        this.hideLoadingScreen(this.time);
    },
};
</script>
<style lang="scss">

@keyframes showLogo{
    from{
        transform: translateY(300px);
        opacity: 0;
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes loading{
    0%{
        transform: scale(1);
        transform: translateY(0);
    }
    50%{
        transform: translateY(-50px);
    }
    80%{
        transform: translateY(0);
    }
    100%{

    }
}

@keyframes hide{
    0%{
        display: flex;
        opacity: 1;
    }
    50%{
        opacity: 0;
    }
    100%{
        opacity: 0;
        z-index: -1;
        display: none;
    }
}

$default_site_color: #9E0012;

.loading-screen{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;

    align-items: center;
    justify-content: center;

    z-index: 300;
    width: 100vw;
    height: 100vh;

    animation: hide 1s 3s both 1;

    background-color: $default_site_color;

    .loading-screen_flex-wrapper{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        text-align: center;

        position: relative;

        .logo{
            font-weight: 700;
            font-size: 30px;
            color: #fff;
            text-transform: uppercase;
            text-shadow: 2px 2px 8px #000;
            .logo-main{
                font-size: 3em;
                margin: 0;

                animation: showLogo .5s both;
            }

            .logo-substitute{
                font-size: 2em;
                margin: 0;

                animation: showLogo .7s both;
            }
        }

        .anim-wrapper{
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;

            margin: 100px 0 20px 0;

            animation: showLogo .75s both;

            .anim{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #fff;
                margin: 0 10px;

                animation: loading 1.5s infinite ease-in-out;
            }

            @for $i from 1 to 4{
                .anim:nth-child(#{$i}){
                   animation-delay: .25s + ($i*25/100);
                }
            }
        }

        .loading{
            font-weight: 700;
            font-size: 1em;
            color: #fff;

            animation: showLogo 1s both;
        }
    }
}

@media (max-width: 768px){
    .loading-screen{
        .loading-screen_flex-wrapper{
            .logo{
                font-size: 1em;
            }
            .anim-wrapper{
                .anim{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
}
</style>
