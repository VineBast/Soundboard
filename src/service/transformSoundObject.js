//Transform the object sound for library and sounds from redux, to a simple object with a type (the type is using for filter)
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
