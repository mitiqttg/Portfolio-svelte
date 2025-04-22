<script>
    export let y;
    export let tabs = [
      { name: "Projects ", link: "#projects" },
      { name: "About me", link: "#about" },
      { name: "Blog", link: "#blog" },
    ];
  
    function goTop() {
      document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
  </script>
  
  <header
    class={"sticky z-[100] duration-200 mx-auto px-6 flex left-0 right-0 items-center transition-all md:top-0 md:bottom-auto bottom-0 md:w-[33rem] justify-between md:justify-self-center md:mt-4 md:rounded-full border-b " +
      (y > 0
        ? "py-4 md:py-3 bg-sky-700 opacity-28 hover:opacity-88 hover:bg-blue-850 border-transparent mt-2 md:mt-1"
        : " py-6 bg-transparent border-transparent mt-0")}
  >
    <h1 class="font-medium cursor-pointer" on:click={goTop}>
      Tien Tran
    </h1>
    <div class="sm:flex items-center md:justify-center justify-between md:fap-12 gap-4 hidden">
      {#each tabs as tab, index}
        <a
          href={tab.link}
          class={"duration-200" + (y > 0 ? "py-2 md:py-1 hover:text-yellow-300" : "py-6 hover:text-blue-400")}
          target={index === 2 ? "_blank" : ""}
        >
          <p>{tab.name}</p>
        </a>
      {/each}
      <button  on:click={scrollToContact} 
        class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-zinc-950"
      >
        <div
          class={"absolute top-0 right-full w-full h-full opacity-50 group-hover:translate-x-full z-0 duration-281 bg-yellow-400"}
        ></div>
        <h4 class="relative z-9">Get in touch</h4>
      </button>
    </div>
  </header>
  
  <style>
    /* Adjust margin when y > 0 for larger screens */
    @media (min-width: 768px) { /* md breakpoint */
        header.py-4 {
            padding-top: 0.75rem; /* Adjust as needed */
            padding-bottom: 0.75rem; /* Keep vertical padding consistent */
        }
        a.py-2 {
            padding-top: 0.5rem; /* Adjust as needed */
            padding-bottom: 0.5rem; /* Keep vertical padding consistent */
        }
    }
  </style>