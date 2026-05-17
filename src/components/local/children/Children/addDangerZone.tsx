'use client';

import { useState, useRef, useCallback } from 'react';
import { AlertTriangle } from 'lucide-react';
import {
    GoogleMap,
    LoadScript,
    Marker,
    StandaloneSearchBox,
    Libraries,
} from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { addDangerZone } from '@/lib/server/actions/braclets/bracletAction';

const libraries: Libraries = ['places'];

const mapContainerStyle = {
    width: '100%',
    height: '300px',
};

type DangerZoneForm = {
    name: string;
    lat: number
    lng: number
};

export default function DangerZone({ braclet }: { braclet: number }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [zones, setZones] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

    const mapRef = useRef<google.maps.Map | null>(null);
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

    const { register, handleSubmit, reset } = useForm<DangerZoneForm>();

    const onMapLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
    };

    const onSearchLoad = (ref: google.maps.places.SearchBox) => {
        searchBoxRef.current = ref;
    };

    const onPlaceChanged = () => {
        const places = searchBoxRef.current?.getPlaces();
        if (places && places[0]?.geometry?.location) {
            const loc = places[0].geometry.location;
            const position = { lat: loc.lat(), lng: loc.lng() };
            setSelectedLocation(position);
            mapRef.current?.panTo(position);
        }
    };

    const onSubmit = async (data: DangerZoneForm) => {
        if (!selectedLocation) {
            return alert('Please select a location on the map');
        }

        try {
            await addDangerZone({
                braclet_id: braclet.toString(),
                name: data.name,
                lat: selectedLocation.lat,
                lng: selectedLocation.lng
            });

            setZones((prev) => [...prev, data.name]);
            reset();
            setSelectedLocation(null);
        } catch (error) {
            console.error('Failed to submit danger zone', error);
        }
    };


    return (
        <div>
            {/* Button to open modal */}
            <button onClick={() => setModalOpen(true)} className='flex items-center gap-1 text-error dark:text-dark-error mt-2 text-label-small'>
                <span>Add Danger Zone</span>
                <AlertTriangle className="text-red-500 size-3" />
            </button>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-full max-w-xl p-4 relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-3 text-gray-700 dark:text-gray-300 hover:text-black"
                        >
                            ✕
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Danger zone name"
                                {...register('name', { required: true })}
                                className="border rounded px-3 py-2"
                            />

                            <LoadScript
                                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                                libraries={libraries}
                            >
                                <StandaloneSearchBox onLoad={onSearchLoad} onPlacesChanged={onPlaceChanged}>
                                    <input
                                        type="text"
                                        placeholder="Search for location"
                                        className="border rounded px-3 py-2 w-full mb-2"
                                    />
                                </StandaloneSearchBox>

                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={selectedLocation || { lat: 36.752887, lng: 3.042048 }} // Algiers default
                                    zoom={12}
                                    onLoad={onMapLoad}
                                    onClick={onMapClick}
                                >
                                    {selectedLocation && <Marker position={selectedLocation} />}
                                </GoogleMap>
                            </LoadScript>

                            <button
                                type="submit"
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Add Danger Zone
                            </button>
                        </form>

                        {/* Show list of added zone names */}
                        {zones.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Added Zones:</h4>
                                <ul className="list-disc pl-5 text-sm">
                                    {zones.map((zone, idx) => (
                                        <li key={idx}>{zone}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
