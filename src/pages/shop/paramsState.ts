import { ParamsState } from './types';
import { elements } from './shopElements';

export const paramsState: ParamsState = {
    filter: {
        category: '',
        color: '',
        getFilter() {
            const result: string[] = [];
            if (this.category !== '') {
                result.push(`categories.id: subtree("${this.category}")`);
            }
            if (this.color !== '') {
                result.push(`categories.id: subtree("${this.color}")`);
            }
            return result.length ? result : null;
        },
    },
    sort: {
        price: '',
        name: '',
        setPrice() {
            switch (this.price) {
                case 'asc':
                    this.price = 'desc';
                    break;
                case 'desc':
                    this.price = '';
                    break;
                default:
                    this.price = 'asc';
            }
        },
        setName() {
            switch (this.name) {
                case 'asc':
                    this.name = 'desc';
                    break;
                case 'desc':
                    this.name = '';
                    break;
                default:
                    this.name = 'asc';
            }
        },
        getSort() {
            const result: string[] = [];
            if (this.price !== '') result.push(`price ${this.price}`);
            if (this.name !== '') result.push(`name.en ${this.name}`);
            return result.length ? result : null;
        },
    },
    pagin: {
        limit: 500,
        offset() {
            return this.limit * this.page;
        },
        total: 0,
        page: 0,
        pageCount() {
            return Math.ceil(this.total / this.limit);
        },
        setPagin(page: number, total?: number) {
            if (total) {
                this.total = total;
            }
            if (this.pageCount() > page && page >= 0) {
                this.page = page;
                elements.numPagShop.textContent = `${this.page + 1}`;
            }
        },
    },
    paramsRecord() {
        const filters = this.filter.getFilter();
        const sort = this.sort.getSort();
        const params: Record<string, string | number | string[]> = {
            limit: this.pagin.limit,
            offset: this.pagin.offset(),
        };
        if (filters !== null) params.filter = filters;
        if (sort !== null) params.sort = sort;
        return params;
    },
};
