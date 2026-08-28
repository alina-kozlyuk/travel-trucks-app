'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/lib/api/clientApi';
import { CamperFilterParams } from '@/types/types';
import CamperCard from '@/components/CamperCard/CamperCard';
import FilterSidebar from '@/components/FilterSidebar/FilterSidebar';
import EmptyState from '@/components/EmptyState/EmptyState';
import Loading from '../loading';
import css from './Catalog.module.css';

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filterParams = useMemo<CamperFilterParams>(() => {
    return {
      location: searchParams.get('location') || undefined,
      form: searchParams.get('form') || undefined,
      transmission: searchParams.get('transmission') || undefined,
      engine: searchParams.get('engine') || undefined,
    };
  }, [searchParams]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['campers', filterParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ ...filterParams, page: pageParam, perPage: 4 }),
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
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    router.push(pathname);
  };

  return (
    <div className={css.layout}>
      <FilterSidebar
        initialFilters={filterParams}
        onSearch={handleSearch}
        onClear={handleClear}
      />

      <main className={css.content}>
        {isLoading && <Loading />}

        {!isLoading && campers.length === 0 && (
          <EmptyState onResetFilters={handleClear} />
        )}

        {!isLoading && campers.length > 0 && (
          <ul className={css.list}>
            {campers.map((camper) => (
              <li key={camper.id}>
                <CamperCard camper={camper} />
              </li>
            ))}
          </ul>
        )}

        {!isLoading && hasNextPage && (
          <div className={css.loadMoreWrapper}>
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage || isFetching}
              className={css.loadMoreBtn}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function CatalogClient() {
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <CatalogContent />
      </Suspense>
    </div>
  );
}