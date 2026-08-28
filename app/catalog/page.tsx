import { Suspense } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import CatalogClient from './CatalogClient';
import { fetchCampers } from '@/lib/api/serverApi';
import Loading from '../loading';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  const initialFilters = {};

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers', initialFilters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ page: pageParam, perPage: 4 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <CatalogClient />
      </Suspense>
    </HydrationBoundary>
  );
}