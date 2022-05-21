import express from "express";
import { ITokenPayload } from 'passport-azure-ad'

interface IAuthInfo extends ITokenPayload {
    country: string
    postalCode: string
    family_name: string
    given_name: string
    emails: Array<string>
    nonce: string
}

declare module 'express-serve-static-core' {
    export interface Request {
        authInfo: IAuthInfo
        user: any
    }
}
