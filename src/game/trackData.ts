import * as THREE from 'three';
const points: [number, number, number][] = [[-100,0,0],[-75,0,-48],[-30,0,-68],[25,0,-72],[75,0,-48],[105,0,-5],[90,0,38],[55,0,66],[5,0,74],[-40,0,62],[-82,0,40],[-105,0,20]];
export const trackCurve = new THREE.CatmullRomCurve3(points.map(([x,y,z]) => new THREE.Vector3(x,y,z)), true, 'catmullrom', 0.15);
export const trackLength = trackCurve.getLength();
export const getTrackPoint = (t: number) => trackCurve.getPointAt(((t % 1) + 1) % 1);
export const getTrackTangent = (t: number) => trackCurve.getTangentAt(((t % 1) + 1) % 1).normalize();
export function getClosestTrackInfo(position: THREE.Vector3) { let bestT = 0, bestDistance = Infinity; const point = new THREE.Vector3(), tangent = new THREE.Vector3(); for (let i = 0; i <= 260; i++) { const t = i / 260; const p = trackCurve.getPointAt(t); const d = p.distanceToSquared(position); if (d < bestDistance) { bestDistance = d; bestT = t; point.copy(p); tangent.copy(trackCurve.getTangentAt(t)).normalize(); } } const dx = position.x - point.x, dz = position.z - point.z; const side = Math.sign(dx * tangent.z - dz * tangent.x); return { t: bestT, point, tangent, lateralOffset: side * Math.sqrt(bestDistance) }; }
