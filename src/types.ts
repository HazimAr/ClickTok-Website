export type LeaderboardGuild = {
  name: string;
  icon: string;
  conversions: number;
  createdAt: Date;
};

export type LeaderboardGuildUser = {
  username: string;
  avatarURL: string;
  conversions: number;
  createdAt: Date;
};

export type Guild = {
  features: string[];
  icon: string;
  id: string;
  name: string;
  owner: boolean;
  permissions: string;
};
