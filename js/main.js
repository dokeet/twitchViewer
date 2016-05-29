const vm = new Vue({
  el: '#app',

  ready: function() {
    this.getStream();
  },
  data: {
    streamProfile: []
  },
  methods: {
    getStream: function (){
      this.$http({
        url: 'https://api.twitch.tv/kraken/streams/aphromoo',
        method: 'JSONP',
      }).then(this.setData.bind(this));
    },
    setData: function(res) {
      this.streamProfile = res.data.stream;
    }
  }
})

/*
https://www.twitch.tv/aphromoo
*/
