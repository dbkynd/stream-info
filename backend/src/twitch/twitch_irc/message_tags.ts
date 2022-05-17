// https://dev.twitch.tv/docs/irc/tags#usernotice-tags

import _ from 'lodash';
import tmi from 'tmi.js';
import pushover from '../../pushover';

const tags = [
  'badge-info', // Contains metadata related to the chat badges in the badges tag. Currently, this tag contains metadata only for subscriber badges, to indicate the number of months the user has been a subscriber.
  'badges', // Comma-separated list of chat badges in the form, <badge>/<version>. For example, admin/1. There are many possible badge values, but here are few: admin; bits; broadcaster; moderator; subscriber; staff; turbo; Most badges have only 1 version, but some badges like subscriber badges offer different versions of the badge depending on how long the user has subscribed. To get the badge, use the Get Global Chat Badges and Get Channel Chat Badges APIs. Match the badge to the set-id field’s value in the response. Then, match the version to the id field in the list of versions.
  'color', // The color of the user’s name in the chat room. This is a hexadecimal RGB color code in the form, #<RGB>. This tag may be empty if it is never set.
  'display-name', // The user’s display name, escaped as described in the IRCv3 spec. This tag may be empty if it is never set.
  'emotes', // A comma-delimited list of emotes and their positions in the message. Each emote is in the form, <emote ID>:<start position>-<end position>. The position indices are zero-based. To get the actual emote, see the Get Channel Emotes and Get Global Emotes APIs. For information about how to use the information that the APIs return, see Twitch emotes. NOTE It’s possible for the emotes flag’s value to be set to an action instead of identifying an emote. For example, \001ACTION barfs on the floor.\001.
  'id', // An ID that uniquely identifies this message.
  'login', // The login name of the user whose action generated the message.
  'mod', // A Boolean value that determines whether the user is a moderator. Is true (1) if the user is a moderator; otherwise, false (0).
  'msg-id', // The type of notice (not the ID). Possible values are: sub; resub; subgift; giftpaidupgrade; rewardgift; anongiftpaidupgrade; raid; unraid; ritual; bitsbadgetier;
  'room-id', // An ID that identifies the chat room (channel).
  'subscriber', // A Boolean value that determines whether the user is a subscriber. Is true (1) if the user is a subscriber; otherwise, false (0).
  'system-msg', // The message Twitch shows in the chat room for this notice.
  'tmi-sent-ts', // The UNIX timestamp for when the Twitch IRC server received the message.
  'turbo', // A Boolean value that indicates whether the user has site-wide commercial free mode enabled. Is true (1) if enabled; otherwise, false (0).
  'user-id', // The user’s ID.
  'user-type', // The type of user sending the whisper message. Possible values are: "" — A normal user; admin — A Twitch administrator; global_mod — A global moderator; staff — A Twitch employee;

  /* SUBSCRIPTION TAGS */
  'msg-param-sub-plan', // Included only with sub, resub and subgift notices. The type of subscription plan being used. Possible values are: Prime — Amazon Prime subscription; 1000 — First level of paid subscription; 2000 — Second level of paid subscription; 3000 — Third level of paid subscription;
  'msg-param-sub-plan-name', // Included only with sub, resub, and subgift notices. The display name of the subscription plan. This may be a default name or one created by the channel owner.

  /* SUB AND RESUB TAGS*/
  'msg-param-cumulative-months', // Included only with sub and resub notices. The total number of months the user has subscribed. This is the same as msg-param-months but sent for different types of user notices.
  'msg-param-should-share-streak', // Included only with sub and resub notices. A Boolean value that indicates whether the user wants their streaks shared.
  'msg-param-streak-months', // Included only with sub and resub notices. The number of consecutive months the user has subscribed. This is zero (0) if msg-param-should-share-streak is 0.

  /* SUBGIFT TAGS */
  'msg-param-months', //Included only with subgift notices. The total number of months the user has subscribed. This is the same as msg-param-cumulative-months but sent for different types of user notices.
  'msg-param-recipient-display-name', // Included only with subgift notices. The display name of the subscription gift recipient.
  'msg-param-recipient-id', // Included only with subgift notices. The user ID of the subscription gift recipient.
  'msg-param-recipient-user-name', // Included only with subgift notices. The user name of the subscription gift recipient.
  'msg-param-gift-months', // Included only with subgift notices. The number of months gifted as part of a single, multi-month gift.

  /* RAID TAGS */
  'msg-param-displayName', // Included only with raid notices. The display name of the broadcaster raiding this channel.
  'msg-param-login', // Included only with raid notices. The login name of the broadcaster raiding this channel.
  'msg-param-viewerCount', // Included only with raid notices. The number of viewers raiding this channel from the broadcaster’s channel.

  /* PROMO TAGS */
  'msg-param-promo-gift-total', // Included only with anongiftpaidupgrade and giftpaidupgrade notices. The number of gifts the gifter has given during the promo indicated by msg-param-promo-name.
  'msg-param-promo-name', // Included only with anongiftpaidupgrade and giftpaidupgrade notices. The subscriptions promo, if any, that is ongoing (for example, Subtember 2018).

  /* GIFT UPGRADE TAGS */
  'msg-param-sender-login', // Included only with giftpaidupgrade notices. The login name of the user who gifted the subscription.
  'msg-param-sender-name', // Include only with giftpaidupgrade notices. The display name of the user who gifted the subscription.

  /* RITUAL TAGS */
  'msg-param-ritual-name', // Included only with ritual notices. The name of the ritual being celebrated. Possible values are: new_chatter.

  /* BITS BADGE TAGS */
  'msg-param-threshold', // Included only with bitsbadgetier notices. The tier of the Bits badge the user just earned. For example, 100, 1000, or 10000.

  'emote-only',
  'first-msg',
  'flags',
  'emotes-raw',
  'badge-info-raw',
  'badges-raw',
  'username',
  'message-type',
  'client-nonce',
  'reply-parent-display-name',
  'reply-parent-msg-body',
  'reply-parent-msg-id',
  'reply-parent-user-id',
  'reply-parent-user-login',
];

let reportedTags: string[] = [];

export default (userstate: tmi.ChatUserstate) => {
  const messageTags = Object.keys(userstate);
  const newTags = _.difference(messageTags, [...tags, ...reportedTags]);
  if (newTags.length) {
    reportedTags = reportedTags.concat(newTags);
    let msg = `New MESSAGE tags: \n\n${newTags.join(' | ')}`;
    if (userstate['system-msg']) msg += `\n\n ${userstate['system-msg']}`;
    pushover.push(msg);
  }
};
