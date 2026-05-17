import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Children } from "./server/type/children/children";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 


export const isOutsideSafeZone = (child: Children): boolean => {
  if (!child.braclet?.location || !child.braclet.circle?.location) return false;

  const childPos = new google.maps.LatLng(
    child.braclet.location.lat,
    child.braclet.location.lng
  );
  
  const circleCenter = new google.maps.LatLng(
    child.braclet.circle.location.lat,
    child.braclet.circle.location.lng
  );
  
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    childPos,
    circleCenter
  );

  return distance > child.braclet.circle.radius;
};

export const calculateDistanceFromCenter = (child: Children): number => {
  if (!child.braclet?.location || !child.braclet.circle?.location) return 0;

  const childPos = new google.maps.LatLng(
    child.braclet.location.lat,
    child.braclet.location.lng
  );
  
  const circleCenter = new google.maps.LatLng(
    child.braclet.circle.location.lat,
    child.braclet.circle.location.lng
  );
  
  return google.maps.geometry.spherical.computeDistanceBetween(
    childPos,
    circleCenter
  );
};