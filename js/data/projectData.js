export const PROJECT_DATA = {

    suwmania: {
        title: "Suwmania",
        stack: ["JavaScript", "HTML", "CSS", "PHP"],
        learned: ["DOM manipulation", "game loops", "asynchronous programming"],
        description: "As my first JS project, I recreated a little puzzle toy I used to play with as a kid. It's a simple sliding tiles game with a move counter and a high score tracker. This was a super fun project to learn JavaScript with.",
        type: "iframe",
        src: "https://host914956.xce.pl/basia/suwmania/B/",
        ghLink: "https://github.com/basaiszafraniec/suwmaniaB"
    },

    weather: {
        title: "Weather App",
        stack: ["React", "HTML Canvas", "API"],
        learned: ["working with public APIs", "dynamic UI updates"],
        description: "A simple little weather app that fetches data from a public API and displays the current weather for a searched location. In the little scene the weather conditions and charachter's outfit change based on the fetched data. The UI leaves a lot to be desired but my main goal was to just have some fun with APIs and dynamic data in React, as well as dip my toes in pixel art.",
        type: "image",
        images: ["../assets/project-images/weather1.png", "../assets/project-images/weather2.png", "../assets/project-images/weather3.png"],
        webLink: "https://basiaszafraniec.github.io/weather-app/",
        ghLink: "https://github.com/basiaszafraniec/weather-app"
    },

    strom: {
        title: "Strøm Website",
        stack: ["JavaScript", "HTML", "CSS", "Spline"],
        learned: ["working with a client", "Spline integration"],
        description: "A simple website I made for a local band called Strøm as one of my project in Multemedia Design course. I tried to add a little bit of fun to it while keeping it simple and informative. My work with the band wasn't limited to the website. I also worked on their social media, helped out with some editing and created some posters and flyers for their concerts.",
        type: "image",
        images: ["../assets/project-images/strom1.png", "../assets/project-images/strom2.png", "../assets/project-images/strom3.png", "../assets/project-images/strom4.png", "../assets/project-images/strom5.png", "../assets/project-images/strom6.png", "../assets/project-images/strom7.png",   "../assets/project-images/strom8.png", "../assets/project-images/strom9.png", "../assets/project-images/strom10.png", "../assets/project-images/strom11.png"],
        ghLink: "https://github.com/basiaszafraniec/strom-band"
    },

    raccoony: {
        title: "Raccoony",
        stack: ["React", "API", "HTML Canvas"],
        learned: ["mobile first design", "map implementation"],
        description: "An interactive raccoon character.",
        type: "image",
        images: []
    },

    pixelCanvas: {
        title: "Pixel Animation",
        stack: ["JavaScript", "Canvas API"],
        learned: ["canvas rendering", "requestAnimationFrame", "pixel manipulation"],
        description: "Generative pixel animations using the Canvas API.",
        type: "image",
        images: []
    },

    // ── PYTHON ───────────────────────────────────────────────
    starsGame: {
        title: "Stars Game",
        stack: ["Python", "Pygame"],
        learned: ["game loop", "collision detection", "sprite management"],
        description: "A small stars-collecting arcade game.",
        type: "image",
        images: []
    },

    machineLearning: {
        title: "Machine Learning",
        stack: ["Python", "scikit-learn", "pandas"],
        learned: ["data preprocessing", "model training", "evaluation metrics"],
        description: "Experiments with supervised learning models.",
        type: "image",
        images: []
    },

    cube: {
        title: "Cube",
        stack: ["Python"],
        learned: ["3D math", "rotation matrices", "terminal rendering"],
        description: "A spinning 3D cube rendered in the terminal.",
        type: "image",
        images: []
    },

    // ── BLENDER ──────────────────────────────────────────────
    donut: {
        title: "Donut",
        stack: ["Blender"],
        learned: ["modelling basics", "materials", "lighting"],
        description: "The classic Blender beginner donut.",
        type: "image",
        images: []
    },

    chair: {
        title: "Chair",
        stack: ["Blender"],
        learned: ["hard-surface modelling", "UV unwrapping"],
        description: "A modelled and rendered chair.",
        type: "image",
        images: []
    },

    head: {
        title: "Head",
        stack: ["Blender"],
        learned: ["organic sculpting", "subsurface scattering"],
        description: "A sculpted human head study.",
        type: "image",
        images: []
    },

    rooms: {
        title: "Rooms",
        stack: ["Blender"],
        learned: ["interior lighting", "scene composition", "HDRI"],
        description: "A series of interior room renders.",
        type: "image",
        images: []
    },

    // ── FIGMA ────────────────────────────────────────────────
    inkly: {
        title: "Inkly",
        stack: ["Figma"],
        learned: ["UI design", "component systems", "prototyping"],
        description: "A journalling app concept designed in Figma.",
        type: "image",
        images: []
    }
};


// ── FILE SYSTEM TREE ─────────────────────────────────────────
//  type "folder" → navigates into it
//  type "file"   → opens a project window using the id

export const FILE_SYSTEM = {
    root: [
        { name: "javascript", type: "folder", target: "javascript" },
        { name: "python",     type: "folder", target: "python"     },
        { name: "blender",    type: "folder", target: "blender"    },
        { name: "figma",      type: "folder", target: "figma"      }
    ],
    javascript: [
        { name: "suwmania",      type: "file", id: "suwmania"    },
        { name: "weather app",   type: "file", id: "weather"     },
        { name: "strøm website", type: "file", id: "strom"       },
        { name: "raccoony",      type: "file", id: "raccoony"    },
        { name: "pixel canvas",  type: "file", id: "pixelCanvas" }
    ],
    python: [
        { name: "stars game",        type: "file", id: "starsGame"       },
        { name: "machine learning",  type: "file", id: "machineLearning" },
        { name: "cube",              type: "file", id: "cube"            }
    ],
    blender: [
        { name: "donut", type: "file", id: "donut" },
        { name: "chair", type: "file", id: "chair" },
        { name: "head",  type: "file", id: "head"  },
        { name: "rooms", type: "file", id: "rooms" }
    ],
    figma: [
        { name: "inkly", type: "file", id: "inkly" }
    ]
};