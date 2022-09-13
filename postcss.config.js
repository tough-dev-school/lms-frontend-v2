const path = require("path");

module.exports = {
  plugins: [
    require("postcss-mixins")({
      mixinsFiles: path.join(__dirname, "src/assets/styles/mixins"),
    }),
    require("postcss-nested"),
    require("postcss-custom-media")({
      importFrom: [
        {
          customMedia: {
            "--after-mobile": "(min-width: 414px)",
            "--desktop": "(min-width: 800px)",
          },
        },
      ],
    }),
  ],
};
