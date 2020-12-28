module.exports = {
    "parser": "babel-eslint",
    "extends": ["airbnb", "prettier", "prettier/react"],
    "plugins": ["react", "jsx-a11y", "import", "react-hooks"],
    "parserOptions": {
        "ecmaVersion": 10,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "jsx-a11y/anchor-is-valid": 0,
        "import/no-extraneous-dependencies": 0,
        "import/prefer-default-export": 0,
        "import/no-named-as-default": 0,
        "import/order": [
            "error",
            {
                "newlines-between": "always",
                "groups": ["external", "index"]
            }
        ],
        "react/forbid-prop-types": 0,
        "react/jsx-filename-extension": 0,
        "react/button-has-type": 0,
        "react/destructuring-assignment": 0,
        "react/require-default-props": 0,
        "react/react-in-jsx-scope": 0,
        "react/jsx-props-no-spreading": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-max-props-per-line": ["error", { "when": "multiline" }],
        "arrow-body-style": 0,
        "no-return-assign": 0,
        "no-confusing-arrow": 0,
        "object-curly-newline": 0,
        "global-require": 0,
        "consistent-return": 0,
        "no-plusplus": 0,
        "implicit-arrow-linebreak": 0,
        "no-param-reassign": 0,
        "no-nested-ternary": 0,
        "linebreak-style": 0,
        "no-unused-vars": "error",
        "no-multi-spaces": "error",
        "keyword-spacing": ["error"],
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "comma-dangle": ["error", "always-multiline"],
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
        "semi": "error",
        "space-infix-ops": "error",
        "space-unary-ops": "error",
        "arrow-spacing": "error",
        "arrow-parens": ["error", "as-needed", { "requireForBlockBody": true }],
        "no-trailing-spaces": "error",
        "no-console": [
            "error",
            {
                "allow": ["warn", "error"]
            }
        ],
        "indent": [
            "error",
            2,
            {
                "SwitchCase": 1,
                "ignoredNodes": [
                    "ConditionalExpression",
                    "CallExpression",
                    "ObjectExpression",
                    "MemberExpression"
                ]
            }
        ],
        "padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": "*",
                "next": [
                    "return",
                    "block-like",
                    "function",
                    "const",
                    "let",
                    "multiline-expression"
                ]
            },
            {
                "blankLine": "always",
                "prev": [
                    "return",
                    "block-like",
                    "function",
                    "const",
                    "let",
                    "multiline-expression"
                ],
                "next": "*"
            },
            {
                "blankLine": "any",
                "prev": ["const", "let"],
                "next": ["const", "let"]
            }
        ]
    },
    "env": {
        "es6": true,
        "node": true,
        "browser": true,
        "jest": true
    },
};
