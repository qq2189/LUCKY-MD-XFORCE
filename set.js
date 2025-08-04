const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU8zQzNaOGU2eDMrWU10bjNhOUdnZzMxUVVsMjd4RzZaZEpwRGtjUkNrVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjBZeUwrYzRDVFNacEhqU0F0bDZjWVlDamgycVZxNmJIby9lc0ZCWFBtWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBUE1zbmx0KytNNUtHWU5CZ0RVcHpremZaN0V6dG5UVk1qeStqakg4bmtVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYQ2ZQWHNlYlpMUm1hRTBDUDg0NjhWV0FKbjRYcGNRbVZkSUZ4N2tKVEJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVKbUZMRFVJUlVZYlFwKzNEY0h2MWdOVXhiMFllNFlwZzYrL1ptZDl3M1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlXdHZ2VjAyVnBXQmE3MDkxV0NBNGlxMzA0dmZiYUNyVVM1SlNyUjlkREk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUlqS1RFc1R0NEI1L05RTWNNM1NhRWJ3elY1bzhXbDlDYWlSam9MOFlFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVdKdHJMWFFhR1YrU2lxcUVtcnMwanJIVXI5L0srMWNESW1kdHNiWUlCVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJSM0dNUXRiLzhudy8rQWFraE1DcVg1dDdDV09maHdkbUJycU5hb0ZJekpRZGgrdHQ0bHIxSngrejBLWUFvNGI3TWFnS1VQOEh6cUc3TU1iQWlXc0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTcsImFkdlNlY3JldEtleSI6Ijh0SSthaVZFY0JwTlYzYXYrNm0vdTU1a1ltMGYwMzkxQytIQllVK2NPL1E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzEwMjYzMDM0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhENjM0ODQwQjc2MkY2MkRCMzJDOTExMEI5QTVGQTg3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQyODQ3MjV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcxMDI2MzAzNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NzI5Rjc0Q0YzQkRFQzdDN0Q5NDk4RUVBOUFCQjhGNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0Mjg0NzI4fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI5N0gxRjhIOSIsIm1lIjp7ImlkIjoiMjU0NzEwMjYzMDM0OjczQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTQyNTg5MDU1NDg0MTAwOjczQGxpZCIsIm5hbWUiOiJNZXRhIEFpIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQWDd4OEFCRUtDRndjUUdHQnNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCMGpyMEh6eEg0K0VJK3VjcVhOVUJTb0pjbW9ITmFEN05CUkhveG9XNEU4PSIsImFjY291bnRTaWduYXR1cmUiOiJJSk93T0xxcUMyeFdzc2FEVWd3aCtXUlpvc0RvRXJ6Y0Q3bUx2Ry90ejRtaEthTjQ1YU8zaWI5Q3JaMTVrZlJzdFEzbDR0M25aalhIRmlHNnQraGJDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaGZ6TThJZ2JJVkF1OUlwYnRiTTlNTXZ2dlVZa1NsaWRzaFNGcGhBVWJKL2lZYzJabXlUaVYyVE1uMUhUVGdCSGJ2NzJ4ZlRjdktQckhyUTlnUUtKQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MTAyNjMwMzQ6NzNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUWRJNjlCODhSK1BoQ1BybktselZBVXFDWEpxQnpXZyt6UVVSNk1hRnVCUCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0Mjg0NzE3LCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5RcyJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Brian",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254710263034",
    DEV : process.env.DEV || "SONIC PULSE",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/ij547h.jpg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/ij547h.jpg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "no",
    ANTI_TAG : process.env.ANTI_TAG || "no",
    ANTI_BAD : process.env.ANTI_BAD || "no",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vb5Ym5P4o7qKr7MUIa2Z",
    WEBSITE :process.env.GURL || "https://fredi-ai-site.vercel.app",
    CAPTION : process.env.CAPTION || "SONIC-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'SONIC-PULSE-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
