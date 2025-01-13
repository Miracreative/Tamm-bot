require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');


let token = process.env.TOKEN;

const bot = new TelegramApi(token, {polling: true});

// const chats = {}

// const startGame = async(chatId) => {

// }
// let messageForMe = false
const link = `<a href="https://tamm.creativecom.org/">Go to site</a>`

const startBotBtn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'About', callback_data: 'about'}],
            [{text: 'Our Team', callback_data: 'team'}],
            [{text: 'Scientific projects', callback_data: 'scientific'}],
            [{text: 'Education', callback_data: 'education'}],
            [{text: 'Сontact us', callback_data: 'contacts'}],
        ]
    }),
    parse_mode: 'HTML'
}

const thanksBotBtn = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Back', callback_data: 'back'}]
        ]
    }),
    parse_mode: 'HTML',
    disable_web_page_preview: true
}

const startMessage = `<b>Light the sparks of new discoveries in plasma physics and power engineering</b>\n\nSupporting breakthrough research in plasma physics and energy. We aim to inspire the next generation of scientists through funding innovative projects, educational programmes and international collaboration.\n\n${link}`;

const aboutMessage = `<b>About</b>\n\nOur mission is not only to fund innovative scientific projects, but also to actively involve the public in the scientific process through various popular science programmes. We organise public lectures, exhibitions and interactive events that make science accessible and interesting to a wide audience.\nThe Foundation is also committed to supporting young scientists and students by providing them with resources and opportunities to develop their careers in science.\n\n${link}`;

const teamMessage = `<b>Our Team</b>\n\nOur key team members are accomplished scientists, engineers and educational leaders united by a passion to make a difference in the world of science.\nWe are proud to co-operate with leading universities, research institutes and industrial partners around the world. This co-operation allows us to push the boundaries of what is possible in physics and engineering and to ensure that our research and education projects are supported at the highest level.\n\n${link}`;

const scientificMessage = `<b>Scientific projects</b>\n\n<b>Berlin</b>\nDevelopment of new photonic materials to improve the efficiency of solar panels.\nSynthesis of a new class of photoactive materials to increase the efficiency of solar panels by 30%.\n\n<b>Geneve</b>\nDevelopment of new quantum teleportation methods for information transfer.\nSuccessful demonstration of teleportation of quantum states over 100 km. Solar Wind Initiative\n\n<b>Pasadena</b>\nTo study the behaviour of the solar wind and its effects on the Earth's atmosphere.\nDevelopment of new types of satellite sensors to improve space weather forecasts. Plasma Core Programme.\n\n<b>Tokyo</b>\nTo create sustainable conditions for controlled fusion.\nProgress towards reaching above the critical plasma density to initiate a thermonuclear reaction in laboratory conditions. Future Photonics Project\n\nOur key team members are accomplished scientists, engineers and educational leaders united by a passion to make a difference in the world of science.\n\n${link}`;

const educationMessage = `<b>Education</b>\n\n<b>Academic partnerships</b>\nThe Tamm Foundation actively collaborates with leading universities and research institutes around the world to advance science and education. Our partnerships include joint programmes that offer internships and research projects for undergraduate and postgraduate students.\n\n<b>International Summer School in Plasma Physics</b>\nThe programme offers students and young researchers hands-on experience and lectures from leading scientists in the field of plasma physics.\n\n<b>Internships in the laboratories of the Tamm Foundation</b>\nParticipants can work on cutting-edge projects in quantum mechanics and plasma physics under the supervision of experienced researchers.\n\n<b>Joint research projects</b>\nProjects to develop new energy technologies involving students and professors from partner institutions.\n\n<b>Multimedia learning modules</b>\nThe Tamm Foundation offers a range of interactive learning modules and virtual laboratories that provide a deeper understanding of physical processes and real-time virtual experiments.\n\n<b>Plasma Physics Virtual Laboratory</b>\nExplore the properties of plasma and its energy applications through a series of interactive experiments and simulations.\n\n<b>Fundamentals of Quantum Mechanics module</b>\nOffers animated lessons and interactive problems to help you understand complex quantum phenomena.\n\n<b>Fusion Simulator</b>\nUsers can control fusion reaction conditions by simulating various scenarios and learning key aspects of controlled fusion.\n\n${link}`;

const contactsMessage = `<b>Сontact us</b>\n\n<a href="https://medium.com/@fundtamm">MEDIUM</a>\n\n<a href="https://github.com/tammfund">GITHUB</a>\n\n<a href="https://teletype.in/@tammfund">TELETYPE</a>\n\n<a href="https://www.t.me/tammfund">TELEGRAM</a>\n\n<a href="https://www.t.me/tammfundchat">CHAT</a>${link}`

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Start Bot'},
    ])
   
    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
            try {
                return await bot.sendMessage(chatId, startMessage, startBotBtn)
            } catch(e) {
                return await bot.sendMessage(chatId, e.message);
            }
        } else {
            try {
                return bot.sendMessage(chatId, "I don't understand you", thanksBotBtn)
            } catch(e) {
                return await bot.sendMessage(chatId, e.message);
            }
        }
    })

    bot.on('callback_query', async(msg) => {
        try {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            if(data === 'about') {
                return await bot.sendMessage(chatId, aboutMessage, thanksBotBtn);
            }
            if(data === 'back') {
                return await bot.sendMessage(chatId, startMessage, startBotBtn);
            }
            if(data === 'team') {
                bot.sendMessage(chatId, teamMessage, thanksBotBtn);
            } 
            if(data === 'scientific') {
                bot.sendMessage(chatId, scientificMessage, thanksBotBtn);
            } 
            if(data === 'education') {
                bot.sendMessage(chatId, educationMessage, thanksBotBtn);
            } 
            if(data === 'contacts') {
                bot.sendMessage(chatId, contactsMessage, thanksBotBtn);
            } 
            else {
                return bot.sendMessage(chatId, "I don't understand you", thanksBotBtn)
            }
           
        } catch (e) {
            return await bot.sendMessage(chatId, e.message)
        }
    })
    
}
start()