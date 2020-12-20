export class Player {
  firstName: string;
  lastName: string;
  emailAddress?: string;
  entries?: Entry[];
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
