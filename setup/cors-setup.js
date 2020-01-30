function setupCors(app) {
  const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', ['Authorization', 'Content-Type']);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  }
  
  app.use(allowCrossDomain);
}

module.exports = {
  setupCors
}