import express from "express";

interface IAuthInfo {
    exp: number
    nbf: number
    aud: string
    sub: string
    country: string
    name: string
    postalCode: string
    family_name: string
    given_name: string
    emails: Array<string>
    tfp: string
    nonce: string
    scp: string
    azp: string
    ver: string
    iat: number
}

declare module 'express-serve-static-core' {
    export interface Request {
        authInfo: IAuthInfo
        user: any
    }
}
