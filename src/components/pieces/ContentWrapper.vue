<template>
    <div></div>
</template>
<script>
export default {
    name: 'ContentWrapper',
    methods: {
        wrapperRandomize() {
            const lists = document.querySelectorAll('.list-disactive');
            const wrappers = document.querySelectorAll('.content-wrapper');

            const x = Math.floor(Math.random() * lists.length);

            lists[x].classList.remove('list-disactive');
            lists[x].classList.add('list-active');

            wrappers.forEach((el) => {
                el.addEventListener('click', this.wrapperTransition);
            });
        },
        wrapperTransition() {
            const ev = event.target;
            const active = document.querySelector('.list-active');
            const toActive = ev.closest('.content-wrapper').querySelector('.content-wrapper_list');

            active.classList.remove('list-active');
            active.classList.add('list-disactive');

            toActive.classList.remove('list-disactive');
            toActive.classList.add('list-active');
        },
    },
};
</script>
<style lang='scss'>
    // "lint": "vue-cli-service lint"
    .content-wrapper{
        display: flex;
        flex-flow: column;
        font-family: 'Open Sans', sans-serif;

        width: 100%;

        background-color: rgba(0,0,0,.5);

        .content-wrapper_header-flexbox{
            display: flex;
            flex-flow: row;

            align-items: center;
            justify-content: center;

            z-index: 150;

            font-size: 16px;
            background-color: rgba(0,0,0,.5);

            &:hover{
                cursor: pointer;
            }

            .content-wrapper_anim{
                padding: 5px;
                transform: rotate(45deg);
                width: 40px;
                height: 40px;

                display: flex;
                align-items: center;
                justify-content: center;

                position: relative;

                i{
                    font-size: 20px;
                    transform: rotate(-45deg);
                }

                &::before, &::after{
                    content: '';
                    position: absolute;
                    height: 1px;
                    background-color: #fff;

                    width: 50%;
                }

                &::before{
                    left: 25%;
                    bottom: 0;
                }

                &::after{
                    left: 25%;
                    top: 0;
                }
                span{
                    display: block;
                    &::before, &::after{
                        content: '';
                        position: absolute;
                        height: 50%;
                        background-color: #fff;

                        width: 1px;
                    }

                    &::before{
                        right: 0;
                        bottom: 25%;
                    }

                    &::after{
                        left: 0;
                        bottom: 25%;
                    }
                }
            }

            h3{
                font-size: 1.5em;
                font-weight: 400;
                margin: 10px;
            }
        }
        .content-wrapper_list{
            display: flex;
            flex-flow: column;

            list-style-type: none;
            width: 100%;
            padding: 10px;

            transition: all 0.3s ease-in-out;

            li{
                margin: 5px 0;

                &::before{
                    content: '-';
                    margin: 0 2px;
                }
            }
        }
    }

    @media (min-width: 480px){
        .content-wrapper{
            width: 60%;
            box-shadow: 0px 0px 15px #000;
        }
    }

    @media (max-width: 768px){
        .list-active{
            height:200px;
            font-size: 12px;
        }
        .list-disactive{
            height: 0;
            opacity: 0;
        }
    }

    @media (min-width: 768px){
        .content-wrapper{
            width: 30%;
            min-height: 300px;
            background-color: rgba(0,0,0,.7);

            transition: all .3s ease-in-out;

            &:hover{
                transform: scale(1.1);
            }

            .content-wrapper_header-flexbox{
                background:none;
            }

            .content-wrapper_list{
                li{
                    font-size: .8em;
                }
            }
        }
    }

    @media (min-width: 1024px){
        .content-wrapper{
            min-height: 400px;
            background-color: rgba(0,0,0,.7);

            .content-wrapper_header-flexbox{
                flex-flow: column;
                padding: 10px;

                &:hover{
                    cursor: default;
                }

                .content-wrapper_anim{
                    width: 60px;
                    height: 60px;

                    i{
                        font-size: 2em;
                    }
                }

                h3{
                    font-size: 2em;
                }
            }
            .content-wrapper_list{
                margin: 0;
                padding: 0 10px;
            }
        }
    }
</style>
