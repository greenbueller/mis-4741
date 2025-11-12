<script>
    import swal from 'sweetalert';
    import { fly } from 'svelte/transition';
    import { themes, currentTheme, setTheme } from '../utils/appearance.js';

    export let showSettings = true;
    export let settingsVisible = false;
    let isHovered = false;

    export function toggleSettings(e) {
        e.stopPropagation();
        settingsVisible = !settingsVisible;
    }

    // Close the settings menu
    export function closeSettings() {
        settingsVisible = false;
    }

    // Set the users theme to the selected one, and close the settings menu
    function changeTheme(themeName) {
        setTheme(themeName);
        closeSettings();
    }
</script>

{#if showSettings}
    <div id="settings">
        <!-- Most of this is making it so the gear spins :)-->
        <button 
            id="btn" 
            on:click={toggleSettings}
            class:spinny={isHovered}
            class:no-spinny={!isHovered}
            on:mouseover={() => isHovered = true}
            on:mouseout={() => isHovered = false}
            on:focus={() => isHovered = true}
            on:blur={() => isHovered = false}
            aria-haspopup="true"
        >
            <span role="img" aria-label="Settings" style="font-size: 24px;">&#9881;</span>
        </button>
        {#if settingsVisible}
            <div
                id="settingsMenu"
                role="menu"
                style="display: block;"
                tabindex="-1"
                on:click|stopPropagation
                on:keydown|stopPropagation
                transition:fly|local="{{ y: -10, duration: 300 }}"
            >

                <!-- Theme Selection, visible on all pages -->
                <div class="theme-selector">
                    <div class="theme-label">Theme:</div>
                    {#each Object.entries(themes) as [key, theme]}
                        <button
                            class="theme-option"
                            class:active={$currentTheme === key}
                            on:click={() => changeTheme(key)}
                        > {theme.name} </button>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
{/if}

<!-- CSS -->
<style>
    .spinny span {
        animation: spin 4s linear infinite;
        animation-play-state: running;
        display: inline-block;
    }

    .no-spinny span {
        animation: spin 4s linear infinite;
        animation-play-state: paused;
        display: inline-block;
    }


    @keyframes spin {
        from { transform: rotate(0deg); }
        to {transform: rotate(360deg); }
    }

    #btn:hover {
        background: none;
        background-color: none;
    }

    #btn:focus {
        background: none;
        background-color: none;
        outline: none;
    }
</style>