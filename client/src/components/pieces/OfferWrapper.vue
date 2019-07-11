<template>
    <div></div>
</template>
<script>
export default {
    name: 'OfferWrapper',
}
</script>
<style lang="scss">
    .offer-wrapper{
        display: flex;
        flex-flow: column;

        align-items: center;
        justify-content: flex-start;

        background-color: rgba(12,81,232, .3);
        color: #fff;

        text-align: center;

        .offer-wrapper_header{
            display: flex;
            flex-flow: row;

            align-items: center;
            justify-content: center;

            padding: 5px 0;
            width: 100%;

            background-color: rgba(0,0,0,.3);

            .header__logo{
                position: relative;
                width: 40px;
                height: 40px;
                transform: rotate(45deg);

                display: flex;
                align-items: center;
                justify-content: center;

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
                .logo-content{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: rotate(-45deg);

                    font-size: 20px;
                    width: 100%;
                    height: 100%;
                }

                .small-font{
                    font-size: .8em;
                }

                .logo{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    

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

            .header__title{
                display: flex;
                align-items: center;
                justify-content: center;

                margin-left: 10px;
                font-size: 20px;
            }
        }
    }

    @media (min-width: 480px){
        .offer-wrapper{
            width: 80%;
            box-shadow: 0 0 15px #000;
        }
    }

    @media (min-width: 768px){
        .offer-wrapper{
            height: 200px;

            .offer-wrapper_content{
                display: flex;
                flex-flow: column;

                height: 100%;
                
                justify-content: flex-end;
            }
        }
    }

    @media (min-width: 1024px){
        .offer-wrapper{
            .offer-wrapper_header{
                
            }
        }
    }
</style>

