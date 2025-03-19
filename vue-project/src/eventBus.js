import { reactive } from 'vue';

export const eventBus = reactive({
    searchTerm: '',
    setSearchTerm(term) {
        this.searchTerm = term;
    }
});