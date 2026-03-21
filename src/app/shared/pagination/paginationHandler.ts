import { FilterHandler } from '../filter/filterHandler';
import { ColumnHeader } from './columnHeader';
import { DialogFilter } from '../filter/dialogFilter';
import { PageList, IPageList } from './pageList';
import { FilterMetadata } from 'primeng/api';
import { Table } from 'primeng/table';
import { BehaviorSubject } from 'rxjs';

export interface LazyLoadCustomEvent {
    first?: number | undefined | null;
    rows?: number | undefined | null;

    filters?: {
        [s: string]: FilterMetadata | FilterMetadata[] | undefined;
    };
}

export class PaginatorHandler<T> {
    columns: ColumnHeader[] = [];
    page: IPageList<T> = new PageList<T>();
    private started = false;
    private $loading = new BehaviorSubject<boolean>(false);
    private filterHandler = new FilterHandler();

    pageCount = 0;
    rows = 10;
    rowsPerPage = [10, 25, 50];
    loading = false;

    constructor(
        private handler: (query: Record<string, any>) => Promise<IPageList<T>>,
    ) {}

    async init() {
        setTimeout(async () => {
            try {
                this.started = true;
                const page = this.filterHandler.getFilter<
                    number | string | undefined
                >('page');
                this.pageCount = page ? (Number(page) - 1) * this.rows : 0;

                await this.next({ first: this.pageCount, rows: this.rows });
            } catch (error) {
                this.started = false;
            }
        }, 0);
    }

    reload() {
        this.next({ first: this.pageCount, rows: this.rows });
    }
    async next(event: LazyLoadCustomEvent) {
        if (!this.started) return;

        // 1. Actualizar el estado base (rows) primero, la Fuente Única de Verdad (Single Source of Truth)
        if (event.rows && event.rows > 0) {
            this.rows = event.rows;
        }

        // 2. Extraer el offset de forma segura (0 es falsy, evitamos operadores ternarios simples)
        const firstOffset = event.first ?? 0;
        this.pageCount = firstOffset;

        // 3. Calculo Matemático Correcto (1-indexado para Backend) usando los 'rows' AL DIA
        const currentPage = Math.floor(firstOffset / this.rows) + 1;

        // 4. Inyectar Filtros Puros
        this.filterHandler.setFilter<number>('page', currentPage);
        this.filterHandler.setFilter<number>('pageSize', this.rows);

        if (event.filters) {
            this.filterHandler.setFiltersMetadata(event.filters);
        }

        // 5. Ejecutar Integración de Datos
        try {
            this.loading = true;
            this.$loading.next(true);
            const query = this.filterHandler.getFilters();
            this.page = await this.handler(query);
        } catch (error) {
            console.error('Paginator Error:', error);
        } finally {
            this.loading = false;
            this.$loading.next(false);
        }
    }

    get filters(): Record<string, any> {
        return this.filterHandler.getFilters();
    }

    set filters(value: Record<string, any>) {
        this.filterHandler.setFilters(value);
    }

    async onPage(event: { rows: number; first: number }) {
        this.rows = event.rows;
    }

    setFilters(query: Record<string, any>) {
        this.filterHandler.setFilters(query);
    }

    setDialogFilters(filters: DialogFilter[]) {
        const query: Record<string, any> = {};

        for (const filter of filters) {
            if (filter.type === 'date')
                query[filter.field] = filter.value.toUTCString();
            else query[filter.field] = filter.value;
        }

        this.filterHandler.setFilters(query);
    }

    getFilters() {
        return this.filterHandler.getFilters();
    }

    clearFilters() {
        this.filterHandler.clearFilters();
    }

    onFilter(value: any, field: string, filterMatchMode?: string, dt?: Table) {
        this.filterHandler.setFilter(field, value);
        dt?.filter(
            value,
            field,
            filterMatchMode ? filterMatchMode : 'contains',
        );
    }

    setPage(list: IPageList<T>) {
        this.page = list;
    }

    observeFilters() {
        return this.filterHandler.asObservable();
    }

    get loading$() {
        return this.$loading.asObservable();
    }
    setColumns(columns: ColumnHeader[]) {
        this.columns = columns;
    }

    isFieldVisible(columnName: string) {
        const column = this.columns.find((col) => col.field === columnName);
        return column && column.hidden ? !column.hidden() : false;
    }
}
