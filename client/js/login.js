var app = new Vue({
  el: '#app',
  data:{
    email: '',
    password: ''
  },
  methods:{
    facebook: function () {
      console.log('masuk');
      axios.post('http://localhost:3000')
      .then((response)=>{
          console.log(respon);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
})