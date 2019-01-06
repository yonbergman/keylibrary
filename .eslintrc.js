module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  'parser': 'babel-eslint',
  "plugins": [
    "react",
    "react-native"
  ],
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    }
  },
  "rules": {
    'comma-dangle': ["error", "always-multiline"],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,
  },
  "settings": {
    "react": {
      "version": "16.5"
    }
  }

}
