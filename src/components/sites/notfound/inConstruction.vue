<template lang="pug">
    div.container
        p.message
            i(class='fas fa-hourglass-start')
            | strona w budowie!
</template>
<script>
export default {
    name: 'inConstruction',
};
</script>
<style lang="scss" scoped>

    $default_site_color: #9e0012;

    .container{
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: $default_site_color;
        color: #fff;
        font-size: 20px;

        .message{
            text-transform: uppercase;
            font-size: 3em;
        }

        i{
            font-size: 2em;
        }
    }
</style>
