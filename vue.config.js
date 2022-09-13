module.exports = {
  devServer: {
    port: 3000,
    proxy: "http://localhost:8000",
  },
  transpileDependencies: ["vue-awesome", "vue-notion"],
};
