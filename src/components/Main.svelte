<script>
  import Step from "./Step.svelte";
  import BackToTop from "./BackToTop.svelte";
  import { onMount, onDestroy } from "svelte";
  import { flip } from 'svelte/animate';
  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { projects } from '$lib/projects';

  const [send, receive] = crossfade({
      duration: 400,
      easing: quintOut
  });

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

  // Carousel state
  let currentIndex = 0;
    let visibleProjects = 3;
    let isTransitioning = false;
    let autoRotateInterval;
    let isHovering = false; // Track hover state
    const autoSlideDuration = 3000;

    // Update visible projects based on screen size
    function updateVisibleProjects() {
        if (!browser) return;
        
        const width = window.innerWidth;
        if (width >= 1024) {
            visibleProjects = 3;
        } else if (width >= 768) {
            visibleProjects = 2;
        } else {
            visibleProjects = 1;
        }
    }

    function nextProject() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = (currentIndex + 1) % projects.length;
        setTimeout(() => isTransitioning = false, 400);
    }

    function prevProject() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        setTimeout(() => isTransitioning = false, 400);
    }

    function goToProject(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = index;
        setTimeout(() => isTransitioning = false, 400);
    }

    function pauseRotation() {
    clearInterval(autoRotateInterval);
    isHovering = true;
  }

  function resumeRotation() {
    isHovering = false;
    if (!autoRotateInterval) {
      autoRotateInterval = setInterval(nextProject, autoSlideDuration);
    }
  }

  onMount(() => {
    if (!browser) return;
    
    updateVisibleProjects();
    window.addEventListener('resize', updateVisibleProjects);
    autoRotateInterval = setInterval(nextProject, autoSlideDuration); // Use new duration
    
    return () => {
      clearInterval(autoRotateInterval);
      window.removeEventListener('resize', updateVisibleProjects);
    };
  });

    function getVisibleProjects() {
        let visible = [];
        for (let i = 0; i < visibleProjects; i++) {
            const index = (currentIndex + i) % projects.length;
            visible.push(projects[index]);
        }
        return visible;
    }

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
      link.href = '/static/assets/mitiCV.pdf'; 
      link.download = 'mitiCV.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
</script>

<style>
.tech-grid {
    position: relative;
    width: 100%;
    height: 100%;
}

.tech-item {
    position: absolute;
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    will-change: transform;
}

.tech-container {
    position: relative;  /* Added for label positioning */
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0);
    border: 2px solid #0e71e9;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(68, 208, 243, 0.1);
    width: 85%;
    height: 85%;
    transition: all 0.3s ease;
    overflow: hidden;
}

.tech-container:hover {
    transform: scale(1.05);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(121, 181, 253, 0.973);
}

.tech-icon {
    max-width: 50%;
    max-height: 50%;
    transition: transform 0.3s ease;
}

.tech-container:hover .tech-icon {
    transform: scale(1.1);
}

/* Add these new styles for labels */
.tech-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(14, 113, 233, 0.9);
    color: white;
    padding: 0.25rem;
    font-size: 0.75rem;
    text-align: center;
    opacity: 0;
    transform: translateY(100%);
    transition: all 0.3s ease;
    pointer-events: none;
    border-radius: 0 0 12px 12px;
}

.tech-container:hover .tech-label {
    opacity: 1;
    transform: translateY(0);
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

/* Carousel styles */
.carousel-container {
    position: relative;
    width: 98%;
    overflow: hidden;
}

.carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
    gap: 1rem;
    padding: 1rem 0;
}

.carousel-item {
        min-width: calc(100% / var(--visible-projects));
        flex: 0 0 calc(100% / var(--visible-projects));
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .step-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .step-content {
        flex: 1;
    }

@media (max-width: 1023px) {
    .carousel-item {
        min-width: calc(100% / 2);
        flex: 0 0 calc(100% / 2);
    }
}

@media (max-width: 767px) {
    .carousel-item {
        min-width: 100%;
        flex: 0 0 100%;
    }
}

.carousel-nav {
    display: flex;
    justify-content: center;
    gap: 2.8rem;
    margin-top: 2rem;
}

.carousel-btn {
    background: #0e71e9;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s ease;
}

.carousel-btn:hover {
    background: #0a5bbf;
    transform: scale(1.1);
}

.carousel-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.carousel-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    cursor: pointer;
    transition: all 0.3s ease;
}

.dot.active {
    background: #0e71e9;
}
</style>

<main class="flex flex-col flex-1 p-4" >
  <section id="introPage" class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14">
      <!-- Left Column -->
      <div class="flex flex-col lg:justify-center pl-10 text-center lg:text-left gap-6 md:gap-8 lg:gap-10 lg:pl-12">
        <h2 class=" text-4xl sm:text-5xl md:text-6xl">
          Hi! I'm <span class="poppins text-blue-500">Tien</span> Tran
          <br />
          <span class="inline-flex items-center gap-4 mt-4">
            <!-- Big text -->
            <span class="poppins text-blue-500">Software Developer</span>
          </span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl lg:pl-[1px]">
          Currently, I'm exploring <span class="poppins text-blue-500 ">WebDev</span> and <span class="poppins text-blue-500 ">Cloud Computing</span> <br />
          I love solving challenges and helping people around me <br />
          You will mostly find me playing sports in my free time
        </p>
        <!-- Tech Icon Animation Grid -->
        <div class="relative w-full max-w-lg p-5 aspect-[2.5/1] mx-auto lg:mx-0 lg:mr-auto lg:pl-0">

          <div class="tech-grid">
              {#each positions as pos, i (techs[pos].id)}
                  <div class="tech-item" animate:flip={{ duration: 800 }}
                      style="
                          top: {path[i][1] * 50}%;
                          left: {path[i][0] * 20}%;
                          width: 20%;
                          height: 50%;
                          z-index: {i === positions.length - 1 ? 10 : 1};
                      ">
                      <div class="tech-container">
                          {#if techs[pos].icon.startsWith("fa-")}
                              <i class={`${techs[pos].icon} tech-icon`}></i>
                          {:else}
                              <img src={techs[pos].icon} alt={techs[pos].name} class="tech-icon" />
                          {/if}
                          <div class="tech-label">
                              {techs[pos].name}
                          </div>
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
      <img src="images/profile-me.png" alt="Tien Tran" class="object-cover z-[4] max-h-[80vh]" />
      </div>
  </section>

<!-- Projects Section -->
<section class="py-20 lg:py-32 flex flex-col gap-24" id="projects">
  <div class="flex flex-col gap-2 text-center">
      <h6 class="text-large sm:text-xl md:text-2xl">A few of my creative endeavors.</h6>
      <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
          Curious to <span class="poppins text-blue-600">see</span> my work?
      </h3>
  </div>
  
  <div class="carousel-container"
     role="region"
     aria-label="Project carousel"
     on:mouseenter={pauseRotation}
     on:mouseleave={resumeRotation}
     on:focusin={pauseRotation}
     on:focusout={resumeRotation}
     style="--visible-projects: {visibleProjects}">
      <div class="carousel-inner">
          {#each getVisibleProjects() as project, i}
              <div class="carousel-item" 
                   in:send={{ key: project.name }}
                   out:receive={{ key: project.name }}>
                  <div class="step-container">
                      <Step step={project}>
                          <div class="step-content">
                              {@html project.details}
                          </div>
                      </Step>
                  </div>
              </div>
          {/each}
      </div>
      
      <div class="carousel-nav">
          <button class="carousel-btn" on:click={prevProject} disabled={isTransitioning} aria-label="Previous project">
              <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button class="carousel-btn" on:click={nextProject} disabled={isTransitioning} aria-label="Next project">
              <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
      </div>
      
      <div class="carousel-dots">
          {#each projects as _, index}
              <button 
                  class="dot {currentIndex === index ? 'active' : ''}" 
                  aria-label={`Go to project ${index + 1}`}
                  on:click={() => goToProject(index)}
                  on:keydown={(e) => e.key === 'Enter' || e.key === ' ' ? goToProject(index) : null}
              ></button>
          {/each}
      </div>
  </div>
</section>

<!-- About Section -->
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
    The <span class="text-blue-600">Complete</span> Package
  </h5>
  <div class="flex flex-col overflow-x-scroll gap-10 max-w-[800px] mx-auto w-full">
    <table class="bg-white text-slate-700 rounded text-center">
      <thead class={'border-b border-solid border-slate-200  '}>
        <tr class="">
          <th></th>
          <th class="whitespace-nowrap p-2 px-4">Candidate #1</th>
          <th class="whitespace-nowrap p-2 px-4">Candidate #2</th>
          <th class="whitespace-nowrap p-2 px-4">Candidate #3</th>
          <th class="bg-blue-600 text-white whitespace-nowrap p-4 px-8">Me</th>
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