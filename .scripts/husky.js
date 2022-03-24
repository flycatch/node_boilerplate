const { execSync } = require('child_process');
const { existsSync } = require('fs');


const HUSKY_CONFIG = require('../.huskyrc.json');

if(!existsSync('./.husky/_/husky.sh')) {
    execSync("npx husky install");
}
Object.keys(HUSKY_CONFIG).forEach(hook => {
    const command = HUSKY_CONFIG[hook];
    const huskyFile = `./.husky/${hook}`;
    const installCommand = `npx husky add ${huskyFile} "${command}"`
    if(!existsSync(huskyFile)) {
        global.console.log(installCommand);
        execSync(installCommand);
    }
});

