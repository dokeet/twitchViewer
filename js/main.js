
const vm = new Vue({
  el: '#app',

  ready: function() {
      this.getStream();
    },
  data: {
    streamProfile: [],
    channelProfile: [],
    channel: 'Aphromoo'
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
  }

})

/*

this.$http.get('http://httpbin.org/ip', function (data) {
            // set data on vm
            this.$set('origin', data)

        }).error(function (data, status, request) {
            // handle error
        })

      }

https://www.twitch.tv/aphromoo
*/
