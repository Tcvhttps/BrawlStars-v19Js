const parse = require("./CSVParser")
const data = parse("./CSVParser/CSV/csv_logic/characters.csv")
const skills = parse("./CSVParser/CSV/csv_logic/skills.csv")
const projectiles = parse("./CSVParser/CSV/csv_logic/projectiles.csv")
let skindata = parse("./CSVParser/CSV/csv_logic/skins.csv")
let confdata = parse("./CSVParser/CSV/csv_logic/skin_confs.csv")

function getDefSkinById(id){
    return data[id].DefaultSkin
}

function getNameById(id){
    return data[id].Name
}

function getHitpointsById(id){
    return data[id].Hitpoints
}
function getRechargeTimeById(id){
    const WeaponSkill = data[id].WeaponSkill
    for (const weapon of skills) {
        if (weapon.Name === WeaponSkill) {
            return weapon.RechargeTime;
        }
    }
}
function getMaxChargeById(id){
    const WeaponSkill = data[id].WeaponSkill
    for (const weapon of skills) {
        if (weapon.Name === WeaponSkill) {
            return weapon.MaxCharge;
        }
    }
}

function getCountBullet(id){
    const WeaponSkill = data[id].WeaponSkill
    for (const weapon of skills) {
        if (weapon.Name === WeaponSkill) {
            return weapon.NumBulletsInOneAttack;
        }
    }
}

function getBulletID(id) {
    const baseName = this.getNameById(id);
    const bulletName = baseName + "Projectile";

    const WeaponSkill = data[id].WeaponSkill;
    for (const index in projectiles) {
        const weapon = projectiles[index];
        if (bulletName === weapon.Name) {
            return index;
        }
    }
}


function getmoveSpeedById(id){
    return data[id].Speed
}
function getDefSkins(){
    return data.filter(e => e.ItemName != "").filter(e => data.indexOf(e))
}

function getIDByCodename(codename){
    return data.indexOf(data.find(e => e.Name == codename))
}

function getAllCharacterCodenames(){
    let codenames = {}

    for(let i of data){
        if(i.ItemName != "")codenames[i.Name] = data.indexOf(i)
    }
    return codenames
}

function getBrawlerBySkinID(skinID){
    let codename = getBrawlerCodenameBySkinID(skinID)
    return getIDByCodename(codename)
}

function getBrawlerCodenameBySkinID(skinID){
    let skinName = skindata[skinID].Name
    let skinConfName = confdata.find(e => e.Name == skinName)

    return skinConfName.Character
}

module.exports = {
    getDefSkinById,
    getCountBullet,
    getNameById,
    getDefSkins,
    getBulletID,
    getIDByCodename,
    getAllCharacterCodenames,
    getBrawlerBySkinID,
    getHitpointsById,
    getmoveSpeedById,
    getRechargeTimeById,
    getMaxChargeById
}