const EARTH_RADIUS_KM = 6371;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function haversineDistanceKm(
  from: [number, number],
  to: [number, number],
) {
  const [lat1, lon1] = from;
  const [lat2, lon2] = to;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Fast planar approximation that is accurate enough for nearby route filtering.
function projectToKm(point: [number, number], referenceLat: number): [number, number] {
  const latFactor = 111.32;
  const lonFactor = Math.cos(toRadians(referenceLat)) * 111.32;

  return [point[1] * lonFactor, point[0] * latFactor];
}

export function distancePointToSegmentKm(
  point: [number, number],
  segmentStart: [number, number],
  segmentEnd: [number, number],
) {
  const referenceLat = (segmentStart[0] + segmentEnd[0] + point[0]) / 3;
  const [px, py] = projectToKm(point, referenceLat);
  const [ax, ay] = projectToKm(segmentStart, referenceLat);
  const [bx, by] = projectToKm(segmentEnd, referenceLat);
  const abx = bx - ax;
  const aby = by - ay;
  const apx = px - ax;
  const apy = py - ay;
  const abSquared = abx * abx + aby * aby;

  if (abSquared === 0) {
    return Math.hypot(px - ax, py - ay);
  }

  const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / abSquared));
  const closestX = ax + abx * t;
  const closestY = ay + aby * t;

  return Math.hypot(px - closestX, py - closestY);
}

export function distancePointToPolylineKm(
  point: [number, number],
  polyline: [number, number][],
) {
  if (polyline.length < 2) {
    return polyline.length === 1 ? haversineDistanceKm(point, polyline[0]) : Infinity;
  }

  let minDistance = Infinity;

  for (let index = 0; index < polyline.length - 1; index += 1) {
    const distance = distancePointToSegmentKm(
      point,
      polyline[index],
      polyline[index + 1],
    );

    if (distance < minDistance) {
      minDistance = distance;
    }
  }

  return minDistance;
}
