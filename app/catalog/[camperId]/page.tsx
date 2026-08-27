//app/catalog/[camperId]/page.tsx
import { Metadata } from 'next';
import { fetchCamperById } from '@/lib/api/serverApi'; // <-- Використовуємо serverApi
import CamperDetailsClient from './CamperDetailsClient';

interface PageProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { camperId } = await params;
  try {
    const camper = await fetchCamperById(camperId);
    return {
      title: `${camper.name} | TravelTrucks`,
      description: camper.description,
    };
  } catch {
    return {
      title: 'Camper Details | TravelTrucks',
    };
  }
}

export default async function CamperDetailsPage({ params }: PageProps) {
  const { camperId } = await params;

  return <CamperDetailsClient camperId={camperId} />;
}