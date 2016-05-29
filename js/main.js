Vue.http.options.root = 'https://api.twitch.tv/kraken/';
const vm = new Vue({
  el: '#app',

  ready: function() {
    this.getStream();
  },
  data: {
    streamProfile: [],
    channelProfile: [],
    channel: ''
  },
  methods: {
    getStream: function (){
      this.$http.get('https://api.twitch.tv/kraken/streams/'+this.channel, function(data) {
        this.$set('streamProfile', data)
        if(this.streamProfile.stream === null){
          this.$http.get(this.streamProfile._links.channel, function(data) {
            this.$set('channelProfile', data)
          })
        }
      })
      .catch(function(data, status, request){
        console.log(status, request);
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
