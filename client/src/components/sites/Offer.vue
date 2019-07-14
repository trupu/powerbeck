<template lang="pug">
    div#offer.offer-container
        div.offer-wrapper(v-for='values in offersArray')
            div.offer-wrapper_header
                div.header__logo
                    span.logo-content.small-font
                        | {{ values.logo }}
                    span.logo
                div.header__title
                    | {{ values.logoHeader }}
            div.offer-wrapper_content.offer-list-disactive
                p.content
                    | {{ values.description }}
                h3.price
                    | Cena: {{ values.price }}zł
</template>
<script>
import OfferWrapper from '../pieces/OfferWrapper.vue';
import offersArray from '../../offers';

export default {
    name: 'Offer',
    components: {
        OfferWrapper,
    },
    data() {
        return offersArray;
    },
    mounted() {
        OfferWrapper.methods.wrapperRandomize();
    },
};
</script>
<style lang="scss">
    .offer-container{
        display: grid;
        grid-template-columns: 1fr;
        width: 100vw;

        background-image: url('../../assets/section5_bg.jpg');
        background-size: 300%;
        background-repeat: no-repeat;
        background-position: 48% 0;

        height: auto;
        min-height: 500px;
        padding: 30px 0;
    }

    @media (min-width: 480px){
        .offer-container{
            align-items: center;
            justify-items: center;
            background-size: 400%;
        }
    }

    @media (min-width: 768px){
        .offer-container{
            grid-template-columns: 1fr 1fr 1fr;
            background-size: 200%;
        }
    }

    @media (min-width: 1024px){
        .offer-container{
            background-size: 120%;
            background-position: 50% 0;
        }
    }
</style>
