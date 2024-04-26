# Está basado en el Sample Hardhat Project

He seguido el tutorial y documentación para aprender el uso de Hardhat. 

Esta compuesto de:
*  Smart contracts
*  Tests para los smart contracts
    *   Uno sin usar fixtures
    *   Otro usando fixtures
* Incluye tambien el modulo Hardhat Ignition para desplegar los smart contracts 

## Comandos 
* Es para ver los comandos
```shell
npx hardhat help
```
* Es para realizar la ejecución de los tests
```shell
npx hardhat test
```
* Es para ver la cobertura de los test con respecto al proyecto
```shell
npx npx hardhat coverage
```
* Ejecutar los tests y ver su consumo de gas
npx hardhat node
```shell
REPORT_GAS=true npx hardhat test
```
* Para ejecutar de manera paralela
```shell
npx hardhat test --parallel
```
> Se puede colocar que se ejecuten los testeos en forma paralela en Hardhat config
* Para desplegar en un nodo
```shell
npx hardhat node
```
* Para desplegar toda la carpeta ignition
```shell
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
* Para elegir una red en especifico
```shell
npx hardhat ignition deploy ./ignition/modules/Lock.js --network <your-network>
```
