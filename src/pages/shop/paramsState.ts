import { ParamsState } from './types';

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
    paramsRecord() {
        const filters = this.filter.getFilter();
        const sort = this.sort.getSort();
        const params: Record<string, string | number | string[]> = {
            limit: 500,
        };
        if (filters !== null) params.filter = filters;
        if (sort !== null) params.sort = sort;
        return params;
    },
};
