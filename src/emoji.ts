import { emoji, get as GetNodeEmoji } from "node-emoji";

export type EmojiItem = Record<keyof typeof emoji, string>;

export class Emoji {
  emoji: EmojiItem;

  constructor() {
    this.emoji = emoji;
  }

  get(key: keyof EmojiItem) {
    return GetNodeEmoji(key);
  }
}
