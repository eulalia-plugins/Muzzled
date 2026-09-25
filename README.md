#### Muzzled
A custom Vencord plugin that gives Discord's voice controls a bit more bite.
Replaces the standard mute/deafen visuals with custom muzzled, yappin, caged, and playin icons, with separate forcibly muzzled and forcibly caged visuals for server enforced mute/deafen.
### Installation

#(manual)

1. Make sure you have [**Vencord built from source**](https://docs.vencord.dev/installing/).
2. Create a `Muzzled` folder inside your Vencord `src/userplugins` folder.
3. Drop the index.js into the `Muzzled` folder
4. Rebuild Vencord (pnpm build, pnpm inject) and restart Discord.
5. Open **Settings → Vencord → Plugins**.
6. Find **Muzzled** and enable it.

#(powershell)

1. Make sure you have **Vencord built from source**.
2. Open the **Vencord folder** on your computer.
3. Click the address bar, type `powershell`, and press **Enter**.
4. Paste this command and press **Enter**:

```powershell
git clone https://github.com/eulalia-plugins/Muzzled.git src/userplugins/Muzzled; pnpm build; pnpm inject
```

5. Once it's finished, **restart Discord**.
6. Go to **Settings → Vencord → Plugins**, find **Muzzled**, and enable it.

That's it! The icons should appear immediately!
