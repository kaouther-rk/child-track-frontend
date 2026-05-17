'use client';

import { Children } from '@/lib/server/type/children/children';
import { isOutsideSafeZone } from '@/lib/utils';
import { useEffect } from 'react';

interface SafetyCircleProps {
  child: Children;
  onClick: () => void;
  map: google.maps.Map;
}

export const SafetyCircle = ({ child, onClick, map }: SafetyCircleProps) => {
  useEffect(() => {
    if (!child.braclet?.circle?.location) return;

    const isOutside = isOutsideSafeZone(child);
    
    const circle = new google.maps.Circle({
      map,
      center: {
        lat: child.braclet.circle.location.lat,
        lng: child.braclet.circle.location.lng
      },
      radius: child.braclet.circle.radius,
      strokeColor: isOutside ? '#FF0000' : '#00FF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: isOutside ? '#FF0000' : '#00FF00',
      fillOpacity: 0.35,
      clickable: true,
    });

    circle.addListener('click', onClick);

    return () => {
      circle.setMap(null);
      google.maps.event.clearListeners(circle, 'click');
    };
  }, [child, map, onClick]);

  return null;
};