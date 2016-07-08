
// input birth year, month, day, hour and minute.
var getCurrentAge = function(byear, bmonth, bday, bhour, bminute) {
  var now = moment.utc();
  var current_year = now.get('year');

  // careful, month is 0 indexed...
  var bdate_params = [bmonth - 1, bday, bhour, bminute];
  var bdate = moment.utc([byear].concat(bdate_params));
  var year_bdate = moment.utc([current_year].concat(bdate_params));

  var years_old = current_year - byear;
  if(year_bdate > now) {
    years_old -= 1;
    var previous_bdate = moment.utc([current_year - 1].concat(bdate_params));
    var next_bdate = year_bdate;
  } else {
    var previous_bdate = year_bdate;
    var next_bdate = moment.utc([current_year + 1].concat(bdate_params));
  }

  var rest = (now - previous_bdate)/(next_bdate - previous_bdate);
  return years_old + rest;
};

$(document).ready(function() {

  var getMyAge = function() {
    return getCurrentAge(1985, 7, 13, 18, 30);
  };

  var $age = $('#years-old');
  if($age) {
    var odometer = new Odometer({
      el: $age[0],
      value: getMyAge(),
      format: '(,dd).dddddddd',
      theme: 'minimal'
    });

    var updateOdometer = function() {
      odometer.update(getMyAge());
      setTimeout(updateOdometer, 1000);
    };
    updateOdometer();
  }

});
