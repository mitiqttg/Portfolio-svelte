<script>
    import Step from "./Step.svelte";
    import BackToTop from "./BackToTop.svelte";
    import { onMount, onDestroy } from "svelte";
  
    // Clockwise path for 5x2 grid
    const path = [
      [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
      [4, 1], [3, 1], [2, 1], [1, 1], [0, 1]
    ];
    
    let techs = [
      { name: "HTML", icon: "/images/html-icon.svg" },
      { name: "CSS", icon: "/images/css-icon.svg" },
      { name: "JavaScript", icon: "/images/javascript-icon.svg" },
      { name: "Svelte", icon: "/images/svelte-icon.svg" },
      { name: "TailwindCSS", icon: "/images/tailwind-css-icon.svg" },
      { name: "Node.js", icon: "/images/node-js-icon.svg" },
      { name: "Python", icon: "/images/python-icon.svg" },
      { name: "AWS", icon: "fa-brands fa-aws" },
      { name: "Docker", icon: "/images/docker-icon.svg" },
      { name: "MongoDB", icon: "/images/mongodb-icon.svg" }
    ];
  
    let positions = techs.map((_, i) => i); // Initial positions match path indices
  
    function rotatePositions() {
      positions = [positions[positions.length - 1], ...positions.slice(0, -1)];
    }
  
    let interval;
    onMount(() => {
      interval = setInterval(rotatePositions, 1500); // rotate every 1.5s
    });
  
    onDestroy(() => clearInterval(interval));

    let steps = [
    {
      name: 'Quizard',
      icon: 'fa-solid fa-list-check',
      description:
        'A quiz app made with <strong>Node.js, PostgreSQL, Flyway, and Docker</strong>, helps you practice with a variety of questions and topics. You can create your own quizzes for different topics and share them with others.',
    },
    {
      name: 'Shopping list',
      icon: 'fa-solid fa-cart-shopping',
      description:
        'Ultimate Todos is a Full Stack <strong>Next.js</strong>, <strong>Node.js + Express.js</strong> & <strong>Firebase</strong> CRUD application that allows a user to login, manage a tidy and efficacious todo list, and persist this information across devices.',
    },
    {
      name: 'Pet rescue',
      icon: 'fa-solid fa-diagram-project',
      description:
        'The Pokédex is a <strong>SvelteKit & TailwindCSS</strong> web application, hosted on <strong>Netlify</strong>, that consumes and caches the <strong>Pokémon API</strong> to display all Pokémon information. Gotta catch them all!',
    },
  ];

  let benefits = [
    {
      metric: '10x',
      name: 'a self taught developer',
      description:
        "I learn to code from online material and absolutely fell in love with the possibility of how software can connect, assist, entertain, and enhance our everyday life. Starting of with Scala, Python, JavaScript, HTML & CSS and evolving my knowledge base to include OOP, ML, web frameworks, cloud services and much more.",
    },
    {
      name: 'an engineering-driven and creative thinker',
      description:
        "Always come up with the most outside-the-box solutions to problems or the weirdest ideas ever, you will sure get them with me around. I always think about how to make things better, faster, more efficient and enjoy the fun along the way. My background in Mathematics and Physics has helped me develop a strong foundation in practical approach that backed by science.",
    },
    {
      name: 'an excellent communicator',
      description:
        "Communication is key and it's a paramount value of mine. I believe in transparency and constructive communication above all else. This helps me develop deep relationships and ensures my effectiveness and productivity in any work space with any team.",
    },
  ];
  </script>
  
  <style>
    .tech-icon {
      transition: top 0.8s ease-in-out, left 0.8s ease-in-out;
    }
  </style>
  
  <main class="flex flex-col flex-1 p-4">
    <section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
      <!-- Left Column -->
      <div class="flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10">
        <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl">
          Hi! I'm <span class="poppins text-blue-600">Tien</span> Tran
          <br />Full Stack <span class="poppins text-blue-600">Developer</span>
        </h2>
  
        <p class="text-base sm:text-lg md:text-xl">
          My current <span class="text-blue-600">enthusiasm</span> is on AWS, Full Stack Web and AI! I'm familiar with JavaScript, Python, Node.js, Deno, Svelte, TailwindCSS and much more!
        </p>
  
        <!-- Tech Icon Animation Grid -->
        <div class="relative mx-auto w-full max-w-lg aspect-[2.5/1] border-2 border-blue-500 rounded-lg overflow-hidden">
          <div class="w-full h-full relative">
            {#each techs as tech, i}
              {#key positions[i]}
                <div
                  class="absolute tech-icon flex items-center justify-center text-3xl"
                  style="
                    top: {path[positions[i]][1] * 50}%;
                    left: {path[positions[i]][0] * 20}%;
                    width: 20%;
                    height: 50%;
                  "
                >
                  {#if tech.icon.startsWith("fa-")}
                    <i class={tech.icon}></i>
                  {:else}
                    <img src={tech.icon} alt={tech.name} class="h-10 w-10" />
                  {/if}
                </div>
              {/key}
            {/each}
          </div>
        </div>
  
        <!-- Call to Action Button -->
        <button
          class="blueShadow mx-auto lg:mr-auto lg:ml-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-gray-950">
          <div class="absolute top-0 right-full w-full h-full bg-yellow-400 opacity-50 group-hover:translate-x-full z-0 duration-281"></div>
          <h4 class="relative z-9">Get in touch</h4>
        </button>
      </div>
  
      <!-- Right Column - Profile Image -->
      <div class="relative shadow-xl grid place-items-center">
        <img src="images/profile-me.png" alt="Tien Tran" class="object-cover z-[4] max-h-[80vh]" />
      </div>
    </section>
    <section class="py-20 lg:py-32 flex flex-col gap-24" id="projects">
    <div class="flex flex-col gap-2 text-center">
      <h6 class="text-large sm:text-xl md:text-2xl">A few of my creative endeavors.</h6>
      <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
        Curious to <span class="poppins text-blue-600">see</span> my work?
      </h3>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
      <Step step={steps[0]}>
        <p>
          A quiz app made with <strong class="text-blue-600">Node.js, PostgreSQL, Flyway, and Docker</strong>, helps you
          practice with a variety of questions and topics. You can create your own quizzes for different topics and share
          them with others."
        </p>
      </Step>
      <Step step={steps[1]}>
        <p>
          Ultimate Todos is a Full Stack <strong class="text-blue-600">Next.js</strong>,
          <strong class="text-blue-600">Node.js + Express.js</strong> & <strong class="text-blue-600">Firebase</strong>
          CRUD application that allows a user to login, manage a tidy and efficacious todo list, and persist this
          information across devices.
        </p>
      </Step>
      <Step step={steps[2]}>
        <p>
          The Pokédex is a <strong class="text-blue-600">SvelteKit & TailwindCSS</strong> web application, hosted on
          <strong class="text-blue-600">Netlify</strong>, that consumes and caches the
          <strong class="text-blue-600">Pokémon API</strong> to display all Pokémon information. Gotta catch them all!
        </p>
      </Step>
    </div>
  </section>

  <section id="about" class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative">
    <div
      class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-blue-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-blue-700 py-4"
    >
      <h6 class="text-large sm:text-xl md:text-2xl">Want to know more?</h6>
      <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
        A bit <span class="poppins text-blue-600">about</span> me.
      </h3>
    </div>
    <p class="mx-auto poppins font-semibold text-lg sm:text-xl md:text-2xl">I am . . .</p>
    <div class="flex flex-col gap-20 w-full mx-auto max-w-[800px]">
      {#each benefits as benefit, index}
        <div class="flex gap-6 sm:gap-8">
          <p class="poppins text-4xl sm:text-5xl md:text-6xl text-yellow-400 font-semibold">0{index + 1}</p>
          <div class="flex flex-col gap-6 sm:gap-8">
            <h3 class="text-2xl sm:text-3xl md:text-5xl">{benefit.name}</h3>
            <p>{benefit.description}</p>
          </div>
        </div>
      {/each}
    </div>
    <h5 class={' text-2xl sm:text-3xl font-semibold text-center poppins '}>
      The <span class="text-violet-400">Complete</span> Package
    </h5>
    <div class="flex flex-col overflow-x-scroll gap-10 max-w-[800px] mx-auto w-full">
      <table class="bg-white text-slate-700 rounded text-center">
        <thead class={'border-b border-solid border-slate-200  '}>
          <tr class="">
            <th></th>
            <th class="whitespace-nowrap p-2 px-4">Candidate #1</th>
            <th class="whitespace-nowrap p-2 px-4">Candidate #2</th>
            <th class="whitespace-nowrap p-2 px-4">Candidate #3</th>
            <th class="bg-violet-700 text-white whitespace-nowrap p-4 px-8">Me</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-solid border-slate-200">
            <td class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm">Dedication</td>
            <td><i class="fa-solid fa-xmark text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-slate-500"></i></td>
            <td><i class="fa-solid fa-xmark text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-green-500"></i></td>
          </tr>
          <tr class="border-b border-solid border-slate-200">
            <td class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm">Critical Thought</td>
            <td><i class="fa-solid fa-xmark text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-green-500"></i></td>
          </tr>
          <tr>
            <td class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm">Interpersonal Skills</td>
            <td><i class="fa-solid fa-check text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-slate-500"></i></td>
            <td><i class="fa-solid fa-xmark text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-green-500"></i></td>
          </tr>
          <tr class="border-t border-solid border-slate-200">
            <td class="border-r border-solid border-white pl-4 pr-8 py-4 font-semibold text-sm">Progamming Ability</td>
            <td><i class="fa-solid fa-check text-slate-500"></i></td>
            <td><i class="fa-solid fa-xmark text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-slate-500"></i></td>
            <td><i class="fa-solid fa-check text-green-500"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mx-auto -mt-12 italic sm:hidden opacity-50">
      <p>Scroll to see more &rarr;</p>
    </div>
    <p class="mx-auto">So why not invest?</p>
  </section>
  <BackToTop />
</main>
  