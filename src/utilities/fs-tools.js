import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join} from "path";

const { readJSON, writeJSON, writeFile } = fs

const utilitiesPath = dirname(fileURLToPath(import.meta.url))
const mediaJSON = join(utilitiesPath,"../media/medias.json")

export const getMedias = () => readJSON(mediaJSON)
export const saveMedias = content => writeJSON(mediaJSON, content)

// **** FILE UPLOAD
const publicFolder = join(process.cwd(), "./public/images/posters")
export const savePosterPicture = (name, bufferContent) => writeFile(join(publicFolder, name), bufferContent)