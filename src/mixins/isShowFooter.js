const isShowFooter = {
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.commit('Controller/routeIsShow', vm.$route.name);
        })
    },
}

export default isShowFooter;
