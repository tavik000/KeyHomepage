// Portfolio project data
// Each entry: img, link, title, titleTag, titleClass, notranslate,
//             captionReverse, desc, descClass, btn, categories
// btn: { label, title, link (optional, defaults to img link), disabled }
// categories: array of one or more of "game","web","mobile","ai","other"

var portfolioProjects = [

    // ── GAME DEVELOPMENT ─────────────────────────────────────────────────────

    {
        img: "images/pic33.png",
        link: "https://www.youtube.com/watch?v=U_8e_a2troo",
        title: "Shadow Bubble: Hide and Seek Chaos",
        titleTag: "h4",
        titleClass: "shadow-bubble-title",
        desc: "Platform: Windows<br>Game Engine: Unreal Engine 5<br>Genre: Asymmetric Multiplayer, Stealth, Action<br><strong>Global Game Jam Hong Kong Audience Choice Winner &amp; Best XR Game Award</strong><br>Self-produced game for Game Jam (7 days in 2025)<br>Responsible for game programming in a 2-person team<br>Used Language: C++",
        btn: { label: "View project", title: "Video" },
        categories: ["game"]
    },
    {
        img: "images/pic32.png",
        link: "https://www.youtube.com/watch?v=ENJegabO2dw",
        title: "Nesmy Land: Teacup",
        titleClass: "teacup-title",
        desc: "Platform: Windows<br>Game Engine: Unreal Engine 5<br>Genre: Action, Simulation<br>Self-produced game for Game Jam (5 days in 2024)<br>Responsible for game programming and level design in a 3-person team<br>Used Language: C++",
        btn: { label: "View project", title: "Video" },
        categories: ["game"]
    },
    {
        img: "images/pic31.png",
        link: "https://www.youtube.com/watch?v=ikTBFtA-7Po",
        title: "The Path of Osu",
        notranslate: true,
        captionReverse: true,
        desc: "Platform: Windows<br>Game Engine: Unreal Engine 5<br>Genre: Action Adventure, TPS, Puzzle<br>Self-produced game for Game Jam (7 weeks in 2024)<br>Responsible for game programming and game design as a solo developer<br>Used Language: C++",
        btn: { label: "View project", title: "Video" },
        categories: ["game"]
    },
    {
        img: "images/pic34.png",
        link: "https://www.youtube.com/watch?v=poRWXWZOwcE",
        title: "√Me",
        desc: "Platform: Windows<br>Game Engine: Unity<br>Genre: Puzzle, 2D Platformer<br>Self-produced game for Game Jam (7 days in 2023)<br>Responsible for game programming in a 5-person team<br>Used Language: C#",
        categories: ["game"]
    },
    {
        img: "images/pic28.png",
        link: "https://store.epicgames.com/en-US/p/apeiron-b83793",
        title: "Apeiron",
        desc: "Platform: Windows<br>Game Engine: Unity<br>Genre: NFT Action RTS Card Battle Game<br>Outsourcing Project in Ember Entertainment (2022-2023)<br>Lead Programmer, Responsible for system design, gameplay programming (Character Skill) in 5-person team<br>Used Language: C#",
        btn: { label: "View project", title: "Video" },
        categories: ["game"]
    },
    {
        img: "images/pic25.png",
        link: "https://apps.apple.com/us/app/every-hero-ultimate-action/id1525597044",
        title: "Every Hero",
        notranslate: true,
        captionReverse: true,
        descClass: "every-hero-detail",
        desc: "Platform: Android / iOS<br>Game Engine: Unity<br>Genre: Rogue-lite, Action RPG, Hack &amp; Slash<br><strong>Reach App Store Action Game Ranking No.2<br>Reach 1 million players</strong><br>In-house Project in Feeling Game Company (2020-2022)<br>Responsible for UI programming, gameplay programming (Inventory System, Character Skill), Japanese localization in 5-person team<br>Used Language: C#",
        btn: { label: "View project", title: "App Store" },
        categories: ["game", "mobile"]
    },
    {
        img: "images/pic27.png",
        link: "https://www.youtube.com/watch?v=YRxEiL2IRiU",
        title: "Blite",
        desc: "Platform: Windows<br>Game Engine: Unity<br>Genre: Puzzle, 2D Platformer<br><strong>Global Game Jam Hong Kong Best Original Game Award</strong><br>Self-produced game for Game Jam (2 days in 2022)<br>Responsible for game programming in a 3-person team<br>Used Language: C#",
        btn: { label: "View project", title: "STEAM" },
        categories: ["game"]
    },
    {
        img: "images/pic29.png",
        link: "https://store.steampowered.com/app/2514460/GUARDS/",
        title: "GUARDS!",
        desc: "Platform: Windows<br>Game Engine: Unreal Engine<br>Genre: Action, Hack &amp; Slash, Multiplayer<br>Outsourced QA and Japanese localization (3 months in 2023) for 2-person team",
        btn: { label: "View project", title: "Video" },
        categories: ["game"]
    },
    {
        img: "images/pic26.png",
        link: "https://apps.apple.com/hk/app/心跳度假屋/id1604558574",
        title: "Doki Doki House",
        captionReverse: true,
        desc: "Platform: Android / iOS / Windows<br>Game Engine: Unity, Renpy<br>Outsourced Tool Development (3 months in 2023) for a solo developer<br>Used Language: Python",
        btn: { label: "View project", title: "STEAM" },
        categories: ["game", "mobile"]
    },
    {
        img: "images/pic24.png",
        link: "https://store.steampowered.com/app/1128750/The_Lost_Strings",
        title: "The Lost Strings",
        desc: "Platform: Windows / Android / iOS<br>Game Engine: Unity<br>Genre: 2D Platformer, Action, Multiplayer, Puzzle<br>Outsourced Game Programming (3 months in 2019) for a 4-person team<br>Used Language: C#",
        btn: { label: "View project", title: "STEAM" },
        categories: ["game"]
    },
    {
        img: "images/pic21.jpg",
        link: "https://github.com/tavik000/HomeSleepHome",
        title: "Home Sleep Home",
        notranslate: true,
        desc: "Platform: Windows<br>Game Engine: Unity<br>Genre: Action, Simulation<br>Self-produced game for Game Jam (2 days in 2019)<br>Responsible for game programming in a 7-person team<br>Used Language: C#",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["game"]
    },
    {
        img: "images/pic23.png",
        link: "https://github.com/tavik000/ColorPicking",
        title: "Color Picking",
        notranslate: true,
        captionReverse: true,
        desc: "Platform: iOS<br>Game Engine: Unity<br>Genre: Puzzle<br>Self-produced game (2 days in 2018)<br>Responsible for game design and game programming as a solo developer<br>Used Language: C#",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["game", "mobile"]
    },
    {
        img: "images/pic19.png",
        link: "https://github.com/tavik000/MazeGameAI",
        title: "Maze Game AI",
        desc: "Platform: Mac<br>Game Engine: Unity<br>Genre: Puzzle<br>School Game AI Project (2 months in 2018)<br>Responsible for Machine-learning programming and game programming in a 4-person team<br>Used Language: C#, Python",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["game", "ai"]
    },
    {
        img: "images/pic1.png",
        link: "https://github.com/tavik000/HeroRace",
        title: "Hero Race",
        desc: "Platform: Windows<br>Tool: World Editor<br>Genre: Racing, Action, Multiplayer<br>Warcraft3 Custom Map<br>Self-produced game (2011-2022)<br>Responsible for Game Programming and Level Design as a solo developer<br>Used Language: Warcraft3 JASS",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["game"]
    },

    // ── WEB DEVELOPMENT ──────────────────────────────────────────────────────

    {
        img: "images/pic30.png",
        link: "https://github.com/tavik000/ReactKeyBlogRemake",
        title: "Personal Blog System (Remake)",
        titleClass: "key-blog-remake-title",
        desc: "React Nextjs Typescript Tailwind CSS shadcnui NextUI SQL Node.js &amp; Vercel &amp; Web Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["web"]
    },
    {
        img: "images/pic17.png",
        link: "https://github.com/tavik000/AngularFireBlog",
        title: "Personal Blog System",
        desc: "Angular Firebase TypeScript Bootstrap &amp; AngularFire2, Firestore Node.js &amp; Web Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["web"]
    },
    {
        img: "images/pic16.png",
        link: "#home",
        title: "Personal Homepage",
        captionReverse: true,
        desc: "Html PHP CSS JS JQuery &amp; Bootstrap<br>&amp; Web Development",
        btn: { label: "You are here", title: "Go Top", disabled: true },
        categories: ["web"]
    },
    {
        img: "images/pic2.png",
        link: "https://github.com/tavik000/Unit_Converter",
        title: "Unit Converter",
        desc: "Html CSS JS &amp; Bootstrap<br>&amp; Web Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["web"]
    },
    {
        img: "images/pic4.png",
        link: "https://github.com/tavik000/Estate_Web_App",
        title: "Estate Property",
        desc: "Html CSS JS &amp; Bootstrap jQuery XML Ajax, MVC<br>&amp; Web Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["web"]
    },
    {
        img: "images/pic10.png",
        link: "https://github.com/tavik000/JavaSpring_Self_Learning",
        title: "Employee System",
        captionReverse: true,
        desc: "jsp, Bootstrap &amp; SSM Framework, MySQL<br>&amp; Web Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["web"]
    },

    // ── MOBILE DEVELOPMENT ───────────────────────────────────────────────────

    {
        img: "images/pic11.png",
        link: "https://github.com/tavik000/TicTacToe_React_Native",
        title: "Tic Tac Toe",
        desc: "React Native &amp; iOS/Android<br>&amp; Mobile Development, Game Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["mobile"]
    },
    {
        img: "images/pic12.png",
        link: "https://github.com/tavik000/MemoryGame_React_Native",
        title: "Memory Game",
        desc: "React Native &amp; iOS/Android<br>&amp; Mobile Development, Game Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["mobile"]
    },
    {
        img: "images/pic14.png",
        link: "https://github.com/tavik000/Stock-Monitor_React_Native",
        title: "Stock Monitor",
        captionReverse: true,
        desc: "React Native &amp; iOS/Android<br>&amp; Mobile Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["mobile"]
    },
    {
        img: "images/pic13.png",
        link: "https://github.com/tavik000/Calculator_React_Native",
        title: "Calculator",
        desc: "React Native &amp; iOS/Android<br>&amp; Mobile Development",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["mobile"]
    },
    {
        img: "images/pic15.png",
        link: "https://www.youtube.com/watch?v=uNtz0VSzEhI&t=2s",
        title: "Developmental Coordination Disorder Evaluation and Training App",
        titleClass: "dcd-title",
        desc: "Swift &amp; iOS<br>&amp; Mobile Development",
        btn: { label: "View video", title: "Youtube" },
        categories: ["mobile"]
    },

    // ── AI & ML APPLICATION ──────────────────────────────────────────────────

    {
        img: "images/pic5.png",
        link: "https://github.com/tavik000/Skin_Detection",
        title: "Skin Detection",
        desc: "MATLAB<br>&amp; AI / ML Application",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["ai"]
    },
    {
        img: "images/pic6.png",
        link: "https://github.com/tavik000/K_Mean",
        title: "K Means",
        desc: "MATLAB/Octave<br>&amp; AI / ML Application",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["ai"]
    },
    {
        img: "images/pic7.png",
        link: "https://github.com/tavik000/Self_Organizing_Map",
        title: "Self-Organizing Map",
        captionReverse: true,
        desc: "MATLAB<br>&amp; AI / ML Application",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["ai"]
    },
    {
        img: "images/pic8.png",
        link: "https://github.com/tavik000/Object_Recognition",
        title: "Object Recognition",
        desc: "MATLAB<br>&amp; AI / ML Application",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["ai"]
    },
    {
        img: "images/pic18.png",
        link: "https://github.com/tavik000/python-key-chatbot",
        title: "Facebook Chatbot",
        titleClass: "chatbot-title",
        desc: "Python Webhook Sequence to Sequence &amp; Rule Based Task-Specific &amp; AI / ML Application",
        btn: { label: "View project", title: "Github" },
        categories: ["ai"]
    },

    // ── OTHERS ───────────────────────────────────────────────────────────────

    {
        img: "images/pic22.png",
        link: "https://github.com/tavik000/SearchSystem",
        title: "Search System",
        desc: "PC Program &amp; Python<br>&amp; Information Retrieval, TF-IDF",
        btn: { label: "View project", title: "GITHUB" },
        categories: ["other"]
    }

];
