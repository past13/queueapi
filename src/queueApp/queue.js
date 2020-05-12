export default class Queue {
    constructor() {
        this.count = 0
        this.lowestCount = 0
        this.items = {}
    }

    initDate() {
        let current_datetime = new Date()
        return current_datetime.getFullYear() 
        + "-" + (current_datetime.getMonth() + 1) 
        + "-" + current_datetime.getDate() 
        + " " + current_datetime.getHours() 
        + ":" + current_datetime.getMinutes() 
        + ":" + current_datetime.getSeconds()
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

    enqueue(id, name, phoneNumber) { 
        const item = {
            id: id,
            name: name,
            phoneNumber: phoneNumber,
            date: this.initDate()
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
            phoneNumber: 21
        },
        { 
            id: 1,
            name: "QueueB",
            phoneNumber: 22
        },
        { 
            id: 2,
            name: "QueueC",
            phoneNumber: 23
        },
        { 
            id: 3,
            name: "QueueD",
            phoneNumber: 24
        }]

        for (let item of seedList) {
            this.enqueue(item.id, item.name, item.phoneNumber)
        }
    }
}