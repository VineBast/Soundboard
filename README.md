> Vincent RODRIGUEZ
# Project report for the Soundboard application :

## 1. Model

![Soundboard-model](assets/img/soundboard_model.png)

## 2. Organisation

### The application has been developed in 4 screens (accessible through tabs) :
1. The first one is the Search view (the Home actually), you can search a sound calling the Freesound API. A list of sounds will be displayed.
2. The Sampler view shows all your sounds added to the sounds list. With a short press on a sample you play the sound, with a long press you remove the sound from the sampler list (not from the library list).
3. The third view, is the Record view. You can record your own sound and add it to the Sampler list and to the Library list. The sound can be titled and have a description.
4. The last, is the Library view, it shows all your sounds, its title and description. You can remove a sound from your library view (if you want to remove a sound from your Sampler view, you have to remove it from there) and you can add a Library sound to your Sampler view.

## 3. Working

+ The application works with 3 redux slice. A list of sounds used for the Sampler view, a list of sounds for the Library and a FilterSlice. The FilterSlice fand LibrarySlice filter the Library sounds (shows all sounds or just the Freesounds or just the recordings depending of the type). In this list, there are sound objects with a name, a description, a link to play the sound, an image and a type (type freesound, or recording). These objects come from infos from Freesound API or a recording, and are transformed into a simpler object that can be used in both lists.
+ In the Search component, you call twice the Freesound API, once to have a list with a key-work put in an input, and a second time when pressing the Add button. When you a add a sound, you add it the soundsSlice (used for the Sampler view) and to the localSoundsSlice (used for the Library). So, when you remove a sound on the Sampler view, you use the remove function from the SoundsSlice, and on the Library view, you use the function removeFromTheLibrary from the localSoundsSlice.
+ To play a sound, I used the expo-av library, that takes a sound link and tranforms it into a Audio object.
+ The Record component used the expo-av library too, I took the original functions and adapted it to the component. This functions asks permission to use audio setup and put the local link of the record on a useState, and add it to redux.