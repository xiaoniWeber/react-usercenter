const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  
    app.use(
        proxy("/api/", {
            target: "http://192.168.35.84:8086",
            changeOrigin: true,
            secure: false,
            pathRewrite: {
            "^/api": "/"
            },
        })
    );
};