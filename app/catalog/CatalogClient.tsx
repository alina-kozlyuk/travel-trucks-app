'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/lib/api/clientApi';
import { CamperFilterParams } from '@/types/types';
import CamperCard from '@/components/CamperCard/CamperCard';
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar';
import LoaderModal from '@/components/LoaderModal/LoaderModal';
import EmptyState from '@/components/EmptyState/EmptyState';
import css from './Catalog.module.css';

export default function CatalogClient() {
  const [filterParams, setFilterParams] = useState<CamperFilterParams>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['campers', filterParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ ...filterParams, page: pageParam, limit: 4 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  const handleSearch = (newFilters: CamperFilterParams) => {
    setFilterParams(newFilters);
  };

  const handleClear = () => {
    setFilterParams({});
  };

  return (
    <div className="container">
      <div className={css.layout}>
        {/* Сайдбар із фільтрами */}
        <FilterSidebar
          initialFilters={filterParams}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {/* Список або Порожній стан */}
        <main className={css.content}>
          {(isLoading || isFetchingNextPage) && <LoaderModal />}

          {!isLoading && campers.length === 0 && (
            <EmptyState onResetFilters={handleClear} />
          )}

          {campers.length > 0 && (
            <ul className={css.list}>
              {campers.map((camper) => (
                <li key={camper.id}>
                  <CamperCard camper={camper} />
                </li>
              ))}
            </ul>
          )}

          {hasNextPage && !isLoading && (
            <div className={css.loadMoreWrapper}>
              <button
                type="button"
                onClick={() => fetchNextPage()}
                className={css.loadMoreBtn}
              >
                Load more
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}