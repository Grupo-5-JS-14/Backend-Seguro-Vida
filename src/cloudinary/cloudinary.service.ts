import { Injectable } from "@nestjs/common";
import {v2 as cloudinary} from "cloudinary"
import { Readable } from "stream";
import type { Multer } from "multer";


@Injectable()
export class CloudinaryService{
    constructor(){
        cloudinary.config({
            cloud_name: 'dmlleow15',
            api_key: '238229984883517',
            api_secret: 'QhUHa3fHs4Up0isH0f9EdA6QBS0'
        })
    }

    async uploadImage(file: Express.Multer.File): Promise<
    {url: string;
    publicId: string}>{
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                {
                    folder: 'vittlis/usuarios',
                    resource_type: 'image',
                },
                (error, result) =>{
                    if(error)return reject(error);
                    if(!result) return reject('Erro ao enviar imagem');

                    resolve({url: result.secure_url, publicId: result.public_id,});
                }
            )
            Readable.from(file.buffer).pipe(upload)
        })
    }

    async deleteImage(publicId: string): Promise<void>{
        await cloudinary.uploader.destroy(publicId);
    }
}