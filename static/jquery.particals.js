jQuery.fn.particles=function(){var items=this;return{init:function(params,callback){items.each(function(index,element){void 0===element.id&&(element.id="tsparticles"+Math.floor(1e3*Math.random())),tsParticles.load(element.id,params).then(callback)})},ajax:function(jsonUrl,callback){items.each(function(index,element){void 0===element.id&&(element.id="tsparticles"+Math.floor(1e3*Math.random())),tsParticles.loadJSON(element.id,jsonUrl).then(callback)})}}};