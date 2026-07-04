// Skills data — edit this file to update the skills section
// Each group has: column ('left'|'right'), title, titleNotranslate, skills[]
// Each skill has: name, level, icon (HTML string), notranslate?, itemClass?, titleClass?

var skillGroups = [
    {
        column: 'left',
        title: 'Programming Language',
        titleNotranslate: false,
        skills: [
            {
                name: 'C++',
                level: '3 years',
                icon: '<img src="images/icon-cpp.svg" class="skill-icon invert-white" alt="*">'
            },
            {
                name: 'C#',
                level: '5 years',
                icon: '<img src="images/icon-csharp.svg" class="skill-icon invert-white" alt="*">'
            },
            {
                name: 'HTML / CSS / JavaScript / TypeScript',
                level: '5 years',
                icon: '<i class="fab fa-html5"></i>',
                itemClass: 'row-md-3',
                titleClass: 'skills-long-item'
            },
            {
                name: 'Java',
                level: '3 months',
                icon: '<i class="fab fa-java"></i>',
                notranslate: true
            },
            {
                name: 'Python',
                level: '2 years',
                icon: '<i class="fab fa-python"></i>',
                notranslate: true
            },
            {
                name: 'SQL',
                level: '2 years',
                icon: '<i class="fa fa-database"></i>',
                notranslate: true
            }
        ]
    },
    {
        column: 'left',
        title: 'Tool',
        titleNotranslate: true,
        skills: [
            {
                name: 'Git + Github',
                level: '10 years',
                icon: '<i class="fab fa-github-alt"></i>',
                notranslate: true
            },
            {
                name: 'Perforce',
                level: '2 years',
                icon: '<i class="fas fa-circle-notch"></i>',
                notranslate: true
            },
            {
                name: 'Trello',
                level: '5 years',
                icon: '<i class="fab fa-trello"></i>',
                notranslate: true
            },
            {
                name: 'Notion',
                level: '3 years',
                icon: '<img src="images/icon-notion.svg" class="skill-icon invert-white" alt="*">',
                notranslate: true
            },
            {
                name: 'Jira',
                level: '2 years',
                icon: '<i class="fa-brands fa-jira"></i>',
                notranslate: true
            },
            {
                name: 'Visual Studio Code',
                level: '8 years',
                icon: '<img src="images/icon-vsc.svg" class="skill-icon invert-white" alt="*">',
                notranslate: true
            },
            {
                name: 'Rider',
                level: '7 years',
                icon: '<img src="images/icon-rider.svg" class="skill-icon" alt="*">',
                notranslate: true
            },
            {
                name: 'Slack',
                level: '7 years',
                icon: '<i class="fab fa-slack"></i>',
                notranslate: true
            }
        ]
    },
    {
        column: 'right',
        title: 'Game Engine',
        titleNotranslate: false,
        skills: [
            {
                name: 'Unreal Engine 5',
                level: '3 years',
                icon: '<img src="images/unreal-engine-svgrepo-com.svg" class="skill-icon invert-white" alt="*">',
                notranslate: true
            },
            {
                name: 'Unity',
                level: '5 years',
                icon: '<i class="fa-brands fa-unity"></i>',
                notranslate: true
            }
        ]
    },
    {
        column: 'right',
        title: 'Web Framework',
        titleNotranslate: false,
        skills: [
            {
                name: 'React + Next.js',
                level: '1 year',
                icon: '<i class="fa-brands fa-react"></i>',
                notranslate: true
            },
            {
                name: 'Angular',
                level: '4 months',
                icon: '<i class="fa-brands fa-angular"></i>',
                notranslate: true
            },
            {
                name: 'Spring',
                level: '3 months',
                icon: '<i class="fa-solid fa-leaf"></i>',
                notranslate: true
            }
        ]
    }
];

// Human languages spoken
var languageSkills = [
    { name: 'Cantonese', level: 'Native' },
    { name: 'Mandarin', level: 'Native' },
    { name: 'Japanese', level: 'JLPT N1' },
    { name: 'English', level: 'Business Level' }
];
