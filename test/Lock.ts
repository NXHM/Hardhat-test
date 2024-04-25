import { expect } from "chai";
import hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

// Fixture para desplegar el contrato Lock
describe("Lock", function () {
  it("Should set the right unlockTime", async function () {
    // Dinero blockeado
    const lockedAmount = 1_000_000_000;
    // Año en segundos
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // Tiempo de desbloqueo es el tiempo actual del último bloque más un año
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // deploy a lock contract where funds can be withdrawn
    // one year in the future
    // hre es referencia al entorno de ejecucion de hardhat
    // ethers es una biblioteca para interactuar con la red ethereum
    // nombre contrato, parametro (tiempo de bloqueo), opciones (cantidad de dinero enviado, este caso el dinero bloqueado)
    const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
      value: lockedAmount,
    });

    // Verifica que el tiempo de desbloqueo del contrato es igual al tiempo de desbloqueo que se pasa como parametro
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });
  it("Should revert with the right error if called too soon", async function () {
    // Dinero blockeado
    const lockedAmount = 1_000_000_000;
    // Año en segundos
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // Tiempo de desbloqueo es el tiempo actual del último bloque más un año
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
      value: lockedAmount,
    });
    // Espera que se haya devuelto el string de error
    await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });
  it("Should transfer the funds to the owner", async function () {
    // Dinero blockeado
    const lockedAmount = 1_000_000_000;
    // Año en segundos
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    // Tiempo de desbloqueo es el tiempo actual del último bloque más un año
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
      value: lockedAmount,
    });
    // Aumenta el tiempo en el tiempo de desbloqueo
    await time.increaseTo(unlockTime);
  
    // this will throw if the transaction reverts
    await lock.withdraw();
  });
});