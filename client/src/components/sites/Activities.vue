<template lang='pug'>
    div#club.activities-container
        div.content-wrapper
            div.content-wrapper_header-flexbox
                div.content-wrapper_anim
                    i(class='fas fa-dumbbell')
                    span
                h3
                    | Siłownia
            ul.content-wrapper_list.list-disactive
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
        div.content-wrapper
            div.content-wrapper_header-flexbox
                div.content-wrapper_anim
                    i(class='fas fa-fist-raised')
                    span
                h3
                    | Kickboxing
            ul.content-wrapper_list.list-disactive
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
        div.content-wrapper
            div.content-wrapper_header-flexbox
                div.content-wrapper_anim
                    i(class='fas fa-running')
                    span
                h3
                    | Fitness
            ul.content-wrapper_list.list-disactive
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
                li
                    | lorem ipsum dolor sit amet
</template>
<script>
import ContentWrapper from '../pieces/ContentWrapper.vue';

export default {
    name: 'Activities',
    components: {
        ContentWrapper,
    },
    mounted() {
        ContentWrapper.methods.wrapperRandomize();
    },
};
</script>
<style lang='scss'>
.activities-container{
    background-image: url('../../assets/section3_bg.jpg');
    background-size: 400%;
    background-repeat: no-repeat;
    background-position: 5% 20%;

    width: 100%;
    height: auto;

    display: flex;
    flex-flow: column;

    color: #fff;
}

@media (min-width: 480px){
    .activities-container{
        background-size: 200%;
    }
}

@media (max-width: 768px){
    .activities-container{

        align-items: center;
        justify-content: center;

        min-height: 700px;
        align-items: center;
        height: auto;
    }
}

@media (min-width: 768px){
    .activities-container{
        height: 500px;

        background-size: 100%;

        padding: 20px;

        flex-flow: row;
        align-items: center;
        justify-content: space-around;
    }
}

@media (min-width: 1024px){
    .activities-container{
        height: 600px;
    }
}
</style>
