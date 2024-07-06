const path = require('path');

module.exports = {
  mode: 'production', // or 'development' for non-minified output
  entry: './src/chatbot.jsx', // adjust the path as per your project structure
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chatbot.bundle.js',
    library: 'Chatbot', // adjust library name as per your preference
    libraryTarget: 'umd', // supports commonjs, amd, and others
    umdNamedDefine: true,
    globalObject: 'this', // necessary for universal modules
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // use babel for transpiling JSX/TSX
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    // add other dependencies here if needed
  },
};
