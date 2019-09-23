<template lang="pug">
    div#app
        <router-view> </router-view>
</template>
<script>
export default {
    name: 'App',
};
</script>
<style lang="scss">

*{
    box-sizing: border-box;
}

html{
    scroll-behavior: smooth;
}

body{
    margin: 0;
    padding: 0;

    overflow-x: hidden !important;

    font-family: 'Roboto', sans-serif;
}

#app{
    height: auto;
    width: auto;
}
</style>
