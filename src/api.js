// src/api.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const api = axios.create({ baseURL: process.env.API_BASE_URL });

import { PARK_IDS, getParkId } from './modules/parks.js';

export async function getDestinations() {
    const { data } = await api.get('/destinations');
    const list = Array.isArray(data)
        ? data
        : Array.isArray(data.destinations)
            ? data.destinations
            : [];
    const configured = new Set(Object.keys(PARK_IDS));
    
    const filtered = list
        .filter(el => {
            const exists = configured.has(el.id);
            return exists;
        })
        .map(el => {
            const parkId = PARK_IDS[el.id];
            return { ...el, parkId };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
}



export async function getEntityChildren(id) {
    const { data } = await api.get(`/entity/${id}/children`);
    const list = Array.isArray(data.children)
        ? data.children
        : null;
    if (!list) {
        throw new Error('Invalid /entity/{id}/children response: ' + JSON.stringify(data));
    }

    return list.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getEntityLiveData(id) {
    const { data } = await api.get(`/entity/${id}/live`);
    const list = Array.isArray(data.liveData)
        ? data.liveData
        : Array.isArray(data.data)
            ? data.data
            : null;
    if (!list) {
        throw new Error('Invalid /entity/{id}/live response: ' + JSON.stringify(data));
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
}
