import {expect} from "chai";
import {ethers} from "hardhat";
// Se crea una prueba de unitaria
// Titulo
// No fixture
describe("Token contract",function(){
    // Descripción de la prueba
    it("Deployment should assign the total supply of tokens to the owner",async function(){
        // Se obtienen las cuentas
        const [owner] = await ethers.getSigners();
        // Es para darle un tipo de contrato a la variable Token
        const Token = await ethers.getContractFactory("Token");
        // Se despliega el contrato
        const hardhatToken = await Token.deploy();
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        // Se espera que el total de tokens sea igual a los tokens del dueño
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
    it("Should transfer tokens between accounts", async function() {
        // Asigno al owner, addr1 y addr2 las cuentas
        const [owner, addr1, addr2] = await ethers.getSigners();
        const hardhatToken = await ethers.deployContract("Token");

        // Espera que se transfieran 50 tokens a addr1
        await hardhatToken.transfer(addr1.address, 50);
        // Espera que el balance de addr1 sea 50
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

        // Se conecta a la cuenta addr y se transfieren 50 tokens a addr2
        await hardhatToken.connect(addr1).transfer(addr2.address, 50);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
    });
})