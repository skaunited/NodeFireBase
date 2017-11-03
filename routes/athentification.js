var decorate = require('getter-setter').browser,
    obj = decorate({
        logged: false
    });
module.exports = {
  setLog:function(value){
    var source;
    obj.set('logged', value);
    source = obj.get('logged');
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  },
  getLog:function(){
    var source;
    source = obj.get('logged');
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
  }
};
