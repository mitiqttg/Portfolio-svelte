<script>
  import Step from "./Step.svelte";
  import BackToTop from "./BackToTop.svelte";
  import { onMount, onDestroy } from "svelte";
  import { flip } from 'svelte/animate';
  import { cubicInOut } from 'svelte/easing';
  import { browser } from '$app/environment';
  import { projects } from '$lib/projects';
  import '../app.css';

  const pxPerMs = 1000;

  function dodge(node, { from, to }) {
    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const dist = Math.hypot(dx, dy);
    const dur = dist / pxPerMs;
    const delayed = dx < 0 || dy < 0;
    const delay = delayed ? dur * 3 : 0;
    return { delay, duration: dur, easing: cubicInOut };
  }

  const path = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
    [4, 1], [3, 1], [2, 1], [1, 1], [0, 1]
  ];

  let techs = [
    { name: "HTML", icon: "/images/html-icon.svg", id: 1 },
    { name: "Rust", icon: "/images/rust-icon.svg", id: 2 },
    { name: "JavaScript", icon: "/images/javascript-icon.svg", id: 3 },
    { name: "Svelte", icon: "/images/svelte-icon.svg", id: 4 },
    { name: "TailwindCSS", icon: "/images/tailwind-css-icon.svg", id: 5 },
    { name: "Node.js", icon: "/images/node-js-icon.svg", id: 6 },
    { name: "Python", icon: "/images/python-icon.svg", id: 7 },
    { name: "Flutter", icon: "/images/flutter-icon.svg", id: 8 },
    { name: "Docker", icon: "/images/docker-icon.svg", id: 9 },
    { name: "MongoDB", icon: "/images/mongodb-icon.svg", id: 10 }
  ];

  let positions = techs.map((_, i) => i);

  function rotatePositions() {
    positions = [positions[positions.length - 1], ...positions.slice(0, -1)];
  }

  let interval;
  onMount(() => {
    interval = setInterval(rotatePositions, 1500);
  });

  onDestroy(() => clearInterval(interval));

  let currentIndex = 0;
  let visibleProjects = 3;
  let isTransitioning = false;
  let autoRotateInterval;
  let isHovering = false;
  const autoSlideDuration = 2000;

  function updateVisibleProjects() {
    if (!browser) return;
    const width = window.innerWidth;
    if (width >= 1024) visibleProjects = 3;
    else if (width >= 768) visibleProjects = 2;
    else visibleProjects = 1;
  }

  function nextProject() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = (currentIndex + 1) % projects.length;
    setTimeout(() => isTransitioning = false, 500);
  }

  function prevProject() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    setTimeout(() => isTransitioning = false, 500);
  }

  function goToProject(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = index;
    setTimeout(() => isTransitioning = false, 500);
  }

  function getDisplayProjects() {
    const displayProjects = [];
    const totalProjects = projects.length;
    for (let i = -1; i <= visibleProjects; i++) {
      const index = (currentIndex + i + totalProjects) % totalProjects;
      displayProjects.push({
        ...projects[index],
        position: i,
        isActive: i === 0
      });
    }
    return displayProjects;
  }

  function getTransformStyle(position) {
    const gap = 2;
    const itemWidth = 100 / visibleProjects;
    const offset = -itemWidth * position;
    return `translateX(calc(${offset}% + ${position * gap}rem))`;
  }

  function pauseRotation() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  function resumeRotation() {
    if (!autoRotateInterval && !isHovering) {
      autoRotateInterval = setInterval(nextProject, autoSlideDuration);
    }
  }

  onMount(() => {
    if (!browser) return;
    updateVisibleProjects();
    window.addEventListener('resize', updateVisibleProjects);
    autoRotateInterval = setInterval(nextProject, autoSlideDuration);

    return () => {
      pauseRotation();
      window.removeEventListener('resize', updateVisibleProjects);
    };
  });

  let traits = [
    {
      metric: '10x',
      name: 'a self taught developer',
      description:
        "I learned to code from online materials and absolutely fell in love with the possibility of how software can connect, assist, entertain, and enhance our everyday lives. Starting with Pascal, I have since learned Scala, Python, JavaScript, and C, and have evolved my knowledge base to include OOP, ML, web frameworks, cloud services, and much more.",
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

  function scrollToContact() {
    if (!browser) return;
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function downloadCV() {
    if (!browser) return;
    const link = document.createElement('a');
    link.href = '/assets/mitiCV.pdf';
    link.download = 'mitiCV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

    /* ─────────────────────────────────────
     LIGHT / DARK THEME TOGGLE  ← NEW
  ───────────────────────────────────── */
  let darkMode = false;                           // reactive
  function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.theme = isDark ? 'dark' : 'light';
}
  function toggleTheme(){                         // click handler
    darkMode=!darkMode;
    applyTheme(darkMode);
  }
  onMount(() => {
    if(!browser) return;
    const stored   = localStorage.getItem('theme');
    const prefers  = window.matchMedia('(prefers-color-scheme: dark)').matches;
    darkMode = stored ? stored==='dark' : prefers;
    applyTheme(darkMode);
  });
</script>


<main class="flex flex-col flex-1 p-4" >
  <button
    on:click={toggleTheme}
    class="fixed top-4 right-4 z-50 p-2 rounded-full border border-gray-400/40
           bg-white dark:bg-gray-800 text-xl shadow-md hover:scale-110 transition">
    {#if darkMode} ☀️ {:else} 🌙 {/if}
  </button>
  <!-- Intro section -->
  <section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
    <!-- Left Column -->
    <div class="flex flex-col lg:justify-center pl-10 text-center lg:text-left gap-6 md:gap-8 lg:gap-10 lg:pl-12">
      <h2 class=" text-4xl sm:text-5xl md:text-6xl">
        Hi! I'm <span class="poppins text-blue-500">Tien</span> Tran
        <br />
        <span class="inline-flex items-center gap-4 mt-4">
          <span class="poppins text-blue-500">Software Developer</span>
        </span>
      </h2>
      <p class="text-base sm:text-lg md:text-xl lg:pl-[1px]">
        Currently, I'm exploring <span class="poppins text-blue-500 ">Cloud Computing</span> <br />
        I enjoy tackling problems and helping people around me <br />
        Sports enthusiast, analytical, unconventional and funny (or not) <br />
      </p>
      <!-- Tech Icon Animation Grid -->
      <div class="relative w-full max-w-lg p-5 aspect-[2.5/1] mx-auto lg:mx-0 lg:mr-auto lg:pl-0">
        <div class="tech-grid">
          {#each positions as pos, i (techs[pos].id)}
            <div
              class="tech-item"
              animate:flip={dodge}
              style="
                top:  {path[i][1] * 50}%;
                left: {path[i][0] * 20}%;
                width: 20%;
                height: 50%;
              "
            >
              <div class="tech-container
                bg-white/0            dark:bg-white/5
                border-blue-600       dark:border-blue-300">
                {#if techs[pos].icon.startsWith('fa-')}
                  <i class={`${techs[pos].icon} tech-icon`}></i>
                {:else}
                  <img src={techs[pos].icon} alt={techs[pos].name} class="tech-icon" />
                {/if}
                <div class="tech-label">{techs[pos].name}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <!-- Call to Action Button -->
      <button
        on:click={downloadCV} 
          class="blueShadow mx-auto lg:mr-auto lg:ml-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-gray-950">
          <div class="absolute top-0 right-full w-full h-full bg-yellow-400 opacity-50 group-hover:translate-x-full z-0 duration-281"></div>
          <h4 class="relative z-9">Download CV</h4>
      </button>
    </div>

    <!-- Right Column - Profile Image -->
    <div class="relative shadow-xl grid place-items-center">
      <img src="images/mitiAva.png" alt="Tien Tran" class="object-cover z-[4] max-h-[80vh]" />
    </div>
  </section>

  <!-- Projects Section -->
  <section class="py-10 lg:py-32 flex flex-col gap-24 overflow-x-hidden" id="projects">
    <div class="flex flex-col gap-2 text-center">
      <h6 class="text-large sm:text-xl md:text-2xl">A few of my creative endeavors.</h6>
      <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
        Curious to <span class="poppins text-blue-600">see</span> my work?
      </h3>
    </div>
    
    <div class="relative w-full overflow-hidden"
         role="region"
         aria-label="Project carousel"
         on:mouseenter={pauseRotation}
         on:mouseleave={resumeRotation}>
      <!-- Carousel track container -->
            <div class="relative w-full" style="padding-top: 6rem; margin-top: -5px;">
        <!-- Carousel track -->
        <div class="flex items-center w-full transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
             style="transform: {getTransformStyle(0)};">
             {#each getDisplayProjects() as project (project.name)}
             <div class="flex-shrink-0 transition-all duration-500 ease-in-out px-4 h-full"
                  style="width: {100 / visibleProjects}%; 
                        opacity: {project.position === 0 ? 1 : project.position === -1 || project.position === 1 ? 0.8 : 0.6};
                        transition: opacity 500ms ease-in-out;">
                 <div class="step-container h-full
                      bg-white/10           dark:bg-gray-800/40
                      shadow-lg             dark:shadow-none
                      ring-1 ring-blue-500  dark:ring-blue-300">
                     <Step step={project}>
                         <div class="step-content">
                             {@html project.details}
                         </div>
                     </Step>
                 </div>
             </div>
              {/each}
        </div>
      </div>
      
      <div class="carousel-nav mt-8">
        <button class="carousel-btn" on:click={prevProject} aria-label="Previous project">
          <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
        </button>
        
        <div class="carousel-dots">
          {#each projects as _, index}
            <button 
              class="dot-container"
              aria-label={`Go to project ${index + 1}`}
              on:click={() => goToProject(index)}>
              <div class="dot {currentIndex === index ? 'active' : ''}"></div>
            </button>
          {/each}
        </div>
        
        <button class="carousel-btn" on:click={nextProject} aria-label="Next project">
          <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24       relative">
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
      {#each traits as trait, index}
        <div class="flex gap-6 sm:gap-8">
          <p class="poppins text-4xl sm:text-5xl md:text-6xl text-yellow-400 font-semibold">0{index + 1}</p>
          <div class="flex flex-col gap-6 sm:gap-8">
            <h3 class="text-2xl sm:text-3xl md:text-5xl">{trait.name}</h3>
            <p>{trait.description}</p>
          </div>
        </div>
      {/each}
    </div>
    <h5 class={' text-2xl sm:text-3xl font-semibold text-center poppins '}>
      A <span class="text-blue-600">complete</span> package!
    </h5>
    <h4 class="mx-auto">So why not invest?😎</h4>
  </section>

  <BackToTop />
</main>