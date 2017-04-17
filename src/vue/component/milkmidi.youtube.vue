<!--
milkmidi vue youtube component
    1.0.1
    1.0.2
        width,height 預設為 100%
        fs   
-->

<style>
/* https://codepen.io/dudleystorey/pen/PZyMrd*/
/*.video-background {
    box-sizing: border-box;
    background: #000;
    top: 0; right: 0; bottom: 0; left: 0;
}*/

.youtube_player_container .video-foreground,
.youtube_player_container .video-background iframe {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    width: 100%;
    height: 100%;
    /*pointer-events: none;*/
}

</style>

<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>

<template>


<div class='youtube_player_container'>
    <div :class="{'video-foreground':fs}">
        <div :id="elementId" :style="{'width':iframeWidth,'height':iframeHeight}">Loading</div>
    </div>
</div>

</template>

<script>
/* global YT */
/* eslint max-len:off,no-console:off */
let isAPIReady = false;
let isAPIAttachedToScriptTag = false;
let youtubeID = 0;
/* const EVENTS = {
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'queued',
};*/

function loadYoutubeScript() {
    if (isAPIAttachedToScriptTag) { return; }
    isAPIAttachedToScriptTag = true;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = () => {
        console.log('onYouTubeIframeAPIReady');
        isAPIReady = true;
    };
}
class Timer {
    constructor(cb) {
        this.id = -1;
        this.cb = cb;
    }
    start() {
        this.stop();
        this.id = setInterval(() => {
            this.cb();
        }, 33);
    }
    stop() {
        if (this.id !== -1) {
            clearInterval(this.id);
            this.id = -1;
        }
    }
    destroy() {
        this.stop();
        this.cb = null;
    }
}
export default{
    className: 'milkmidi.youtube',
    props: {
        video_id: String,
        width: {
            type: Number,
            default: -1,
        },
        height: {
            type: Number,
            default: -1,
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        fs: {
            type: Boolean,
            default: false,
        },
        // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
        playerVars: {
            type: Object,
            default: {
                autoplay: 0,
                controls: 1,
                autohide: 1,
                enablejsapi: 1,
                loop: 1,
                disablekb: 1,
                fs: 1,
                modestbranding: 0,
                showinfo: 0,
                rel: 0,
            },
        },
    },
    data() {
        return {
            checkAPIReadyID: -1,
            player: null,
            elementId: '',
            progress: 0,
            progressTime: null,
            loadedTime: null,
        };
    },
    computed: {
        iframeWidth() {
            return this.width === -1 ? '100%' : `${this.width}px`;
        },
        iframeHeight() {
            return this.height === -1 ? '100%' : `${this.height}px`;
        },
    },
    watch: {
        video_id(value) {
            if (!this.player) { return; }
            this.player.cueVideoById(value);
        },
    },
    methods: {
        checkAPIReadyHandler() {
            if (isAPIReady) {
                clearInterval(this.checkAPIReadyID);
                this.checkAPIReadyID = -1;
                this.createPlayer();
            }
        },
        createPlayer() {
            if (this.player) { return; }
            if (!this.video_id) {
                throw new Error('invalidate video_id');
            }
            youtubeID += 1;
            this.elementId = `youtube_player${youtubeID}`;
            // console.log( this.playerV );
            this.$nextTick(() => {
                this.player = new YT.Player(this.elementId, {
                    width: `${this.width}px`,
                    height: `${this.height}px`,
                    videoId: this.video_id,
                    playerVars: this.playerVars,
                    events: {
                        onReady: (e) => {
                            this.$emit('ready', e);
                            if (!this.progressTime) {
                                this.progressTime = new Timer(() => {
                                    const p = this.player.getCurrentTime() / this.player.getDuration();
                                    this.$emit('progress', p);
                                });
                                this.loadedTime = new Timer(() => {
                                    this.$emit('loaded', this.player.getVideoLoadedFraction());
                                });
                            }
                            if (this.autoplay) {
                                this.player.playVideo();
                            }
                        },
                        onStateChange: (e) => {
                            this.$emit('state', e);
                            if (e.data === 1) {
                                this.progressTime.start();
                                this.loadedTime.start();
                            } else {
                                this.progressTime.stop();
                                this.loadedTime.stop();
                            }
                        },
                    },
                });
            });
        },
    },
    mounted() {
        loadYoutubeScript();
        if (!isAPIReady) {
            this.checkAPIReadyID = setInterval(() => {
                this.checkAPIReadyHandler();
            }, 200);
        } else {
            this.createPlayer();
        }
    },
    beforeDestroy() {
        if (this.player !== null) {
            this.player.destroy();
            this.player = null;
        }
        if (this.progressTime) {
            this.progressTime.destroy();
            this.progressTime = null;
        }
        if (this.loadedTime) {
            this.loadedTime.destroy();
            this.loadedTime = null;
        }
        delete this.player;
    },
};
</script>
