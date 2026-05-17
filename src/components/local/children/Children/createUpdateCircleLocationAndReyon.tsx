'use client';

import { useCallback, useRef, useState } from 'react';
import { CircleArrowDown } from 'lucide-react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  Libraries,
} from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { CircleUpdateLocation } from '@/lib/server/actions/braclets/bracletAction';

const libraries: Libraries = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

type CircleForm = {
  radius: number; // in KM
};

export default function CreateUpdateCircleLocationRayon({ circle }: { circle: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);
  const { register, handleSubmit, reset, watch } = useForm<CircleForm>();

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const radiusKm = watch('radius') || 1; // default to 1 km

  const onSubmit = async (data: CircleForm) => {
    if (!center) return alert('Please select a center point on the map');

    try {
      await CircleUpdateLocation({
        circle_id: circle.toString(),
        lat: center.lat,
        lng: center.lng,
        radius: data.radius * 1000, // convert km to meters
      });

      reset();
      setCenter(null);
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating circle zone:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-1 text-primary-container dark:text-dark-primary-container mt-2 text-label-small"
      >
        <span>Add Safe Zone</span>
        <CircleArrowDown className="text-primary-container dark:text-dark-primary-container size-3" />
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-xl p-4 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-3 text-gray-700 dark:text-gray-300 hover:text-black"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <label className="text-sm font-semibold">Rayon (km)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                {...register('radius', { required: true })}
                placeholder="Enter radius in kilometers"
                className="border rounded px-3 py-2"
              />

              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                libraries={libraries}
              >
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center || { lat: 36.752887, lng: 3.042048 }} // Default to Algiers
                  zoom={13}
                  onLoad={onMapLoad}
                  onClick={onMapClick}
                >
                  {center && (
                    <>
                      <Marker position={center} />
                      <Circle
                        center={center}
                        radius={radiusKm * 1000}
                        options={{
                          fillColor: '#22c55e',
                          fillOpacity: 0.3,
                          strokeColor: '#15803d',
                          strokeWeight: 2,
                        }}
                      />
                    </>
                  )}
                </GoogleMap>
              </LoadScript>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Zone
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
