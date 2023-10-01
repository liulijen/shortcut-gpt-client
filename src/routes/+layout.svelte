<script>
    import "../app.css";
    import {open_ai_api_key} from '$lib/store.js'
    import {setContext} from 'svelte';

    function showModal() {
      my_modal_1.showModal();
    }
  
    setContext('showModal', showModal);

</script>
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">OPENAI API KEY</h3>
    <p class="py-4"><input type="text" class="input input-bordered w-full" placeholder="sk-" value={$open_ai_api_key} on:input={(e) => open_ai_api_key.set(e.target.value)}/></p>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
<div class="navbar bg-base-100">
    <div class="flex-none">
      <!-- <label for="my-drawer" class="btn drawer-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label> -->
    </div>
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">ShortcutGPT - A Tool-Based ChatGPT Client</a>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost" onclick="my_modal_1.showModal()">API Key
      </button>
    </div>
</div>
<div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <slot />
    </div> 
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <ul class="menu bg-base-200">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
        </ul>
        
      </ul>
    </div>
</div>
