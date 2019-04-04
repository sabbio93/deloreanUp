exports.id = 0;
exports.modules = {

/***/ "./src/app.js":
/***/ (function(module, exports, __webpack_require__) {

var createError = __webpack_require__("http-errors");
var express = __webpack_require__("express");
var path = __webpack_require__("path");
var cookieParser = __webpack_require__("cookie-parser");
var logger = __webpack_require__("morgan");

var indexRouter = __webpack_require__("./src/routes/index.js");
var usersRouter = __webpack_require__("./src/routes/users.js");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/***/ })

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHJlYS9TZWNvbmREaXNrL1dvcmtzcGFjZS9iYWNrdXBJbW9sYWIvZGVsb3JlYW51cC9CYWNrZW5kL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiY3JlYXRlRXJyb3IiLCJyZXF1aXJlIiwiZXhwcmVzcyIsInBhdGgiLCJjb29raWVQYXJzZXIiLCJsb2dnZXIiLCJpbmRleFJvdXRlciIsInVzZXJzUm91dGVyIiwiYXBwIiwic2V0Iiwiam9pbiIsIl9fZGlybmFtZSIsInVzZSIsImpzb24iLCJ1cmxlbmNvZGVkIiwiZXh0ZW5kZWQiLCJzdGF0aWMiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZXJyIiwibG9jYWxzIiwibWVzc2FnZSIsImVycm9yIiwiZ2V0Iiwic3RhdHVzIiwicmVuZGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBSUEsY0FBY0MsbUJBQU9BLENBQUMsYUFBUixDQUFsQjtBQUNBLElBQUlDLFVBQVVELG1CQUFPQSxDQUFDLFNBQVIsQ0FBZDtBQUNBLElBQUlFLE9BQU9GLG1CQUFPQSxDQUFDLE1BQVIsQ0FBWDtBQUNBLElBQUlHLGVBQWVILG1CQUFPQSxDQUFDLGVBQVIsQ0FBbkI7QUFDQSxJQUFJSSxTQUFTSixtQkFBT0EsQ0FBQyxRQUFSLENBQWI7O0FBRUEsSUFBSUssY0FBY0wsbUJBQU9BLENBQUMsdUJBQVIsQ0FBbEI7QUFDQSxJQUFJTSxjQUFjTixtQkFBT0EsQ0FBQyx1QkFBUixDQUFsQjs7QUFFQSxJQUFJTyxNQUFNTixTQUFWOztBQUVBO0FBQ0FNLElBQUlDLEdBQUosQ0FBUSxPQUFSLEVBQWlCTixLQUFLTyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsT0FBckIsQ0FBakI7QUFDQUgsSUFBSUMsR0FBSixDQUFRLGFBQVIsRUFBdUIsS0FBdkI7O0FBRUFELElBQUlJLEdBQUosQ0FBUVAsT0FBTyxLQUFQLENBQVI7QUFDQUcsSUFBSUksR0FBSixDQUFRVixRQUFRVyxJQUFSLEVBQVI7QUFDQUwsSUFBSUksR0FBSixDQUFRVixRQUFRWSxVQUFSLENBQW1CLEVBQUVDLFVBQVUsS0FBWixFQUFuQixDQUFSO0FBQ0FQLElBQUlJLEdBQUosQ0FBUVIsY0FBUjtBQUNBSSxJQUFJSSxHQUFKLENBQVFWLFFBQVFjLE1BQVIsQ0FBZWIsS0FBS08sSUFBTCxDQUFVQyxTQUFWLEVBQXFCLFFBQXJCLENBQWYsQ0FBUjs7QUFFQUgsSUFBSUksR0FBSixDQUFRLEdBQVIsRUFBYU4sV0FBYjtBQUNBRSxJQUFJSSxHQUFKLENBQVEsUUFBUixFQUFrQkwsV0FBbEI7O0FBRUE7QUFDQUMsSUFBSUksR0FBSixDQUFRLFVBQVVLLEdBQVYsRUFBZUMsR0FBZixFQUFvQkMsSUFBcEIsRUFBMEI7QUFDaENBLE9BQUtuQixZQUFZLEdBQVosQ0FBTDtBQUNELENBRkQ7O0FBSUE7QUFDQVEsSUFBSUksR0FBSixDQUFRLFVBQVVRLEdBQVYsRUFBZUgsR0FBZixFQUFvQkMsR0FBcEIsRUFBeUJDLElBQXpCLEVBQStCO0FBQ3JDO0FBQ0FELE1BQUlHLE1BQUosQ0FBV0MsT0FBWCxHQUFxQkYsSUFBSUUsT0FBekI7QUFDQUosTUFBSUcsTUFBSixDQUFXRSxLQUFYLEdBQW1CTixJQUFJVCxHQUFKLENBQVFnQixHQUFSLENBQVksS0FBWixNQUF1QixhQUF2QixHQUF1Q0osR0FBdkMsR0FBNkMsRUFBaEU7O0FBRUE7QUFDQUYsTUFBSU8sTUFBSixDQUFXTCxJQUFJSyxNQUFKLElBQWMsR0FBekI7QUFDQVAsTUFBSVEsTUFBSixDQUFXLE9BQVg7QUFDRCxDQVJEOztBQVVBQyxPQUFPQyxPQUFQLEdBQWlCcEIsR0FBakIsQyIsImZpbGUiOiIwLmQ2ZGMwM2I2ODUwNGEzOTRkNWEzLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCdodHRwLWVycm9ycycpXG52YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKVxudmFyIHBhdGggPSByZXF1aXJlKCdwYXRoJylcbnZhciBjb29raWVQYXJzZXIgPSByZXF1aXJlKCdjb29raWUtcGFyc2VyJylcbnZhciBsb2dnZXIgPSByZXF1aXJlKCdtb3JnYW4nKVxuXG52YXIgaW5kZXhSb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcy9pbmRleCcpXG52YXIgdXNlcnNSb3V0ZXIgPSByZXF1aXJlKCcuL3JvdXRlcy91c2VycycpXG5cbnZhciBhcHAgPSBleHByZXNzKClcblxuLy8gdmlldyBlbmdpbmUgc2V0dXBcbmFwcC5zZXQoJ3ZpZXdzJywgcGF0aC5qb2luKF9fZGlybmFtZSwgJ3ZpZXdzJykpXG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdwdWcnKVxuXG5hcHAudXNlKGxvZ2dlcignZGV2JykpXG5hcHAudXNlKGV4cHJlc3MuanNvbigpKVxuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpXG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKVxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAncHVibGljJykpKVxuXG5hcHAudXNlKCcvJywgaW5kZXhSb3V0ZXIpXG5hcHAudXNlKCcvdXNlcnMnLCB1c2Vyc1JvdXRlcilcblxuLy8gY2F0Y2ggNDA0IGFuZCBmb3J3YXJkIHRvIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XG4gIG5leHQoY3JlYXRlRXJyb3IoNDA0KSlcbn0pXG5cbi8vIGVycm9yIGhhbmRsZXJcbmFwcC51c2UoZnVuY3Rpb24gKGVyciwgcmVxLCByZXMsIG5leHQpIHtcbiAgLy8gc2V0IGxvY2Fscywgb25seSBwcm92aWRpbmcgZXJyb3IgaW4gZGV2ZWxvcG1lbnRcbiAgcmVzLmxvY2Fscy5tZXNzYWdlID0gZXJyLm1lc3NhZ2VcbiAgcmVzLmxvY2Fscy5lcnJvciA9IHJlcS5hcHAuZ2V0KCdlbnYnKSA9PT0gJ2RldmVsb3BtZW50JyA/IGVyciA6IHt9XG5cbiAgLy8gcmVuZGVyIHRoZSBlcnJvciBwYWdlXG4gIHJlcy5zdGF0dXMoZXJyLnN0YXR1cyB8fCA1MDApXG4gIHJlcy5yZW5kZXIoJ2Vycm9yJylcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gYXBwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==