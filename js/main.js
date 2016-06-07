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
            this.channelStatus = false
            this.getChannel();
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
new Vue({

  el: '#app',

  data: {

    channels: [
      {channel: 'freecodecamp', status: null},
      {channel: 'hastad', status: null},
      {channel: 'TSM_Dyrus', status: null},
      {channel: 'Keireth', status: null},
      {channel: 'TSM_Bjergsen', status: null},
      {channel: 'imaqtpie', status: null},
      {channel: 'Trick2g', status: null},
      {channel: 'flosd', status: null},
      {channel: 'camfoster404', status: null}
    ],

  },


})
