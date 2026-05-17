'use client';

import { Children } from '@/lib/server/type/children/children';
import { isOutsideSafeZone } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface ChildrenMarkerProps {
    child: Children;
    onClick: () => void;
    map: google.maps.Map | null;
}

export const ChildrenMarker = ({ child, onClick, map }: ChildrenMarkerProps) => {
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
    const pinRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!map || !child.braclet?.location) return;

        // Create the pin element
        const pin = document.createElement('div');
        pin.className = 'advanced-marker-pin';
        pin.style.width = '24px';
        pin.style.height = '24px';
        pin.style.borderRadius = '50%';
        pin.style.backgroundColor = isOutsideSafeZone(child) ? '#FF0000' : '#00FF00';
        pin.style.border = '2px solid white';
        pin.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
        pin.style.display = 'flex';
        pin.style.alignItems = 'center';
        pin.style.justifyContent = 'center';
        pin.style.color = 'white';
        pin.style.fontWeight = 'bold';
        pin.style.cursor = 'pointer';

        // Add child initial as content
        const initial = document.createElement('span');
        initial.textContent = child.name.charAt(0) + child.last.charAt(0);
        initial.style.fontSize = '10px';
        pin.appendChild(initial);

        pinRef.current = pin;

        // Create the AdvancedMarker
        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: {
                lat: child.braclet.location.lat,
                lng: child.braclet.location.lng
            },
            content: pin,
            title: `${child.name} ${child.last}`
        });

        // Add click event
        pin.addEventListener('click', onClick);

        return () => {
            if (markerRef.current) {
                markerRef.current.map = null;
                markerRef.current = null;
            }
            if (pinRef.current) {
                pinRef.current.removeEventListener('click', onClick);
                pinRef.current = null;
            }
        };
    }, [map, child, onClick]);

    return null;
};