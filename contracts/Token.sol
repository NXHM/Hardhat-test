// Valida la versión de solidity
pragma solidity ^0.8.0;
// Constrato Token
contract Token {
    // Variables públicas para identificar el token
    string public name = "My Hardhat Token";
    string public symbol = "MHT";
    // La cantidad total de tokens que no se puede cambiar
    uint256 public totalSupply = 1000000;
    // Variable tipo address para almacenar la cuenta
    address public owner;
    // Es una asignacion(mapping) de la direccion con su balance (key/value map)
    mapping(address => uint256) balances;
    // El evento Transfer que se emite cuando se transfiere un token
    // Indexado sirve para filtrar por esos parametros (3 maximo por evento)
    // El evento sirve para que los clientes puedan escuchar los cambios y tomar medidas al respecto
    // Se usa _ para diferenciar de las variables globales
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    constructor() {
        // Asigna el totalSupply a la cuenta que despliega el contrato
        balances[msg.sender] = totalSupply;
        // Asigna la cuenta que despliega el contrato a la variable owner
        owner = msg.sender;
    }
    // Funcion para transferir tokens
    function transfer(address to, uint256 amount) external {
        // Requiere que el balance del emisor sea mayor o igual a la cantidad a transferir, sino lanza un error
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Resta la cantidad al dueño del contrato y la suma al destinatario.
        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Ejecuta el evento Transfer para notificar del cambio
        emit Transfer(msg.sender, to, amount);
    }
    // Funcion para obtener el balance de una cuenta
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}