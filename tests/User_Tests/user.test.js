const {expect} = require("chai");
const db = require("../../models");
const {ValidateUserExists} = require('../../Services/Users/User_Service');

describe("User Test Suite",()=>{
    it('should see if a user already exists on non existent user',async ()=>{
        const user = await ValidateUserExists('FarrukhAdeel', 'test@test.com');
        expect(user).to.be.null;
    });
    it('should see if the user already exists on an existent username', async  ()=>{
        const  test = await CreateDummyUser();
        const user = await ValidateUserExists('Farrukh Adeel','test@test.com');
        expect(user).to.be.an('object');
        await DestroyDummyUser(test);
    })
    it('should see if the user already exists on an existent email', async  ()=>{
        const  test = await CreateDummyUser();
        const user = await ValidateUserExists('FarrukhAdeel','test@test.com');
        expect(user).to.be.an('object');
        await DestroyDummyUser(test);
    })
    it('should throw an error because no arg was passed to see if user exists', async ()=>{
        let test = null;
        try{
            test = await CreateDummyUser();
            await ValidateUserExists();
        }
        catch(err){
        expect(err).to.be.an("Error");
        expect(err.message).to.equal('Arguments must be username and email');
        await DestroyDummyUser(test);
        }
    })
    it('should throw an error because only 1 arg was passed to see if user exists', async ()=>{
        let test = null;
        try{
            test = await CreateDummyUser();
            await ValidateUserExists('FarrukhAdeel');
        }
        catch(err){
            expect(err).to.be.an("Error");
            expect(err.message).to.equal('Arguments must be username and email');
            await DestroyDummyUser(test);
        }
    })
});
async function CreateDummyUser(){
    return await db.user.create({
        first_name: 'farrukh',
        last_name: 'adeel',
        username :'FarrukhAdeel',
        password: 'test_test',
        email: 'test@test.com',
        permission_id: 1,
    });
}
async function DestroyDummyUser(user){
    return await user.destroy({force:true});

}