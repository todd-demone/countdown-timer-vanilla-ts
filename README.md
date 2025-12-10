# Simple Setup

```
mkdir ts-simple
cd ts-simple
mkdir src/ dist/ public/
npm init -y

npm install --save-dev eslint @eslint/js typescript typescript-eslint
npm install --save-dev --save-exact prettier

touch public/index.html public/link.css src/script.ts

# create tsconfig.json

# create eslint.config.mjs

# create empty Prettier config file
node --eval "fs.writeFileSync('.prettierrc','{}\n')"

# create prettierignore file
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

# compile ts
npx tsc

# alternative compile for dev setup
npx tsc --watch

# run eslint
npx eslint .

# run prettier
npx prettier . --write
