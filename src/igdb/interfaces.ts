import { Game } from './games';
import { Platform } from './platform';

interface igdbAuth {
   readonly url: string;
   readonly userKey: string;
}
export interface igdbGame extends igdbAuth {
    getGame(id: number): Promise<Game>;
}

export interface igdbPlatfor extends igdbAuth {
    getPlatform(id: number): Promise<Platform>
}
