<script>
    export let y;
    export let tabs = [
        { name: "Projects ", link: "#projects" },
        { name: "About me", link: "#about" },
        { name: "Blog", link: "#blog" },
    ];
</script>

<header
    class={"sticky z-[100] duration-200 mx-auto px-6 flex left-0 right-0 items-center transition-all md:top-0 md:bottom-auto bottom-0 md:w-[33rem] justify-between md:justify-self-center md:mt-4 md:rounded-full border-b " +
        (y > 0 ? "py-4 bg-sky-700 opacity-28 hover:opacity-88 hover:bg-blue-850 border-transparent" : " py-6 bg-transparent border-transparent")}
>
    <h1 class="font-medium">
         <span class="font-bold poppins">Tien Tran</span>
    </h1>
    <div class="sm:flex items-center md:justify-center justify-between md:fap-12 gap-4 hidden">
        {#each tabs as tab, index}
            <a href={tab.link}
                class={"duration-200" + (y > 0 ? "py-4 hover:text-yellow-300" : "py-6 hover:text-blue-400")}
                target={index === 2 ? "_blank" : ""}
            > <p>{tab.name}</p>
            </a>
        {/each}
        <button
            class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-zinc-950"
        >
            <div
                class={"absolute top-0 right-full w-full h-full opacity-50 group-hover:translate-x-full z-0 duration-281 bg-yellow-400"}
            ></div>
            <h4 class="relative z-9">Get in touch</h4>
        </button>
    </div>
</header>
