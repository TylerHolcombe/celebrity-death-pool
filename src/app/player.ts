export class Player {
  name: string;
  points?: number;
  celebs?: Celebrity[];

  constructor() {}
}

export class Celebrity {
  name: string;
  isWildcard?: boolean;
  isDead?: boolean;
}
