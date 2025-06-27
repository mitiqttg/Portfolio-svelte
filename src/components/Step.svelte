<script>
    export let step;
</script>

<a
    href={step.href}
    target="_blank"
    class="step-item p-2 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border-3 border-solid border-blue-950 text-center cursor-pointer group hover:border-blue-600 duration-200 relative"
>
    <div
        class="bg-blue-400 dark:bg-zinc-950 grid place-items-center p-2 absolute -top-12 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-visible"
    >
        <i class={step.icon + " text-3xl sm:text-4xl md:text-5xl absolute"}></i>
    </div>
    <h3 class="font-medium text-xl sm:text-2xl md:text-3xl mt-12 sm:mt-14 md:mt-16">
        {step.name}
    </h3>
    <slot />
    <div class="flex-1 flex justify-betweeen gap-4 items-end">
        <div
            class="ml-auto cursor-pointer rounded-full hover:text-zinc-950 duration-200 relative after:absolute after:top-0 after:h-0 p-2 after:right-full after:bg-white after:w-full after:h-full after:duration-200 hover:after:translate-x-full after:z-[-1] overflow-hidden px-4"
        >
            <p class="z-4">Go to &rarr;</p>
        </div>
    </div>
</a>