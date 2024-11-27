import dfxJson from '../../dfx.json';
import { canisterId } from "@/declarations/src";
import { AuthClient } from "@dfinity/auth-client";
import { Image } from "@/declarations/bizpro-backend/bizpro-backend.did";

import imageCompression from "browser-image-compression";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
dfxJson.networks.local.bind

export const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
    });
};

export const getImageString = (
    image: Image,
    authClient: AuthClient,
    raw = false
): string => {
    const fileExtension = "." + image?.filetype?.split("/").pop();

    let imageString = "";
    if (process.env.NODE_ENV !== "production") {
        imageString = `http://localhost:4943/images/${authClient
            ?.getIdentity()
            ?.getPrincipal()
            ?.toString()}/profile${fileExtension}?canisterId=${canisterId}`;
    } else {
        imageString = `https://${canisterId}.${raw ? "raw." : ""
            }ic0.app/images/${authClient
                ?.getIdentity()
                ?.getPrincipal()
                ?.toString()}/profile${fileExtension}`;
    }
    return imageString;
};

export const resizeImage = async (file, config) => {
    return await imageCompression(file, config);
};