import axios from 'axios';
import { load } from 'cheerio';

function stripEmojis(text) {
    return text
        .replace(/\p{Extended_Pictographic}/gu, '')
        .replace(/\uFE0F/g, '')
        .trim();
}

async function fetchCalendar(year, month, parkId) {
    const url = `https://queue-times.com/es/parks/${parkId}/calendar/${year}/${month}`
    const { data: html } = await axios.get(url)
    const $ = load(html)
    const result = []

    $(`a[href*="/calendar/${year}/${month}/"]`).each((_, el) => {
        let text = $(el).text()
        text = stripEmojis(text)
        text = text.replace(/\s+/g, ' ').trim()

        // Regex: day, weekday text, repeated day number, crowd%, optional star, hours
        const match = text.match(
            /^(\d{1,2})\s+\S+\s+\d{1,2}\s+(\d{1,3})%\*?\s+(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/
        )

        if (match) {
            const [, day, crowd, open, close] = match
            const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            result.push({ date, crowd: parseInt(crowd, 10), hours: `${open}-${close}` })
        }
    })

    return result
}

async function main() {
    try {
        const calendar = await fetchCalendar('2025', '06', '19');
        console.log('Final calendar:', calendar);
    } catch (error) {
        console.error(error.message);
    }
}

main();
