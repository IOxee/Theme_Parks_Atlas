import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const EXPECTED = {
    ARRAY: 'array',
    OBJECT: 'object',
};

const [
    ,
    ,
    url1 = 'https://api.themeparks.wiki/v1/destinations',
    url2 = 'https://queue-times.com/parks.json',
] = process.argv;

const validate = (data, expected) => {
    if (expected === EXPECTED.ARRAY && !Array.isArray(data)) {
        throw new TypeError(`Expected an array but got ${typeof data}`);
    }
    if (
        expected === EXPECTED.OBJECT &&
        (typeof data !== 'object' || data === null || Array.isArray(data))
    ) {
        throw new TypeError(`Expected an object but got ${typeof data}`);
    }
    return data;
};

const normalize = name => name.trim().toLowerCase();

async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    return Array.isArray(json)
        ? json
        : validate(json.destinations, EXPECTED.ARRAY);
}

function buildNameToIdMap(data2) {
    const map = new Map();
    for (const company of validate(data2, EXPECTED.ARRAY)) {
        validate(company, EXPECTED.OBJECT);
        for (const park of validate(company.parks, EXPECTED.ARRAY)) {
            validate(park, EXPECTED.OBJECT);
            map.set(normalize(park.name), {
                id: String(park.id),
                name: park.name
            });
        }
    }
    return map;
}

function generateParkIds(data1, nameToId2) {
    const idMap = {};
    const nameMap = {};

    for (const resort of validate(data1, EXPECTED.ARRAY)) {
        validate(resort, EXPECTED.OBJECT);
        const parentId = resort.id;           // la UUID del resort
        const parentName = resort.name;       // el nombre del resort

        for (const park of validate(resort.parks, EXPECTED.ARRAY)) {
            validate(park, EXPECTED.OBJECT);
            const key = normalize(park.name);

            if (nameToId2.has(key)) {
                const { id: numericId } = nameToId2.get(key);
                idMap[parentId] = numericId;
                nameMap[parentId] = parentName;
                break;
            }
        }
    }

    return { idMap, nameMap };
}

function sortByValue(obj) {
    return Object.fromEntries(
        Object.entries(obj).sort(([, a], [, b]) => Number(a) - Number(b))
    );
}

(async () => {
    try {
        const [data1, data2] = await Promise.all([
            fetchJson(url1),
            fetchJson(url2)
        ]);

        const nameToId2 = buildNameToIdMap(data2);
        const { idMap, nameMap } = generateParkIds(data1, nameToId2);
        const PARK_IDS = sortByValue(idMap);

        // Build annotated lines
        const lines = Object.entries(PARK_IDS).map(
            ([uuid, id]) => `    "${uuid}": "${id}", // ${nameMap[uuid]}`
        );

        const content = `// src/modules/parks.js
export const PARK_IDS = {
${lines.join('\n')}
};

const PARK_UUIDS = new Set(Object.keys(PARK_IDS));
const ID_TO_UUID = Object.fromEntries(
    Object.entries(PARK_IDS).map(([uuid, id]) => [id, uuid])
);

export async function getParkId(key) {
    if (typeof key !== 'string') return null;
    if (PARK_IDS[key]) return PARK_IDS[key];
    if (ID_TO_UUID[key]) return key;
    return null;
}
`;

        const outPath = path.resolve('src', 'modules', 'parks.js');
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, content, 'utf8');
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
})();
