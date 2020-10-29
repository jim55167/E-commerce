<template>
    <div>
    <!-- bootstrap pagination -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': !pages.has_pre }">
                    <a class="page-link" href="#" aria-label="Previous"
                        @click.prevent="getPages(pages.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" v-for="page in pages.total_pages" :key="page"
                    :class="{ 'active': pages.current_page === page }"> 
                    <a class="page-link" href="#" @click.prevent="getPages(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ 'disabled': !pages.has_next }">
                    <a class="page-link" href="#" aria-label="Next"
                        @click.prevent="getPages(pages.current_page + 1)">
                            <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Layout',
    data() {
        return{};
    },
    props: ["pages"],
    methods: {
        getPages(num) {
            // event = Admin.vue > @event
            // @event 在 Admin.vue 指向 getProducts
            this.$emit('event', num)
        }
    }
}
</script>