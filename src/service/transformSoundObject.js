export const transformSoundObject = (id, name, description, image, preview, type) => {
    const sound = {
        id: id,
        name: name,
        description: description,
        images: {
            spectral_m: image
        },
        previews: {
            'preview-hq-mp3': preview
        },
        type: type
    }
    return sound;
}
