import definePlugin from "@utils/types";
const STYLE_ID = "muzzled-and-caged-style";

/* =========================================================
   IMAGE URLs
   ========================================================= */

// OTHER USERS IN VOICE CHANNEL

// Normal user states
const MUTED_USER_ICON = "https://files.catbox.moe/11q6lb.png";
const DEAFENED_USER_ICON = "https://files.catbox.moe/w6zf9j.png";

// Server/admin states
const SERVER_MUTED_ICON = "https://files.catbox.moe/bynyo6.png";
const SERVER_DEAFENED_ICON = "https://files.catbox.moe/kd9dc7.png";


// YOUR USER BAR

const MUTED_MIC_ICON = "https://files.catbox.moe/ac9b4p.png";
const UNMUTED_MIC_ICON = "https://files.catbox.moe/df502s.png";

const DEAFENED_HEADPHONE_ICON = "https://files.catbox.moe/gas9oj.png";
const UNDEAFENED_HEADPHONE_ICON = "https://files.catbox.moe/xthgtu.png";


/* =========================================================
   YOUR USER BAR
   ========================================================= */

const USER_BAR_CSS = `
    /* =====================================================
       MICROPHONE — MUTED
       ===================================================== */

    button[role="switch"][aria-label="Mute"][aria-checked="true"]
    .lottieIcon__5eb9b > svg {
        display: none;
    }

    button[role="switch"][aria-label="Mute"][aria-checked="true"]
    .lottieIcon__5eb9b::after {
        content: "";

        display: block;

        width: 24px;
        height: 24px;

        background-image: url("${MUTED_MIC_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }


    /* =====================================================
       MICROPHONE — UNMUTED
       ===================================================== */

    button[role="switch"][aria-label="Mute"][aria-checked="false"]
    .lottieIcon__5eb9b > svg {
        display: none;
    }

    button[role="switch"][aria-label="Mute"][aria-checked="false"]
    .lottieIcon__5eb9b::after {
        content: "";

        display: block;

        width: 24px;
        height: 24px;

        background-image: url("${UNMUTED_MIC_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }


    /* =====================================================
       HEADPHONES — DEAFENED
       ===================================================== */

    button[role="switch"][aria-label="Deafen"][aria-checked="true"]
    .lottieIcon__5eb9b > svg {
        display: none;
    }

    button[role="switch"][aria-label="Deafen"][aria-checked="true"]
    .lottieIcon__5eb9b::after {
        content: "";

        display: block;

        width: 24px;
        height: 24px;

        background-image: url("${DEAFENED_HEADPHONE_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }


    /* =====================================================
       HEADPHONES — UNDEAFENED
       ===================================================== */

    button[role="switch"][aria-label="Deafen"][aria-checked="false"]
    .lottieIcon__5eb9b > svg {
        display: none;
    }

    button[role="switch"][aria-label="Deafen"][aria-checked="false"]
    .lottieIcon__5eb9b::after {
        content: "";

        display: block;

        width: 24px;
        height: 24px;

        background-image: url("${UNDEAFENED_HEADPHONE_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
`;


/* =========================================================
   SERVER-ENFORCED USER BAR STATES
   ========================================================= */

/*
 * Discord uses a different button structure when the server has
 * forcibly muted/deafened the current user. The buttons we
 * inspected have:
 *
 *   button[role="switch"][aria-label="Mute"]
 *   button[role="switch"][aria-label="Deafen"]
 *
 * with the classes redGlow__67645 + plateMuted__67645, and
 * their icon is inside .contents__201d5 > svg.iconForeground__37e49.
 *
 * IMPORTANT: Discord also applies redGlow + plateMuted during an ordinary
 * local mute/deafen. Local toggles use aria-checked="true", so the server
 * selectors below explicitly exclude that state. This prevents both the
 * normal and server icon replacements from rendering at the same time.
 *
 * We intentionally target that DOM directly instead of VoiceStateStore:
 * in this Discord build VoiceStateStore reports mute/deaf as false
 * while the toolbar is visibly showing the server-enforced state.
 */

const SERVER_TOOLBAR_CSS = `
    /* Server-enforced states use a direct SVG child of .contents__201d5.
       Normal local mute/deafen uses a .lottieIcon__5eb9b wrapper instead. */

    button[role="switch"][aria-label="Mute"]
    .contents__201d5 > svg.iconForeground__37e49 {
        display: none !important;
    }

    button[role="switch"][aria-label="Mute"]
    .contents__201d5:has(> svg.iconForeground__37e49)::after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        flex: 0 0 20px;
        background-image: url("${SERVER_MUTED_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    button[role="switch"][aria-label="Deafen"]
    .contents__201d5 > svg.iconForeground__37e49 {
        display: none !important;
    }

    button[role="switch"][aria-label="Deafen"]
    .contents__201d5:has(> svg.iconForeground__37e49)::after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        flex: 0 0 20px;
        background-image: url("${SERVER_DEAFENED_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }
`;

/* =========================================================
   OTHER USERS IN VOICE CHANNEL
   ========================================================= */

const VOICE_CHANNEL_CSS = `
    /*
     * Discord's structure is:
     *
     * <svg></svg>
     * <span>Muted</span>
     *
     * <svg></svg>
     * <span>Deafened</span>
     *
     * OR:
     *
     * <svg></svg>
     * <span>Server Muted</span>
     *
     * <svg></svg>
     * <span>Server Deafened</span>
     *
     * Each SVG is therefore associated with the
     * accessibility span immediately following it.
     */


    /* =====================================================
       NORMAL USER — MUTED
       ===================================================== */

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="muted"] {
        width: 18px !important;
        height: 18px !important;

        display: block !important;

        background-image: url("${MUTED_USER_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="muted"] > path {
        display: none !important;
    }


    /* =====================================================
       NORMAL USER — DEAFENED
       ===================================================== */

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="deafened"] {
        width: 18px !important;
        height: 18px !important;

        display: block !important;

        background-image: url("${DEAFENED_USER_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="deafened"] > path {
        display: none !important;
    }


    /* =====================================================
       SERVER MUTED — ADMIN MUZZLED
       ===================================================== */

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="server-muted"] {
        width: 18px !important;
        height: 18px !important;

        display: block !important;

        background-image: url("${SERVER_MUTED_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="server-muted"] > path {
        display: none !important;
    }


    /* =====================================================
       SERVER DEAFENED — ADMIN CAGED
       ===================================================== */

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="server-deafened"] {
        width: 18px !important;
        height: 18px !important;

        display: block !important;

        background-image: url("${SERVER_DEAFENED_ICON}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .icons__07f91
    .iconGroup__07f91
    > svg[data-muzzled-state="server-deafened"] > path {
        display: none !important;
    }
`;


/* =========================================================
   TOOLTIP REPLACEMENT
   ========================================================= */

function replaceTooltips() {
    document.querySelectorAll(
        '.tooltip_fa450d div[data-text-variant="text-sm/medium"]'
    ).forEach(element => {
        const text = element.textContent?.trim();

        switch (text) {
            case "Mute":
                element.textContent = "yappin!!";
                break;

            case "Unmute":
                element.textContent = "muzzled :((";
                break;

            case "Deafen":
                element.textContent = "playin!!";
                break;

            case "Undeafen":
                element.textContent = "caged :((";
                break;
				
			case "Server Muted":
				element.textContent = "forcibly muzzled...";
				break;
				
			case "Server Deafened":
			    element.textContent = "forcibly caged...";
				break;
				
		}
    });
}


/* =========================================================
   DETECT VOICE CHANNEL ICON STATES
   ========================================================= */

function updateVoiceChannelIcons() {
    document.querySelectorAll<HTMLElement>(
        ".icons__07f91 .iconGroup__07f91"
    ).forEach(group => {

        /*
         * Clear old state markers first.
         *
         * This is important when somebody changes state
         * without leaving the voice channel.
         */

        group.querySelectorAll<SVGElement>(
            ":scope > svg"
        ).forEach(svg => {
            delete svg.dataset.muzzledState;
        });


        /*
         * Discord puts the state text immediately after
         * the corresponding SVG.
         */

        group.querySelectorAll<HTMLElement>(
            ":scope > span.hiddenVisually_b18fe2"
        ).forEach(stateElement => {

            const state = stateElement.textContent?.trim();

            const previousElement =
                stateElement.previousElementSibling;


            /*
             * Make sure the preceding element is actually
             * the SVG belonging to this state.
             */

            if (!(previousElement instanceof SVGElement)) {
                return;
            }


            /* NORMAL USER — MUTED */

            if (state === "Muted") {
                previousElement.dataset.muzzledState = "muted";
            }


            /* NORMAL USER — DEAFENED */

            else if (state === "Deafened") {
                previousElement.dataset.muzzledState = "deafened";
            }


            /* SERVER — MUTED */

            else if (state === "Server Muted") {
                previousElement.dataset.muzzledState =
                    "server-muted";
            }


            /* SERVER — DEAFENED */

            else if (state === "Server Deafened") {
                previousElement.dataset.muzzledState =
                    "server-deafened";
            }
        });
    });
}


/* =========================================================
   PLUGIN
   ========================================================= */

export default definePlugin({
    name: "MuzzledAndCaged",

    description:
        "Replaces Discord voice icons with custom Muzzled, Yappin, Caged and Playin icons.",

    authors: [
        {
            name: "1xzozz",
            id: 0n,
        },
        {
            name: "coyotecollars",
            id: 0n,
        },
    ],


    /* =====================================================
       START
       ===================================================== */

    start() {

        /*
         * Create our stylesheet.
         */

        const style = document.createElement("style");

        style.id = STYLE_ID;

        style.textContent =
            USER_BAR_CSS +
            SERVER_TOOLBAR_CSS +
            VOICE_CHANNEL_CSS;

        document.head.appendChild(style);


        /*
         * Apply immediately.
         */

        replaceTooltips();
        updateVoiceChannelIcons();


        /*
         * Discord dynamically rebuilds voice-channel
         * elements, so observe the document for changes.
         */

        this.observer = new MutationObserver(() => {
            replaceTooltips();
            updateVoiceChannelIcons();
            });


        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    },


    flux: {
        VOICE_STATE_UPDATES() {
            },
    },


    /* =====================================================
       STOP
       ===================================================== */

    stop() {

        /*
         * Stop watching the DOM.
         */

        this.observer?.disconnect();


        /*
         * Remove our stylesheet.
         */

        document
            .getElementById(STYLE_ID)
            ?.remove();


        /*
         * Remove state attributes that we added.
         */

        document
            .querySelectorAll<SVGElement>(
                "svg[data-muzzled-state]"
            )
            .forEach(svg => {
                delete svg.dataset.muzzledState;
            });

        document
            .querySelectorAll<HTMLButtonElement>(
                "button[data-muzzled-server-muted], button[data-muzzled-server-deafened]"
            )
            .forEach(button => {
                button.removeAttribute("data-muzzled-server-muted");
                button.removeAttribute("data-muzzled-server-deafened");
            });
    },
});