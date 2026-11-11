/** Zustand einer einzelnen Abfrage, wie ihn Leer- und Listenbausteine brauchen (Teilmenge von TanStack `UseQueryResult`) */
export interface AbfrageLage {
    isError: boolean;
    error: unknown;
    isFetching: boolean;
    status?: 'pending' | 'error' | 'success';
    fetchStatus?: string;
    refetch?: () => unknown;
}
