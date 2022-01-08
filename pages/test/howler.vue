<template lang="pug">
  .test-howler
    h1 Test - Howler
    .test-howler__controls
      el-button(v-for="text, action in actions", :key="action", @click="onClick(action)")
        | {{ text }}

</template>

<script>
import Easing from 'easing';
import System from '~/client/system';

const SoundSystem = System.sounds;
const plays = {};

export default {
  data() {
    return {
      actions: {
        heli: 'Heli',
        rain: 'Rain',
        left: 'Left',
        right: 'Right',
        top: 'Top',
        bottom: 'Bottom',
        stop: 'Stop',
      },
    };
  },
  methods: {
    onClick(action) {
      if (action === 'heli') {
        SoundSystem.sound('heli').play();
      }
      if (action === 'rain') {
        SoundSystem.sound('rain').play();
      }
      if (action === 'left') {
        SoundSystem.sound('heli').ease((sound, value) => {
          sound.howl.pos(4 * value - 2, 0, -0.5);
        }, 5000);
      }
      if (action === 'stop') {
        SoundSystem.stop();
      }
      return;
      if (action === 'left') {
        Easing.event(100, 'sinusoidal', {duration: 5000}).on('data', (perc) => {
          sounds.heli.pos(4 * perc - 2, 0, -0.5, plays.heli);
        });
      } else if (action === 'right') {
        Easing.event(100, 'sinusoidal', {duration: 5000}).on('data', (perc) => {
          sounds.heli.pos(4 - 4 * perc - 2, 0, -0.5, plays.heli);
        });
      } else if (action === 'top') {
        Easing.event(100, 'sinusoidal', {duration: 5000}).on('data', (perc) => {
          sounds.heli.pos(0, 4 * perc - 2, -0.5, plays.heli);
        });
      } else if (action === 'bottom') {
        Easing.event(100, 'sinusoidal', {duration: 5000}).on('data', (perc) => {
          sounds.heli.pos(0, 4 - 4 * perc - 2, -0.5, plays.heli);
        });
      } else if (action === 'stop') {
      } else {
        if (plays[action] === undefined) {
          plays[action] = sounds[action].play();
        } else {
          if (sounds[action].playing(plays[action])) {
            sounds[action].pause(plays[action]);
          } else {
            sounds[action].play(plays[action]);
          }
        }
      }
    },
  },
}
</script>

<style lang="sass">
.test-howler
  display: block
</style>
