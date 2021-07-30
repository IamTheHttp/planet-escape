declare module '*.png';
declare module '*.jpg';
declare module '*.json';

interface Window {
  Entity: new(...args: any) => any
  game: any; // TODO this should not be any
  API: any; // TODO this should not be any
  stressTest: () => void;
  cheats_won: boolean;
}
// export {};
//
// interface Entity {
//   entities: Record<any, BaseEntity>
// }
