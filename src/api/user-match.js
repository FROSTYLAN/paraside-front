
import { pathToUrl } from "../utils/functions";
import { notificationRequest, userChats, userContacts, userMatches, userRequests } from "../endpoints";
import { api } from "../utils/api";
import { useFetch } from "../utils/react-query";

export const useGetUserRequests = (params) => {
    return useFetch(pathToUrl(userRequests), params)
}

export const useGetUserContacts = (params) => {
    return useFetch(pathToUrl(userContacts), params)
}

export const useGetUserChats = (params) => {
    return useFetch(pathToUrl(userChats), params)  
}   

export const saveUserMatch = (params) => {
    return api.post(pathToUrl(userMatches), params)
}

export const cancelUserMatch = (params) => {
    return api.delete(pathToUrl(userMatches, params))
}

export const getNumNewRequests = () => {
    return api.get(pathToUrl(notificationRequest))
}

export const cleanNewRequests = () => {
    return api.patch(pathToUrl(notificationRequest))
}