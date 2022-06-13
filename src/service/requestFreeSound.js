import { useState } from "react";

const createRequest = (search) => {
    return ('https://freesound.org/apiv2/search/text/?query='+ search +'&token=Ko0whJzjC4Mb94Xe7te8Ma5A49gwuPfM4zlzm2Ea&format=json');
}

export const findRequest = async () => {
    let req = await fetch(createRequest('piano'));
    let sounds = await req.json();
}

export const test = () => {
    console.log("Success");
}