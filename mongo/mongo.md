# Mongodb
## Getting started
**Author**: Matheus Cesário <[matheus.cesario.santos@gmail.com](mailto:matheus.cesario.santos@gmail.com)>

## Table of contents
1. [Database](#database)
2. [Collections](#collections)
3. [Statements](#statements)

## Database

### Creating db
```sh
# Starting
mongo
use myDb
```

### Deleting db
```sh
use myDb
db.dropDatabase()
```


## Collections

### Create collection
```sh
db.createCollection("myCollection")
show collections
```

### Delete collection
```sh
db.myCollection.drop()
```


## Statements

### Insert data
```sh
use myDb
db.myCollection.insert({
    "name": "Matheus Cesário",
    "workshop": "Getting started with MongoDB",
    "price": 10,
    "audience": 76,
    "date": new Date(2015, 10, 19)
});
db.myCollection.insert({
    "name": "Matheus Cesário",
    "workshop": "Working with Python",
    "price": 15,
    "audience": 55,
    "date": new Date(2015, 11, 20)
});
db.myCollection.insert({
    "name": "Robert Griesemer, Rob Pike, and Ken Thompson",
    "workshop": "Go language",
    "price": 150,
    "audience": 550,
    "date": new Date(2016, 1, 11)
});
```

### Selecting data 
[db.collection.find(query, projection)](https://docs.mongodb.org/manual/reference/method/db.collection.find)
```sh
use myDb
db.myCollection.find()

# Exact name
db.myCollection.find({"workshop": "Working with Python"})

# Greater than or equal to
db.myCollection.find({"price": {$gte: 10}})

# Less than or equal to
db.myCollection.find({"price": {$lte: 10}})

# Conditional AND
db.myCollection.find({"price": 150, "audience": 550})

# Conditional OR
db.myCollection.find({$or:[{"price": 10 }, {"price": 15}]})

# Sorting (1 for ascending and -1 for descending)
db.myCollection.find().sort({"date": -1})

# Pattern matching (MySQL 'LIKE' equivalent)
db.myCollection.find({"name": /Matheus/})

# Limiting fields (retrieving just 'name' field)
db.myCollection.find({}, {"name": 1})

```

### Update data
[db.collection.update(query, update, options)](https://docs.mongodb.org/manual/reference/method/db.collection.update/)
```sh
use myDb
db.myCollection.update(
    {"name": /Matheus Santos/},
    {"$set": {"name": "Matheus S."}},
    {
        "upsert": false,
        "multi": true
    }
)
```

### Remove data
[db.collection.remove(query, justOne)](https://docs.mongodb.org/manual/reference/method/db.collection.remove/)
```sh
use myDb
db.myCollection.remove({"date": {$lte: new Date(2015, 12, 31)}}, 1)
```



