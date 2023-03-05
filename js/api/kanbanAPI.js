export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId)
        
        if(!column) {
            return []
        }

        return column.items //return the contents of column
    }

    static insertItem(columnId, content) {
        const data = read()
        const column = data.find(column => column.id == columnId)
        const item = {
            id: Math.floor(Math.random() * 100000),
            content
        }

        if(!column) {
            throw new Error("Column does not exist")
        }

        column.items.push(item)
        save(data)
        return item //ensure that the front end matches the local storage
    }

    static deleteItem(itemId) {
        const data = read()
        for(const column of data) {
            const item = column.items.find(item => item.id == itemId)
            
            if(item) {
                column.items.splice(column.items.indexOf(item), 1)
            }
        }
    }
}

function read() {
    //read from local storage
    const json = localStorage.getItem("kanban-data")
    if(!json){
        //4 objects nested inside of array that is returned. Each column is a status on the board
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
            {
                id: 4,
                items: []
            }
        ]
    }
    return JSON.parse(json)
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data))
}

