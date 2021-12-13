/**
 * 
 * @description Extract the "https://", fetch img url from moralis
 * @param {URL} url 
 * @returns url format to image
 */
 export const getIpfsImages = (url) => {
    const ipfsHash = url.slice(7,url.length)    
    const req = `https://ipfs.moralis.io:2053/ipfs/${ipfsHash}`;
    console.log("ipfsHash", req);   
    return req
}

/**
 * 
 * @description upload IMAGE with the saveIPFS() method (max file size 1 GB).
 * @param {object} _file the file to be saved 
 * @returns url format to image
 */
 export const saveImgFile = async (_file) => {
    // Save file input to IPFS
    const data = _file.files[0]
    const file = new Moralis.File(data.name, data)
    const result = await file.saveIPFS();

    console.log("IPFS:saveImgFile", file.ipfs(), file.hash())
    return result;
}

/**
 * 
 * @description upload files with the saveIPFS() method (max file size 1 GB).
 * @param {object} _file the file to be saved 
 * @returns url format to image
 */
 export const saveFile = async (_file) => {
    // Save file input to IPFS   
    const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(_file))});
    const result = await file.saveIPFS();

    console.log("IPFS:saveFile", file.ipfs(), file.hash())
    return result;
}
