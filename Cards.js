const parse = require("./CSVParser")
const Characters = require("./Characters")
const data = parse("./CSVParser/CSV/csv_logic/cards.csv")
const brawlers = Characters.getAllCharacterCodenames()

function getBrawlersUnlocks(){
    return data.filter(e => e.MetaType == 0).map(e => data.indexOf(e))
}

function getBrawlerRarity(){
    let indexes = {}
    for(const i of data){
        if(i.MetaType == "0"){
            const codename = i.Name.replace("_unlock", "")
            const id = Characters.getIDByCodename(codename)
            indexes[id] = i.Rarity
        }
    }
    return indexes
}

function getBrawlerSkills(skill, id){
    let characterName = Characters.getNameById(id)

    return data.filter(e => e.MetaType == String(skill) && characterName == e.Target).map(e => data.indexOf(e))
}

function getAllBrawlersSkills(skill){
    let skills = {}

    for(let i of data){
        if(i.MetaType == String(skill)){
            if(!skills[brawlers[i.Target]]){
                skills[brawlers[i.Target]] = []
            }
            skills[brawlers[i.Target]].push(data.indexOf(i))
        }
    }
    return skills
}

function getAllSkills(skill){
    let skills = []

    for(let i of data){
        if(i.MetaType == String(skill)){
            skills.push(data.indexOf(i))
        }
    }
    return skills    
}

function getBrawlerIDBySkillID(skillID){
    return Characters.getIDByCodename(data[skillID].Target)
}

module.exports = {
    getBrawlersUnlocks,
    getBrawlerRarity,
    getBrawlerSkills,
    getAllBrawlersSkills,
    getAllSkills,
    getBrawlerIDBySkillID
}