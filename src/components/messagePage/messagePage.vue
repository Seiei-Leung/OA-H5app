<template>
    <div class="messagePage-component"></div>
</template>

<script>
export default {
    created: function() {
        this.$store.commit("showIndexComponents");
    }
}
</script>

<style>

</style>
