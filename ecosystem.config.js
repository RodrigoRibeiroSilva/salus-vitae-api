module.exports = {
  apps : [{
    name   : "salus-vitae-api",
    script : "./dist/main.js",
    instances: 0,
    exec_mode: "cluster",
    watch: true,
    merge_log: true,
    env: {
      PORT: 8000,
        DB_URL: "mongodb://dbasalus1:dbasalus1@ds111063.mlab.com:11063/salus-vitae",
        NODE_ENV: "development"
    },
    env_production: {
      PORT: 8000,
      NODE_ENV: "production"
    }
  }]
}
