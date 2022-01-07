export interface Pokemon {
  id: number;
  name: string;
  front: string;
  back: string
}

export interface Poke {
  id: number;
  name: string;
  front?: string;
  back?: string
}