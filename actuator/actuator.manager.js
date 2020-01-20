function getHealth() {
  return {
    status: "UP",
  };
}

function getInfo() {
  const versionHash = require('child_process')
    .execSync('git rev-parse HEAD')
    .toString().trim();

  return {
    version: versionHash
  }
}

module.exports = {
  getHealth,
  getInfo
}
