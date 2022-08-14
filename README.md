# chat app frontent

### Recommended VSCode extensions

 - <a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">Stylelint</a>
 - <a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">Prettier - Code formatter</a>
 - <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESlint</a>
 - <a href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig">EditorConfig for VS Code</a>
 - <a href="https://marketplace.visualstudio.com/items?itemName=ionic.ionic">Ionic</a>
 - <a href="https://marketplace.visualstudio.com/items?itemName=ryuta46.multi-command">multi-command</a>
 - <a href="https://marketplace.visualstudio.com/items?itemName=vunguyentuan.vscode-css-variables">CSS Variable Autocomplete</a>

### Workspace settings

```json
{
    "scss.validate": false,
    "css.validate": false,
    "less.validate": false,
    "stylelint.enable": true,
    "stylelint.validate": [
        "css",
        "scss",
        "less",
        "postcss"
    ],
    "typescript.tsdk": "node_modules/typescript/lib",
}
```
