'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
} from '@react-google-maps/api';
import { useChildren } from './providers/ChildrenProvider'; // adjust path if needed
import { Children } from '@/lib/server/type/children/children';
import { LassoSelect } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

export const ChildrenMap: React.FC<{ apiKey: string }> = ({ apiKey }) => {
  const { children, selectedChild, setSelectedChild, loading } = useChildren();
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const isChildSafe = (child: any): boolean => {
    if (!window.google?.maps?.geometry || !child?.braclet?.circle) return false;

    const center = new google.maps.LatLng(
      child.braclet.circle.location.lat,
      child.braclet.circle.location.lng
    );

    const position = new google.maps.LatLng(
      child.braclet.location.lat,
      child.braclet.location.lng
    );

    const distance = google.maps.geometry.spherical.computeDistanceBetween(center, position);
    return distance <= child.braclet.circle.radius;
  };

  const flyToChild = (child: Children) => {
    console.log('Flying to:', child.name, child.braclet?.location);

    if (mapRef.current && child?.braclet?.location) {
      mapRef.current.panTo({
        lat: child.braclet.location.lat,
        lng: child.braclet.location.lng,
      });
      mapRef.current.setZoom(15);
    }
  };



  const initialCenter = children[0]?.braclet?.location
    ? {
      lat: children[0].braclet.location.lat,
      lng: children[0].braclet.location.lng,
    }
    : { lat: 35.8763, lng: 7.1135 }; // default to Oum El Bouaghi

  if (loading) return <p>Loading children...</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* List of children */}
      <ul className="flex flex-col">
        {children.map((child) => (
          <li
            key={child.id}
            onClick={() => flyToChild(child)}
            className={`cursor-pointer px-4 py-2  ${selectedChild?.id === child.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
          >
            <span className={`flex items-center gap-2`}>

              <span>{child.name} - {child.last}</span>
              {
                isChildSafe(child) ? (
                  <span className=' flex gap-1 items-center'>
                    <LassoSelect className='inline-block ml-2 text-green-500' />
                    <span className='text-green-500'>Safe Zone</span>
                  </span>
                ) : (
                  <span className=' flex gap-1 items-center'>
                    <LassoSelect className='inline-block ml-2 text-red-500' />
                    <span className='text-red-500'>Not In The Safe Zone</span>
                  </span>
                )
              }
            </span>
            <hr className='my-1 border-[0.5px] border-outline-variant' />
          </li>
        ))}
      </ul>

      <LoadScript googleMapsApiKey={apiKey} libraries={['geometry']}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          onLoad={onLoad}
          center={initialCenter}
          zoom={13}
        >
          {children.map((child) => {
            const braclet = child.braclet;
            if (!braclet || !braclet.circle || !braclet.location) return null;

            const safe = isChildSafe(child);

            return (
              <React.Fragment key={child.id}>
                <Circle
                  center={{
                    lat: braclet.circle.location.lat,
                    lng: braclet.circle.location.lng,
                  }}
                  radius={braclet.circle.radius}
                  options={{
                    fillColor: safe ? '#34d399' : '#f87171',
                    fillOpacity: 0.3,
                    strokeColor: safe ? '#10b981' : '#ef4444',
                    strokeWeight: 2,
                  }}
                />
                <Marker
                  position={{
                    lat: braclet.location.lat,
                    lng: braclet.location.lng,
                  }}
                  label={{
                    text: child.name,
                    color: safe ? '#10b981' : '#ef4444',
                  }}
                />
              </React.Fragment>
            );
          })}

        </GoogleMap>
      </LoadScript>
    </div>
  );
};
