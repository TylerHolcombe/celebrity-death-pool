export class Player {
  name: string;
  points?: number;
  celebs?: Celebrity[];
  isApproved?: boolean;

  constructor() {}
}

export class Celebrity {
  name: string;
  isWildcard?: boolean;
  isDead?: boolean;
}
