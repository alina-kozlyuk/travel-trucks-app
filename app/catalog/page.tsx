import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import CatalogClient from './CatalogClient';
import { fetchCampers } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'Camper Catalog | TravelTrucks',
  description: 'Explore our wide range of camper vans available for rent in Ukraine.',
};

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  // Префетчимо першу сторінку каталогу
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers', {}],
    queryFn: ({ pageParam = 1 }) =>
      fetchCampers({ page: pageParam, limit: 4 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}