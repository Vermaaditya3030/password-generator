# VaultKey Password Generator — Fixed

## Fixes
- Robust Web Crypto random generation with fallback
- Works when opened directly as `index.html`
- Clipboard fallback/handling
- Validates character selections and exclusions
- Guarantees one character from every selected category
- LocalStorage errors do not stop generation

## Run
Double-click `index.html`, or use VS Code Live Server.

## Test
```bash
npm test
```

## GitHub
```bash
git init
git add .
git commit -m "fix: repair password generator"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/vaultkey-password-generator.git
git push -u origin main
```
