export const badRequest = (error, request, response, next) => {
    console.log(`*********${error}`)
    if(error.status === 400){
        response.status(400).send({success: false, message: error.errorsList})
    } else{
        next(error)
    }
}

export const forbidden = (error, request, response, next) => {
    console.log(error)
    if(error.status === 403){
        response.status(403).send({success: false, message: error.message})
    } else {
        next(error)
    }
}

export const notFound = (error, request, response, next) => {
    console.log(error)
    if(error.status === 404){
        response.status(404).send({error: error.message})
    } else {
        next(error)
    }
}

export const serverError = (error, request, response, next) => {
    console.log(`*********${error}`)
    response.status(500).send({success: false, message: "Server Generated Error"})
}