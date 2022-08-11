import React from "react";

export function setStorage(name:string,value:any, legacy:any = null){
    sessionStorage.setItem(name,value)
}
export function getStorage(name:any){
    return sessionStorage.getItem(name)
}
export function delStorage(name:string){
    sessionStorage.removeItem(name);
}