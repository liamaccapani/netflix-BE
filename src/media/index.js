import createHttpError from "http-errors";
import express from "express";
import uniqid from "uniqid";

import { getMedias, saveMedias} from "../utilities/fs-tools.js";

const mediasRouter = express.Router()

// GET list 
mediasRouter.get("/", async(req, res, next) => {
    try {
        const medias = await getMedias()
        // console.log(medias)
        res.send(medias)
    } catch (error) {
        next(error)
    }
})

// GET single media
mediasRouter.get("/:mediaId", async(req, res, next) => {
    try {
      const medias = await getMedias()
      const singleMedia = medias.find(media => media.imdbID === req.params.mediaId)  
      if(singleMedia) {
          res.send(singleMedia)
      } else {
          next(createHttpError(404), `No media with id ${req.params.mediaId}`)
      }
    } catch (error) {
        next(error)
    }
})

//  GET single media + list of REVIEWS
mediasRouter.get("/:mediaId/reviews", async(req, res, next)=> {
    try {
      const medias = await getMedias()
      const singleMedia = medias.find(media => media.imdbID === req.params.mediaId)  
      if(singleMedia) {
          const mediaReviews = media.reviews
          
          res.send(mediaReviews)
      } else {
          next(createHttpError(404), `No media with id ${req.params.mediaId}`)
      } 
    } catch (error) {
       next(error) 
    }
})

// GET single media + single of REVIEW
mediasRouter.get("/:mediaId/reviews/:reviewId", async(req, res, next) => {
    try {
        const medias = await getMedias()
        const singleMedia = medias.find(media => media.imdbID === req.params.mediaId)  
        
        if(singleMedia){
            const reviews = singleMedia.reviews
            
            if(reviews){
                const review = reviews.find(review => review._id === req.params.reviewId)
                
                if(review){
                  res.render(review)
                }
            }
        } else {
            next(createHttpError(404), `No media with id ${req.params.mediaId}`)
        } 
      } catch (error) {
         next(error) 
      }
})
// POST media
mediasRouter.post("/", async(req, res, next) => {
    try {
        const newMedia = {
            ...req.body,
            imdbID: uniqid(),
            reviews: [],
            createdAt: new Date()
        }

        const medias = await getMedias()
        medias.push(newMedia)
        
        await saveMedias(medias)

        res.status(201).send(newMedia)
    } catch (error) {
        next(error)
    }
})

// POST for REVIEWS
mediasRouter.post("/:mediaId/reviews", async(req, res, next) => {
    try {
        const medias = await getMedias()
        const singleMedia = medias.find(media => media.imdbID === req.params.mediaId)
        
        if(singleMedia){
            const reviews = singleMedia.reviews
            const review = {
                ...req.body,
                _id: uniqid(),
                elementId: singleMedia.imdbID,
                createdAt: new Date()
            }

            reviews.push(review)
            await saveMedias(medias)
            res.status(201).send(review)
        }
    } catch (error) {
        next(error)
    }
})


// POST for POSTER

// PUT/:id
mediasRouter.put("/:mediaId", async(req, res, next) => {
    try {
        const medias = await getMedias()
        const mediaIndex = medias.findIndex(media => media.imdbID === req.params.mediaId)
        if(mediaIndex !== -1) {
            const previousMedia = medias[mediaIndex]
            const updatedMedia = {
                ...previousMedia,
                ...req.body,
                updatedAt: new Date()
            }
            
            medias[mediaIndex] = updatedMedia

            await saveMedias(medias)
            res.send(updatedMedia)

        } else {
            next(createHttpError(400), `Bad Request, my dear`)
        }
    } catch (error) {
        next(error)
    }
})

// DELETE/:id
mediasRouter.delete("/:mediaId", async(req, res, next) => {
    try {
        const medias = await getMedias()
        const remainingMedias = medias.filter(media => media.imdbID !== req.params.mediaId)
        await saveMedias(remainingMedias)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})

// DELETE for REVIEWS

// PDF

export default mediasRouter