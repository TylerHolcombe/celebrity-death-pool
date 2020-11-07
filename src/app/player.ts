export class Player {
  firstname: string;
  lastname: string;
  email?: string;
  entries?: Entry[];

  constructor() { }
}

export class Entry {
  points?: number;
  isApproved?: boolean;
  isPaid?: boolean;
  selections?: Celebrity[];
  player?: Player;
}

export class Celebrity {
  name: string;
  isDead?: boolean;
  isWildcard?: boolean;
}
