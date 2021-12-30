/**
 * 
 * @description Extract the "https://", fetch img url from moralis
 * @param {URL} url 
 * @returns url format to image
 */
 export const getIpfsImages = (url) => {
    try {
        const ipfsHash = url.slice(7,url.length)    
        const req = `https://ipfs.moralis.io:2053/ipfs/${ipfsHash}`;
        console.log("ipfsHash", req);   
        return req
    } catch (error) {
        console.error("saveImgFile:ERROR", error);
    }

}

/**
 * 
 * @description upload IMAGE with the saveIPFS() method (max file size 1 GB).
 * @param {object} _file the file to be saved 
 * @returns url format to image
 */
 export const saveImgFile = async (_file) => {
    try {
        // Save file input to IPFS
        const data = _file.files[0]
        const file = new Moralis.File(data.name, data)
        const result = await file.saveIPFS();
        console.log("IPFS:saveImgFile", file.ipfs(), file.hash());
        

        // after sucess, save file reference to moralis database
        // const refDb = await saveRefFile(result, 'IPFS_images');
        // console.log("refDb:saveImgFile", refDb);
        return result;
     } catch (error) {
        console.error("saveImgFile:ERROR", error);
     }

}

/**
 * 
 * @description upload files with the saveIPFS() method (max file size 1 GB).
 * @param {object} _file the file to be saved 
 * @returns url format to file
 */
 export const saveFile = async (_file) => {
    try {
        console.log("saveFileee", _file);
        // Save file input to IPFS   
        const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(_file))});
        const result = await file.saveIPFS();
        // after sucess, save file reference to moralis database
        const refDb = await saveRefFile(result, 'IPFS_files');
        console.log("refDb:saveFile", refDb);
        
        return result;
    } catch (error) {
        console.error("saveImgFile:ERROR", error);
    }

}

/**
 * 
 * @description save file reference to moralis
 * @param {object} _file the file to be saved 
 * @param {string} _object moralis object name 
 * @returns reference result
 */
 export const saveRefFile = async (_file, _object) => {
    try {
        console.log("saveRefFile", _file, _object);

        const jobApplication = new Moralis.Object(_object)
        jobApplication.set('name', _file._hash)
        jobApplication.set('resume', _file)
        const result = await jobApplication.save()
        return result;
    } catch (error) {
        console.error("saveImgFile:ERROR", error);
    }
}

/**
 * 
 * @description Retrieve file reference from moralis
 * @param {string} _fileName the file name to be query 
 * @param {string} _object moralis object name 
 * @returns reference result
 */
 export const getRefFile = async (_fileName, _object) => {
    try {
        const query = new Moralis.Query(_object);
        query.equalTo('name', _fileName)
        query.find().then(function ([application]) {
           const ipfs = application.get('resume').ipfs();
           const hash = application.get('resume').hash();
           const url = application.get('resume').url();
           console.log("getRefFile", ipfs, hash, url);
        })
        return query;
    } catch (error) {
        console.error("saveImgFile:ERROR", error);
    }
}