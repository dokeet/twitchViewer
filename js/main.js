Vue.config.debug = true;

Vue.component('channels', {
    template: '#channels',

    props: ['channels'],

    data: function(){
      return {
        streamProfile: [],
        channelProfile: [],
        channel: this.channels.channel,
        channelStatus: true
      }
    },
    ready: function(){
      this.getStream(this.channel);
    },
    methods: {
      getStream: function (channel){
        this.$http.get('https://api.twitch.tv/kraken/streams/'+channel, function(data, status, request) {
          this.$set('streamProfile', data)
          }).then(function(){
          if(this.streamProfile.stream === null){
            this.getChannel();
            this.channelStatus = false
          }
        }).catch(function(data, status, request){
            this.channelStatus = false
            this.$set('channelProfile', data)
            this.$log(status, request, data)
        })

      },
      getChannel: function() {
        this.$http.get(this.streamProfile._links.channel, function(data) {
          this.$set('channelProfile', data)
        }).catch(function(data, status, request){
          console.log('error', status, request)
        })
      },

    },
});
const vm = new Vue({

  el: '#app',

  data: {

    channels: [
      {channel: 'freecodecamp'},
      {channel: 'hastad'},
      {channel: 'TSM_Dyrus'},
      {channel: 'Keireth'},
      {channel: 'TSM_Bjergsen'},
      {channel: 'imaqtpie'},
      {channel: 'Trick2g'},
      {channel: 'flosd'},
      {channel: 'camfoster404'},
      {channel: 'wrongchannel4'}
    ],

  },


})
