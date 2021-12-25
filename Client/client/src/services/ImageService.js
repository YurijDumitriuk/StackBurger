function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export const GetImages = () => {      
    const Images = importAll(require.context('../images/burgerComponentsImg', false, /\.(png|jpe?g|svg)$/));
    return Images;
}