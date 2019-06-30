<template lang='pug'>
    div#coaches
        div.page-title
            i(class='fas fa-users')
            p
                | Trenerzy
        div.content
</template>
<script>
import PageTitle from '../pieces/PageTitle.vue';

export default {
    name: 'Coaches',
}
</script>
<style lang='scss' scoped>

.content{
    min-height: 100px;
}

</style>

