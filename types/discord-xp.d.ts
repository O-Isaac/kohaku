/**
 * @title Discord Xp Fix types
 * @description I dont know what happen with types, im just trying to fix it
 */
import { Client } from "discord.js";

type User = {
  userID: string;
  guildID: string;
  xp: number;
  level: number;
  lastUpdated: Date;
  cleanXp: number;
  cleanNextLevelXp: number;
};

type LeaderboardUser = {
  guildID: string;
  userID: string;
  xp: number;
  level: number;
  position: number;
  username: String | null;
  discriminator: String | null;
};

declare module "discord-xp" {
  /**
   * Set database uri mongoDB
   * @param dbURL string
   * @note `You only need to do this ONCE per process.`
   */
  async function setURL(dbURL: string): Promise<typeof import("mongoose")>;
  async function createUser(userId: string, guildId: string): Promise<User>;
  async function deleteUser(userId: string, guildId: string): Promise<User>;
  async function deleteGuild(guildId: string): Promise<Guild>;

  async function appendXp(
    userId: string,
    guildId: string,
    xp: number
  ): Promise<boolean>;

  async function appendLevel(
    userId: string,
    guildId: string,
    levels: number
  ): Promise<User>;

  async function setXp(
    userId: string,
    guildId: string,
    xp: number
  ): Promise<User>;

  async function setLevel(
    userId: string,
    guildId: string,
    level: number
  ): Promise<User>;

  async function fetch(
    userId: string,
    guildId: string,
    fetchPosition = false
  ): Promise<User>;

  async function subtractXp(
    userId: string,
    guildId: string,
    xp: number
  ): Promise<User>;

  async function subtractLevel(
    userId: string,
    guildId: string,
    level: number
  ): Promise<User>;

  async function fetchLeaderboard(
    guildId: String,
    limit: number
  ): Promise<User[] | []>;

  async function computeLeaderboard(
    client: Client,
    leaderboard: User[],
    fetchUsers = false
  ): Promise<LeaderboardUser[] | []>;

  function xpFor(targetLevel: number): number;
}
