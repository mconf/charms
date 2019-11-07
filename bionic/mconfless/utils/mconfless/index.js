
require('dotenv').config();

const { MCONFLESS_TEST } = process.env;

const bigbluebot = require('bigbluebot');

let actions;

switch (MCONFLESS_TEST) {
  case 'join':
    actions = async page => {};
    break;
  case 'listen':
    actions = async page => await bigbluebot.audio.dialog.listen(page);
    break;
  case 'microphone':
    actions = async page => await bigbluebot.audio.dialog.microphone(page);
    break;
  case 'video':
    actions = async page => await bigbluebot.video.join(page);
    break;
  default:
    console.warn(`Unhandled test ${MCONFLESS_TEST}`);
}

if (actions) bigbluebot.run(actions);
