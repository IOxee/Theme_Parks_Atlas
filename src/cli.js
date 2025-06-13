// src/cli.js
import inquirer from 'inquirer'
import {
    getDestinations,
    getEntityChildren,
    getEntityLiveData
} from './api.js'
import { fetchCalendar } from './calendar.js'

// Map for converting hash IDs to numeric park IDs
import { getParkId } from './modules/parks.js'

async function selectPark() {
    const list = await getDestinations()
    const choices = list.map(d => ({ name: d.name, value: d.id }))
    const { destId } = await inquirer.prompt({
        type: 'list',
        name: 'destId',
        message: 'Select a destination:',
        choices
    })

    console.log(`\nYou selected: ${list.find(d => d.id === destId).name}\n`)
    return destId
}

async function selectRide(parkId) {
    const rides = await getEntityChildren(parkId)
    const choices = rides.map(p => ({ name: p.name, value: p.id }))
    const { rideId } = await inquirer.prompt({
        type: 'list',
        name: 'rideId',
        message: 'Select a ride:',
        choices
    })
    return rideId
}

async function selectDate() {
    const { date } = await inquirer.prompt({
        type: 'input',
        name: 'date',
        message: 'Enter the date you plan to visit (YYYY-MM-DD):',
        validate: input =>
            /^\d{4}-\d{2}-\d{2}$/.test(input) || 'Format must be YYYY-MM-DD'
    })
    return date
}

async function showCalendarForDay(parkId, date) {
    const [year, month] = date.split('-')
    const resolved = await getParkId(parkId)
    let pId = resolved || parkId
    const calendar = await fetchCalendar(year, month, pId)
    const info = calendar.find(d => d.date === date)

    if (info) {
        console.log(`\nPrediction for ${date}:`)
        console.log(`• Crowd level: ${info.crowd}%`)
        console.log(`• Opening hours: ${info.hours}\n`)

        console.log('Express pass recommendation:')
        if (info.crowd > 75) {
            console.log('• High crowd expected → Express pass recommended.')
        } else if (info.crowd > 50) {
            console.log('• Moderate crowd expected → Consider buying an express pass.')
        } else {
            console.log('• Low crowd expected → Express pass probably not needed.')
        }
    } else {
        console.log(`\nNo calendar data found for ${date}\n`)

        // find the closest date
        const target = new Date(date)
        let closest = null
        let minDiff = Infinity
        for (const d of calendar) {
            const diff = Math.abs(new Date(d.date) - target)
            if (diff < minDiff) {
                minDiff = diff
                closest = d
            }
        }
        if (closest) {
            console.log(`The closest date is ${closest.date}:`)
            console.log(`• Crowd level: ${closest.crowd}%`)
            console.log(`• Opening hours: ${closest.hours}\n`)
            console.log('Express pass recommendation:')
            if (closest.crowd > 75) console.log('• High crowd expected → Express pass recommended.')
            else if (closest.crowd > 50) console.log('• Moderate crowd expected → Consider buying an express pass.')
            else console.log('• Low crowd expected → Express pass probably not needed.')
        } else {
            console.log('No calendar entries found for that month.')
        }
    }
}

async function showLiveData(parkId) {
    const live = await getEntityLiveData(parkId)
    console.log('\nLive wait times:\n')

    live.forEach(r => {
        const waitText = r.waitTime != null
            ? `${r.waitTime}m`
            : (r.status === 'CLOSED' ? 'CLOSED' : '0m')
        console.log(
            `${r.name.padEnd(30)} | ${r.status === 'CLOSED' ? 'CLOSED'.padEnd(10) : r.status.padEnd(10)} | ${waitText}`
        )
    })

    const openRides = live.filter(r => r.status === 'OPEN' && r.waitTime != null)
    const avgWait = openRides.reduce((sum, r) => sum + r.waitTime, 0) / (openRides.length || 1)

    console.log('\nRecommendation based on current crowd:')
    if (avgWait > 30) console.log(`• Average wait is ${avgWait.toFixed(1)}m → Express pass recommended.`)
    else if (avgWait > 15) console.log(`• Average wait is ${avgWait.toFixed(1)}m → You may consider an express pass.`)
    else console.log(`• Average wait is ${avgWait.toFixed(1)}m → Express pass probably not needed.`)
}

async function main() {
    console.clear()
    let continueApp = true
    while (continueApp) {
        const park = await selectPark()
        let stay = true
        while (stay) {
            const { action } = await inquirer.prompt({
                type: 'list', name: 'action', message: 'What would you like to do?', choices: [
                    { name: 'View rides and live wait times', value: 'rides' },
                    { name: 'Check the calendar for a specific date', value: 'calendar' }
                ]
            })
            if (action === 'rides') {
                const rideId = await selectRide(park)
                await showLiveData(rideId)
                const { again } = await inquirer.prompt({ type: 'confirm', name: 'again', message: 'Another ride?', default: false })
                if (!again) stay = false
            } else {
                const { anotherDate } = await inquirer.prompt({ type: 'confirm', name: 'anotherDate', message: 'Check another date at the same park?', default: false })
                if (!anotherDate && !stay) stay = false
                const date = await selectDate()
                await showCalendarForDay(park, date)
                const { againLive } = await inquirer.prompt({ type: 'confirm', name: 'againLive', message: 'View live wait times?', default: false })
                if (againLive) await showLiveData(park)
                const { againDate } = await inquirer.prompt({ type: 'confirm', name: 'againDate', message: 'Another date?', default: false })
                if (!againDate) stay = false
            }
        }
        const { changePark } = await inquirer.prompt({ type: 'confirm', name: 'changePark', message: 'Change park or exit?', default: true })
        if (!changePark) continueApp = false
    }
}

main()
