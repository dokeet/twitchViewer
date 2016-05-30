Vue.config.debug = true;
Vue.component('channels', {
    template: '#get-channel',

    data: function(){
      return {
        streamProfile: [],
        channelProfile: [],
        channel: 'TSM_Dyrus'
      }
    },
    ready: function(){
      this.getStream();
    },
    methods: {
      getStream: function (){
        this.$http.get('https://api.twitch.tv/kraken/streams/'+this.channel, function(data) {
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
    props: ['stream']

});


new Vue({

  el: '#app',

  components: 'channels',

  data: {
    channels: [
      'freecodecamp',
      'hastad'
    ]
  }


})
