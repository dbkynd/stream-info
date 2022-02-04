import tmi from 'tmi.js';

export function newSub(userstate: tmi.SubUserstate): void {
  console.log('new subscription');
}

export function resub(userstate: tmi.SubUserstate): void {
  console.log('new resub');
  // let cumulativeMonths = ~~userstate['msg-param-cumulative-months'];
}

export function subgift(userstate: tmi.SubGiftUserstate): void {
  console.log('new subgift');
  // let senderCount = ~~userstate['msg-param-sender-count'];
}

export function submysterygift(userstate: tmi.SubMysteryGiftUserstate): void {
  console.log('new submysterygift');
  // let senderCount = ~~userstate['msg-param-sender-count'];
}
