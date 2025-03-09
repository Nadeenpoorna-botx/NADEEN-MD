const config = require('../config');
let fs = require('fs');
const { exec } = require('child_process');
const { cmd } = require('../command');

cmd({
    pattern: "botupdate",
    react: "🔄",
    desc: "Update folder from GitHub",
    category: "owner",
    use: '.update',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const repoUrl = 'https://github.com/Nadeenpoorna-max/NADEEN-MD-V2.git'; 
        const targetFolder = 'plugins'; 


        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder); 
        }

    
        const gitCommand = fs.existsSync(`${targetFolder}/.git`)
            ? `git -C ${targetFolder} pull`
            : `git clone ${repoUrl} ${targetFolder}`;
        await new Promise((resolve, reject) => {
            exec(gitCommand, (err, stdout, stderr) => {
                if (err) {
                    reject(`Git command failed: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            });
        });

       
        await conn.sendMessage(from, { text: '*✅ Update completed successfully!* \n > 𝗡𝗔𝗗𝗘𝗘𝗡-𝗠𝗗' }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply(`*Error during update:* ${error.message}`);
    }
});
