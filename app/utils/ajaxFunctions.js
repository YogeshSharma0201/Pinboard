module.exports = {
  get: function(url, done) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        done(null, data);
      },
      error: function(err) {
        done(err);
      }
    });
  },
  post: function(url, data, done) {
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        done(null, data);
      },
      error: function(err) {
        done(err);
      }
    });
  },
  put: function(url, data, done) {
    $.ajax({
      url: url,
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        done(null, data);
      },
      error: function(err) {
        done(err);
      }
    });
  },
  delete: function(url, data, done) {
    $.ajax({
      url: url,
      type: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        done(null, data);
      }.bind(this),
      error: function(err) {
        done(err);
      }
    });
  }
}
