import { InitDate } from './../utils/initDate';

export default class Queue {
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    filterItems(items, inputProps) {
        const props = Object.entries(inputProps) 
        const attr = props.shift()

        items = items.filter(x => x[attr[0]] === attr[1])
        if (items.length > 0 && props.length > 0) {
            return this.filterItems(items, { [props[0][0]]: props[0][1] })
        } 
        
        return items
    }

    getQueue(props) {
        return this.filterItems(Object.values(this.items), props)
    }

    isItemExist(item) {
        return Object.values(this.items)
        .find(x => x.name === item.name && x.phone === item.phone) ? true : false 
    }

    enqueue(id, name, phoneNumber, date) { 
        const item = {
            id: id,
            name: name,
            phoneNumber: phoneNumber,
            date: InitDate(date)
        }

        if (!this.isItemExist(item)) {
            this.items[this.count] = item 
            this.count++
            return item
        }

        return false
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.lowestCount] 
        delete this.items[this.lowestCount] 
        this.lowestCount++ 
        return result 
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }

        return this.items[this.lowestCount] 
    }

    isEmpty() {
        return this.size() === 0
    }

    size() {
        return this.count - this.lowestCount
    }

    clear() {
        this.items = {}
        this.count = 0
        this.lowestCount = 0
    }

    getLastId() {
        return this.count
    }

    getList() {
        return Object.values(this.items)
    }

    seedQueueList() {
        const seedList = [{ 
            id: 0,
            name: "QueueA",
            phoneNumber: 21,
            date: new Date("2020-05-05 10:10:10")
        },
        { 
            id: 1,
            name: "QueueB",
            phoneNumber: 22,
            date: new Date("2020-05-05 11:11:11")
        },
        { 
            id: 2,
            name: "QueueC",
            phoneNumber: 23,
            date: new Date("2020-05-05 12:12:12")
        },
        { 
            id: 3,
            name: "QueueD",
            phoneNumber: 24,
            date: new Date("2020-05-05 13:13:13")
        }]

        for (let item of seedList) {
            this.enqueue(item.id, item.name, item.phoneNumber, item.date)
        }
    }
}