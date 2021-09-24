import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join} from "path";

const { readJSON, writeJSON } = fs

const utilitiesPath = dirname(fileURLToPath(import.meta.url))
const mediaJSON = join(utilitiesPath,"../media/medias.json")

export const getMedias = () => readJSON(mediaJSON)

export const saveMedias = content => writeJSON(mediaJSON, content)