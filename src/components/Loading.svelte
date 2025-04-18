<!-- Loading.svelte -->
<script>
    import { onMount } from 'svelte';
  
    export let isLoading = true;
  
    // Optional: Auto-hide after 2s as fallback
    onMount(() => {
      const timeout = setTimeout(() => isLoading = false, 2000);
      return () => clearTimeout(timeout);
    });
  </script>
  
  <style>
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #000000;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.5s ease;
    }
  
    .logo-container {
      width: 150px;
      margin-bottom: 2rem;
      animation: float 3s ease-in-out infinite;
    }
  
    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3B82F6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  </style>
  
  {#if isLoading}
    <div class="loading-overlay">
      <!-- Replace this with your actual SVG -->
      <div class="logo-container">
        <svg xmlns="images/tmt-letters.png" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="#3B82F6" />
          <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="30" dy=".3em">TT</text>
        </svg>
      </div>
      <div class="spinner" />
    </div>
  {/if}