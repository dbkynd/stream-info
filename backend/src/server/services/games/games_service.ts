import { gamesDelimiter, gamesNoGames, gamesTemplate } from '../../../config';
import LastGameService from '../../../database/lib/last_games';
import {
  gamesToNotSave,
  mutateName,
} from '../../../twitch/twitch_polling/last_games';

export default async (): Promise<string> => {
  const games = await LastGameService.list();
  if (!games.length) return gamesNoGames;
  const names: string[] = [];
  games.forEach((game) => {
    if (gamesToNotSave.includes(game.name)) return;
    names.push(mutateName(game.name));
  });
  return gamesTemplate.replace('<GAMES>', names.join(gamesDelimiter));
};
