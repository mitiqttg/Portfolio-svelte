<script>
    export let showOnPx = 150;
    let hidden = true;
  
    function goTop() {
      document.body.scrollIntoView();
    }
  
    function scrollContainer() {
      return document.documentElement || document.body;
    }
  
    function handleOnScroll() {
      if (!scrollContainer()) {
        return;
      }
  
      if (scrollContainer().scrollTop > showOnPx) {
        hidden = false;
      } else {
        hidden = true;
      }
    }
  </script>
  
  <style>
    .back-to-top {
      opacity: 0.6;
      border-radius: 100%;
      transition: opacity 0.5s, visibility 0.5s;
      position: fixed;
      z-index: 99;
      right: 20px;
      width: 60px;
      height: 60px;
      content: "&uarr;";
      user-select: none;
      bottom: 20px;
      /* animation: bounce 2.8s infinite; */
      color: rgb(255, 255, 255);
      background-color: rgb(28, 25, 247);
    }
    /* .back-to-top:hover span {
        display: none;
        opacity: 1;
        border-radius: 25px;
        transition: opacity 0.5s, visibility 0.5s;
        position: fixed;
        z-index: 99;
        right: 20px;
        width: 120px;
        height: 60px;
        user-select: none;
        bottom: 20px;
        animation: bounce 2.8s infinite;
        color: rgb(255, 255, 255);
        background-color: rgb(255, 0, 0);
        display: none;
    } */
    
    .back-to-top:hover {
      opacity: 0.95;
      content: "Top";
      animation: bounce 2.8s infinite;
    }
  </style>
  
  <svelte:window on:scroll={handleOnScroll} />
  
  <button type="button" class="back-to-top animate-bounce" on:click={goTop} class:hidden><span>&uarr;</span></button>
  