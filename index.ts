import definePlugin from "@utils/types";
const STYLE_ID = "muzzled-and-caged-style";

const MUTED_USER_ICON = "https://files.catbox.moe/11q6lb.png";
const DEAFENED_USER_ICON = "https://files.catbox.moe/w6zf9j.png";

const SERVER_MUTED_ICON = "https://files.catbox.moe/bynyo6.png";
const SERVER_DEAFENED_ICON = "https://files.catbox.moe/kd9dc7.png";

const MUTED_MIC_ICON = "https://files.catbox.moe/ac9b4p.png";
const UNMUTED_MIC_ICON = "https://files.catbox.moe/df502s.png";

const DEAFENED_HEADPHONE_ICON = "https://files.catbox.moe/gas9oj.png";
const UNDEAFENED_HEADPHONE_ICON = "https://files.catbox.moe/xthgtu.png";

const USER_BAR_CSS = `
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

const SERVER_TOOLBAR_CSS = `
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

const VOICE_CHANNEL_CSS = `
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

function updateVoiceChannelIcons() {
    document.querySelectorAll<HTMLElement>(
        ".icons__07f91 .iconGroup__07f91"
    ).forEach(group => {
        group.querySelectorAll<SVGElement>(
            ":scope > svg"
        ).forEach(svg => {
            delete svg.dataset.muzzledState;
        });

        group.querySelectorAll<HTMLElement>(
            ":scope > span.hiddenVisually_b18fe2"
        ).forEach(stateElement => {
            const state = stateElement.textContent?.trim();

            const previousElement =
                stateElement.previousElementSibling;

            if (!(previousElement instanceof SVGElement)) {
                return;
            }

            if (state === "Muted") {
                previousElement.dataset.muzzledState = "muted";
            }

            else if (state === "Deafened") {
                previousElement.dataset.muzzledState = "deafened";
            }

            else if (state === "Server Muted") {
                previousElement.dataset.muzzledState =
                    "server-muted";
            }

            else if (state === "Server Deafened") {
                previousElement.dataset.muzzledState =
                    "server-deafened";
            }
        });
    });
}

export default definePlugin({
    name: "Muzzled",

    description:
        "Replaces Discord voice icons with custom muzzled, yappin, caged and playin icons.",

    authors: [
        {
            name: "coyotecollars",
            id: 0n,
        },
    ],

    start() {
        const style = document.createElement("style");

        style.id = STYLE_ID;

        style.textContent =
            USER_BAR_CSS +
            SERVER_TOOLBAR_CSS +
            VOICE_CHANNEL_CSS;

        document.head.appendChild(style);

        replaceTooltips();
        updateVoiceChannelIcons();

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

    stop() {
        this.observer?.disconnect();

        document
            .getElementById(STYLE_ID)
            ?.remove();

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