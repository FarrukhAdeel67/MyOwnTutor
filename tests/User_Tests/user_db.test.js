const {expect} = require("chai");
const {UsernameExists} = require('../../Services/Users/User_DB')
describe("User DB Test Suite",()=>{
    it('should see if a username exists in db',async ()=>{
        const check = await UsernameExists('');
        expect(check).to.be.false;
        expect(check === undefined).to.be.false;
        expect(check ===null).to.be.false;
    })
    it('should throw an error because no username was passed.', async  ()=>{
        try{
            const check = await UsernameExists();
        }
        catch(err){
            expect(err).to.be.an("Error")
            expect(err.message).to.equal('No Username was passed as an argument');
        }
    })
})