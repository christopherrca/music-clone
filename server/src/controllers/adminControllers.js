import { Song } from "../models/songModels.js"
import { Album } from "../models/albumModels.js"
import cloudinary from "../lib/cloudinary.js"




// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        })
        return result.secure_url
    } catch(error) {
        console.log("Error in uploadToCloudinary", error)
        throw new Error("Error uploading to cloudinary")

    }
}



export const createSong = async (req, res, next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "Please upload all files"})

        }
        const {title, artist, albumId, duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile


        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        await song.save()


        // if song belongs to an album, update the albums songs array
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push: {songs: song._id},
            })
        }

        res.status(201).json(song)

    } catch(error) {
        console.log("Error in create song", error)
        // res.status(500).json({ message: "Internal Server Error", error})
        next(error)
    }
}  


export const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id)

        // if song belongs to an album, update the albums songs array
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull: { songs: song._id },
            })
        }



        await Song.findByIdAndDelete(id)

        res.status(200).json({message: "Song Deleted Successfully"})


    } catch(error) {
        console.log("Error in Delete Song", error)
        next(error)
    }
}


export const createAlbum = async (req, res, next) => {
    try {
        const {title, artist, releaseYear} = req.body
        const {imageFile} = req.files

        const imageUrl = await uploadToCloudinary(imageFile)

        const album = new Album({
            title, 
            artist,
            imageUrl,
            releaseYear
        })

        await album.save()

        res.status(201).json(album)
    } catch(error) {
        console.log("Error in Create Album", error)
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId: id})
        await Album.findByIdAndDelete(id)
        res.status(200).json({message: "Album deleted Successfully"})
    } catch(error){
        console.log("Error in delete album", error)
        next(error)
    }
}


export const checkAdmin = async (req, res, next) => {
    res.status(200).json({admin: true})
}