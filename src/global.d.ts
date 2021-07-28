import {BaseEntity} from "./gameEngine/BaseEntity";

declare module '*.png'
declare module '*.jpg'
declare module '*.json';

declare global {
  interface Window {
    Entity: new(...args: any) => Entity
    game: any; // TODO this should not be any
    API: any; // TODO this should not be any
    stressTest: () => void;
    cheats_won: boolean;
  }
}

interface Entity {
  entities: Record<any, BaseEntity>
}