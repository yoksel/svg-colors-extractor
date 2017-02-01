'use strict';

var doc = document;
var codeInput = doc.querySelector('.textfield--input');
var codeOutput = doc.querySelector('.textfield--output');
var htmlOutput = doc.querySelector('.visual-output');
var targetElem = doc.createElement('div');
var outputList = {};

codeInput.oninput = function () {
  outputList = [];
  htmlOutput.innerHTML = '';
  codeOutput.value = '';
  targetElem.innerHTML = this.value;

  var reg = /(fill|stroke)=['"](.*?)['"]/g;
  var results = this.value.match(reg);

  if ( !results ) {
    return;
  }

  results.forEach( function(item) {
    var regColor = /['"](.*?)['"]/g;
    var color = item.match(regColor)[0].slice(1,-1);

    if ( color == 'none' ) {
      return;
    }

    outputList[ color ] = color;
  });

  var colors = Object.keys( outputList );

  colors.forEach( function( color ) {
    var colorElem = doc.createElement('code');
    // setAttribute was used to prevent convert color to rgb
    var stylesList = [
      'background: ' + color,
      'color: ' +  textColor( color )
    ];
    colorElem.setAttribute('style', stylesList.join(';'));
    colorElem.innerHTML = color;
    outputList.push(colorElem.outerHTML);
  });

  codeOutput.value = outputList.join(', ');
  htmlOutput.innerHTML = codeOutput.value;

};

//---------------------------------------------

function textColor( color ) {
  var tinyColor = tinycolor( color );
  return tinyColor.isLight() ? '#000' : '#FFF';
}
