interface levelData {
  planets: PlanetData[]
  mapScale: number,
  buffer : number,
  planetsInMap: number
}

interface PlanetData {
  type: string
  posData : posData
  fighters: number
}

interface posData {
  name: String;
  x: number,
  y: number,
  radius: number,
  angle: number,
  destY?: number,
  destX?:number
}