const fs = require('fs')
const crypto = require('crypto');


module.exports = class Repository {
    constructor(filename){
        this.filename = filename;
        
        if(!filename){
            console.log("No file found")
        }else{
            try{
                fs.accessSync(this.filename);
            }catch(e){
                fs.writeFileSync(this.filename,'[]');
            }
            
        }
        
        
    }
    async getAll(){
        return JSON.parse(await fs.promises.readFile(this.filename,{encoding:'utf8'}));
    }

    async create(attrs){
        attrs.id=this.randomId();
        const record = await this.getAll();
        record.push(attrs);

        this.writeAll(record);
        return attrs;
    }
    
    async writeAll(record){
        await fs.promises.writeFile(this.filename,JSON.stringify(record,null,2));
        
    }

    randomId(){
        return crypto.randomBytes(4).toString('hex');
    }

    async getOne(id){
        const record = await this.getAll();
        return await record.find(record => record.id===id);
    }
    async deleteOne(id){
        const record = await this.getAll();
        const filteredRec = record.filter(record => record.id != id);
        await this.writeAll(filteredRec);
    }

    async updateRecord(id,attrs){
        const records = await this.getAll();
        const record =  records.find(record => record.id === id);
        if(!record)
        throw new Error("Record with "+id+" not found");

        Object.assign(record,attrs);
        await this.writeAll(records);
    }
    async getOneBy(filter){
        const records = await this.getAll();
        for(let record of records){
            let found = true;

            for(let key in filter){
                if(record[key] != filter[key])
                found = false;
                
            }

            if(found){
                return record;
            }
        }
    }

}

