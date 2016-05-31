Vue.config.debug = true;
Vue.component('channels', {
    template: '#get-channel',

    props: ['channels'],

    data: function(){
      return {
        streamProfile: [],
        channelProfile: [],
        channel: this.channels.channel
      }
    },
    ready: function(){
      this.getStream(this.channel);
    },
    methods: {
      getStream: function (channel){
        this.$http.get('https://api.twitch.tv/kraken/streams/'+channel, function(data) {
          this.$set('streamProfile', data)
        }).catch(function(data, status, request){
          console.log(status, request);
        }).then(function(){
          if(this.streamProfile.stream === null){
            this.getChannel();
          }
        })

      },
      getChannel: function() {
        this.$http.get(this.streamProfile._links.channel, function(data) {
          this.$set('channelProfile', data)
        }).catch(function(data, status, request){
          console.log('error', status, request)
        })
      }
    },


});


new Vue({

  el: '#app',

  data: {
    channels: [
      {channel: 'freecodecamp'},
      {channel: 'hastad'},
      {channel: 'TSM_Dyrus'},
      {channel: 'Keireth'},
      {channel: 'TSM_Bjergsen'}
    ],
    channelProfile: {},
    streamProfile: {}
  }


})
