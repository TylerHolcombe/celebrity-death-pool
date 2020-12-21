export class Player {
  playerId?: bigint;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  entries?: Entry[];
}

export class Entry {
  entryId?: bigint;
  points?: number;
  approved?: boolean;
  paid?: boolean;
  entrySelections?: EntrySelection[];
  player?: Player;
}

export class EntrySelection {
  entrySelectionId?: bigint;
  wildcard?: boolean;
  celebrity?: Celebrity;
}

export class Celebrity {
  celebrityId?: bigint;
  celebrityName: string;
  dead?: boolean;
}
