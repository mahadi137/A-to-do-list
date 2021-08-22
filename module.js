//Creating my own module for node.js

exports.current_Day = function() {

  const today = new Date();

  const option = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  return today.toLocaleString('en-US', option);
};



// module.exports = current_day;
//
// function current_day () {
// const today = new Date();
//
// const option = {
//   weekday: 'long',
//   day: 'numeric',
//   month: 'long'
// };
//
// const day = today.toLocaleString ('en-US', option);
//
// }
