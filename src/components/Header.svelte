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

  let showWarning = false; // State to control warning visibility

  function handleBlogClick(event) {
    event.preventDefault();
    showWarning = true;
  }
</script>

<header
  class={"sticky z-[100] duration-200 mx-auto px-6 flex left-0 right-0 items-center transition-all md:top-0 md:bottom-auto bottom-0 md:w-[33rem] justify-between md:justify-self-center md:mt-4 md:rounded-full border-b " +
    (y > 0
      ? "py-4 md:py-3 bg-sky-600 opacity-18 hover:opacity-88 hover:bg-sky-850 border-transparent mt-2 md:mt-1"
      : " py-6 bg-transparent border-transparent mt-0")}
>
  <button
    class="font-medium cursor-pointer bg-transparent border-none p-0"
    on:click={goTop}
    aria-label="Go to top"
  >
    Tien Tran
  </button>
  <div class="sm:flex items-center md:justify-center justify-between md:fap-12 gap-4 hidden">
    {#each tabs as tab, index}
      <a
        href={tab.link}
        class={"duration-200" + (y > 0 ? "py-2 md:py-1 hover:text-yellow-300" : "py-6 hover:text-blue-400")}
        target={index === 2 ? "_blank" : ""}
        on:click={index === 2 ? handleBlogClick : (event) => {}
      }
      >
        <p>{tab.name}</p>
      </a>
    {/each}
    <button
      on:click={scrollToContact}
      class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-zinc-950"
    >
      <div
        class={"absolute top-0 right-full w-full h-full opacity-50 group-hover:translate-x-full z-0 duration-281 bg-yellow-400"}
      ></div>
      <h4 class="relative z-9">Get in touch</h4>
    </button>
  </div>
</header>

{#if showWarning}
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
    <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-6 rounded-xl shadow-xl max-w-sm w-full">
      <p class="mb-4 text-sm sm:text-base">
        The blog section is under development!<br />
        Follow my 
        <a 
          href="https://github.com/mitiqttg" 
          target="_blank" 
          class="underline text-yellow-500 hover:text-yellow-400 transition"
        >
          GitHub
        </a> 
        for more information🤓
      </p>
      <div class="flex justify-center">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          on:click={() => (showWarning = false)}
        >
          OK
        </button>
      </div>
    </div>
  </div>
{/if}


<style>
  @media (min-width: 768px) {
    header.py-4 {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }
    a.py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
  }

  .warning {
    display: none;
    position: fixed;
    z-index: 50;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  }

  .warning.show {
    display: flex;
  }

  .warning-content {
    background-color: white;
    color: #333;
    padding: 1rem;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    max-width: 90%;
    width: 400px;
    text-align: center;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  .warning.show .warning-content {
    opacity: 1;
    transform: translateY(0);
  }

  .warning-text {
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  .warning-button {
    padding: 0.75rem 1.5rem;
    background-color: #77db74;
    /* Red button */
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease-in-out;
  }

  .warning-button:hover {
    background-color: #1ec857;
  }
</style>
