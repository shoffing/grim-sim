# GrimSim

A simulated grimoire for Blood on the Clocktower.
Built with React Native.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project
uses [file-based routing](https://docs.expo.dev/router/introduction).

## Icon Variants

Because React Native cannot dynamically modify images in a way that is sufficient for changing character icon team
colors, a script needs to be run to generate red and blue variants for all the character icons:

```bash
npm run icon-variants
```

This will use ImageMagick to convert all the icons to their red/blue variants. Note that ImageMagick must be installed
locally for this to work.

 ## Acknowledgements

GrimSim uses assets taken from the wonderful "Pocket Grimoire" project by Skateside.
Check it out!

https://www.pocketgrimoire.co.uk/

https://github.com/Skateside/pocket-grimoire